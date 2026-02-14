'use client'

import React from 'react';
import { pillarsData } from '../data/servicesData';
import { ScrollReveal } from './ui/ScrollReveal';
import { SectionHeader } from './layout/SectionHeader';
import { PillarCard } from './cards/PillarCard';

const Services: React.FC = () => {
  return (
    <section id="servicos" className="relative bg-white border-t border-stone-300 pt-8 pb-24 overflow-hidden content-deferred">
      
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
                description="Três pilares complementares: da engenharia de dados à inteligência analítica e ao software que operacionaliza tudo."
              />
            </div>
          </ScrollReveal>
        </div>

        {/* 3 Pillar Cards: stack on mobile, 3-col grid on desktop */}
        <div className="px-4 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {pillarsData.map((pillar, index) => (
            <ScrollReveal key={pillar.id} delay={index * 100} className="h-full">
              <PillarCard item={pillar} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
