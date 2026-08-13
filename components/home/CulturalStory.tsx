'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1], delay },
  }),
}

const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const fadeRight = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: [0.25, 0.1, 0.25, 1], delay: 0.25 },
  },
}

export default function CulturalStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      className="bg-midnight relative overflow-hidden"
      aria-labelledby="cultural-story-heading"
    >
      {/* Subtle background texture — thin radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 40%, rgba(201,138,0,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-10 py-24 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT: Editorial text */}
          <div className="flex flex-col justify-center lg:py-8 lg:pr-4">
            {/* Eyebrow */}
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="font-body text-sm font-semibold tracking-[0.18em] uppercase text-gold mb-5"
            >
              Why Zidi exists
            </motion.p>

            {/* Heading */}
            <motion.h2
              id="cultural-story-heading"
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="font-display text-white mb-8 leading-[1.05] tracking-[-0.025em]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              Language is more
              <br />
              than words.
            </motion.h2>

            {/* Gold rule */}
            <motion.div
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              aria-hidden="true"
              className="w-12 h-px bg-gold mb-10"
            />

            {/* Body paragraphs */}
            <div className="space-y-5">
              {[
                {
                  text: 'It is how your grandmother calls you home. How your father taught you to greet an elder. How your culture lives in you \u2014 even when you live far from where it began.',
                  highlight: false,
                },
                {
                  text: 'For many families in the diaspora, the language was the first thing to slip away. Not lost overnight. Just quietly left behind, one generation at a time.',
                  highlight: false,
                },
                {
                  text: 'Zidi exists to help you bring it back.',
                  highlight: true,
                },
                {
                  text: 'We connect families with tutors who don\u2019t just teach language \u2014 they teach it with care, with context, with cultural understanding. Because learning Yoruba or Igbo isn\u2019t just about vocabulary. It\u2019s about belonging.',
                  highlight: false,
                },
              ].map((paragraph, i) => (
                <motion.p
                  key={i}
                  custom={0.25 + i * 0.1}
                  variants={fadeUp}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className={`font-body leading-relaxed ${
                    paragraph.highlight
                      ? 'text-white font-semibold text-lg'
                      : 'text-white/60 text-base'
                  }`}
                >
                  {paragraph.text}
                </motion.p>
              ))}
            </div>
          </div>

          {/* RIGHT: Image composition */}
          <div className="relative h-[540px] sm:h-[640px] lg:h-[700px] lg:pb-16">

            {/* Main large image */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="absolute inset-0 bottom-20"
            >
              <div className="relative w-full h-full rounded-card overflow-hidden shadow-xl">
                <Image
                  src="https://images.pexels.com/photos/8535236/pexels-photo-8535236.jpeg"
                  alt="A grandmother smiling warmly with her grandchild"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                  priority
                />
                {/* Subtle dark vignette at base */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(14,22,35,0.35) 0%, transparent 50%)',
                  }}
                />
              </div>
            </motion.div>

            {/* Gold horizontal accent line */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              aria-hidden="true"
              className="absolute left-0 w-20 h-0.5 bg-gold"
              style={{ bottom: 'calc(20% + 4px)' }}
            />

            {/* Floating smaller image */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="absolute bottom-0 right-0 w-48 sm:w-56 lg:w-60"
              style={{ zIndex: 10 }}
            >
              <div
                className="relative w-full rounded-card overflow-hidden shadow-2xl"
                style={{
                  aspectRatio: '4/3',
                  border: '3px solid #C98A00',
                }}
              >
                <Image
                  src="https://images.pexels.com/photos/7869491/pexels-photo-7869491.jpeg"
                  alt="A family learning together at home"
                  fill
                  sizes="240px"
                  className="object-cover object-center"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
