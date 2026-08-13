import type { Metadata } from 'next'
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-fraunces',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Learn with Zidi — African Language Tutors Online | Yoruba & Igbo',
  description:
    'Connect with vetted tutors for Yoruba, Igbo, and African language lessons online. Personalized 1-on-1 and group sessions for children and adults in your timezone. Join today.',
  keywords: [
    'Yoruba classes online',
    'Igbo classes online',
    'African language tutoring',
    'Yoruba lessons for children',
    'heritage language learning',
    'African language tutors',
    'online Yoruba tutor',
    'online Igbo tutor',
    'diaspora language learning',
  ],
  openGraph: {
    title: 'Learn with Zidi — African Language Tutors Online',
    description:
      'Vetted tutors for Yoruba, Igbo, and more. Personalized online sessions for diaspora families. Match within 24 hours.',
    url: 'https://www.learnwithzidi.com',
    siteName: 'Learn with Zidi',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: 'https://images.pexels.com/photos/6550044/pexels-photo-6550044.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
        alt: 'Learn with Zidi — African Language Tutors Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn with Zidi — African Language Tutors Online',
    description: 'Vetted tutors for Yoruba, Igbo, and more. Personalized online sessions for diaspora families.',
    images: ['https://images.pexels.com/photos/6550044/pexels-photo-6550044.jpeg?auto=compress&cs=tinysrgb&w=1200'],
  },
  metadataBase: new URL('https://www.learnwithzidi.com'),
  alternates: {
    canonical: 'https://www.learnwithzidi.com',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="font-body bg-ivory text-zidi-text overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  )
}
