import type { Profile } from '@/types';

export const PROFILES: Profile[] = [
  {
    slug: 'wole-soyinka',
    fullName: 'Akinwande Oluwole Babatunde Soyinka',
    shortName: 'Wole Soyinka',
    era: 'Post-War',
    fields: ['Literature', 'Human Rights'],
    meta: {
      schoolNumber: '482',
      set: 1946,
      distinctions: ['Nobel Laureate 1986', 'First Black African Nobel Prize Winner'],
    },
    heroTags: ['Literature', 'Human Rights'],
    achievements: [
      { label: 'Nobel Prize in Literature (1986)' },
      { label: 'Pyrates Confraternity Founder' },
      { label: 'National Arts Theatre Namesake' },
      { label: 'University of Leeds Alumni' },
      { label: 'Political Prisoner 1967–1969' },
    ],
    bio: [
      'Akinwande Oluwole Babatunde Soyinka was born on 13 July 1934 in Aké, Abeokuta. A child prodigy and avid reader, his parents encouraged his literary pursuits from an early age. By 1945, aged only 11, he gained admission into Abeokuta Grammar School. His ever-inquisitive spirit led him to transfer within one year to the more prestigious Government College Ibadan in 1946.',
      'During his years in Government College Ibadan, Soyinka did well in his studies but was rebellious and difficult to deal with. He spent time in all four Houses. Grier House was the last house he called home at Government College Ibadan, qualifying him as a proud Grierson.',
      'After five years in Government College Ibadan, he enrolled in 1952 at the University of Ibadan. Ever a rebel and iconoclast, he founded, while an undergraduate, the Pyrates Confraternity to “bring back the age of chivalry and fight for social justice.” He left Nigeria in 1954 for the University of Leeds, where his literary creativity truly blossomed.',
      'Soyinka returned to Nigeria in 1960 and established himself as the foremost playwright in the country, blending Yoruba mythology with Western dramatic forms. His plays, including The Trials of Brother Jero, A Dance of the Forests and Death and the King’s Horseman, transformed African theatre.',
      'In 1986, Wole Soyinka was awarded the Nobel Prize in Literature, becoming the first Black African to receive the honour. The Nobel Committee cited his wide cultural perspective and his poetic overtones in fashioning the drama of existence.',
    ],
    pullQuote: {
      text: '“The man dies in all who keep silent in the face of tyranny.”',
      attribution: 'Wole Soyinka',
      source: 'The Man Died, 1972',
    },
  },
  {
    slug: 'saburi-biobaku',
    fullName: 'Saburi Oladeni Biobaku',
    shortName: 'Saburi Biobaku',
    era: 'Colonial',
    fields: ['Academia', 'Public Service'],
    meta: {
      schoolNumber: '301',
      set: 1940,
      distinctions: ['First Vice-Chancellor, University of Lagos', 'Commander of the Federal Republic'],
    },
    heroTags: ['Academia', 'Public Service'],
    achievements: [
      { label: 'First Vice-Chancellor, University of Lagos' },
      { label: 'Master of Pembroke College, Cambridge' },
      { label: 'Commander of the Federal Republic (CFR)' },
      { label: 'Pioneer of Yoruba Historical Studies' },
    ],
    bio: [
      'Saburi Oladeni Biobaku was born in 1918 in Abeokuta, Ogun State. He attended Government College Ibadan where he excelled in the humanities and distinguished himself as one of the school’s finest scholars. His time in Grier House shaped the rigorous intellectual disposition he would carry throughout a remarkable career.',
      'He proceeded to Higher College Yaba and then won a scholarship to Cambridge University, where he read History at Pembroke College. He later became the Master of Pembroke College, a singular distinction for a Nigerian scholar at the time.',
      'Biobaku returned to Nigeria and joined the colonial and then federal civil service. He served as Secretary to the Western Region Government, played a central role in the drafting of Nigeria’s independence constitution, and was one of the key intellectual architects of modern Nigerian governance.',
      'As the first Vice-Chancellor of the University of Lagos, he oversaw the establishment of one of Nigeria’s foremost universities. His scholarly contributions to Yoruba history, particularly his landmark work The Egba and Their Neighbours 1842–1872, remain foundational texts in West African historical studies.',
    ],
    pullQuote: {
      text: '“A scholar is not defined by the books he reads but by the questions he refuses to stop asking.”',
      attribution: 'Saburi Biobaku',
      source: 'Convocation Address, University of Lagos',
    },
  },
  {
    slug: 'olu-falae',
    fullName: 'Samuel Olu Falae',
    shortName: 'Olu Falae',
    era: 'Independence',
    fields: ['Politics', 'Public Service'],
    meta: {
      schoolNumber: '534',
      set: 1955,
      distinctions: ['Former Secretary to the Federal Government', '1999 Presidential Candidate'],
    },
    heroTags: ['Politics', 'Public Service'],
    achievements: [
      { label: 'Secretary to the Federal Government (1986–1990)' },
      { label: 'Minister of Finance' },
      { label: 'Alliance for Democracy Presidential Candidate, 1999' },
      { label: 'Yale University Alumni' },
    ],
    bio: [
      'Samuel Olu Falae was born on 25 July 1938 in Ilare-Akure, Ondo State. He attended Government College Ibadan, where he was a member of Grier House, before proceeding to University College Ibadan and later Yale University, where he earned a doctorate in economics.',
      'He built a distinguished career in public service, rising through the ranks of the federal civil service to become Secretary to the Federal Government of Nigeria under the military administration of General Ibrahim Babangida. He also served as Minister of Finance and Governor of the Central Bank of Nigeria.',
      'In 1999, as Nigeria returned to democratic governance, Falae ran for president on the platform of the Alliance for Democracy, contesting against Olusegun Obasanjo. Though he did not prevail, his campaign was widely regarded as one of principle and intellectual substance.',
    ],
    pullQuote: {
      text: '“Governance is a calling, not a career. Those who treat it as a career will always disappoint the people they serve.”',
      attribution: 'Olu Falae',
      source: 'Interview, 2000',
    },
  },
  {
    slug: 'adebayo-adedeji',
    fullName: 'Adebayo Adedeji',
    shortName: 'Adebayo Adedeji',
    era: 'Independence',
    fields: ['Public Service', 'Academia'],
    meta: {
      schoolNumber: '489',
      set: 1951,
      distinctions: ['Executive Secretary, United Nations Economic Commission for Africa', 'CFR'],
    },
    heroTags: ['Public Service', 'Academia'],
    achievements: [
      { label: 'Executive Secretary, UN Economic Commission for Africa (1975–1991)' },
      { label: 'Federal Commissioner for Economic Development' },
      { label: 'Architect of the Lagos Plan of Action' },
      { label: 'Commander of the Federal Republic (CFR)' },
    ],
    bio: [
      'Adebayo Adedeji was born in 1930 in Ijebu-Ode, Ogun State. He attended Government College Ibadan where he was a member of Grier House, before proceeding to Leicester University and later Harvard University, where he earned advanced degrees in economics and public administration.',
      'He served as Nigeria’s Federal Commissioner for Economic Development and was among the principal architects of the country’s early national development plans. His work shaped the economic policy trajectory of a newly independent Nigeria.',
      'His most enduring contribution was as Executive Secretary of the United Nations Economic Commission for Africa, a position he held for sixteen years. In this role he championed African economic integration and was the driving force behind the Lagos Plan of Action, a seminal blueprint for African development.',
    ],
    pullQuote: {
      text: '“Africa’s development must be driven by Africans, designed for Africans, and measured by the wellbeing of African people.”',
      attribution: 'Adebayo Adedeji',
      source: 'Lagos Plan of Action, 1980',
    },
  },
];

export function getProfileBySlug(slug: string): Profile | undefined {
  return PROFILES.find((p) => p.slug === slug);
}

export function getAdjacentProfiles(slug: string): {
  prev: Profile | null;
  next: Profile | null;
} {
  const sorted = [...PROFILES].sort((a, b) =>
    a.fullName.split(' ').at(-1)!.localeCompare(b.fullName.split(' ').at(-1)!)
  );
  const idx = sorted.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? sorted[idx - 1] : null,
    next: idx < sorted.length - 1 ? sorted[idx + 1] : null,
  };
}

export function getProfilesSortedAlpha(): Profile[] {
  return [...PROFILES].sort((a, b) =>
    a.fullName.split(' ').at(-1)!.localeCompare(b.fullName.split(' ').at(-1)!)
  );
}
