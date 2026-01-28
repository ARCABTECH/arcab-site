'use client'

import React, { useRef, useState, useEffect } from 'react';
import { servicesData } from '../data/servicesData';
import { Terminal } from 'lucide-react';
import { ScrollReveal } from './ui/ScrollReveal';
import { SectionHeader } from './layout/SectionHeader';
import { ServiceCard } from './cards/ServiceCard';
import { ProgressBar } from './indicators/ProgressBar';
import { NavigationButton } from './layout/NavigationButton';

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
              <SectionHeader
                number="01"
                label="Nossos Serviços"
                title={
                  <>
                    Arquitetura de soluções <br/> ponta a ponta.
                  </>
                }
                description="Atuamos em duas frentes complementares: extração de valor dos dados e desenvolvimento de sistemas de alto desempenho."
              />
            </div>
          </ScrollReveal>
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
                flex overflow-x-auto gap-4 px-4 pb-4 -mx-0 snap-x snap-mandatory 
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

        {/* Progress Bar (Visible on mobile mostly) - Below cards */}
        <div className="md:hidden px-4 mt-4 mb-4">
          <ProgressBar progress={scrollProgress} />
        </div>

        {/* Mobile Navigation Controls - Below cards, centered */}
        <div className="px-4 md:hidden flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Navigation_Control</span>
            <div className="flex items-center gap-2 text-[10px] font-mono text-eco-dark">
              <Terminal size={12} className="text-eco-accent" />
              <span>{scrollProgress.toFixed(0)}% VIEWED</span>
            </div>
          </div>
          
          <div className="flex gap-3 justify-center">
            <NavigationButton
              direction="left"
              onClick={() => scroll('left')}
              variant="secondary"
              ariaLabel="Previous service"
            />
            <NavigationButton
              direction="right"
              onClick={() => scroll('right')}
              variant="primary"
              ariaLabel="Next service"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;