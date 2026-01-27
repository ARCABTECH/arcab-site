import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      colors: {
        eco: {
          base: '#FAFAF9', // Stone 50
          dark: '#0C0A09', // Stone 950
          primary: '#059669', // Emerald 600
          accent: '#84CC16', // Lime 500
          deep: '#022C22', // Emerald 950
          surface: '#FFFFFF',
        }
      },
      boxShadow: {
        'sharp': '3px 3px 0px 0px #0C0A09',
        'sharp-hover': '1px 1px 0px 0px #0C0A09',
        'sharp-lg': '6px 6px 0px 0px #0C0A09',
      },
      borderWidth: {
        '1': '1px',
      },
      backgroundImage: {
        'noise': "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')",
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'scan': 'scan 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        scan: {
          '0%, 100%': { top: '0%' },
          '50%': { top: '100%' },
        }
      }
    },
  },
  plugins: [],
}
export default config
