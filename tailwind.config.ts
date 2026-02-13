import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#dc2626', // Red
        secondary: '#000000', // Black
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#dc2626',
          secondary: '#000000',
          accent: '#37cdbe',
          neutral: '#3d4451',
          'base-100': '#ffffff',
          'base-200': '#f2f2f2',
          'base-300': '#e5e5e5',
          info: '#3b82f6',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
        },
      },
    ],
    darkMode: 'class',
    styled: true,
    base: true,
    utils: true,
  },
  plugins: [require('daisyui')],
}

export default config
