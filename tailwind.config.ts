import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0E1623',
        'midnight-2': '#1A2540',
        gold: {
          DEFAULT: '#C98A00',
          bright: '#E5A800',
          pale: 'rgba(201,138,0,0.12)',
        },
        ivory: {
          DEFAULT: '#F8F4ED',
          dark: '#EDE8DF',
        },
        forest: '#1A4731',
        coral: '#D94F1E',
        zidi: {
          text: '#1A1A2E',
          muted: '#6B6B7E',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.8rem, 6vw, 5.5rem)', { lineHeight: '1.04', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        'content': '1120px',
      },
      borderRadius: {
        'card': '12px',
      },
      animation: {
        'ticker': 'ticker 40s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        ticker: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'stripe-ankara': `repeating-linear-gradient(
          180deg,
          #C98A00 0px, #C98A00 20px,
          #D94F1E 20px, #D94F1E 40px,
          #1A4731 40px, #1A4731 60px,
          transparent 60px, transparent 70px
        )`,
      },
    },
  },
  plugins: [],
}

export default config
