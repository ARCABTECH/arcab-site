import React from 'react';
import { ScrollReveal } from './ui/ScrollReveal';
import { Users, Workflow, Code2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const pillars: { name: string; icon: LucideIcon; phrase: string; meta: string; number: string; accent: string; accentBorder: string; accentBg: string }[] = [
  {
    name: 'PESSOAS',
    icon: Users,
    phrase: 'Quem transforma dados em decisões reais.',
    meta: 'role: "decisão"',
    number: '01',
    accent: 'text-eco-primary',
    accentBorder: 'border-t-eco-primary',
    accentBg: 'bg-eco-primary',
  },
  {
    name: 'PROCESSOS',
    icon: Workflow,
    phrase: 'Automatizamos o repetitivo para liberar o estratégico.',
    meta: 'mode: "automação"',
    number: '02',
    accent: 'text-eco-accent',
    accentBorder: 'border-t-eco-accent',
    accentBg: 'bg-eco-accent',
  },
  {
    name: 'TECNOLOGIA',
    icon: Code2,
    phrase: 'Engenharia que escala, performa e dura.',
    meta: 'arch: "robusta"',
    number: '03',
    accent: 'text-blue-500',
    accentBorder: 'border-t-blue-500',
    accentBg: 'bg-blue-500',
  },
];

const PillarCard: React.FC<{ pillar: typeof pillars[0] }> = ({ pillar }) => (
  <div className={`group relative bg-stone-950 border border-stone-800 hover:border-stone-600 transition-all duration-300 p-8 overflow-hidden h-full`}>
    {/* Top accent bar */}
    <div className={`absolute top-0 left-0 right-0 h-[3px] ${pillar.accentBg}`}></div>

    {/* Background number */}
    <div className="absolute -right-2 -top-4 font-sans font-bold text-[120px] leading-none text-white/[0.03] pointer-events-none select-none">
      {pillar.number}
    </div>

    {/* Icon */}
    <div className="relative z-10 mb-6">
      <pillar.icon size={40} strokeWidth={1.5} className={`${pillar.accent} group-hover:scale-110 transition-transform duration-300`} />
    </div>

    {/* Pillar name */}
    <p className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-stone-200 mb-4 relative z-10">
      {pillar.name}
    </p>

    {/* Phrase */}
    <p className="font-sans text-lg text-white leading-snug mb-6 relative z-10">
      {pillar.phrase}
    </p>

    {/* Metadata */}
    <div className="font-mono text-xs text-stone-400 border-t border-stone-800 pt-4 relative z-10 group-hover:text-stone-300 transition-colors">
      {pillar.meta}
    </div>
  </div>
);

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-24 px-4 bg-eco-dark text-stone-100 relative overflow-hidden content-deferred scroll-mt-24">
      {/* Decorative large text background */}
      <div className="absolute top-20 right-0 font-sans font-bold text-[200px] leading-none text-white/[0.01] pointer-events-none select-none">
        ARCAB
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 mb-6 justify-center">
              <div className="w-2 h-2 bg-eco-accent"></div>
              <span className="font-mono text-xs text-stone-300 tracking-widest uppercase">A Empresa</span>
            </div>
            <h2 className="font-sans text-3xl md:text-5xl leading-tight font-medium mb-4">
              O <span className="text-eco-accent">arcabouço</span> completo.
            </h2>
            <p className="font-mono text-sm md:text-base text-stone-300 max-w-lg mx-auto">
              Pessoas, processos e tecnologia trabalhando juntos.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {pillars.map((pillar, index) => (
            <ScrollReveal key={pillar.name} delay={100 + index * 100} className="h-full">
              <PillarCard pillar={pillar} />
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom tagline */}
        <ScrollReveal delay={400}>
          <div className="mt-12 md:mt-16 text-center">
            <p className="font-mono text-xs text-stone-300 uppercase tracking-widest">
              Melhorando a vida de pessoas e empresas com tecnologia.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default About;
