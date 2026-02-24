import React from 'react';
import { ScrollReveal } from './ui/ScrollReveal';
import { SectionHeader } from './layout/SectionHeader';

const axioms = [
  {
    name: 'INOVAÇÃO',
    phrase: 'O limite não é barreira.\nÉ referência.',
    accentBg: 'bg-eco-primary',
    nameColor: 'text-stone-700',
  },
  {
    name: 'TRANSPARÊNCIA',
    phrase: 'Toda análise tem margem.\nToda entrega tem transparência.',
    accentBg: 'bg-eco-accent',
    nameColor: 'text-stone-700',
  },
  {
    name: 'QUALIDADE',
    phrase: 'Cada detalhe é uma decisão.\nCada decisão, um compromisso.',
    accentBg: 'bg-blue-500',
    nameColor: 'text-stone-700',
  },
];

const PurposeSection: React.FC = () => {
  return (
    <section id="proposito" className="bg-stone-100 py-16 md:py-20 px-4 border-t border-stone-200 content-deferred relative overflow-hidden">
      <div className="absolute top-12 left-0 font-sans font-bold text-[180px] leading-none text-stone-200/40 pointer-events-none select-none hidden md:block">
        ARCAB
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="mb-10 md:mb-14 max-w-2xl">
            <SectionHeader
              label="Nosso Propósito"
              title={<>O que nos move.</>}
            />
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-6 md:gap-10">
          {axioms.map((axiom, index) => {
            const isRight = index === 1;

            return (
              <ScrollReveal key={axiom.name} delay={index * 150}>
                <div
                  className={`relative max-w-xl py-6 px-6 md:px-10 ${
                    isRight
                      ? 'ml-0 md:ml-auto md:text-right'
                      : 'mr-auto'
                  }`}
                >
                  <div
                    className={`accent-bar absolute ${axiom.accentBg} origin-top ${
                      isRight
                        ? 'left-0 md:left-auto md:right-0 top-0 bottom-0 w-[3px]'
                        : 'left-0 top-0 bottom-0 w-[3px]'
                    }`}
                  />
                  <span className={`font-mono text-xs font-bold uppercase tracking-[0.2em] ${axiom.nameColor}`}>
                    {axiom.name}
                  </span>
                  <p className="font-sans text-xl md:text-2xl lg:text-3xl font-medium text-eco-dark leading-snug mt-3 whitespace-pre-line">
                    {axiom.phrase}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={500}>
          <div className="mt-10 md:mt-14 pt-6 border-t border-stone-300">
            <div className="text-center">
              <span className="font-mono text-2xl text-eco-accent leading-none select-none" aria-hidden="true">
                &#8756;
              </span>
              <p className="font-sans text-xl md:text-2xl text-eco-dark font-bold max-w-lg mx-auto leading-snug mt-4">
                Inovação, Transparência e Qualidade.
              </p>
              <p className="font-sans text-base md:text-lg text-stone-600 font-medium mt-2">
                O impacto é consequência.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PurposeSection;
