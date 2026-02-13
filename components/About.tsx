import React from 'react';
import { ScrollReveal } from './ui/ScrollReveal';
import { Layers, ShieldCheck, Zap, ArrowDown } from 'lucide-react';
import { FeaturePillar } from './cards/FeaturePillar';

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-24 px-4 bg-eco-dark text-stone-100 relative overflow-hidden content-deferred">
      {/* Decorative large text background - Reduced opacity for less pollution */}
      <div className="absolute top-20 right-0 font-sans font-bold text-[200px] leading-none text-white/[0.01] pointer-events-none select-none">
        ARCAB
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          <ScrollReveal>
            <div className="sticky top-24">
               <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 bg-eco-accent"></div>
                  <h2 className="font-mono text-xs text-stone-400 tracking-widest uppercase">
                    Engenharia Fundamental
                  </h2>
               </div>
               
               <h3 className="font-sans text-3xl md:text-5xl leading-tight font-medium mb-8">
                  Nós construímos o <br/>
                  <span className="text-eco-accent">invisível</span> que sustenta <br/>
                  o seu negócio.
               </h3>
               
               <div className="space-y-6 font-mono text-sm text-stone-400 leading-relaxed border-l border-stone-800 pl-6 mb-10">
                  <p>
                    A <strong className="text-white">ARCAB</strong> não foca em vaidade. Focamos na engenharia crítica. Quando os dados estão desconexos ou o software não escala, o problema é arquitetural.
                  </p>
                  <p>
                    Seja refatorando sistemas legados, construindo pipelines de dados (ETL) ou desenvolvendo APIs seguras, nossa entrega é código limpo, documentado e performático.
                  </p>
               </div>

               {/* Replacement for Fake Counters: Engineering Pillars */}
               <div className="grid grid-cols-1 gap-6 border-t border-stone-800 pt-8">
                  <FeaturePillar
                    icon={ShieldCheck}
                    title="Robustez & Segurança"
                    description="Arquiteturas resilientes a falhas e protegidas por design."
                    color="primary"
                  />
                  
                  <FeaturePillar
                    icon={Zap}
                    title="Performance Real"
                    description="Otimização de queries, cache e redução de latência."
                    color="accent"
                  />

                  <FeaturePillar
                    icon={Layers}
                    title="Escalabilidade"
                    description="Sistemas preparados para crescer junto com sua demanda."
                    color="blue"
                  />
               </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="relative pt-8 lg:pt-0">
               {/* Simplified Architecture Visual */}
               <div className="bg-stone-950 border border-stone-800 p-8 md:p-12 relative overflow-hidden">
                  
                  {/* Subtle Grid - Barely visible */}
                  <div className="absolute inset-0 opacity-[0.03]" 
                       style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                  </div>

                  {/* The Flow Chart - Clean & Vertical */}
                  <div className="relative z-10 flex flex-col items-center space-y-2">
                     
                     {/* Node 1: Ingestion */}
                     <div className="w-full max-w-sm bg-stone-900 border border-stone-700 p-4 flex items-center justify-between group hover:border-stone-500 transition-colors">
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 bg-stone-500 rounded-full"></div>
                           <span className="font-mono text-xs font-bold text-stone-300 uppercase tracking-widest">Coleta de Dados</span>
                        </div>
                        <span className="font-mono text-[10px] text-stone-600">INPUT</span>
                     </div>

                     {/* Connector */}
                     <div className="h-8 w-px bg-stone-800 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-stone-600 animate-scan"></div>
                     </div>

                     {/* Node 2: Processing (Main) */}
                     <div className="w-full max-w-sm bg-stone-900 border border-eco-primary p-5 flex items-center justify-between shadow-[0_0_20px_rgba(5,150,105,0.1)] relative">
                        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-eco-primary"></div>
                        <div className="flex flex-col">
                           <span className="font-mono text-[10px] text-eco-primary uppercase mb-1">Processamento Central</span>
                           <span className="font-sans font-medium text-white text-lg">Engine & Tratamento</span>
                        </div>
                        <Activity size={20} className="text-eco-primary" />
                     </div>

                     {/* Connector */}
                     <div className="h-8 w-px bg-stone-800 relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-full h-1/2 bg-eco-accent animate-scan" style={{ animationDelay: '0.5s' }}></div>
                     </div>

                     {/* Node 3: Distribution */}
                     <div className="w-full max-w-sm bg-stone-900 border border-stone-700 p-4 flex items-center justify-between group hover:border-eco-accent transition-colors">
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 bg-eco-accent rounded-full animate-pulse"></div>
                           <span className="font-mono text-xs font-bold text-stone-300 uppercase tracking-widest">Entrega de Valor</span>
                        </div>
                        <span className="font-mono text-[10px] text-stone-600">OUTPUT</span>
                     </div>
                     
                  </div>

                  {/* Bottom Tech Details */}
                  <div className="mt-12 border-t border-stone-900 pt-6 flex justify-between items-end">
                     <div className="font-mono text-[10px] text-stone-600 space-y-1">
                        <div>ARCH_VER: 2.4.0</div>
                        <div>STATUS: STABLE</div>
                     </div>
                     <ArrowDown size={16} className="text-stone-700" />
                  </div>

               </div>
               
               {/* Behind decoration */}
               <div className="absolute -z-10 top-4 -right-4 w-full h-full border border-stone-800/50"></div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

// Simple icon component for reusability within this file
const Activity: React.FC<{ size?: number, className?: string }> = ({ size = 24, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

export default About;