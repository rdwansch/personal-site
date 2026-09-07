import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

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
        sans:    ['Archivo', 'Arial Narrow', 'sans-serif'],
        display: ['Archivo', 'Arial Narrow', 'sans-serif'],
        body:    ['Archivo', 'Arial Narrow', 'sans-serif'],
        mono:    ['Fragment Mono', 'Courier New', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [typography],
} satisfies Config
