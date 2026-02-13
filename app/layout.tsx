import type { Metadata } from 'next'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
  adjustFontFallback: true,
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal'],
  variable: '--font-space-mono',
  display: 'swap',
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://arcab.com.br'),
  title: 'ARCAB TECH | Inteligência de Dados & Engenharia de Software',
  description: 'Soluções em Análise Preditiva, Dashboards, Web Scraping e Desenvolvimento Web.',
  keywords: ['análise de dados', 'desenvolvimento web', 'dashboards', 'web scraping', 'engenharia de software'],
  authors: [{ name: 'ARCAB' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ARCAB TECH | Inteligência de Dados & Engenharia de Software',
    description: 'Soluções em Análise Preditiva, Dashboards, Web Scraping e Desenvolvimento Web.',
    url: 'https://arcab.com.br',
    siteName: 'ARCAB TECH',
    images: [
      {
        url: '/assets/logo.svg',
        width: 148,
        height: 148,
        alt: 'ARCAB TECH Logo',
      },
    ],
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary',
    title: 'ARCAB TECH | Inteligência de Dados & Engenharia de Software',
    description: 'Soluções em Análise Preditiva, Dashboards, Web Scraping e Desenvolvimento Web.',
    images: ['/assets/logo.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/assets/logo.svg', type: 'image/svg+xml', sizes: 'any' },
    ],
    shortcut: '/assets/logo.svg',
    apple: '/assets/logo.svg',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://arcab.com.br/#organization',
      name: 'ARCAB TECH',
      url: 'https://arcab.com.br',
      logo: {
        '@type': 'ImageObject',
        url: 'https://arcab.com.br/assets/logo.svg',
      },
      description: 'Soluções em Análise Preditiva, Dashboards, Web Scraping e Desenvolvimento Web.',
      sameAs: [
        'https://github.com/ARCABTECH',
        'https://www.linkedin.com/company/arcab-tech',
        'https://www.instagram.com/arcabtech/',
        'https://x.com/ARCABTECH',
        'https://www.youtube.com/@arcabtech',
        'https://www.tiktok.com/@arcab.tech',
        'https://www.threads.com/@arcabtech',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'contato@arcab.com.br',
        contactType: 'customer service',
        availableLanguage: 'Portuguese',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Goiânia',
        addressCountry: 'BR',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://arcab.com.br/#website',
      url: 'https://arcab.com.br',
      name: 'ARCAB TECH',
      description: 'Inteligência de Dados & Engenharia de Software',
      publisher: {
        '@id': 'https://arcab.com.br/#organization',
      },
      inLanguage: 'pt-BR',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans selection:bg-eco-accent text-eco-dark bg-eco-base overflow-x-hidden cursor-none">
        {children}
      </body>
    </html>
  )
}
