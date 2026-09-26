import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProfileBySlug, getAdjacentProfiles, PROFILES } from '@/data/profiles';
import ProfileHero from '@/components/profile/ProfileHero';
import ProfileBody from '@/components/profile/ProfileBody';
import PullQuote from '@/components/profile/PullQuote';
import ProfileNav from '@/components/profile/ProfileNav';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROFILES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getProfileBySlug(slug);
  if (!profile) return {};
  return {
    title: profile.shortName,
    description: `Profile of ${profile.fullName} — distinguished Grierson, ${profile.fields.join(', ')}.`,
  };
}

export default async function ProfilePage({ params }: Props) {
  const { slug } = await params;
  const profile = getProfileBySlug(slug);
  if (!profile) notFound();

  const { prev, next } = getAdjacentProfiles(slug);

  return (
    <>
      <ProfileHero profile={profile} />
      <ProfileBody profile={profile} />
      <PullQuote
        text={profile.pullQuote.text}
        attribution={profile.pullQuote.attribution}
        source={profile.pullQuote.source}
      />
      <ProfileNav prev={prev} next={next} />
    </>
  );
}
