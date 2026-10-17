/* Content access for pages. Reads published entries from Strapi when
   STRAPI_URL is set, otherwise from content/content.json (the same file
   that is imported into Strapi). Both sources share the shapes below. */

import type { Era, Field, Profile } from '@/types';
import localContent from '../../content/content.json';
import {
  cmsEnabled,
  findAll,
  findSingle,
  labels,
  toMedia,
  toMediaList,
  type Media,
  type StrapiLabel,
  type StrapiMedia,
} from './strapi';

const LOCAL = localContent as unknown as Record<string, unknown>;

async function collection<T>(uid: string, endpoint: string): Promise<T[]> {
  return cmsEnabled ? findAll<T>(endpoint) : ((LOCAL[uid] ?? []) as T[]);
}

async function single<T>(uid: string, endpoint: string): Promise<T | null> {
  return cmsEnabled ? findSingle<T>(endpoint) : ((LOCAL[uid] ?? null) as T | null);
}

/* Each source is read once per build. In development every request reads
   afresh so edits in Strapi show up, and a failed read is never kept. */
function once<T>(load: () => Promise<T>): () => Promise<T> {
  if (process.env.NODE_ENV === 'development') return load;
  let promise: Promise<T> | undefined;
  return () =>
    (promise ??= load().catch((err) => {
      promise = undefined;
      throw err;
    }));
}

const bySlug = <T extends { slug: string }>(list: T[], slug: string) => list.find((x) => x.slug === slug);

/* ---------- Notable Griersons ---------- */

interface RawProfile {
  slug: string;
  fullName: string;
  shortName: string;
  surname: string;
  era: Era | null;
  schoolNumber: string | null;
  set: number | null;
  fields: StrapiLabel[];
  heroTags: StrapiLabel[];
  distinctions: StrapiLabel[];
  achievements: StrapiLabel[];
  bio: string;
  pullQuote: { text: string; attribution: string | null; source: string | null } | null;
  photo: StrapiMedia | null;
  gallery: StrapiMedia[] | null;
}

function toProfile(p: RawProfile): Profile {
  return {
    slug: p.slug,
    fullName: p.fullName,
    shortName: p.shortName,
    surname: p.surname,
    era: p.era ?? 'Modern',
    fields: labels(p.fields) as Field[],
    meta: {
      schoolNumber: p.schoolNumber ?? '',
      set: p.set ?? 0,
      distinctions: labels(p.distinctions),
    },
    heroTags: labels(p.heroTags),
    achievements: (p.achievements ?? []).map(({ label }) => ({ label })),
    bio: p.bio.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean),
    pullQuote: p.pullQuote
      ? { text: p.pullQuote.text, attribution: p.pullQuote.attribution ?? '', source: p.pullQuote.source ?? '' }
      : undefined,
    photo: toMedia(p.photo)?.url,
    gallery: toMediaList(p.gallery),
  };
}

export const getProfiles = once(async () =>
  (await collection<RawProfile>('api::profile.profile', 'profiles'))
    .map(toProfile)
    .sort((a, b) => surnameOf(a).localeCompare(surnameOf(b)))
);

function surnameOf(p: Profile): string {
  return p.surname ?? p.fullName.split(' ').at(-1)!;
}

export function profileInitial(p: Profile): string {
  return surnameOf(p)[0].toUpperCase();
}

export async function getProfileBySlug(slug: string): Promise<Profile | undefined> {
  return bySlug(await getProfiles(), slug);
}

export async function getAdjacentProfiles(
  slug: string
): Promise<{ prev: Profile | null; next: Profile | null }> {
  const sorted = await getProfiles();
  const idx = sorted.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? sorted[idx - 1] : null,
    next: idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null,
  };
}

/* ---------- Grier House History ---------- */

export interface HistoryArticle {
  slug: string;
  title: string;
  excerpt: string;
  /* Markdown */
  body: string;
  era: string;
  category: string;
  readingTime: number;
}

interface RawArticle {
  slug: string;
  title: string;
  section: string;
  excerpt: string | null;
  body: string;
  era: string | null;
  category: string | null;
  order: number | null;
}

const WORDS_PER_MINUTE = 200;

function readingTime(markdown: string): number {
  return Math.max(1, Math.round(markdown.split(/\s+/).length / WORDS_PER_MINUTE));
}

export const getHistoryArticles = once(async () =>
  (await collection<RawArticle>('api::article.article', 'articles'))
    .filter((a) => a.section === 'History')
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map<HistoryArticle>((a) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt ?? '',
      body: a.body,
      era: a.era ?? '',
      category: a.category ?? 'History',
      readingTime: readingTime(a.body),
    }))
);

export async function getHistoryArticle(slug: string): Promise<HistoryArticle | undefined> {
  return bySlug(await getHistoryArticles(), slug);
}

/* ---------- Timeline ---------- */

export interface TimelineMilestone {
  year: number;
  title: string;
  body: string;
  category: 'Founding' | 'Academic' | 'Sport' | 'National' | 'Notable Grierson' | 'Museum';
}

export const getTimeline = once(async () =>
  (await collection<TimelineMilestone>('api::timeline-event.timeline-event', 'timeline-events')).sort(
    (a, b) => a.year - b.year
  )
);

/* ---------- Traditions ---------- */

export interface Tradition {
  slug: string;
  title: string;
  category: 'Literary' | 'Sport' | 'Leadership' | 'Cultural' | 'Academic' | 'Social';
  era: string | null;
  description: string;
  /* Markdown */
  body: string | null;
  icon: string;
  featured: boolean;
  order: number;
}

export const getTraditions = once(async () =>
  (await collection<Tradition>('api::tradition.tradition', 'traditions')).sort((a, b) => a.order - b.order)
);

/* ---------- Dare to Learn ---------- */

export interface Excerpt {
  slug: string;
  title: string;
  excerpt: string;
  /* Markdown */
  body: string;
}

export interface DareToLearnBook {
  title: string;
  description: string;
  purchaseLinks: { label: string; url: string }[];
}

export const getExcerpts = once(async () =>
  (await collection<Excerpt>('api::dare-to-learn-excerpt.dare-to-learn-excerpt', 'dare-to-learn-excerpts')).sort(
    (a, b) => a.title.localeCompare(b.title)
  )
);

export async function getExcerpt(slug: string): Promise<Excerpt | undefined> {
  return bySlug(await getExcerpts(), slug);
}

export const getDareToLearnBook = once(async () =>
  single<DareToLearnBook>('api::dare-to-learn-book.dare-to-learn-book', 'dare-to-learn-book')
);

/* ---------- Extracurricular Activities ---------- */

export interface Activity {
  slug: string;
  title: string;
  summary: string;
  /* Markdown */
  body: string;
  photos: Media[];
  videos: Media[];
}

interface RawActivity extends Omit<Activity, 'photos' | 'videos'> {
  order: number;
  photos: StrapiMedia[] | null;
  videos: StrapiMedia[] | null;
}

export const getActivities = once(async () =>
  (await collection<RawActivity>('api::extracurricular-activity.extracurricular-activity', 'extracurricular-activities'))
    .sort((a, b) => a.order - b.order)
    .map<Activity>((a) => ({ ...a, photos: toMediaList(a.photos), videos: toMediaList(a.videos) }))
);

/* ---------- Archives ---------- */

export type ArchiveType = 'Photo' | 'Video' | 'Document' | 'Artefact';

export interface ArchiveItem {
  id: string;
  title: string;
  type: ArchiveType;
  era: Era | null;
  year: string | null;
  description: string | null;
  credit: string | null;
  media?: Media;
}

interface RawArchiveItem extends Omit<ArchiveItem, 'id' | 'media'> {
  media: StrapiMedia | null;
}

export const getArchiveItems = once(async () =>
  (await collection<RawArchiveItem>('api::archive-item.archive-item', 'archive-items'))
    .map<ArchiveItem>((item, i) => ({ ...item, id: String(i), media: toMedia(item.media, item.title) }))
    .sort((a, b) => (a.year ?? '9999').localeCompare(b.year ?? '9999') || a.title.localeCompare(b.title))
);

/* ---------- Home and Museum pages ---------- */

export interface HomePage {
  welcomeTitle: string;
  /* Markdown */
  welcomeText: string;
  featuredPhotos: Media[];
  introVideo?: Media;
}

export const getHomePage = once(async () => {
  const raw = await single<
    Omit<HomePage, 'featuredPhotos' | 'introVideo'> & {
      featuredPhotos: StrapiMedia[] | null;
      introVideo: StrapiMedia | null;
    }
  >('api::home-page.home-page', 'home-page');
  return raw
    ? { ...raw, featuredPhotos: toMediaList(raw.featuredPhotos), introVideo: toMedia(raw.introVideo) }
    : null;
});

export interface MuseumPage {
  intro: string;
  /* Markdown */
  history: string;
  goals: string;
  galleryImages: Media[];
  creatingTheMuseumTitle: string;
  creatingTheMuseumMedia: Media[];
}

export const getMuseumPage = once(async () => {
  const raw = await single<
    Omit<MuseumPage, 'galleryImages' | 'creatingTheMuseumMedia'> & {
      galleryImages: StrapiMedia[] | null;
      creatingTheMuseumMedia: StrapiMedia[] | null;
    }
  >('api::museum-library-page.museum-library-page', 'museum-library-page');
  return raw
    ? {
        ...raw,
        galleryImages: toMediaList(raw.galleryImages),
        creatingTheMuseumMedia: toMediaList(raw.creatingTheMuseumMedia),
      }
    : null;
});
