import { 
  Database, 
  Filter, 
  Briefcase,
  LayoutDashboard, 
  MessageSquareText, 
  LineChart,
  Server, 
  Webhook, 
  Binary, 
  Workflow, 
  AppWindow,
  MonitorCog,
  Layers,
  Brain,
  Terminal,
  type LucideIcon,
} from 'lucide-react';

export interface SubService {
  id: string;
  name: string;
  icon: LucideIcon;
}

export interface PillarItem {
  id: string;
  pillarName: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  services: SubService[];
}

export const pillarsData: PillarItem[] = [
  {
    id: 'engenharia-dados',
    pillarName: 'A BASE',
    title: 'Engenharia de Dados',
    subtitle: 'Onde o dado nasce.',
    description: 'Coleta, tratamento e estruturação dos dados brutos. Pipelines robustos, governança e arquitetura de dados do zero.',
    icon: Layers,
    services: [
      { id: 'web-scraping', name: 'Web Scraping', icon: Database },
      { id: 'etl-pipeline', name: 'ETL / Pipeline de Dados', icon: Filter },
      { id: 'data-strategy', name: 'Data Strategy / Consultoria em Dados', icon: Briefcase },
    ],
  },
  {
    id: 'inteligencia-dados',
    pillarName: 'O CÉREBRO',
    title: 'Inteligência de Dados',
    subtitle: 'O que o dado diz.',
    description: 'Transformamos dados em decisões. Visualização em tempo real, modelos preditivos e processamento de linguagem natural.',
    icon: Brain,
    services: [
      { id: 'dashboard-bi', name: 'Dashboards / BI', icon: LayoutDashboard },
      { id: 'nlp-ia', name: 'NLP & IA Aplicada', icon: MessageSquareText },
      { id: 'predictive-analysis', name: 'Análise Preditiva', icon: LineChart },
    ],
  },
  {
    id: 'engenharia-software',
    pillarName: 'O CORPO',
    title: 'Engenharia de Software',
    subtitle: 'Onde o dado trabalha.',
    description: 'Software sob medida que operacionaliza os dados. ERPs, plataformas SaaS, APIs escaláveis e automação de processos.',
    icon: Terminal,
    services: [
      { id: 'saas-development', name: 'Desenvolvimento de SaaS', icon: Server },
      { id: 'api-development', name: 'Desenvolvimento de APIs', icon: Webhook },
      { id: 'web-apps', name: 'Web Apps / Portal Web', icon: Binary },
      { id: 'automation-rpa', name: 'Automação / RPA', icon: Workflow },
      { id: 'landing-pages', name: 'Landing Pages', icon: AppWindow },
      { id: 'custom-system', name: 'Sistema Sob Medida', icon: MonitorCog },
    ],
  },
];
