/* Strapi Content Management System client (build time only).
   When STRAPI_URL is not set, callers fall back to content/content.json. */

const STRAPI_URL = process.env.STRAPI_URL?.replace(/\/$/, '');
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

export const cmsEnabled = Boolean(STRAPI_URL);

interface StrapiFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiMedia {
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
  mime?: string;
  width?: number | null;
  height?: number | null;
  formats?: Partial<Record<'thumbnail' | 'small' | 'medium' | 'large', StrapiFormat>> | null;
}

/* An image or video ready for the page: full size plus a smaller version for grids. */
export interface Media {
  url: string;
  thumb: string;
  alt: string;
  isVideo: boolean;
  isAudio: boolean;
}

export interface StrapiLabel {
  label: string;
}

const RETRIES = 2;

/* Strapi closes idle connections; a long-running server can hit one that was
   just closed (ECONNRESET), so network errors are retried. */
async function fetchWithRetry(url: string, init: RequestInit): Promise<Response> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fetch(url, init);
    } catch (err) {
      if (attempt >= RETRIES) throw err;
    }
  }
}

async function request<T>(path: string): Promise<T> {
  const res = await fetchWithRetry(`${STRAPI_URL}/api/${path}`, {
    headers: STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : undefined,
  });
  // Fail the build loudly rather than publish an empty or stale site
  if (!res.ok) {
    throw new Error(`Strapi request failed (${res.status}): ${path}`);
  }
  return res.json() as Promise<T>;
}

/* Fetch every published entry of a collection, following pagination. */
export async function findAll<T>(collection: string, query = 'populate=*'): Promise<T[]> {
  const pageSize = 100;
  const items: T[] = [];
  for (let page = 1; ; page++) {
    const sep = query ? '&' : '';
    const json = await request<{ data: T[]; meta: { pagination: { pageCount: number } } }>(
      `${collection}?${query}${sep}pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );
    items.push(...json.data);
    if (page >= json.meta.pagination.pageCount) break;
  }
  return items;
}

/* Fetch a single type; returns null when it has not been published yet. */
export async function findSingle<T>(singleType: string, query = 'populate=*'): Promise<T | null> {
  try {
    const json = await request<{ data: T | null }>(`${singleType}?${query}`);
    return json.data;
  } catch (err) {
    if (err instanceof Error && err.message.includes('(404)')) return null;
    throw err;
  }
}

function absolute(url: string): string {
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

/* Media entries without a url (local content file, nothing uploaded yet) are skipped. */
export function toMedia(media?: StrapiMedia | null, fallbackAlt = ''): Media | undefined {
  if (!media?.url) return undefined;
  const f = media.formats ?? {};
  return {
    url: absolute((f.large ?? media).url),
    thumb: absolute((f.small ?? f.medium ?? media).url),
    alt: media.alternativeText || fallbackAlt,
    isVideo: Boolean(media.mime?.startsWith('video/')),
    isAudio: Boolean(media.mime?.startsWith('audio/')),
  };
}

export function toMediaList(list?: StrapiMedia[] | null): Media[] {
  return (list ?? []).map((m) => toMedia(m)).filter((m): m is Media => Boolean(m));
}

export function mediaUrl(media?: StrapiMedia | null): string | undefined {
  return toMedia(media)?.url;
}

export function labels(items?: StrapiLabel[] | null): string[] {
  return (items ?? []).map((i) => i.label);
}

/* Split Markdown rich text into paragraphs for the existing paragraph-based layouts. */
export function paragraphs(markdown?: string | null): string[] {
  return (markdown ?? '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
