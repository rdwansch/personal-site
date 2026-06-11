import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        surface:  'var(--color-surface)',
        raised:   'var(--color-surface-raised)',
        fg:       'var(--color-fg)',
        'fg-secondary': 'var(--color-fg-secondary)',
        'fg-tertiary':  'var(--color-fg-tertiary)',
        accent:   'var(--color-accent)',
        teal:     'var(--color-accent-teal)',
        border:   'var(--color-border)',
        // keep brand.* aliases for legacy component usage
        brand: {
          base:             'var(--color-surface)',
          dark:             'var(--color-fg)',
          violet:           'var(--color-accent)',
          teal:             'var(--color-accent-teal)',
          'text-primary':   'var(--color-fg)',
          'text-secondary': 'var(--color-fg-secondary)',
          'text-tertiary':  'var(--color-fg-tertiary)',
          border:           'var(--color-border)',
        },
      },
      fontFamily: {
        sans:        ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
        display:     ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
        body:        ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
        preahvihear: ['Preahvihear', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      animation: {
        'fade-up':    'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':    'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'stagger':    'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float':      'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-16px)' },
        },
      },
      transitionTimingFunction: {
        'out-back':  'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'out-quart': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'out-expo':  'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
} satisfies Config
