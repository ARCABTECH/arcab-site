import { 
  LineChart, 
  LayoutDashboard, 
  Database, 
  MessageSquareText, 
  Filter, 
  AppWindow, 
  Server, 
  Webhook, 
  Binary, 
  Workflow, 
  Briefcase 
} from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: 'Dados' | 'Desenvolvimento';
}

export const servicesData: ServiceItem[] = [
  {
    id: 'preditiva',
    title: 'Análise Preditiva',
    description: 'Antecipe tendências e comportamentos futuros com modelos estatísticos avançados.',
    icon: LineChart,
    category: 'Dados'
  },
  {
    id: 'dashboards',
    title: 'Dashboards Interativos',
    description: 'Visualização de dados em tempo real para tomada de decisão ágil e precisa.',
    icon: LayoutDashboard,
    category: 'Dados'
  },
  {
    id: 'scraping',
    title: 'Web Scraping',
    description: 'Raspagem de dados automatizada para coleta de informações estratégicas da web.',
    icon: Database,
    category: 'Dados'
  },
  {
    id: 'nlp',
    title: 'NLP & IA',
    description: 'Processamento de linguagem natural para análise de sentimentos e automação de texto.',
    icon: MessageSquareText,
    category: 'Dados'
  },
  {
    id: 'etl',
    title: 'ETL & Limpeza',
    description: 'Pipelines robustos de extração, transformação e carregamento de dados estruturados.',
    icon: Filter,
    category: 'Dados'
  },
  {
    id: 'landing',
    title: 'Landing Pages',
    description: 'Páginas de alta conversão com design moderno e otimização de performance.',
    icon: AppWindow,
    category: 'Desenvolvimento'
  },
  {
    id: 'sistemas',
    title: 'Sistemas Web (SaaS)',
    description: 'Desenvolvimento de ERPs, CRMs e plataformas personalizadas para o seu negócio.',
    icon: Server,
    category: 'Desenvolvimento'
  },
  {
    id: 'api',
    title: 'APIs Rest & GraphQL',
    description: 'Construção de interfaces de programação seguras e escaláveis para integração.',
    icon: Webhook,
    category: 'Desenvolvimento'
  },
  {
    id: 'webapps',
    title: 'Web Apps de Dados',
    description: 'Aplicações focadas na manipulação e visualização complexa de grandes volumes de dados.',
    icon: Binary,
    category: 'Desenvolvimento'
  },
  {
    id: 'rpa',
    title: 'Automação (RPA)',
    description: 'Robôs de software para automatizar tarefas repetitivas e aumentar a produtividade.',
    icon: Workflow,
    category: 'Desenvolvimento'
  },
  {
    id: 'consultoria',
    title: 'Consultoria de Dados',
    description: 'Planejamento estratégico de arquitetura de dados e governança corporativa.',
    icon: Briefcase,
    category: 'Dados'
  },
];