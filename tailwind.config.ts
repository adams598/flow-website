import type { Config } from 'tailwindcss'

const withAlpha = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: withAlpha('--color-background'),
        'outline-variant': withAlpha('--color-outline-variant'),
        'surface-bright': withAlpha('--color-surface-bright'),
        'on-secondary-fixed': withAlpha('--color-on-secondary-fixed'),
        'primary-container': withAlpha('--color-primary-container'),
        secondary: withAlpha('--color-secondary'),
        primary: withAlpha('--color-primary'),
        'on-surface': withAlpha('--color-on-surface'),
        'on-error-container': withAlpha('--color-on-error-container'),
        'inverse-on-surface': withAlpha('--color-inverse-on-surface'),
        'surface-container-lowest': withAlpha('--color-surface-container-lowest'),
        'error-container': withAlpha('--color-error-container'),
        'on-background': withAlpha('--color-on-background'),
        'on-tertiary': withAlpha('--color-on-tertiary'),
        'on-tertiary-container': withAlpha('--color-on-tertiary-container'),
        error: withAlpha('--color-error'),
        'surface-container': withAlpha('--color-surface-container'),
        surface: withAlpha('--color-surface'),
        'on-secondary-container': withAlpha('--color-on-secondary-container'),
        'primary-fixed-dim': withAlpha('--color-primary-fixed-dim'),
        'inverse-primary': withAlpha('--color-inverse-primary'),
        'on-tertiary-fixed-variant': withAlpha('--color-on-tertiary-fixed-variant'),
        'on-primary': withAlpha('--color-on-primary'),
        'inverse-surface': withAlpha('--color-inverse-surface'),
        tertiary: withAlpha('--color-tertiary'),
        'on-primary-fixed-variant': withAlpha('--color-on-primary-fixed-variant'),
        'secondary-fixed': withAlpha('--color-secondary-fixed'),
        'surface-container-low': withAlpha('--color-surface-container-low'),
        'on-tertiary-fixed': withAlpha('--color-on-tertiary-fixed'),
        'on-primary-container': withAlpha('--color-on-primary-container'),
        'on-secondary-fixed-variant': withAlpha('--color-on-secondary-fixed-variant'),
        'surface-variant': withAlpha('--color-surface-variant'),
        'surface-dim': withAlpha('--color-surface-dim'),
        'tertiary-fixed': withAlpha('--color-tertiary-fixed'),
        'surface-tint': withAlpha('--color-surface-tint'),
        'on-error': withAlpha('--color-on-error'),
        'secondary-container': withAlpha('--color-secondary-container'),
        'on-secondary': withAlpha('--color-on-secondary'),
        'tertiary-fixed-dim': withAlpha('--color-tertiary-fixed-dim'),
        'on-surface-variant': withAlpha('--color-on-surface-variant'),
        'on-primary-fixed': withAlpha('--color-on-primary-fixed'),
        'tertiary-container': withAlpha('--color-tertiary-container'),
        'surface-container-high': withAlpha('--color-surface-container-high'),
        outline: withAlpha('--color-outline'),
        'surface-container-highest': withAlpha('--color-surface-container-highest'),
        'primary-fixed': withAlpha('--color-primary-fixed'),
        'secondary-fixed-dim': withAlpha('--color-secondary-fixed-dim'),
      },
      borderRadius: {
        sm: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem',
      },
      fontFamily: {
        headline: ['var(--font-manrope)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        label: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
