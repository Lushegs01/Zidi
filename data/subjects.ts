export interface Subject {
  id: string
  name: string
  description: string
  status: 'live' | 'soon'
  emoji: string
  longDescription?: string
}

export const subjects: Subject[] = [
  {
    id: 'yoruba',
    name: 'Yoruba',
    description: 'One of the most widely spoken languages in Africa, with over 45 million native speakers across West Africa and the diaspora.',
    longDescription: 'Yoruba is the language of Southwest Nigeria, Benin, and Togo — and one of the most widely spoken African languages in the world. Whether your family roots are in Lagos, Ibadan, Abeokuta, or anywhere in the diaspora, Yoruba is a language worth protecting.',
    status: 'live',
    emoji: '🗣️',
  },
  {
    id: 'igbo',
    name: 'Igbo',
    description: 'A major language of Southeast Nigeria, spoken by millions across the country and throughout the global Igbo diaspora.',
    longDescription: 'Igbo is the language of Southeast Nigeria — a rich, tonal language with deep cultural resonance for millions of people across the world. Our tutors are native speakers who understand both the language and the culture.',
    status: 'live',
    emoji: '💬',
  },
  {
    id: 'hausa',
    name: 'Hausa',
    description: 'One of Nigeria\'s three major languages, spoken across northern Nigeria and West Africa.',
    status: 'soon',
    emoji: '🌍',
  },
  {
    id: 'french',
    name: 'French',
    description: 'The most widely spoken African language — official language of 21 African countries.',
    status: 'soon',
    emoji: '🇫🇷',
  },
  {
    id: 'piano',
    name: 'Piano',
    description: 'One-on-one piano lessons for children and adults, tailored to your pace and goals.',
    status: 'soon',
    emoji: '🎹',
  },
  {
    id: 'chess',
    name: 'Chess',
    description: 'Strategic thinking and chess fundamentals in a fun, focused learning environment.',
    status: 'soon',
    emoji: '♟️',
  },
  {
    id: 'african-dishes',
    name: 'African Dishes',
    description: 'Learn to cook authentic West African cuisine — from jollof to egusi and beyond.',
    status: 'soon',
    emoji: '🍲',
  },
]

export const liveSubjects = subjects.filter(s => s.status === 'live')
export const comingSoonSubjects = subjects.filter(s => s.status === 'soon')
