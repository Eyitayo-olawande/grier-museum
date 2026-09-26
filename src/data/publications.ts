export interface PublicationHub {
  id: string;
  title: string;
  tagline: string;
  description: string;
  href: string;
  icon: string;
  colour: string;
  since: string;
  frequency: string;
}

export const PUBLICATION_HUBS: PublicationHub[] = [
  {
    id: 'mustard-seed',
    title: 'The Mustard Seed',
    tagline: "Grier House's literary magazine, since 1962",
    description:
      "The oldest continuously published literary magazine at Government College Ibadan. Poetry, fiction, essays and art by current and former Griersons.",
    href: '/publications/mustard-seed',
    icon: '📖',
    colour: '#800000',
    since: '1962',
    frequency: 'Annual',
  },
  {
    id: 'dare-to-learn',
    title: 'Dare to Learn',
    tagline: 'The intellectual journal of Grier House',
    description:
      'Long-form essays, academic writing and reflections on education, public life and the Nigerian experience — by Old Griersons and invited contributors.',
    href: '/publications/dare-to-learn',
    icon: '✍️',
    colour: '#1A365D',
    since: '1985',
    frequency: 'Biannual',
  },
  {
    id: 'newsletter',
    title: 'Grier House Newsletter',
    tagline: 'News from the house and the alumni community',
    description:
      'Quarterly news covering current students, house events, alumni achievements, reunion reports and announcements from the Grier History and Traditions Committee.',
    href: '/publications/newsletter',
    icon: '📰',
    colour: '#4A5568',
    since: '1992',
    frequency: 'Quarterly',
  },
  {
    id: 'stories',
    title: 'Stories of Griersons',
    tagline: 'Alumni memories and reflections',
    description:
      'First-person accounts of life in Grier House — school memories, friendships, formative experiences, and the lessons that lasted a lifetime. Submissions welcome.',
    href: '/publications/stories',
    icon: '💬',
    colour: '#5C3317',
    since: '2020',
    frequency: 'Ongoing',
  },
  {
    id: 'from-the-desk',
    title: "From the Desk of the House Governor",
    tagline: "Messages from the student Governor of Grier House",
    description:
      'Addresses and reflections from the serving and former House Governors of Grier House — the elected student leaders who have guided the house across generations.',
    href: '/publications/from-the-desk',
    icon: '🏛️',
    colour: '#1B4D2E',
    since: '2021',
    frequency: 'Each term',
  },
];

/* ─── Mustard Seed ─── */
export interface MustardSeedIssue {
  year: number;
  volume: number;
  theme?: string;
  excerpt: string;
  pieces: number;
}

export const MUSTARD_SEED_ISSUES: MustardSeedIssue[] = [
  { year: 2024, volume: 63, theme: 'Roots & Routes', excerpt: 'The 2024 edition explores what it means to come from somewhere — and to carry that somewhere with you through a life of movement, achievement and return.', pieces: 18 },
  { year: 2023, volume: 62, theme: 'The River Does Not Forget', excerpt: 'Water as memory, as continuity, as the thing that shapes everything it touches. Prose, poetry and art from current and former Griersons.', pieces: 15 },
  { year: 2022, volume: 61, theme: 'After School', excerpt: 'What happens to the boy who leaves Government College Ibadan? Reflections on the passage from school to life, from youth to purpose.', pieces: 21 },
  { year: 2020, volume: 60, theme: 'Sixty Years', excerpt: 'The diamond jubilee edition, featuring work spanning the full six decades of the magazine — reprints from 1962 alongside new commissions.', pieces: 34 },
  { year: 2019, volume: 59, theme: 'Belonging', excerpt: "On houses and homes, on the communities that shape us, on what it means to be a Grierson in a country that is still finding its form.", pieces: 16 },
  { year: 2018, volume: 58, theme: 'The Long Game', excerpt: 'Essays, poetry and short fiction meditating on patience, persistence and the slow arc of a life well lived.', pieces: 14 },
];

/* ─── Dare to Learn ─── */
export interface DareToLearnIssue {
  year: number;
  volume: number;
  season: string;
  theme: string;
  excerpt: string;
  essays: number;
}

export const DARE_TO_LEARN_ISSUES: DareToLearnIssue[] = [
  { year: 2024, volume: 39, season: 'First Half', theme: 'Education and the Nigerian State', excerpt: 'A critical examination of the relationship between elite secondary education, national identity and the formation of public leadership in Nigeria since Independence.', essays: 6 },
  { year: 2023, volume: 38, season: 'Second Half', theme: 'Law, Justice and the Nigerian Bench', excerpt: 'Old Griersons who have served on Nigeria\'s courts reflect on the practice of law, the pursuit of justice, and the enduring meaning of their GCI education.', essays: 5 },
  { year: 2023, volume: 37, season: 'First Half', theme: 'Science and the Public Good', excerpt: 'On scientific education, research capacity and the responsibility of the technically educated towards a country that needs their skills.', essays: 7 },
  { year: 2022, volume: 36, season: 'Second Half', theme: 'The Literature of Formation', excerpt: "From Achebe to Soyinka to the contemporary novel — how Nigerian literature has been shaped by the mission-school tradition and its alumni.", essays: 5 },
  { year: 2022, volume: 35, season: 'First Half', theme: 'Business and the Common Wealth', excerpt: 'On entrepreneurship, corporate responsibility and the idea that commercial success carries a social obligation — especially for those educated at public expense.', essays: 6 },
];

/* ─── Newsletter ─── */
export interface NewsletterIssue {
  slug: string;
  season: string;
  year: number;
  headline: string;
  items: string[];
}

export const NEWSLETTER_ISSUES: NewsletterIssue[] = [
  {
    slug: 'q3-2024',
    season: 'Q3',
    year: 2024,
    headline: 'Museum launches digital archive; reunion in Lagos draws 120 Old Griersons',
    items: [
      'Grier House Museum opens its digital portal at griermuseum.org',
      'Lagos chapter reunion — 120 Old Griersons across 10 sets gather at Eko Hotel',
      "House Governor's prize for academic distinction awarded to three Upper Sixth students",
      'New donation: complete set of Mustard Seed volumes 1–40 presented to the Museum',
      'Old Grierson Kenneth Adeyemi appointed to Federal Executive Council',
    ],
  },
  {
    slug: 'q2-2024',
    season: 'Q2',
    year: 2024,
    headline: "Grier House wins inter-house athletics shield for third consecutive year",
    items: [
      'Inter-house sports: Grier House takes the overall athletics shield for the third year running',
      'Mustard Seed Vol. 63 — "Roots & Routes" — distributed at Prize Giving Day',
      'Abuja chapter holds inaugural Young Griersons networking event',
      'Professor Akin Fashola (Set 1971) delivers annual Grier House Lecture at GCI',
      'Museum receives photograph collection from the estate of Mr. A.O. Williams (Set 1955)',
    ],
  },
  {
    slug: 'q1-2024',
    season: 'Q1',
    year: 2024,
    headline: "New House Governor addresses house for first time; restoration of common room begins",
    items: [
      "New House Governor delivers inaugural address to full house assembly",
      'Grier House common room restoration project launched by Old Griersons committee',
      'Dare to Learn Vol. 39 — "Education and the Nigerian State" — published and distributed',
      'Houston chapter established; 24 founding members',
      'Call for submissions: Stories of Griersons — alumni invited to share school memories',
    ],
  },
  {
    slug: 'q4-2023',
    season: 'Q4',
    year: 2023,
    headline: "Old Griersons triennial dinner: Lagos 2023 hailed as most attended in decades",
    items: [
      'Triennial dinner at Eko Hotel — 230 attendees representing 27 sets',
      "Justice Biodun Adekoya (Set 1968) delivers keynote: 'What Grier House taught us about excellence'",
      'Prize Giving Day: Grier House takes academic house cup for second consecutive year',
      'Mustard Seed Vol. 62 — "The River Does Not Forget" — launched at the triennial dinner',
      'Oral history project: 12 interviews with Old Griersons from the 1940s and 1950s completed',
    ],
  },
];

/* ─── Stories ─── */
export interface Story {
  id: string;
  title: string;
  author: string;
  set: number;
  excerpt: string;
  body: string[];
  date: string;
}

export const STORIES: Story[] = [
  {
    id: 'the-night-before-waec',
    title: 'The Night Before WAEC',
    author: 'Emmanuel Adewole',
    set: 1988,
    excerpt: 'There is a particular quality to the silence in Grier House at 2am during examination preparation — a concentrated, collective quiet that I have never encountered anywhere else.',
    body: [
      'There is a particular quality to the silence in Grier House at 2am during examination preparation — a concentrated, collective quiet that I have never encountered anywhere else in forty years of professional and academic life.',
      'We had been permitted to study through the night in the dormitory, the six of us at our end of the room, our Tilley lamps turned low to avoid disturbing the boys who slept. The night before the English Literature paper. I was reading Soyinka\'s Death and the King\'s Horseman for what must have been the fifth time, and the words had stopped making sense in the way that words do when you have read them too many times.',
      "Kola, who was in the bunk above mine, leaned down and said, in a whisper: 'Do you think Elesin had a choice?' We spent the next two hours talking about free will and obligation and the claim that community makes on the individual. It was the best literary discussion I have ever had.",
      'I became a professor of literature. I have sometimes wondered whether the seed of that career was planted not in any lecture hall, but in that dormitory in Grier House, in the middle of the night, the week before WAEC.',
    ],
    date: '2024-03-15',
  },
  {
    id: 'the-day-we-won',
    title: 'The Day We Won the Athletics Shield',
    author: 'Rotimi Falana',
    set: 1979,
    excerpt: 'I ran the 800 metres in the inter-house sports of 1979, and I ran it for Grier House, and when I crossed the line in first place I heard a sound I have never forgotten.',
    body: [
      "I ran the 800 metres in the inter-house sports of 1979, and I ran it for Grier House, and when I crossed the line in first place I heard a sound I have never forgotten. It was the house roaring. Every Grierson on that field and in those stands — two hundred boys in crimson and white — roaring as if one thing.",
      "I was sixteen years old. I had never won anything. My father was a civil servant who had worked and sacrificed so that I could attend Government College Ibadan, and I understood that morning, for the first time, what it meant to carry something larger than yourself.",
      'Grier House won the overall athletics shield that year by three points. We carried it back to the house in a procession that I remember as the happiest moment of my school career. The house master, Mr. Oke, stood at the common room door and simply said: "You earned it." That was all.',
      "Forty-five years later, my son asked me why I had kept a photograph on my desk of a boy in running kit on a track in Ibadan. I told him: that boy learned what it meant to run for something other than himself. Everything that came after — the law practice, the advocacy work, the family — grew from that morning.",
    ],
    date: '2024-01-22',
  },
  {
    id: 'the-governor-handover',
    title: 'The Handover',
    author: 'Chukwuemeka Obi',
    set: 1994,
    excerpt: 'When I handed the house keys to my successor, I understood for the first time what all those who had gone before me must have felt: the weight of the thing being entrusted, and the lightness of setting it down.',
    body: [
      "I was House Governor in my final year, and the handover ceremony — the formal transfer of the house keys from outgoing to incoming Governor — is something I think about more than I expected to, twenty years later.",
      "When I handed the house keys to my successor, I understood for the first time what all those who had gone before me must have felt: the weight of the thing being entrusted, and the lightness of setting it down. I had spent a year carrying a responsibility I had not fully understood when I took it on. The house was not mine — it had existed for sixty-five years before I arrived and would go on for centuries after I left.",
      'My address that day was not very good. I was eighteen years old and I had not yet learned to speak in public with any particular skill. But I said something that I have since heard quoted back to me by Griersons I have never met: that Grier House was not a place you graduated from, it was a thing you graduated into.',
      "I meant it as a description of Old Grierson fellowship. I think now it is also a description of character — the thing that is formed in a boy by years of living and studying and competing alongside others who share a standard. You graduate into that standard. It follows you.",
    ],
    date: '2023-11-08',
  },
];

/* ─── From the Desk ─── */
export interface GovernorAddress {
  id: string;
  governor: string;
  set: number;
  term: string;
  year: number;
  title: string;
  excerpt: string;
  body: string[];
}

export const GOVERNOR_ADDRESSES: GovernorAddress[] = [
  {
    id: 'address-2024-first-term',
    governor: 'Adebayo Okonkwo',
    set: 2007,
    term: 'First Term',
    year: 2024,
    title: 'On the Responsibility of Excellence',
    excerpt: 'To be educated at Government College Ibadan is not a personal achievement — it is a social one. Every boy here is here because of decisions made by others, at cost to others, on his behalf.',
    body: [
      "Brothers of Grier House, I address you today for the first time as your Governor. I do so with a full understanding of what this house has been — and what, therefore, it asks of each of us now.",
      "To be educated at Government College Ibadan is not a personal achievement — it is a social one. Every boy here is here because of decisions made by others, at cost to others, on his behalf. Parents who sacrificed. Teachers who believed. And, before them, Old Griersons who maintained a standard of excellence across nine decades so that this house would still mean something when we arrived in it.",
      "Our responsibility, then, is not primarily to ourselves. It is to the house — and through the house, to the country that still needs men of ability and conscience. The Griersons who have gone before us shaped Nigeria's universities, its courts, its arts, its public institutions. They did so because Grier House taught them that excellence was not optional.",
      "This year, I ask each of you to carry that understanding into every classroom, every sporting contest, every act of house fellowship. Dare to learn — not because it will serve your personal ambitions, but because it is the obligation that this house places on every one of us.",
      "I am honoured to lead you. Let us make Grier House proud.",
    ],
  },
  {
    id: 'address-2023-final-term',
    governor: 'Tunde Bamidele',
    set: 2006,
    term: 'Final Term',
    year: 2023,
    title: 'Gratitude and Continuity',
    excerpt: 'Three terms ago, I stood before you for the first time as your Governor and spoke about what it meant to inherit a legacy. Today I speak about what it means to pass one on.',
    body: [
      "Brothers, three terms ago I stood before you for the first time as your Governor and spoke about what it meant to inherit a legacy. Today I speak about what it means to pass one on.",
      "This house has given me more than I can enumerate. It has given me the experience of leadership — of learning that a title carries no authority that your conduct does not earn, every day, in the eyes of those you serve. It has given me brothers. And it has given me the humbling experience of following in footsteps that are never fully visible — the accumulated choices of every Governor who came before me, whose decisions built the reputation that I inherited when I took these keys.",
      "To my successor: the keys are not merely a symbol. The house is a living thing, made of the boys in it, and it requires your attention and your best self every day. It will reward you with something that lasts longer than any examination result: a sense of who you are, and what you are capable of.",
      "To the house: thank you. It has been the privilege of my school career to serve you. Dare to learn. Always.",
    ],
  },
];
