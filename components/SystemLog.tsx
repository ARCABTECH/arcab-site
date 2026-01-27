import React from 'react';
import { ScrollReveal } from './ui/ScrollReveal';

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
              <div className="inline-flex items-center gap-2 mb-4">
                 <div className="w-2 h-2 bg-eco-dark rounded-full"></div>
                 <span className="font-mono text-xs font-bold uppercase tracking-widest text-eco-dark">
                   Registro de Operações
                 </span>
              </div>
              <h2 className="font-sans font-medium text-4xl mb-6 text-eco-dark leading-tight">
                Resultados reais, <br/>
                métricas exatas.
              </h2>
              <p className="font-mono text-stone-500 text-sm max-w-md">
                Não vendemos promessas subjetivas. Entregamos otimização de código, pipelines de dados estáveis e software que funciona.
              </p>
            </div>

            {/* Terminal Window */}
            <div className="bg-eco-dark rounded-sm p-1 shadow-sharp-lg overflow-hidden max-w-[100vw]">
               {/* Terminal Bar */}
               <div className="bg-stone-800 px-4 py-2 flex items-center justify-between rounded-t-sm mb-1">
                  <span className="font-mono text-[10px] text-stone-400 truncate mr-2">engineer@arcab-shell:~# tail -f execution.log</span>
                  <div className="flex gap-1.5 shrink-0">
                     <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                  </div>
               </div>
               
               {/* Terminal Content */}
               <div className="bg-black/90 p-4 md:p-6 font-mono text-xs md:text-sm h-full min-h-[300px] flex flex-col justify-end relative">
                  
                  <div className="space-y-4 pb-2">
                     {logs.map((log, i) => (
                        <div key={i} className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3 border-b border-white/5 md:border-none pb-3 md:pb-0 last:border-0">
                           
                           {/* Time & Type Group - Always visible together */}
                           <div className="flex items-center gap-2 shrink-0">
                               <span className="text-stone-500 whitespace-nowrap">[{log.time}]</span>
                               <span className={`font-bold whitespace-nowrap ${
                                  log.type === 'SUCCESS' ? 'text-green-500' : 
                                  log.type === 'DEPLOY' ? 'text-blue-500' :
                                  log.type === 'OPTIMIZE' ? 'text-purple-500' : 'text-yellow-500'
                               }`}>{log.type}:</span>
                           </div>

                           {/* Message Content - Wraps naturally */}
                           <div className="flex-grow flex flex-col md:flex-row md:justify-between gap-1">
                               <span className="text-stone-300 break-words leading-relaxed">{log.message}</span>
                               <span className="text-stone-600 opacity-50 text-[10px] md:text-xs whitespace-nowrap shrink-0">//{log.client}</span>
                           </div>

                        </div>
                     ))}
                     
                     {/* Blinking Cursor */}
                     <div className="flex items-center gap-2 mt-4 animate-pulse">
                        <span className="text-eco-accent font-bold">{'>'}</span>
                        <span className="w-2 h-4 bg-eco-accent block"></span>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SystemLog;