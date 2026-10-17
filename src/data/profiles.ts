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
      { label: 'University of Ibadan Alumni' },
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
];
