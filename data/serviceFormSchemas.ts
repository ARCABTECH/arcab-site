export type MainAreaId =
  | 'engenharia-dados'
  | 'inteligencia-dados'
  | 'engenharia-software'
  | 'outro';

export type FieldType = 'text' | 'textarea' | 'single-select' | 'multi-select';

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldCondition {
  fieldId: string;
  equals: string;
}

export interface DynamicFieldSchema {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: FieldOption[];
  condition?: FieldCondition;
}

export interface SubServiceSchema {
  id: string;
  label: string;
  area: Exclude<MainAreaId, 'outro'>;
  description: string;
  fields: DynamicFieldSchema[];
}

export const MAIN_AREAS: Array<{ value: MainAreaId; label: string; hint: string }> = [
  { value: 'engenharia-dados', label: 'Engenharia de Dados', hint: 'Scraping, ETL, Data Strategy' },
  { value: 'inteligencia-dados', label: 'Inteligência de Dados', hint: 'BI, IA aplicada, Preditiva' },
  { value: 'engenharia-software', label: 'Engenharia de Software', hint: 'SaaS, APIs, Web Apps, RPA' },
  { value: 'outro', label: 'Outro tipo de serviço', hint: 'Projeto fora do catálogo atual' },
];

const PRAZO_OPTIONS: FieldOption[] = [
  { value: 'urgente', label: 'Urgente' },
  { value: 'curto-prazo', label: 'Curto prazo' },
  { value: 'padrao', label: 'Padrão' },
  { value: 'flexivel', label: 'Flexível' },
];

const ORCAMENTO_OPTIONS: FieldOption[] = [
  { value: 'ate-5k', label: 'Até R$5.000' },
  { value: '5k-20k', label: 'R$5.000 - R$20.000' },
  { value: '20k-50k', label: 'R$20.000 - R$50.000' },
  { value: '50k+', label: 'Acima de R$50.000' },
  { value: 'a-definir', label: 'Prefiro discutir' },
];

export const OTHER_SERVICE_FIELDS: DynamicFieldSchema[] = [
  {
    id: 'outro_tipo_projeto',
    label: 'Que tipo de projeto você precisa?',
    type: 'text',
    required: true,
    placeholder: 'Ex.: Integração com hardware, consultoria técnica...',
  },
  {
    id: 'outro_objetivo',
    label: 'Qual o objetivo principal?',
    type: 'textarea',
    required: true,
    placeholder: 'Descreva o resultado esperado para o negócio.',
  },
  {
    id: 'outro_contexto_atual',
    label: 'Contexto atual',
    type: 'textarea',
    placeholder: 'Como o processo funciona hoje e onde está a principal dor.',
  },
  {
    id: 'outro_prazo',
    label: 'Prazo desejado',
    type: 'single-select',
    required: true,
    options: PRAZO_OPTIONS,
  },
  {
    id: 'outro_orcamento',
    label: 'Faixa de investimento',
    type: 'single-select',
    options: ORCAMENTO_OPTIONS,
  },
  {
    id: 'outro_infos_adicionais',
    label: 'Informações adicionais',
    type: 'textarea',
    placeholder: 'Inclua restrições, referências e expectativas.',
  },
];

export const SUB_SERVICE_SCHEMAS: SubServiceSchema[] = [
  {
    id: 'web-scraping',
    label: 'Web Scraping',
    area: 'engenharia-dados',
    description: 'Extração automatizada de dados de sites e portais.',
    fields: [
      {
        id: 'scraping_objetivo',
        label: 'Objetivo principal da coleta',
        type: 'single-select',
        required: true,
        options: [
          { value: 'pesquisa-mercado', label: 'Pesquisa de mercado' },
          { value: 'monitoramento-precos', label: 'Monitoramento de preços' },
          { value: 'geracao-leads', label: 'Geração de leads' },
          { value: 'analise-concorrentes', label: 'Análise de concorrentes' },
          { value: 'base-dados', label: 'Construção de base de dados' },
          { value: 'outro', label: 'Outro' },
        ],
      },
      { id: 'scraping_site_principal', label: 'URL principal para coleta', type: 'text', required: true, placeholder: 'https://exemplo.com' },
      { id: 'scraping_paginas', label: 'Páginas ou seções alvo', type: 'textarea', required: true, placeholder: 'Liste URLs ou padrões de páginas.' },
      {
        id: 'scraping_campos',
        label: 'Dados que precisam ser extraídos',
        type: 'textarea',
        required: true,
        placeholder: 'Ex.: nome, preço, categoria, link, avaliação.',
      },
      {
        id: 'scraping_frequencia',
        label: 'Frequência da coleta',
        type: 'single-select',
        required: true,
        options: [
          { value: 'unica', label: 'Coleta única' },
          { value: 'diaria', label: 'Diária' },
          { value: 'semanal', label: 'Semanal' },
          { value: 'mensal', label: 'Mensal' },
          { value: 'tempo-real', label: 'Monitoramento contínuo' },
        ],
      },
      {
        id: 'scraping_entrega',
        label: 'Formato de entrega',
        type: 'multi-select',
        required: true,
        options: [
          { value: 'excel', label: 'Excel' },
          { value: 'csv', label: 'CSV' },
          { value: 'json', label: 'JSON' },
          { value: 'api', label: 'API' },
          { value: 'google-sheets', label: 'Google Sheets' },
          { value: 'database', label: 'Banco de dados' },
        ],
      },
      { id: 'scraping_prazo', label: 'Prazo desejado', type: 'single-select', required: true, options: PRAZO_OPTIONS },
      { id: 'scraping_orcamento', label: 'Faixa de investimento', type: 'single-select', options: ORCAMENTO_OPTIONS },
    ],
  },
  {
    id: 'etl-pipeline',
    label: 'ETL / Pipeline de Dados',
    area: 'engenharia-dados',
    description: 'Extração, transformação e carga para consolidar dados.',
    fields: [
      {
        id: 'etl_objetivo',
        label: 'Objetivo do pipeline',
        type: 'single-select',
        required: true,
        options: [
          { value: 'consolidacao', label: 'Consolidar múltiplas fontes' },
          { value: 'base-bi', label: 'Base para BI / dashboards' },
          { value: 'automatizar-relatorios', label: 'Automatizar relatórios' },
          { value: 'integracao-sistemas', label: 'Integração entre sistemas' },
          { value: 'data-warehouse', label: 'Data warehouse' },
        ],
      },
      { id: 'etl_fontes', label: 'Fontes de dados envolvidas', type: 'multi-select', required: true, options: [
        { value: 'api', label: 'API' },
        { value: 'database', label: 'Banco de dados' },
        { value: 'planilhas', label: 'Planilhas/arquivos' },
        { value: 'crm', label: 'CRM' },
        { value: 'erp', label: 'ERP' },
        { value: 'web-scraping', label: 'Web scraping' },
      ]},
      { id: 'etl_fontes_especificas', label: 'Ferramentas/fontes específicas', type: 'text', placeholder: 'Ex.: HubSpot, Salesforce, PostgreSQL...' },
      {
        id: 'etl_transformacoes',
        label: 'Transformações necessárias',
        type: 'multi-select',
        required: true,
        options: [
          { value: 'limpeza', label: 'Limpeza de dados' },
          { value: 'deduplicacao', label: 'Remoção de duplicados' },
          { value: 'normalizacao', label: 'Normalização de campos' },
          { value: 'agregacao', label: 'Agregações e métricas' },
          { value: 'join-fontes', label: 'Junção de múltiplas fontes' },
        ],
      },
      { id: 'etl_destino', label: 'Destino dos dados', type: 'multi-select', required: true, options: [
        { value: 'database', label: 'Banco de dados' },
        { value: 'dwh', label: 'Data warehouse' },
        { value: 'bi', label: 'Dashboard BI' },
        { value: 'sheets', label: 'Planilhas' },
        { value: 'api', label: 'API' },
      ]},
      { id: 'etl_frequencia_execucao', label: 'Frequência de execução', type: 'single-select', required: true, options: [
        { value: 'hora', label: 'A cada hora' },
        { value: 'diario', label: 'Diário' },
        { value: 'semanal', label: 'Semanal' },
        { value: 'mensal', label: 'Mensal' },
        { value: 'sob-demanda', label: 'Sob demanda' },
      ]},
      {
        id: 'etl_dados_sensiveis',
        label: 'Dados sensíveis envolvidos?',
        type: 'single-select',
        required: true,
        options: [
          { value: 'nao', label: 'Não' },
          { value: 'sim', label: 'Sim' },
        ],
      },
      {
        id: 'etl_compliance',
        label: 'Compliance exigido',
        type: 'multi-select',
        condition: { fieldId: 'etl_dados_sensiveis', equals: 'sim' },
        options: [
          { value: 'lgpd', label: 'LGPD' },
          { value: 'gdpr', label: 'GDPR' },
          { value: 'outro', label: 'Outro' },
        ],
      },
      { id: 'etl_prazo', label: 'Prazo desejado', type: 'single-select', required: true, options: PRAZO_OPTIONS },
      { id: 'etl_orcamento', label: 'Faixa de investimento', type: 'single-select', options: ORCAMENTO_OPTIONS },
    ],
  },
  {
    id: 'data-strategy',
    label: 'Data Strategy / Consultoria em Dados',
    area: 'engenharia-dados',
    description: 'Diagnóstico, estratégia e plano de evolução de dados.',
    fields: [
      {
        id: 'strategy_objetivo',
        label: 'Objetivo principal da consultoria',
        type: 'multi-select',
        required: true,
        options: [
          { value: 'estruturar-area', label: 'Estruturar área de dados' },
          { value: 'tomada-decisao', label: 'Melhorar tomada de decisão' },
          { value: 'organizar-bases', label: 'Organizar bases de dados' },
          { value: 'cultura-data', label: 'Implantar cultura data-driven' },
          { value: 'arquitetura', label: 'Construir arquitetura de dados' },
        ],
      },
      { id: 'strategy_desafio', label: 'Desafio atual', type: 'textarea', required: true, placeholder: 'Descreva as dores atuais com dados.' },
      {
        id: 'strategy_armazenamento_atual',
        label: 'Como os dados estão hoje',
        type: 'multi-select',
        required: true,
        options: [
          { value: 'planilhas', label: 'Planilhas' },
          { value: 'db', label: 'Banco de dados' },
          { value: 'saas', label: 'Sistemas SaaS' },
          { value: 'dwh', label: 'Data warehouse' },
          { value: 'desorganizado', label: 'Sem organização clara' },
        ],
      },
      {
        id: 'strategy_dificuldades',
        label: 'Principais dificuldades',
        type: 'multi-select',
        required: true,
        options: [
          { value: 'dados-desorganizados', label: 'Dados desorganizados' },
          { value: 'dados-inconsistentes', label: 'Dados inconsistentes' },
          { value: 'integracao-sistemas', label: 'Integração entre sistemas' },
          { value: 'falta-dashboard', label: 'Falta de dashboards' },
          { value: 'baixa-qualidade', label: 'Baixa qualidade dos dados' },
          { value: 'sem-estrategia', label: 'Falta de estratégia de dados' },
        ],
      },
      {
        id: 'strategy_resultados',
        label: 'Resultados esperados',
        type: 'textarea',
        required: true,
        placeholder: 'Ex.: pipeline estruturado, KPIs claros, dashboards automatizados.',
      },
      { id: 'strategy_prazo', label: 'Prazo para iniciar', type: 'single-select', required: true, options: [
        { value: 'imediato', label: 'Imediato' },
        { value: '1-3-meses', label: '1-3 meses' },
        { value: '3-6-meses', label: '3-6 meses' },
        { value: 'explorando', label: 'Apenas explorando opções' },
      ]},
      { id: 'strategy_orcamento', label: 'Faixa de investimento', type: 'single-select', options: ORCAMENTO_OPTIONS },
    ],
  },
  {
    id: 'dashboard-bi',
    label: 'Dashboards / BI',
    area: 'inteligencia-dados',
    description: 'Construção de painéis com indicadores e visualização de dados.',
    fields: [
      {
        id: 'bi_objetivo',
        label: 'Objetivo principal do dashboard',
        type: 'single-select',
        required: true,
        options: [
          { value: 'vendas', label: 'Monitorar vendas' },
          { value: 'marketing', label: 'Acompanhar marketing' },
          { value: 'financeiro', label: 'Gestão financeira' },
          { value: 'operacoes', label: 'Acompanhamento de operações' },
          { value: 'kpis-estrategicos', label: 'Indicadores estratégicos' },
        ],
      },
      { id: 'bi_publico', label: 'Quem usará o dashboard', type: 'multi-select', required: true, options: [
        { value: 'diretoria', label: 'Diretoria' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'vendas', label: 'Vendas' },
        { value: 'operacoes', label: 'Operacoes' },
        { value: 'financeiro', label: 'Financeiro' },
      ]},
      { id: 'bi_fontes', label: 'Fontes de dados', type: 'multi-select', required: true, options: [
        { value: 'planilhas', label: 'Planilhas' },
        { value: 'database', label: 'Banco de dados' },
        { value: 'crm', label: 'CRM' },
        { value: 'erp', label: 'ERP' },
        { value: 'apis', label: 'APIs' },
        { value: 'dwh', label: 'Data warehouse' },
      ]},
      { id: 'bi_kpis', label: 'KPIs a acompanhar', type: 'textarea', required: true, placeholder: 'Ex.: faturamento, CAC, ROI, churn...' },
      { id: 'bi_ferramenta', label: 'Ferramenta preferida', type: 'single-select', options: [
        { value: 'powerbi', label: 'Power BI' },
        { value: 'tableau', label: 'Tableau' },
        { value: 'looker', label: 'Looker Studio' },
        { value: 'metabase', label: 'Metabase' },
        { value: 'sem-preferencia', label: 'Sem preferência' },
      ]},
      { id: 'bi_atualizacao', label: 'Frequência de atualização', type: 'single-select', required: true, options: [
        { value: 'tempo-real', label: 'Tempo real' },
        { value: 'hora', label: 'A cada hora' },
        { value: 'diario', label: 'Diário' },
        { value: 'semanal', label: 'Semanal' },
        { value: 'manual', label: 'Manual' },
      ]},
      { id: 'bi_prazo', label: 'Prazo desejado', type: 'single-select', required: true, options: PRAZO_OPTIONS },
      { id: 'bi_orcamento', label: 'Faixa de investimento', type: 'single-select', options: ORCAMENTO_OPTIONS },
    ],
  },
  {
    id: 'predictive-analysis',
    label: 'Análise Preditiva',
    area: 'inteligencia-dados',
    description: 'Modelos para previsão e apoio à decisão.',
    fields: [
      { id: 'pred_problema', label: 'O que você deseja prever', type: 'textarea', required: true, placeholder: 'Ex.: churn, demanda, vendas, receita.' },
      { id: 'pred_impacto', label: 'Impacto esperado no negócio', type: 'textarea', required: true },
      { id: 'pred_dados_disponiveis', label: 'Dados históricos disponíveis', type: 'multi-select', required: true, options: [
        { value: 'vendas', label: 'Vendas' },
        { value: 'clientes', label: 'Dados de clientes' },
        { value: 'marketing', label: 'Dados de marketing' },
        { value: 'financeiro', label: 'Dados financeiros' },
        { value: 'operacionais', label: 'Dados operacionais' },
      ]},
      { id: 'pred_volume', label: 'Volume de dados', type: 'single-select', required: true, options: [
        { value: 'ate-1k', label: 'Menos de 1.000 registros' },
        { value: '1k-10k', label: '1.000 - 10.000' },
        { value: '10k-100k', label: '10.000 - 100.000' },
        { value: '100k-1m', label: '100.000 - 1 milhão' },
        { value: '1m+', label: 'Mais de 1 milhão' },
      ]},
      { id: 'pred_preparacao', label: 'Estado dos dados', type: 'single-select', required: true, options: [
        { value: 'organizados', label: 'Já organizados' },
        { value: 'parcial', label: 'Parcialmente organizados' },
        { value: 'nao', label: 'Não organizados' },
      ]},
      { id: 'pred_entrega', label: 'Forma de entrega desejada', type: 'multi-select', required: true, options: [
        { value: 'dashboard', label: 'Dashboard' },
        { value: 'relatorio', label: 'Relatório analítico' },
        { value: 'integracao-sistema', label: 'Modelo integrado ao sistema' },
        { value: 'api', label: 'API de previsão' },
      ]},
      { id: 'pred_prazo', label: 'Prazo desejado', type: 'single-select', required: true, options: PRAZO_OPTIONS },
      { id: 'pred_orcamento', label: 'Faixa de investimento', type: 'single-select', options: ORCAMENTO_OPTIONS },
    ],
  },
  {
    id: 'nlp-ia',
    label: 'NLP & IA Aplicada',
    area: 'inteligencia-dados',
    description: 'Automação inteligente com processamento de linguagem natural.',
    fields: [
      {
        id: 'ia_objetivo',
        label: 'Objetivo principal da solução de IA',
        type: 'single-select',
        required: true,
        options: [
          { value: 'chatbot', label: 'Automação de atendimento (chatbot)' },
          { value: 'analise-texto', label: 'Análise de textos/documentos' },
          { value: 'classificacao', label: 'Classificação automática' },
          { value: 'extracao', label: 'Extração de dados de documentos' },
          { value: 'resumo', label: 'Resumo automático de conteúdos' },
          { value: 'assistente', label: 'Assistente interno com IA' },
        ],
      },
      { id: 'ia_conteudo', label: 'Tipo de conteúdo a processar', type: 'multi-select', required: true, options: [
        { value: 'emails', label: 'Emails' },
        { value: 'pdfs', label: 'Documentos PDF' },
        { value: 'contratos', label: 'Contratos' },
        { value: 'tickets', label: 'Tickets de suporte' },
        { value: 'chat', label: 'Mensagens de chat' },
        { value: 'redes', label: 'Redes sociais' },
      ]},
      { id: 'ia_volume', label: 'Volume estimado', type: 'single-select', required: true, options: [
        { value: 'ate-1k', label: 'Menos de 1.000' },
        { value: '1k-10k', label: '1.000 - 10.000' },
        { value: '10k-100k', label: '10.000 - 100.000' },
        { value: '100k+', label: 'Mais de 100.000' },
      ]},
      { id: 'ia_interface', label: 'Onde será usada', type: 'multi-select', required: true, options: [
        { value: 'site', label: 'Site da empresa' },
        { value: 'sistema-interno', label: 'Sistema interno' },
        { value: 'app', label: 'Aplicativo' },
        { value: 'whatsapp', label: 'WhatsApp' },
        { value: 'slack', label: 'Slack' },
        { value: 'api', label: 'API' },
      ]},
      {
        id: 'ia_dados_sensiveis',
        label: 'Há dados sensíveis?',
        type: 'single-select',
        required: true,
        options: [
          { value: 'nao', label: 'Não' },
          { value: 'sim', label: 'Sim' },
        ],
      },
      {
        id: 'ia_compliance',
        label: 'Compliance necessario',
        type: 'multi-select',
        condition: { fieldId: 'ia_dados_sensiveis', equals: 'sim' },
        options: [
          { value: 'lgpd', label: 'LGPD' },
          { value: 'gdpr', label: 'GDPR' },
          { value: 'outro', label: 'Outro' },
        ],
      },
      { id: 'ia_prazo', label: 'Prazo desejado', type: 'single-select', required: true, options: PRAZO_OPTIONS },
      { id: 'ia_orcamento', label: 'Faixa de investimento', type: 'single-select', options: ORCAMENTO_OPTIONS },
    ],
  },
  {
    id: 'api-development',
    label: 'Desenvolvimento de APIs',
    area: 'engenharia-software',
    description: 'APIs para integração, backend e plataforma digital.',
    fields: [
      {
        id: 'api_objetivo',
        label: 'Objetivo principal da API',
        type: 'single-select',
        required: true,
        options: [
          { value: 'integracao-sistemas', label: 'Integração entre sistemas' },
          { value: 'dados-parceiros', label: 'Disponibilizar dados para parceiros' },
          { value: 'backend-app', label: 'Backend para aplicativo' },
          { value: 'automacao-processos', label: 'Automação de processos' },
          { value: 'plataforma-dev', label: 'Plataforma para desenvolvedores' },
        ],
      },
      { id: 'api_descricao', label: 'Descrição resumida da API', type: 'textarea', required: true },
      { id: 'api_tipo', label: 'Tipo de API', type: 'single-select', required: true, options: [
        { value: 'interna', label: 'Interna (uso interno)' },
        { value: 'parceiros', label: 'Para parceiros' },
        { value: 'publica', label: 'Pública' },
        { value: 'backend-app', label: 'Backend para aplicativo' },
      ]},
      { id: 'api_sistemas', label: 'Sistemas conectados', type: 'multi-select', required: true, options: [
        { value: 'database', label: 'Banco de dados' },
        { value: 'crm', label: 'CRM' },
        { value: 'erp', label: 'ERP' },
        { value: 'apps', label: 'Aplicativos' },
        { value: 'servicos-externos', label: 'Serviços externos' },
      ]},
      { id: 'api_operacoes', label: 'Operações/Endpoints esperados', type: 'textarea', required: true, placeholder: 'Ex.: consulta, criação, atualização, autenticação.' },
      { id: 'api_arquitetura', label: 'Arquitetura preferida', type: 'single-select', options: [
        { value: 'rest', label: 'REST' },
        { value: 'graphql', label: 'GraphQL' },
        { value: 'sem-preferencia', label: 'Sem preferencia' },
      ]},
      { id: 'api_seguranca', label: 'Autenticação/Segurança', type: 'multi-select', options: [
        { value: 'api-key', label: 'API key' },
        { value: 'oauth', label: 'OAuth' },
        { value: 'jwt', label: 'JWT' },
        { value: 'rate-limit', label: 'Rate limit' },
        { value: 'criptografia', label: 'Criptografia de dados' },
      ]},
      { id: 'api_prazo', label: 'Prazo desejado', type: 'single-select', required: true, options: PRAZO_OPTIONS },
      { id: 'api_orcamento', label: 'Faixa de investimento', type: 'single-select', options: ORCAMENTO_OPTIONS },
    ],
  },
  {
    id: 'automation-rpa',
    label: 'Automação / RPA',
    area: 'engenharia-software',
    description: 'Automação de processos operacionais e integrações.',
    fields: [
      { id: 'rpa_processo', label: 'Processo a automatizar', type: 'textarea', required: true },
      { id: 'rpa_problema', label: 'Problema principal que a automação resolve', type: 'multi-select', required: true, options: [
        { value: 'tempo', label: 'Redução de tempo operacional' },
        { value: 'erros', label: 'Redução de erros humanos' },
        { value: 'custos', label: 'Redução de custos' },
        { value: 'produtividade', label: 'Aumento de produtividade' },
        { value: 'escala', label: 'Escalabilidade de processos' },
      ]},
      { id: 'rpa_tipo', label: 'Tipo de automação', type: 'multi-select', required: true, options: [
        { value: 'administrativa', label: 'Tarefas administrativas' },
        { value: 'empresarial', label: 'Processos empresariais' },
        { value: 'coleta', label: 'Coleta de dados' },
        { value: 'integracao', label: 'Integração entre sistemas' },
        { value: 'emails', label: 'Envio de emails/mensagens' },
        { value: 'relatorios', label: 'Geração de relatórios' },
      ]},
      { id: 'rpa_sistemas', label: 'Sistemas envolvidos', type: 'multi-select', required: true, options: [
        { value: 'planilhas', label: 'Planilhas' },
        { value: 'crm', label: 'CRM' },
        { value: 'erp', label: 'ERP' },
        { value: 'sistemas-web', label: 'Sistemas web' },
        { value: 'email', label: 'Email' },
        { value: 'apis', label: 'APIs externas' },
      ]},
      { id: 'rpa_volume', label: 'Volume diário de execuções', type: 'single-select', required: true, options: [
        { value: 'menos-10', label: 'Menos de 10 vezes/dia' },
        { value: '10-50', label: '10 - 50' },
        { value: '50-200', label: '50 - 200' },
        { value: '200+', label: 'Mais de 200' },
      ]},
      { id: 'rpa_execucao', label: 'Como deve rodar', type: 'single-select', required: true, options: [
        { value: 'tempo-real', label: 'Tempo real' },
        { value: 'agendado', label: 'Horários programados' },
        { value: 'sob-demanda', label: 'Sob demanda' },
        { value: 'periodico', label: 'Periodicamente' },
      ]},
      { id: 'rpa_excecoes', label: 'Tratamento de falhas desejado', type: 'multi-select', options: [
        { value: 'alerta-email', label: 'Alerta por email' },
        { value: 'notificar-responsavel', label: 'Notificar responsável' },
        { value: 'registrar-log', label: 'Registrar erro em log' },
        { value: 'retry', label: 'Tentar novamente' },
      ]},
      { id: 'rpa_prazo', label: 'Prazo desejado', type: 'single-select', required: true, options: PRAZO_OPTIONS },
      { id: 'rpa_orcamento', label: 'Faixa de investimento', type: 'single-select', options: ORCAMENTO_OPTIONS },
    ],
  },
  {
    id: 'saas-development',
    label: 'Desenvolvimento de SaaS',
    area: 'engenharia-software',
    description: 'Criação de produto SaaS com foco em MVP e escala.',
    fields: [
      { id: 'saas_ideia', label: 'Ideia principal do produto', type: 'textarea', required: true },
      { id: 'saas_dor', label: 'Dor de mercado que o produto resolve', type: 'textarea', required: true },
      { id: 'saas_publico', label: 'Público-alvo principal', type: 'single-select', required: true, options: [
        { value: 'startups', label: 'Startups' },
        { value: 'pequenas', label: 'Pequenas empresas' },
        { value: 'medias', label: 'Médias empresas' },
        { value: 'grandes', label: 'Grandes empresas' },
        { value: 'b2c', label: 'Consumidor final (B2C)' },
      ]},
      { id: 'saas_funcionalidades', label: 'Funcionalidades principais (MVP)', type: 'textarea', required: true },
      { id: 'saas_monetizacao', label: 'Modelo de monetização', type: 'multi-select', required: true, options: [
        { value: 'mensal', label: 'Assinatura mensal' },
        { value: 'anual', label: 'Assinatura anual' },
        { value: 'freemium', label: 'Freemium' },
        { value: 'pay-per-use', label: 'Pagamento por uso' },
        { value: 'planos', label: 'Planos escalonados' },
      ]},
      { id: 'saas_plataforma', label: 'Plataforma de acesso', type: 'single-select', required: true, options: [
        { value: 'web', label: 'Aplicação web' },
        { value: 'mobile', label: 'Aplicativo mobile' },
        { value: 'ambos', label: 'Web + mobile' },
      ]},
      { id: 'saas_usuarios_ano1', label: 'Escala esperada no primeiro ano', type: 'single-select', options: [
        { value: 'ate-100', label: 'Menos de 100 usuários' },
        { value: '100-1k', label: '100 - 1.000' },
        { value: '1k-10k', label: '1.000 - 10.000' },
        { value: '10k+', label: 'Mais de 10.000' },
      ]},
      { id: 'saas_prazo', label: 'Prazo para primeira versão (MVP)', type: 'single-select', required: true, options: [
        { value: '1-2-meses', label: '1-2 meses' },
        { value: '3-4-meses', label: '3-4 meses' },
        { value: '6-meses', label: '6 meses' },
        { value: '6m+', label: 'Mais de 6 meses' },
      ]},
      { id: 'saas_orcamento', label: 'Faixa de investimento', type: 'single-select', options: ORCAMENTO_OPTIONS },
    ],
  },
  {
    id: 'custom-system',
    label: 'Sistema Sob Medida',
    area: 'engenharia-software',
    description: 'Sistema personalizado para processos internos e operacionais.',
    fields: [
      { id: 'sys_objetivo', label: 'Objetivo do sistema', type: 'textarea', required: true, placeholder: 'Qual problema o sistema deve resolver?' },
      { id: 'sys_tipo', label: 'Tipo de sistema', type: 'single-select', required: true, options: [
        { value: 'interno', label: 'Sistema interno da empresa' },
        { value: 'portal-clientes', label: 'Portal para clientes' },
        { value: 'administrativo', label: 'Sistema administrativo' },
        { value: 'plataforma-operacional', label: 'Plataforma operacional' },
      ]},
      { id: 'sys_usuarios', label: 'Perfis de usuários', type: 'multi-select', required: true, options: [
        { value: 'admin', label: 'Administradores' },
        { value: 'funcionarios', label: 'Funcionarios' },
        { value: 'gestores', label: 'Gestores' },
        { value: 'clientes', label: 'Clientes' },
        { value: 'parceiros', label: 'Parceiros' },
      ]},
      { id: 'sys_funcionalidades', label: 'Funcionalidades principais', type: 'textarea', required: true },
      { id: 'sys_automacoes', label: 'Processos a automatizar', type: 'textarea' },
      {
        id: 'sys_integracoes',
        label: 'Precisa integrar com outros sistemas?',
        type: 'single-select',
        required: true,
        options: [
          { value: 'nao', label: 'Não' },
          { value: 'sim', label: 'Sim' },
        ],
      },
      {
        id: 'sys_integracoes_quais',
        label: 'Quais integrações?',
        type: 'text',
        condition: { fieldId: 'sys_integracoes', equals: 'sim' },
        placeholder: 'Ex.: SAP, Salesforce, gateway de pagamento.',
      },
      { id: 'sys_plataforma', label: 'Plataforma desejada', type: 'single-select', options: [
        { value: 'web', label: 'Aplicação web' },
        { value: 'mobile', label: 'Aplicativo mobile' },
        { value: 'desktop', label: 'Sistema desktop' },
        { value: 'combinado', label: 'Combinação de plataformas' },
      ]},
      { id: 'sys_prazo', label: 'Prazo desejado', type: 'single-select', required: true, options: PRAZO_OPTIONS },
      { id: 'sys_orcamento', label: 'Faixa de investimento', type: 'single-select', options: ORCAMENTO_OPTIONS },
    ],
  },
  {
    id: 'web-apps',
    label: 'Web Apps / Portal Web',
    area: 'engenharia-software',
    description: 'Portais e plataformas web com autenticação e operação digital.',
    fields: [
      { id: 'webapp_objetivo', label: 'Objetivo do portal/web app', type: 'textarea', required: true },
      { id: 'webapp_problema', label: 'Problema de negócio a resolver', type: 'textarea', required: true },
      { id: 'webapp_publico', label: 'Usuários do sistema', type: 'multi-select', required: true, options: [
        { value: 'funcionarios', label: 'Funcionários internos' },
        { value: 'clientes', label: 'Clientes' },
        { value: 'parceiros', label: 'Parceiros' },
        { value: 'publico', label: 'Público geral' },
      ]},
      { id: 'webapp_tipo', label: 'Tipo de plataforma', type: 'single-select', required: true, options: [
        { value: 'portal-clientes', label: 'Portal de clientes' },
        { value: 'marketplace', label: 'Marketplace' },
        { value: 'sistema-interno', label: 'Sistema interno' },
        { value: 'plataforma-servicos', label: 'Plataforma de serviços' },
        { value: 'portal-educacional', label: 'Portal educacional' },
      ]},
      { id: 'webapp_funcionalidades', label: 'Funcionalidades essenciais', type: 'multi-select', required: true, options: [
        { value: 'cadastro-login', label: 'Cadastro/login de usuários' },
        { value: 'painel-admin', label: 'Painel administrativo' },
        { value: 'gestao-conteudo', label: 'Gestão de conteúdo' },
        { value: 'upload-arquivos', label: 'Upload de arquivos' },
        { value: 'notificacoes', label: 'Notificações' },
        { value: 'integracoes', label: 'Integrações externas' },
      ]},
      { id: 'webapp_dados', label: 'Dados armazenados', type: 'multi-select', options: [
        { value: 'clientes', label: 'Dados de clientes' },
        { value: 'financeiro', label: 'Dados financeiros' },
        { value: 'arquivos', label: 'Arquivos' },
        { value: 'conteudo', label: 'Conteúdo' },
        { value: 'analytics', label: 'Dados analíticos' },
      ]},
      { id: 'webapp_hospedagem', label: 'Hospedagem prevista', type: 'single-select', options: [
        { value: 'cloud', label: 'Cloud' },
        { value: 'servidor-proprio', label: 'Servidor proprio' },
        { value: 'nao-definido', label: 'Ainda não definido' },
      ]},
      { id: 'webapp_prazo', label: 'Prazo desejado', type: 'single-select', required: true, options: PRAZO_OPTIONS },
      { id: 'webapp_orcamento', label: 'Faixa de investimento', type: 'single-select', options: ORCAMENTO_OPTIONS },
    ],
  },
  {
    id: 'landing-pages',
    label: 'Landing Pages',
    area: 'engenharia-software',
    description: 'Páginas de conversão para captação, vendas e lançamentos.',
    fields: [
      {
        id: 'lp_objetivo',
        label: 'Objetivo principal da landing page',
        type: 'single-select',
        required: true,
        options: [
          { value: 'captura-leads', label: 'Captura de leads' },
          { value: 'venda-produto', label: 'Venda de produto' },
          { value: 'venda-servico', label: 'Venda de serviço' },
          { value: 'inscricao-evento', label: 'Inscrição em evento' },
          { value: 'agendamento', label: 'Agendamento de reunião' },
          { value: 'download-material', label: 'Download de material' },
        ],
      },
      { id: 'lp_oferta', label: 'Oferta apresentada', type: 'text', required: true, placeholder: 'Produto/serviço/material principal.' },
      { id: 'lp_publico', label: 'Público-alvo', type: 'textarea', required: true },
      { id: 'lp_secoes', label: 'Seções desejadas', type: 'multi-select', required: true, options: [
        { value: 'headline', label: 'Headline e subtítulo' },
        { value: 'beneficios', label: 'Benefícios/funcionalidades' },
        { value: 'depoimentos', label: 'Depoimentos/prova social' },
        { value: 'faq', label: 'FAQ' },
        { value: 'cta', label: 'CTA principal' },
        { value: 'formulario', label: 'Formulário de captura' },
      ]},
      { id: 'lp_copy', label: 'Nível de apoio necessário', type: 'multi-select', options: [
        { value: 'copywriting', label: 'Copywriting' },
        { value: 'estrutura', label: 'Estrutura da pagina' },
        { value: 'estrategia-conversao', label: 'Estratégia de conversão' },
        { value: 'visual', label: 'Conteúdo visual' },
      ]},
      { id: 'lp_integracoes', label: 'Integrações necessárias', type: 'multi-select', options: [
        { value: 'crm', label: 'CRM' },
        { value: 'email-marketing', label: 'Email marketing' },
        { value: 'automacao-marketing', label: 'Automação de marketing' },
        { value: 'pagamento', label: 'Plataforma de pagamento' },
        { value: 'whatsapp', label: 'WhatsApp' },
      ]},
      { id: 'lp_trafego', label: 'Principal canal de tráfego', type: 'multi-select', options: [
        { value: 'google-ads', label: 'Google Ads' },
        { value: 'meta-ads', label: 'Facebook/Instagram Ads' },
        { value: 'linkedin-ads', label: 'LinkedIn Ads' },
        { value: 'email', label: 'Email marketing' },
        { value: 'organico', label: 'Tráfego orgânico' },
      ]},
      { id: 'lp_prazo', label: 'Prazo desejado', type: 'single-select', required: true, options: PRAZO_OPTIONS },
      { id: 'lp_orcamento', label: 'Faixa de investimento', type: 'single-select', options: ORCAMENTO_OPTIONS },
    ],
  },
];

export const SUB_SERVICES_BY_AREA: Record<Exclude<MainAreaId, 'outro'>, SubServiceSchema[]> = {
  'engenharia-dados': SUB_SERVICE_SCHEMAS.filter((schema) => schema.area === 'engenharia-dados'),
  'inteligencia-dados': SUB_SERVICE_SCHEMAS.filter((schema) => schema.area === 'inteligencia-dados'),
  'engenharia-software': SUB_SERVICE_SCHEMAS.filter((schema) => schema.area === 'engenharia-software'),
};

export const getSubServicesByArea = (area: MainAreaId): SubServiceSchema[] => {
  if (area === 'outro') {
    return [];
  }
  return SUB_SERVICES_BY_AREA[area];
};

export const getSubServiceById = (subServiceId: string): SubServiceSchema | undefined =>
  SUB_SERVICE_SCHEMAS.find((schema) => schema.id === subServiceId);
