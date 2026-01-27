'use client'

import React, { useRef, useState, useEffect } from 'react';
import { servicesData, ServiceItem } from '../data/servicesData';
import { ScanBarcode, Hash, Cpu, ArrowRight, ChevronRight, ChevronLeft, Terminal } from 'lucide-react';
import { ScrollReveal } from './ui/ScrollReveal';

const ServiceCard: React.FC<{ item: ServiceItem; index: number }> = ({ item, index }) => {
  const isDev = item.category === 'Desenvolvimento';
  const serialNumber = (index + 1).toString().padStart(2, '0');
  
  return (
    <div className="group border border-stone-200 bg-stone-50 p-6 md:p-8 hover:border-eco-dark transition-all duration-300 relative flex flex-col h-full hover:bg-white hover:shadow-sharp min-h-[320px]">
      
      {/* Decorative Corner Markers (Technical Look) */}
      <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-stone-300 group-hover:border-eco-dark transition-colors"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-stone-300 group-hover:border-eco-dark transition-colors"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-stone-300 group-hover:border-eco-dark transition-colors"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-stone-300 group-hover:border-eco-dark transition-colors"></div>

      {/* Top Header: Icon & Serial */}
      <div className="flex justify-between items-start mb-6 pb-4 border-b border-stone-200 border-dashed">
        <div className={`p-2 border ${isDev ? 'bg-blue-50 border-blue-100 text-blue-700' : 'bg-emerald-50 border-emerald-100 text-emerald-700'} group-hover:scale-110 transition-transform duration-300`}>
          <item.icon size={20} strokeWidth={1.5} />
        </div>
        <div className="flex flex-col items-end">
          <span className="font-mono text-xs font-bold text-stone-300 group-hover:text-eco-accent transition-colors">
            MOD_{serialNumber}
          </span>
          <div className="flex gap-1 mt-1">
             <div className="w-1 h-1 bg-stone-300 rounded-full group-hover:bg-eco-dark transition-colors delay-75"></div>
             <div className="w-1 h-1 bg-stone-300 rounded-full group-hover:bg-eco-dark transition-colors delay-100"></div>
             <div className="w-1 h-1 bg-stone-300 rounded-full group-hover:bg-eco-dark transition-colors delay-150"></div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-3">
           <span className={`w-1.5 h-1.5 rounded-sm ${isDev ? 'bg-blue-500' : 'bg-emerald-500'}`}></span>
           <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
             {item.category}
           </span>
        </div>
        
        <h3 className="font-sans font-bold text-xl mb-3 text-eco-dark tracking-tight group-hover:text-eco-primary transition-colors">
          {item.title}
        </h3>
        <p className="font-mono text-sm text-stone-500 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Technical Footer (Non-clickable, purely aesthetic) */}
      <div className="mt-8 pt-3 border-t border-stone-100 flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity">
         <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400">
            <Hash size={10} />
            <span className="uppercase tracking-widest">{item.id.substring(0, 6).toUpperCase()}</span>
         </div>
         
         {/* Fake Barcode / Chip Visual */}
         <div className="flex items-center gap-2 text-stone-300 group-hover:text-stone-400">
            <Cpu size={14} strokeWidth={1} />
            <ScanBarcode size={14} strokeWidth={1} />
         </div>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      
      // Calculate percentage of content viewed (visible area + scrolled area) relative to total width
      // This ensures it starts > 0% because clientWidth is always > 0
      const progress = ((scrollLeft + clientWidth) / scrollWidth) * 100;
      
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      // Scroll amount is roughly the width of one card plus gap, or 80% of screen width
      const scrollAmount = container.clientWidth * 0.85; 
      
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;
      const tolerance = 10; // Tolerance for float/pixel rounding differences

      if (direction === 'right') {
        // Loop Logic: If we are close to the end, go back to start (0)
        if (scrollLeft >= maxScroll - tolerance) {
           container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
           container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      } else {
        // Loop Logic: If we are close to the start, go to the end (maxScroll)
        if (scrollLeft <= tolerance) {
           container.scrollTo({ left: maxScroll, behavior: 'smooth' });
        } else {
           container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      }
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      // Trigger once to set initial state
      handleScroll();
      // Also trigger on resize to recalculate initial percentage
      window.addEventListener('resize', handleScroll);
      return () => {
        el.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, []);

  return (
    <section id="servicos" className="relative bg-white border-t border-stone-300 pt-8 pb-24 overflow-hidden">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#0C0A09 1px, transparent 1px), linear-gradient(90deg, #0C0A09 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      
      <div className="py-12 max-w-7xl mx-auto relative z-10">
        <div className="px-4">
          <ScrollReveal>
            <div className="mb-8 md:mb-16 max-w-2xl mt-8">
               <div className="inline-flex items-center gap-2 mb-4">
                  <span className="text-eco-accent font-mono text-xs">01</span>
                  <div className="h-px w-8 bg-eco-accent"></div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-eco-dark">
                    Nossos Serviços
                  </span>
               </div>
               <h2 className="font-sans font-medium text-4xl mb-6 text-eco-dark">
                 Arquitetura de soluções <br/> ponta a ponta.
               </h2>
               <p className="font-mono text-stone-500 text-sm md:text-base border-l-2 border-stone-200 pl-4">
                 Atuamos em duas frentes complementares: extração de valor dos dados e desenvolvimento de sistemas de alto desempenho.
               </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Mobile Navigation Controls - Improved Visuals */}
        <div className="px-4 md:hidden flex justify-between items-end mb-6">
            <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Navigation_Control</span>
                <div className="flex items-center gap-2 text-[10px] font-mono text-eco-dark">
                    <Terminal size={12} className="text-eco-accent" />
                    {/* Fixed to 0 decimal places for cleaner look */}
                    <span>{scrollProgress.toFixed(0)}% VIEWED</span>
                </div>
            </div>
            
            <div className="flex gap-3">
                <button 
                  onClick={() => scroll('left')}
                  className="w-12 h-12 flex items-center justify-center bg-white border border-stone-800 shadow-sharp active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all hover:bg-eco-dark hover:text-white group"
                  aria-label="Previous service"
                >
                    <ChevronLeft size={20} strokeWidth={1.5} className="group-active:scale-90 transition-transform" />
                </button>
                <button 
                  onClick={() => scroll('right')}
                  className="w-12 h-12 flex items-center justify-center bg-eco-dark text-white border border-stone-800 shadow-sharp active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all hover:bg-eco-accent hover:text-eco-dark group"
                  aria-label="Next service"
                >
                    <ChevronRight size={20} strokeWidth={1.5} className="group-active:scale-90 transition-transform" />
                </button>
            </div>
        </div>

        {/* Progress Bar (Visible on mobile mostly) */}
        <div className="md:hidden px-4 mb-8">
            <div className="w-full h-1 bg-stone-200 overflow-hidden relative">
                {/* Solid Green Bar */}
                <div 
                    className="h-full bg-eco-accent transition-all duration-300 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                ></div>
            </div>
        </div>

        {/* 
            Container Strategy: 
            - Mobile: Flex + Overflow-X (Horizontal Scroll) 
            - Desktop: Grid layout
        */}
        <div className="relative group/container">
            {/* Fade Gradient Left (Only visible when scrolled right a bit, simplified here for static) */}
            <div className="absolute left-0 top-0 bottom-8 w-8 bg-gradient-to-r from-white to-transparent z-10 md:hidden pointer-events-none"></div>
            {/* Fade Gradient Right */}
            <div className="absolute right-0 top-0 bottom-8 w-12 bg-gradient-to-l from-white to-transparent z-10 md:hidden pointer-events-none"></div>

            <div 
              ref={scrollContainerRef}
              className="
                flex overflow-x-auto gap-4 px-4 pb-8 -mx-0 snap-x snap-mandatory 
                md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:pb-0 md:px-4 md:overflow-visible
                scrollbar-hide
              "
            >
              {servicesData.map((service, index) => (
                <div key={service.id} className="min-w-[85vw] sm:min-w-[350px] md:min-w-0 snap-center h-full">
                  <ScrollReveal delay={index * 50} className="h-full">
                    <ServiceCard item={service} index={index} />
                  </ScrollReveal>
                </div>
              ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Services;