export type Era = 'Colonial' | 'Post-War' | 'Independence' | 'Modern';

export type Field =
  | 'Literature'
  | 'Law'
  | 'Medicine'
  | 'Public Service'
  | 'Military'
  | 'Business'
  | 'Academia'
  | 'Sport'
  | 'Science'
  | 'Arts'
  | 'Human Rights'
  | 'Politics';

export interface Achievement {
  label: string;
}

export interface ProfileMeta {
  schoolNumber: string;
  set: number;
  distinctions: string[];
}

export interface Profile {
  slug: string;
  fullName: string;
  shortName: string;
  era: Era;
  fields: Field[];
  meta: ProfileMeta;
  heroTags: string[];
  achievements: Achievement[];
  bio: string[];
  pullQuote: {
    text: string;
    attribution: string;
    source: string;
  };
  photo?: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  category: string;
  photo?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'History', href: '/history' },
  { label: 'Traditions', href: '/traditions' },
  { label: 'Notable Griersons', href: '/notable-griersons' },
  { label: 'News & Publications', href: '/publications' },
  { label: 'Archives', href: '/archives' },
  { label: 'Museum & Library', href: '/museum-library' },
  { label: 'Contact Us', href: '/contact' },
];
