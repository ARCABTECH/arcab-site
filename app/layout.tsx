import type { Metadata } from 'next'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ARCAB | Estruturas Digitais',
  description: 'Soluções em Análise Preditiva, Dashboards, Web Scraping e Desenvolvimento Web.',
  keywords: ['análise de dados', 'desenvolvimento web', 'dashboards', 'web scraping', 'engenharia de software'],
  authors: [{ name: 'ARCAB' }],
  openGraph: {
    title: 'ARCAB | Estruturas Digitais',
    description: 'Soluções em Análise Preditiva, Dashboards, Web Scraping e Desenvolvimento Web.',
    type: 'website',
    locale: 'pt_BR',
  },
  icons: {
    icon: [
      { url: '/assets/logo.svg', type: 'image/svg+xml', sizes: 'any' },
    ],
    shortcut: '/assets/logo.svg',
    apple: '/assets/logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body className="font-sans selection:bg-eco-accent text-eco-dark bg-eco-base overflow-x-hidden cursor-none">
        <div className="bg-noise"></div>
        {children}
      </body>
    </html>
  )
}
