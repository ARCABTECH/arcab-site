'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { BrutalistButton } from './ui/BrutalistButton';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [showDesktopVisual, setShowDesktopVisual] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const updateDesktopVisual = () => setShowDesktopVisual(mediaQuery.matches);

    updateDesktopVisual();
    mediaQuery.addEventListener('change', updateDesktopVisual);

    return () => {
      mediaQuery.removeEventListener('change', updateDesktopVisual);
    };
  }, []);

  const scrollToWithOffset = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const nav = document.querySelector('nav');
    const navHeight = nav instanceof HTMLElement ? nav.offsetHeight : 0;
    const y = element.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;

    window.scrollTo({
      top: Math.max(0, y),
      behavior: 'smooth',
    });
  };

  const scrollToServices = () => {
    scrollToWithOffset('servicos');
  };

  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center py-20 px-4 max-w-7xl mx-auto overflow-hidden">
      
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#0C0A09 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 w-full relative z-10 items-center">
        
        <div className="flex flex-col items-start">
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
              <BrutalistButton variant="outline" onClick={() => scrollToWithOffset('contato')}>
                Falar com a ARCAB
              </BrutalistButton>
            </div>
            
        </div>

        <div className="relative hidden lg:block h-full min-h-[560px]" aria-hidden={!showDesktopVisual}>
          {showDesktopVisual && (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Main image panel */}
              <div className="relative z-10 w-[660px] h-[440px] border-2 border-eco-dark bg-white shadow-sharp-lg overflow-hidden">
                <Image
                  src="/assets/hero-1200.webp"
                  alt="Equipe colaborando em projeto de dados e software"
                  fill
                  sizes="660px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Hero;
