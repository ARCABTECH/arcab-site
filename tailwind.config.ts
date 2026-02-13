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
      backgroundImage: {},
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
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
}
export default config
