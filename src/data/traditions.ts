export interface Tradition {
  id: string;
  title: string;
  category: 'Literary' | 'Sport' | 'Leadership' | 'Cultural' | 'Academic' | 'Social';
  era: string;
  established?: string;
  description: string;
  details: string[];
  icon: string;
}

export const TRADITIONS: Tradition[] = [
  {
    id: 'mustard-seed',
    title: 'The Mustard Seed',
    category: 'Literary',
    era: 'Since 1962',
    established: '1962',
    description:
      "The oldest student-run literary magazine in Government College Ibadan, founded by Grier House boys in 1962. The Mustard Seed has published poetry, short stories, essays and art across more than six decades.",
    details: [
      "Founded in 1962, the year after Nigeria's first Republic, by a group of Grier House students inspired by the creative renaissance of the post-Independence era.",
      "The title draws from the New Testament parable of the mustard seed — a small thing that grows into something great — a metaphor the founders chose deliberately for a school magazine that aspired to nurture literary talent.",
      "Over the decades, the magazine has published the early work of writers who went on to distinguished careers in literature, journalism, law and public life.",
      "Today the Grier House Museum holds the complete run of editions from 1962 to the present, and the magazine continues to be published annually by current students.",
    ],
    icon: '📖',
  },
  {
    id: 'house-colours',
    title: 'House Colours: Crimson & White',
    category: 'Cultural',
    era: 'Since 1929',
    established: '1929',
    description:
      "Grier House carries the colours of deep crimson and white — crimson for courage and tradition, white for scholarship and integrity. These colours have defined every sporting kit, notice board, and ceremonial occasion since 1929.",
    details: [
      "When Government College Ibadan established its house system in 1929, each of the four houses was assigned distinct colours to foster identity and healthy competition.",
      "Grier House was assigned crimson — a colour associated with academic distinction and institutional gravitas, and one that has become inseparable from the house's identity.",
      "The crimson and white appear on the house noticeboard, the house trophy cabinet, the Mustard Seed masthead, and the ceremonial sashes worn at Prize Giving Day.",
      "Old Griersons worldwide recognise one another partly by this colour — the crimson tie is a common signal at alumni gatherings.",
    ],
    icon: '🎨',
  },
  {
    id: 'governor-address',
    title: "The Governor's Annual Address",
    category: 'Leadership',
    era: 'Since 1929',
    established: '1929',
    description:
      "At the start of each school year, the Grier House Governor — the senior prefect elected to lead the house — delivers a formal address to the full house assembly. This tradition has continued unbroken for nearly a century.",
    details: [
      "The House Governor is the elected student leader of Grier House, a role of significant responsibility within the Government College Ibadan house system.",
      "The annual address, delivered at the house's first assembly of the school year, sets the tone for the coming terms — it draws on house history, celebrates the achievements of the previous year, and articulates aspirations for the year ahead.",
      "Past Governors have included men who went on to lead universities, government ministries, judicial benches and multinational corporations.",
      "The full list of House Governors since 1929 is among the archival records being catalogued by the Grier House Museum.",
    ],
    icon: '🏛️',
  },
  {
    id: 'inter-house-sports',
    title: 'Inter-House Sports Competition',
    category: 'Sport',
    era: 'Since 1930',
    established: '1930',
    description:
      "The annual inter-house athletics meeting at Government College Ibadan is among the oldest school sporting competitions in Nigeria. Grier House has produced outstanding athletes and has a proud record across track, field and team events.",
    details: [
      "GCI's inter-house sports has been held annually since the 1930s, interrupted only by exceptional circumstances. It is the single most visible expression of house pride and loyalty in the school calendar.",
      "Grier House has a particular tradition in middle-distance running and football, with house championships won across multiple eras.",
      "Notable Griersons have gone on to represent Nigeria at the African Games and the Commonwealth Games; the house tracks its athletic alumni as carefully as its academic and professional ones.",
      "The house trophy cabinet in the Grier House common room holds the inter-house sports shield and individual athletics medals spanning nearly a century.",
    ],
    icon: '🏃',
  },
  {
    id: 'prize-giving-day',
    title: 'Prize Giving Day & House Honours',
    category: 'Academic',
    era: 'Since 1929',
    established: '1929',
    description:
      "At the annual Prize Giving Day, Grier House celebrates its academic achievers with the House Academic Trophy and individual prizes. The house has consistently produced WAEC distinction holders and scholarship winners.",
    details: [
      "Prize Giving Day at Government College Ibadan is a formal occasion attended by parents, dignitaries and Old Boys. For Grier House, it is the annual public celebration of academic achievement.",
      "The house competes for the overall Academic House Cup and tracks its distinction holders in the WAEC and NECO examinations each year.",
      "Individual House Prizes are awarded in specific subjects where Grier House has a tradition of excellence — English Literature, History, Chemistry and Economics among them.",
      "Prize Giving Day is also the occasion when the outgoing House Governor formally hands over to the incoming one, in a ceremony that has not changed significantly since the 1940s.",
    ],
    icon: '🏆',
  },
  {
    id: 'old-boys-reunion',
    title: 'Old Griersons Reunions',
    category: 'Social',
    era: 'Since 1952',
    established: '1952',
    description:
      "Old Griersons maintain active reunion chapters in Lagos, Ibadan, Abuja and in the diaspora. The triennial Old Griersons Dinner — held in rotation across these cities — is the signature gathering of the extended Grier House family.",
    details: [
      "The first recorded Old Griersons reunion took place in Ibadan in 1952, when a group of alumni from the early sets gathered to celebrate the house's achievements and reconnect with one another and with the school.",
      "Today, Old Griersons chapters exist in Lagos, Ibadan, Abuja, Port Harcourt, London, Houston and Toronto. Each chapter holds its own annual event and contributes to the triennial national dinner.",
      "The triennial dinner has been held in Lagos, Ibadan and Abuja in rotation since the 1980s. It draws Griersons from across generations — school number 001 sitting alongside the most recent set.",
      "The Grier House Museum was established partly through the collective effort of Old Griersons, who recognised the need to preserve and celebrate the house's extraordinary legacy for future generations.",
    ],
    icon: '🤝',
  },
  {
    id: 'house-song',
    title: 'The Grier House Song',
    category: 'Cultural',
    era: 'Since 1935',
    established: '1935',
    description:
      "The Grier House Song has been sung at the opening of every house assembly since the 1930s. It is among the most enduring expressions of collective identity among Griersons, known by heart by every alumnus regardless of their set.",
    details: [
      "The house song tradition at Government College Ibadan draws on the English public school tradition of communal singing as an expression of institutional identity and loyalty.",
      "Grier House's song was composed in the 1930s and has remained essentially unchanged — a remarkable continuity that speaks to the strength of the house's oral traditions.",
      "Old Griersons at reunions and dinners invariably end the evening by singing the house song together — a moment that consistently transcends the differences of generation, career and geography.",
      "The original score and lyrics are held in the Grier House Museum archive, alongside recordings made at various reunions across the decades.",
    ],
    icon: '🎵',
  },
  {
    id: 'motto-and-values',
    title: 'Motto: Dare to Learn',
    category: 'Academic',
    era: 'Since 1929',
    established: '1929',
    description:
      'The Grier House motto — "Dare to Learn" — has guided the house since its founding. It speaks to a culture of intellectual courage: the willingness to engage seriously with ideas, to question, and to pursue knowledge with genuine ambition.',
    details: [
      '"Dare to Learn" (rendered in the original Latin as "Aude Discere") sets Grier House apart as a house that values intellectual seriousness as its defining characteristic.',
      'The motto is inscribed above the entrance to the Grier House common room, on the masthead of the Mustard Seed, and on the house\'s formal correspondence.',
      'Over generations, this motto has shaped the character of those who passed through Grier House — instilling not merely the desire to learn but the courage to engage with difficult ideas and to pursue excellence without apology.',
      'The establishment of the Grier House Museum is itself an expression of this motto: a commitment to learning from and preserving the history of the house for future generations.',
    ],
    icon: '⚡',
  },
];

export const FEATURED_TRADITION_ID = 'mustard-seed';

export function getTraditionById(id: string): Tradition | undefined {
  return TRADITIONS.find((t) => t.id === id);
}
