'use client'

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { BrutalistButton } from './ui/BrutalistButton';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const nav = document.querySelector('nav');
      const navHeight = nav instanceof HTMLElement ? nav.offsetHeight : 0;
      const y = element.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;

      window.scrollTo({
        top: Math.max(0, y),
        behavior: 'smooth',
      });
      setIsOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-eco-base/90 backdrop-blur-md border-b border-eco-dark/10 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => scrollTo('hero')}>
            <div className="relative h-[51.2px] w-[192px]">
              <Image
                src="/assets/main-logo.svg"
                alt="ARCAB Logo"
                width={192}
                height={70}
                className="h-[51.2px] w-auto transition-opacity duration-200 group-hover:opacity-0"
                priority
                fetchPriority="high"
              />
              <Image
                src="/assets/main-logo-hover.svg"
                alt=""
                width={192}
                height={70}
                className="absolute inset-0 h-[51.2px] w-auto opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-mono text-sm tracking-wide text-eco-dark">
            <button onClick={() => scrollTo('servicos')} className="hover:text-eco-primary transition-colors">Serviços</button>
            <button onClick={() => scrollTo('sobre')} className="hover:text-eco-primary transition-colors">Arcabouço</button>
            <button onClick={() => scrollTo('proposito')} className="hover:text-eco-primary transition-colors">Propósito</button>
            <BrutalistButton onClick={() => scrollTo('contato')} variant="secondary" className="px-5 py-2 text-xs shadow-none hover:shadow-sharp border-eco-dark">
              Fale Conosco
            </BrutalistButton>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-eco-dark p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-stone-200 transition-colors"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-eco-base border-b border-eco-dark absolute w-full left-0 animate-in slide-in-from-top-2 z-50 shadow-xl">
          <div className="px-6 pt-6 pb-12 space-y-6 flex flex-col items-start font-mono text-eco-dark">
            <button 
              onClick={() => scrollTo('servicos')} 
              className="text-2xl font-light hover:pl-4 transition-all duration-300"
            >
              Serviços
            </button>
            <button 
              onClick={() => scrollTo('sobre')} 
              className="text-2xl font-light hover:pl-4 transition-all duration-300"
            >
              Arcabouço
            </button>
            <button 
              onClick={() => scrollTo('proposito')} 
              className="text-2xl font-light hover:pl-4 transition-all duration-300"
            >
              Propósito
            </button>
            <div className="pt-8 w-full">
              <BrutalistButton onClick={() => scrollTo('contato')} className="w-full">
                Fale Conosco
              </BrutalistButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;