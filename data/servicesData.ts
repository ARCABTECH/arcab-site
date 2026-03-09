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
      { name: 'Web Scraping', icon: Database },
      { name: 'ETL / Pipeline de Dados', icon: Filter },
      { name: 'Data Strategy / Consultoria em Dados', icon: Briefcase },
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
      { name: 'Dashboards / BI', icon: LayoutDashboard },
      { name: 'NLP & IA Aplicada', icon: MessageSquareText },
      { name: 'Análise Preditiva', icon: LineChart },
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
      { name: 'Desenvolvimento de SaaS', icon: Server },
      { name: 'Desenvolvimento de APIs', icon: Webhook },
      { name: 'Web Apps / Portal Web', icon: Binary },
      { name: 'Automação / RPA', icon: Workflow },
      { name: 'Landing Pages', icon: AppWindow },
      { name: 'Sistema Sob Medida', icon: MonitorCog },
    ],
  },
];
