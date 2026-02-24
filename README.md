# ARCAB TECH

Site institucional da ARCAB TECH - Soluções em Análise Preditiva, Dashboards, Web Scraping e Desenvolvimento Web.

## Stack Tecnológica

- **Framework**: Next.js 16+ (App Router)
- **React**: 19.2.3
- **TypeScript**: 5.8.2
- **Estilização**: Tailwind CSS 3.4+
- **Ícones**: Lucide React

## Pré-requisitos

- Node.js 20+
- npm

## Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente (opcional):
```bash
cp .env.example .env.local
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
│   ├── sitemap.ts         # Sitemap automático (gerado no build)
│   └── globals.css        # Estilos globais
├── components/             # Componentes React
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── PurposeSection.tsx
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
- **SEO Otimizado**: Metadata completa, JSON-LD, robots e sitemap
- **Build Estático**: Export para GitHub Pages com `output: 'export'`
- **Performance**: Otimizações para Core Web Vitals

## Deploy

### GitHub Pages (Configurado)

O projeto está configurado para deploy automático no GitHub Pages com domínio customizado `arcab.com.br` usando export estático do Next.js.

**Deploy Automatizado:**
- Push para branch `main` aciona o workflow automaticamente
- Build e deploy são feitos via GitHub Actions
- Site publicado em: https://arcab.com.br

**Configuração:**
1. O workflow está em `.github/workflows/deploy.yml`
2. Custom domain configurado via `public/CNAME`

## Licença

Privado - ARCAB
