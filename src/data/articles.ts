export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  date: string;
  era: string;
  category: string;
  readingTime: number;
}

export const HISTORY_ARTICLES: Article[] = [
  {
    slug: 'founding-of-grier-house',
    title: 'The Founding of Grier House',
    excerpt: 'An account of the establishment of Grier House in 1929 and the vision that shaped one of Government College Ibadan\'s four great boarding houses.',
    date: '2024-03-01',
    era: 'Colonial Era',
    category: 'Founding',
    readingTime: 6,
    body: [
      'When Government College Ibadan opened its doors in 1927, it did so with a clear mission: to prepare the brightest young men of Western Nigeria for roles of leadership in a rapidly changing world. The school was modelled on the English public school tradition, with the house system at the centre of its pastoral and competitive life.',
      'Grier House was established in 1929 as one of the four founding boarding houses of Government College Ibadan. Like its sister houses, it was designed not merely to provide accommodation for students but to serve as a home, a school within a school, and a community of character formation.',
      'The house was named in honour of a figure whose contribution to the early life of Government College Ibadan was considered exemplary. From the outset, the house attracted students who combined academic ability with a determination to distinguish themselves in every field of endeavour.',
      'The physical structure of the early house was modest by today\'s standards, but the ambitions it housed were not. The first Griersons arrived with the understanding that they were part of something larger than themselves, something that would outlast them and that they were obliged to make worthy of their successors.',
      'The traditions established in those early years, from the House Song to the House Supper, from the appointment of the House Captain to the ethos of collective achievement, have endured for nearly a century. They are the living inheritance of every Grierson who has passed through the house since 1929.',
    ],
  },
  {
    slug: 'gci-house-system',
    title: 'The House System: Origins and Purpose',
    excerpt: 'Understanding the boarding house system at Government College Ibadan and what it means to belong to a house.',
    date: '2024-03-08',
    era: 'Colonial Era',
    category: 'Traditions',
    readingTime: 5,
    body: [
      'The house system at Government College Ibadan is one of the school\'s most defining features. Modelled on the English public school tradition, it divides the student body into four boarding houses, each with its own identity, colours, traditions and fierce competitive pride.',
      'Each house functions as a community within the larger school community. Students eat together, compete together on the sports field, and support each other through the rigours of the academic year. The house is where friendships are formed that last a lifetime, where rivalries are kindled that never quite die, and where the bonds of brotherhood are forged that define the Grierson identity.',
      'The inter-house competitions, held throughout the academic year in athletics, football, debating, drama and academic subjects, are among the most hotly contested events on the Government College Ibadan calendar. For Griersons, winning the Inter-House Championship is a matter of deep personal and collective pride.',
      'The house system also provides a framework for leadership development. The House Captain and house prefects bear real responsibility for the welfare and conduct of their fellow students, and the experience of leadership within the house environment prepares many Griersons for the public roles they will later assume.',
    ],
  },
  {
    slug: 'griersons-at-independence',
    title: 'Griersons at the Vanguard of Nigerian Independence',
    excerpt: 'How the alumni of Grier House shaped the founding institutions of an independent Nigeria.',
    date: '2024-03-15',
    era: 'Independence Era',
    category: 'National',
    readingTime: 8,
    body: [
      'When Nigeria gained independence on 1 October 1960, it inherited a set of governing institutions that would need to be staffed at every level by educated Nigerians. The generation of young men who had attended Government College Ibadan in the 1940s and 1950s, many of them Griersons, were precisely the individuals who filled those roles.',
      'They came from the universities of Ibadan, London, Leeds, Cambridge and Yale, bearing degrees in law, medicine, economics, history and the sciences. They returned to a country that needed them urgently and in which a Government College Ibadan education marked a man as someone to be reckoned with.',
      'Among them were diplomats who represented Nigeria at the newly formed Organisation of African Unity, civil servants who drafted the country\'s first national development plans, lawyers who built the institutions of the independent judiciary, and academics who founded the faculties and departments of Nigeria\'s expanding university system.',
      'What distinguished the Griersons among them was not merely their academic preparation but the character they had developed in the house. Grier House had taught them to compete fiercely but fairly, to lead with responsibility, and to see their individual success as inseparable from the welfare of the community around them.',
      'Their collective contribution to the founding of modern Nigeria is one of the great, if often unsung, chapters in the story of Grier House. The Grier House Museum exists in part to ensure that this chapter is told, and told properly.',
    ],
  },
  {
    slug: 'academic-excellence',
    title: 'A Record of Academic Excellence',
    excerpt: 'Tracing the academic achievements of Grier House from the Colonial era to the present day.',
    date: '2024-03-22',
    era: 'All Eras',
    category: 'Academic',
    readingTime: 7,
    body: [
      'Academic excellence has been the bedrock of the Grier House identity since the house was established in 1929. In each decade of the school\'s history, Griersons have consistently ranked among the top performers in the West African School Certificate examinations, university entrance tests, and professional qualifying examinations.',
      'The tradition of academic competition within the house has been central to this achievement. The inter-house academic quiz, the essay competitions, the debating society, and the informal culture of intellectual rigour that pervades the house all contribute to an environment in which doing well in one\'s studies is expected, celebrated and supported.',
      'The house has produced scholars in every field of human endeavour. In the sciences, Griersons have become distinguished physicians, engineers and researchers. In the humanities and social sciences, they have produced historians, economists, lawyers and political scientists of international reputation. In the arts, writers, musicians and visual artists have carried the house name into the world\'s cultural conversation.',
      'What has remained constant across all these achievements is the understanding that excellence is not accidental. It is the product of hard work, curiosity, and a community that holds high standards for itself. That is the Grier House tradition, and it is a tradition worth honouring.',
    ],
  },
  {
    slug: 'sports-heritage',
    title: 'Champions on the Field: Grier House in Sport',
    excerpt: 'The sporting heritage of Grier House, from inter-house athletics to national representation.',
    date: '2024-04-01',
    era: 'All Eras',
    category: 'Sport',
    readingTime: 5,
    body: [
      'Sport at Government College Ibadan is serious business, and in Grier House, it has always been taken seriously. The house\'s sporting tradition stretches back to the earliest inter-house competitions of the late 1920s and early 1930s, and encompasses every sport on the Government College Ibadan calendar.',
      'Athletics has been the arena in which Grier House has most consistently distinguished itself. The house has produced sprinters, long-distance runners and field athletes who have gone on to represent Nigeria at regional and continental championships. The sight of Griersons on the track, wearing the house colours with pride, has inspired successive generations of students.',
      'Football, the great passion of Nigerian school sport, has also been a field of Grier House achievement. The inter-house football competition is one of the most eagerly anticipated events of the school year, and Grier House has claimed the championship on numerous occasions, each victory celebrated by the entire house community.',
      'But sport in Grier House has never been merely about winning. It has been about learning to compete with integrity, to support teammates, to accept defeat with grace and to hold victory with humility. These lessons, learned on the fields of Government College Ibadan, have served Griersons well throughout their lives.',
    ],
  },
  {
    slug: 'mustard-seed-history',
    title: 'The Mustard Seed: A History of the House Publication',
    excerpt: 'The story of the Mustard Seed, the official publication of Grier House, and its role as a record of house life.',
    date: '2024-04-10',
    era: 'All Eras',
    category: 'Traditions',
    readingTime: 6,
    body: [
      'The Mustard Seed is one of the most enduring traditions of Grier House. Founded in 1962, it is the official publication of the house, and has served for over six decades as a record of house life, a showcase for student writing and art, and a thread of continuity connecting successive generations of Griersons.',
      'The title is drawn from the parable of the mustard seed in the Gospels, the smallest of seeds that grows into the greatest of trees. It was chosen to express the belief of the house that great things begin small, and that the seeds of future greatness are planted in the daily life of Government College Ibadan.',
      'Over the decades, the Mustard Seed has published essays, poems, short stories, sports reports, house news and tributes to departing students and staff. Reading its pages is reading the social and intellectual history of Grier House itself, an irreplaceable primary source for anyone seeking to understand what it has meant to be a Grierson.',
      'The Mustard Seed continues to be published today, now available in both print and digital formats. The Grier House Museum maintains an archive of all available past editions, and is actively working to locate and digitise editions from the earliest years of the publication.',
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return HISTORY_ARTICLES.find((a) => a.slug === slug);
}
