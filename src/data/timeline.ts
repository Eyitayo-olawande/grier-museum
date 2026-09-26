export interface TimelineMilestone {
  year: number;
  title: string;
  body: string;
  category: 'Founding' | 'Academic' | 'Sport' | 'National' | 'Notable Grierson' | 'Museum';
}

export const TIMELINE: TimelineMilestone[] = [
  {
    year: 1927,
    title: 'Government College Ibadan Established',
    body: 'Government College Ibadan is founded by the British colonial administration as a premier secondary school for the most academically gifted students in Western Nigeria. The school is modelled on the English public school tradition, with a house system at its heart.',
    category: 'Founding',
  },
  {
    year: 1929,
    title: 'Grier House Named and Established',
    body: 'Grier House is formally established as one of the four boarding houses of Government College Ibadan. The house is named in honour of a distinguished figure in the school\'s early governance. From the outset, Grier House sets a standard for academic rigour, character formation and house pride that would define generations of Griersons.',
    category: 'Founding',
  },
  {
    year: 1934,
    title: 'First House Captain Appointed',
    body: 'The tradition of the House Captain is established, creating a framework of student leadership that remains central to Grier House life. The House Captain serves as the senior representative of the house, responsible for discipline, morale and the upholding of house traditions.',
    category: 'Founding',
  },
  {
    year: 1940,
    title: 'Grier House Wins First Inter-House Championship',
    body: 'Grier House claims its first Inter-House Championship, demonstrating that the house\'s ambition extends beyond the classroom to the sports field. The victory begins a proud tradition of athletic excellence that would see Grier House compete at the highest level in sprints, football and field events.',
    category: 'Sport',
  },
  {
    year: 1946,
    title: 'Wole Soyinka Enters Government College Ibadan',
    body: 'Akinwande Oluwole Babatunde Soyinka transfers from Abeokuta Grammar School to Government College Ibadan at the age of eleven. After spending time in other houses, he settles in Grier House, which becomes his home for the remainder of his time at the school. His years as a Grierson shape the rebellious, incisive intellect that will one day win the Nobel Prize.',
    category: 'Notable Grierson',
  },
  {
    year: 1952,
    title: 'First Griersons Enter University of Ibadan',
    body: 'The pioneer generation of Griersons proceeds to the newly established University of Ibadan, the first university in Nigeria. Their success in winning places at the university confirms Government College Ibadan, and Grier House within it, as an institution of genuine academic excellence.',
    category: 'Academic',
  },
  {
    year: 1960,
    title: 'Nigerian Independence: Griersons at the Vanguard',
    body: 'Nigeria gains independence on 1 October 1960. Griersons who have studied in the United Kingdom and the United States return home to take up senior roles in the new federal and regional governments, the civil service, the judiciary and the universities. The house\'s tradition of preparing leaders for public life finds its greatest expression in the first decade of independence.',
    category: 'National',
  },
  {
    year: 1962,
    title: 'Mustard Seed Publication Founded',
    body: 'The Mustard Seed, the official publication of Grier House, is established. The magazine gives voice to the intellectual and creative life of the house, publishing essays, poetry, short fiction and house news. It becomes one of the most enduring traditions of Grier House life, continuing in print to this day.',
    category: 'Founding',
  },
  {
    year: 1975,
    title: 'Adebayo Adedeji Appointed to United Nations',
    body: 'Saburi Biobaku\'s fellow Grierson Adebayo Adedeji is appointed Executive Secretary of the United Nations Economic Commission for Africa, a position he will hold for sixteen years. His appointment places a Grierson at the heart of the continent\'s development agenda at a critical moment in post-independence Africa.',
    category: 'Notable Grierson',
  },
  {
    year: 1986,
    title: 'Wole Soyinka Wins the Nobel Prize in Literature',
    body: 'Wole Soyinka is awarded the Nobel Prize in Literature, becoming the first Black African to receive the honour. The Nobel Committee cites his wide cultural perspective and his poetic overtones in fashioning the drama of existence. Grier House celebrates one of its own on the world\'s greatest literary stage.',
    category: 'Notable Grierson',
  },
  {
    year: 2001,
    title: 'Centenary of Government College Ibadan Planned',
    body: 'The Government College Ibadan community begins planning for the centenary of the school\'s founding, with old boys and current students joining to document the school\'s history. The exercise spurs new interest in preserving the records, photographs and traditions of all four houses, including Grier House.',
    category: 'Academic',
  },
  {
    year: 2020,
    title: 'Grier History and Traditions Committee Formed',
    body: 'The Grier History and Traditions Committee is established by former Griersons to systematically document, preserve and celebrate the history and traditions of Grier House. The Committee begins the work of gathering photographs, documents, articles and testimonies from Griersons across generations.',
    category: 'Museum',
  },
  {
    year: 2024,
    title: 'Grier House Museum and Library Established',
    body: 'The Grier House Museum and Library is formally established as the permanent custodian of the history and traditions of Grier House. The Museum begins collecting original photographs, recordings, documents and memorabilia, and commissions the digital heritage platform at griermuseum.org to make the archive accessible to Griersons worldwide.',
    category: 'Museum',
  },
];
