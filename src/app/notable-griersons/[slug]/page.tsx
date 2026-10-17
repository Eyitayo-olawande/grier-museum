import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProfileBySlug, getAdjacentProfiles, getProfiles } from '@/lib/content';
import ProfileHero from '@/components/profile/ProfileHero';
import ProfileBody from '@/components/profile/ProfileBody';
import PullQuote from '@/components/profile/PullQuote';
import ProfileNav from '@/components/profile/ProfileNav';
import ProfileGallery from '@/components/profile/ProfileGallery';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (await getProfiles()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = await getProfileBySlug(slug);
  if (!profile) return {};
  return {
    title: profile.shortName,
    description: `Profile of ${profile.fullName} — distinguished Grierson, ${profile.fields.join(', ')}.`,
  };
}

export default async function ProfilePage({ params }: Props) {
  const { slug } = await params;
  const profile = await getProfileBySlug(slug);
  if (!profile) notFound();

  const { prev, next } = await getAdjacentProfiles(slug);

  return (
    <>
      <ProfileHero profile={profile} />
      <ProfileBody profile={profile} />
      {profile.pullQuote && (
        <PullQuote
          text={profile.pullQuote.text}
          attribution={profile.pullQuote.attribution}
          source={profile.pullQuote.source}
        />
      )}
      {profile.gallery && profile.gallery.length > 0 && (
        <ProfileGallery name={profile.shortName} photos={profile.gallery} />
      )}
      <ProfileNav prev={prev} next={next} />
    </>
  );
}
