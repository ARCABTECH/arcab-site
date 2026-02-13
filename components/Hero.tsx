'use client'

import React from 'react';
import { BrutalistButton } from './ui/BrutalistButton';
import { ArrowRight, Database, Code2, Activity, Cpu } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToServices = () => {
    const element = document.getElementById('servicos');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Math for the circle chart
  // Radius = 28
  // Circumference = 2 * PI * 28 ≈ 176
  // 98% of 176 = 172.48 filled
  // DashOffset = 176 - 172.48 = 3.52
  const circleRadius = 28;
  const circumference = 2 * Math.PI * circleRadius;
  const percentage = 98;
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center py-20 px-4 max-w-7xl mx-auto overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#0C0A09 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 w-full relative z-10 items-center">
        
        {/* Text Content - Direct & Professional */}
        <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 mb-6 border-b border-eco-dark/20 pb-2">
              <div className="w-2 h-2 bg-eco-primary rounded-full"></div>
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-stone-500">
                Engenharia Digital
              </span>
            </div>
            
            <h1 className="font-sans font-medium text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6 tracking-tight text-eco-dark">
              Inteligência de Dados & <br/>
              Engenharia de Software.
            </h1>

            <p className="font-mono text-sm md:text-base text-stone-600 mb-10 max-w-lg leading-relaxed">
              Unificamos engenharia de dados, analytics e desenvolvimento web para criar produtos digitais sólidos. Do tratamento da informação à interface do usuário.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <BrutalistButton onClick={scrollToServices} className="group">
                O que fazemos
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </BrutalistButton>
              <BrutalistButton variant="outline" onClick={() => document.getElementById('contato')?.scrollIntoView({behavior: 'smooth'})}>
                Falar com a ARCAB
              </BrutalistButton>
            </div>
            
            <div className="mt-12 flex gap-8 border-t border-stone-200 pt-6">
               <div className="flex items-center gap-2 text-stone-500">
                  <Database size={16} />
                  <span className="text-xs font-mono uppercase">Data Structs</span>
               </div>
               <div className="flex items-center gap-2 text-stone-500">
                  <Code2 size={16} />
                  <span className="text-xs font-mono uppercase">Full Stack</span>
               </div>
            </div>
        </div>

        {/* Visual - Advanced System Monitor */}
        <div className="relative hidden lg:block h-full min-h-[500px]">
            <div className="absolute inset-0 flex items-center justify-center [perspective:1000px]">
               
               {/* Background Layers - Solid and Static */}
               <div className="absolute w-[480px] h-[320px] bg-stone-100 border border-stone-200 -rotate-3 rounded-sm z-0"></div>
               
               {/* Main Interface Card */}
               <div className="w-[500px] bg-white border-2 border-eco-dark shadow-sharp-lg relative z-10 flex flex-col overflow-hidden">
                  
                  {/* Header Bar - Clean */}
                  <div className="h-10 bg-eco-dark text-white flex items-center justify-between px-4 select-none">
                     <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                           <div className="w-2.5 h-2.5 bg-stone-600 rounded-sm"></div>
                           <div className="w-2.5 h-2.5 bg-stone-600 rounded-sm"></div>
                        </div>
                        <span className="font-mono text-xs font-bold tracking-widest ml-2 border-l border-white/20 pl-3">
                           ARCAB.MONITOR
                        </span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <span className="text-[10px] font-mono text-stone-400">CONN_ESTABLISHED</span>
                     </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-4 grid grid-cols-12 gap-4 h-[300px]">
                     
                     {/* Module 1: Data Ingestion Map (Heatmap style) - Top Left */}
                     <div className="col-span-8 bg-stone-50 border border-stone-200 p-3 flex flex-col">
                        <div className="flex justify-between items-center mb-3">
                           <span className="text-[10px] font-mono uppercase font-bold text-stone-500 flex items-center gap-2">
                              <Database size={12} /> Data Ingestion Map
                           </span>
                           <span className="text-[10px] font-mono text-stone-400">REALTIME</span>
                        </div>
                        {/* Heatmap grid as single SVG for reduced DOM */}
                        <svg viewBox="0 0 119 39" className="w-full flex-grow" aria-hidden="true">
                           {Array.from({ length: 48 }, (_, i) => {
                              const opacity = Math.max(0.1, (Math.sin(i) + 1) / 2);
                              const isActive = opacity > 0.6;
                              return (
                                 <rect
                                    key={i}
                                    x={(i % 12) * 10}
                                    y={Math.floor(i / 12) * 10}
                                    width={9}
                                    height={9}
                                    rx={0.5}
                                    fill={isActive ? '#059669' : '#e7e5e4'}
                                    opacity={isActive ? opacity : 0.3}
                                 />
                              );
                           })}
                        </svg>
                     </div>

                     {/* Module 2: System Throughput (Accurate Chart) - Top Right */}
                     <div className="col-span-4 bg-stone-50 border border-stone-200 p-3 flex flex-col items-center justify-center relative">
                        <span className="absolute top-3 left-3 text-[10px] font-mono uppercase font-bold text-stone-500 flex items-center gap-2">
                           <Activity size={12} /> Throughput
                        </span>
                        
                        <div className="relative w-24 h-24 flex items-center justify-center mt-2">
                           {/* Background Circle */}
                           <svg className="w-full h-full rotate-[-90deg]">
                              <circle 
                                 cx="50%" cy="50%" r={circleRadius} 
                                 className="fill-none stroke-stone-200" 
                                 strokeWidth="6"
                              />
                              {/* Foreground Circle - Mathematically accurate */}
                              <circle 
                                 cx="50%" cy="50%" r={circleRadius} 
                                 className="fill-none stroke-eco-primary transition-all duration-1000 ease-out" 
                                 strokeWidth="6"
                                 strokeLinecap="square"
                                 strokeDasharray={circumference}
                                 strokeDashoffset={dashOffset}
                              />
                           </svg>
                           <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-xl font-bold font-sans text-eco-dark">{percentage}%</span>
                           </div>
                        </div>
                        <span className="text-[10px] font-mono text-stone-400 mt-1">OPTIMIZED</span>
                     </div>

                     {/* Module 3: Active Processes (List) - Bottom */}
                     <div className="col-span-12 bg-white border border-stone-200 p-0 flex flex-col overflow-hidden">
                        <div className="bg-stone-100 px-3 py-1.5 border-b border-stone-200 flex justify-between">
                           <span className="text-[10px] font-mono font-bold text-stone-500">ACTIVE PROCESSES</span>
                           <Activity size={12} className="text-stone-400"/>
                        </div>
                        <div className="p-3 font-mono text-[10px] space-y-2 text-stone-600">
                           <div className="flex justify-between items-center border-b border-stone-100 pb-1">
                              <div className="flex items-center gap-2">
                                 <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                 <span>ETL_PIPELINE_MAIN</span>
                              </div>
                              <span className="text-stone-400">RUNNING</span>
                           </div>
                           <div className="flex justify-between items-center border-b border-stone-100 pb-1">
                              <div className="flex items-center gap-2">
                                 <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                 <span>PREDICTIVE_MODEL_V2</span>
                              </div>
                              <span className="text-stone-400">INFERENCE</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                 <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                                 <span>WEB_CRAWLER_NODE_4</span>
                              </div>
                              <span className="text-stone-400">WAITING</span>
                           </div>
                        </div>
                     </div>

                  </div>
               </div>

               {/* Integrated Status Badge */}
               <div className="absolute -right-6 bottom-12 z-20 bg-eco-dark text-white p-3 shadow-sharp border border-stone-700 hidden md:block">
                  <div className="flex items-center gap-3">
                     <Cpu size={18} className="text-eco-accent" />
                     <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Architecture</span>
                        <span className="text-xs font-bold text-white">Scalable / Secure</span>
                     </div>
                  </div>
               </div>

            </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;