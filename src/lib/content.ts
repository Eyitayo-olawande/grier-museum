/* Content access for pages. Reads from Strapi when STRAPI_URL is set,
   otherwise from the local data files in src/data. */

import type { Era, Field, Profile } from '@/types';
import { PROFILES } from '@/data/profiles';
import { HISTORY_ARTICLES, type Article as HistoryArticle } from '@/data/articles';
import { TIMELINE, type TimelineMilestone } from '@/data/timeline';
import {
  cmsEnabled,
  findAll,
  labels,
  mediaUrl,
  paragraphs,
  type StrapiLabel,
  type StrapiMedia,
} from './strapi';

/* ---------- Notable Griersons ---------- */

interface StrapiProfile {
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
}

function fromStrapiProfile(p: StrapiProfile): Profile {
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
    achievements: p.achievements.map(({ label }) => ({ label })),
    bio: paragraphs(p.bio),
    pullQuote: p.pullQuote
      ? {
          text: p.pullQuote.text,
          attribution: p.pullQuote.attribution ?? '',
          source: p.pullQuote.source ?? '',
        }
      : undefined,
    photo: mediaUrl(p.photo),
  };
}

let profilesPromise: Promise<Profile[]> | undefined;

function surnameOf(p: Profile): string {
  return p.surname ?? p.fullName.split(' ').at(-1)!;
}

export function getProfiles(): Promise<Profile[]> {
  profilesPromise ??= (async () => {
    const list = cmsEnabled
      ? (await findAll<StrapiProfile>('profiles')).map(fromStrapiProfile)
      : PROFILES;
    return [...list].sort((a, b) => surnameOf(a).localeCompare(surnameOf(b)));
  })();
  return profilesPromise;
}

export function profileInitial(p: Profile): string {
  return surnameOf(p)[0].toUpperCase();
}

export async function getProfileBySlug(slug: string): Promise<Profile | undefined> {
  return (await getProfiles()).find((p) => p.slug === slug);
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

interface StrapiArticle {
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  date: string | null;
  era: string | null;
  category: string | null;
  order: number;
}

const WORDS_PER_MINUTE = 200;

function fromStrapiArticle(a: StrapiArticle): HistoryArticle {
  const body = paragraphs(a.body);
  const words = body.join(' ').split(/\s+/).length;
  return {
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt ?? body[0]?.slice(0, 200) ?? '',
    body,
    date: a.date ?? '',
    era: a.era ?? '',
    category: a.category ?? 'History',
    readingTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
  };
}

let historyPromise: Promise<HistoryArticle[]> | undefined;

export function getHistoryArticles(): Promise<HistoryArticle[]> {
  historyPromise ??= cmsEnabled
    ? findAll<StrapiArticle>('articles', 'filters[section][$eq]=History&sort=order:asc').then((list) =>
        list.map(fromStrapiArticle)
      )
    : Promise.resolve(HISTORY_ARTICLES);
  return historyPromise;
}

export async function getHistoryArticle(slug: string): Promise<HistoryArticle | undefined> {
  return (await getHistoryArticles()).find((a) => a.slug === slug);
}

/* ---------- Timeline ---------- */

export async function getTimeline(): Promise<TimelineMilestone[]> {
  if (!cmsEnabled) return TIMELINE;
  return findAll<TimelineMilestone>('timeline-events', 'sort=year:asc');
}
