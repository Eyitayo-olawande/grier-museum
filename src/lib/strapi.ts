/* Strapi Content Management System client (build time only).
   When STRAPI_URL is not set, callers fall back to the local data files. */

const STRAPI_URL = process.env.STRAPI_URL?.replace(/\/$/, '');
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

export const cmsEnabled = Boolean(STRAPI_URL);

export interface StrapiMedia {
  url: string;
  alternativeText?: string | null;
  mime?: string;
  width?: number | null;
  height?: number | null;
}

export interface StrapiLabel {
  label: string;
}

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${STRAPI_URL}/api/${path}`, {
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

export function mediaUrl(media?: StrapiMedia | null): string | undefined {
  if (!media?.url) return undefined;
  return media.url.startsWith('http') ? media.url : `${STRAPI_URL}${media.url}`;
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
