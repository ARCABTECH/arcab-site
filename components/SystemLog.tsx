import React from 'react';
import { ScrollReveal } from './ui/ScrollReveal';
import { SectionHeader } from './layout/SectionHeader';
import { TerminalWindow } from './cards/TerminalWindow';

const SystemLog: React.FC = () => {
  const logs = [
    { time: "14:02:22", type: "SUCCESS", message: "Migração de Data Warehouse concluída. Redução de latência em 40%.", client: "Finance Corp" },
    { time: "15:45:10", type: "DEPLOY", message: "Módulo de IA Preditiva implantado. Acurácia inicial: 94%.", client: "Retail Giant" },
    { time: "16:12:05", type: "OPTIMIZE", message: "Refatoração de API Legada. Throughput aumentado em 300%.", client: "Logistics SaaS" },
    { time: "09:30:00", type: "ALERT", message: "Web Scraping detectou novas oportunidades de mercado.", client: "Marketing Agency" },
  ];

  return (
    <section className="bg-stone-100 py-24 px-4 border-t border-stone-200">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Header */}
            <div>
              <SectionHeader
                label="Registro de Operações"
                title={
                  <>
                    Resultados reais, <br/>
                    métricas exatas.
                  </>
                }
                description="Não vendemos promessas subjetivas. Entregamos otimização de código, pipelines de dados estáveis e software que funciona."
              />
            </div>

            {/* Terminal Window */}
            <TerminalWindow
              title="engineer@arcab-shell:~# tail -f execution.log"
              logs={logs}
            />

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SystemLog;