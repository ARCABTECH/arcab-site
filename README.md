# ARCAB | Estruturas Digitais

Site institucional da ARCAB - Soluções em Análise Preditiva, Dashboards, Web Scraping e Desenvolvimento Web.

## Stack Tecnológica

- **Framework**: Next.js 16+ (App Router)
- **React**: 19.2.3
- **TypeScript**: 5.8.2
- **Estilização**: Tailwind CSS 3.4+
- **Ícones**: Lucide React

## Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente (opcional):
```bash
cp .env.local.example .env.local
# Edite .env.local com suas chaves de API se necessário
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia o servidor de produção (após build)
- `npm run lint` - Executa o linter

## Estrutura do Projeto

```
arcab-site/
├── app/                    # App Router do Next.js
│   ├── layout.tsx         # Layout raiz com metadata e fontes
│   ├── page.tsx           # Página principal
│   ├── globals.css        # Estilos globais
│   └── api/               # API Routes
│       └── contact/       # Endpoint do formulário de contato
├── components/             # Componentes React
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── SystemLog.tsx
│   ├── TechMarquee.tsx
│   └── ui/                # Componentes UI reutilizáveis
├── data/                   # Dados estáticos
│   └── servicesData.ts
└── public/                 # Assets estáticos
```

## Características

- **Design Brutalista**: Interface moderna com estética brutalista
- **Cursor Customizado**: Cursor personalizado para desktop
- **Animações**: Scroll reveal e animações suaves
- **Responsivo**: Totalmente responsivo para mobile e desktop
- **SEO Otimizado**: Metadata completa e SSR do Next.js
- **Performance**: Otimizações automáticas do Next.js

## Deploy

O projeto está pronto para deploy em plataformas como:
- [Vercel](https://vercel.com) (recomendado para Next.js)
- [Netlify](https://netlify.com)
- Qualquer plataforma que suporte Next.js

## Desenvolvimento

Este projeto foi migrado de Vite + React para Next.js seguindo as melhores práticas:
- App Router do Next.js 16+
- Server Components por padrão
- Client Components apenas quando necessário
- Otimização de fontes com `next/font`
- API Routes para backend

## Licença

Privado - ARCAB
