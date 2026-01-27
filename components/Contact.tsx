'use client'

import React, { useState, useRef, useEffect } from 'react';
import { BrutalistButton } from './ui/BrutalistButton';
import { Mail, ArrowRight, ChevronDown, Check } from 'lucide-react';
import { ScrollReveal } from './ui/ScrollReveal';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const interestOptions = [
    { value: 'analise', label: 'Análise de Dados & BI' },
    { value: 'web', label: 'Desenvolvimento Web & SaaS' },
    { value: 'api', label: 'APIs & Integrações' },
    { value: 'scraping', label: 'Web Scraping / ETL' },
    { value: 'outro', label: 'Consultoria Geral' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSelect = (value: string) => {
    setFormState({ ...formState, service: value });
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Mensagem recebida! Entraremos em contato em breve.');
        // Reset form
        setFormState({
          name: '',
          email: '',
          service: '',
          message: ''
        });
      } else {
        alert(data.error || 'Erro ao enviar mensagem. Tente novamente.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Erro ao enviar mensagem. Tente novamente.');
    }
  };

  const selectedLabel = interestOptions.find(opt => opt.value === formState.service)?.label;

  return (
    <section id="contato" className="py-24 px-4 bg-white border-t border-stone-200">
      <div className="max-w-5xl mx-auto">
        
        <ScrollReveal>
          <div className="text-center mb-16">
             <h2 className="font-sans font-medium text-4xl md:text-5xl mb-4">INICIAR UM PROJETO</h2>
             <p className="font-mono text-stone-500 text-sm max-w-lg mx-auto">
               Seu sistema precisa de refatoração ou escala?
               Nossa engenharia avalia a maturidade do seu ecossistema digital para propor a arquitetura ideal.
             </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="bg-stone-50 border border-stone-200 p-8 md:p-12 relative shadow-sharp-lg">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              
              <div className="space-y-6">
                <div className="group">
                  <label className="block font-mono text-[10px] font-bold uppercase mb-2 tracking-widest text-stone-400 group-focus-within:text-eco-dark transition-colors">Nome / Empresa</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-stone-300 py-3 text-lg font-sans text-eco-dark focus:outline-none focus:border-eco-primary transition-colors placeholder-stone-300 rounded-none"
                    placeholder="Seu nome"
                  />
                </div>

                <div className="group">
                  <label className="block font-mono text-[10px] font-bold uppercase mb-2 tracking-widest text-stone-400 group-focus-within:text-eco-dark transition-colors">Email Corporativo</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-stone-300 py-3 text-lg font-sans text-eco-dark focus:outline-none focus:border-eco-primary transition-colors placeholder-stone-300 rounded-none"
                    placeholder="email@empresa.com"
                  />
                </div>

                {/* Custom Styled Select Component */}
                <div className="group relative" ref={dropdownRef}>
                  <label className="block font-mono text-[10px] font-bold uppercase mb-2 tracking-widest text-stone-400 group-focus-within:text-eco-dark transition-colors">Área de Interesse</label>
                  
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`w-full text-left bg-transparent border-b ${isDropdownOpen ? 'border-eco-primary' : 'border-stone-300'} py-3 text-lg font-sans focus:outline-none transition-colors rounded-none flex items-center justify-between group-hover:border-stone-400`}
                    >
                      <span className={formState.service ? 'text-eco-dark' : 'text-stone-300'}>
                        {selectedLabel || "Selecione uma opção..."}
                      </span>
                      <ChevronDown 
                        size={20} 
                        strokeWidth={1.5} 
                        className={`text-stone-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-eco-primary' : ''}`} 
                      />
                    </button>

                    {/* The Custom Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 w-full mt-1 bg-stone-50 border border-stone-800 shadow-sharp z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-left">
                        <ul className="py-1">
                          {interestOptions.map((option) => (
                            <li key={option.value}>
                              <button
                                type="button"
                                onClick={() => handleSelect(option.value)}
                                className="w-full text-left px-4 py-3 text-sm font-mono text-stone-600 hover:bg-eco-accent hover:text-eco-dark transition-colors flex items-center justify-between group/opt"
                              >
                                {option.label}
                                {formState.service === option.value && (
                                  <Check size={14} className="text-eco-primary group-hover/opt:text-eco-dark" />
                                )}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  {/* Hidden input for form submission compatibility if needed later */}
                  <input type="hidden" name="service" value={formState.service} required />
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div className="group mb-8">
                  <label className="block font-mono text-[10px] font-bold uppercase mb-2 tracking-widest text-stone-400 group-focus-within:text-eco-dark transition-colors">Detalhes do Projeto</label>
                  <textarea 
                    name="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-stone-300 py-3 text-lg font-sans text-eco-dark focus:outline-none focus:border-eco-primary transition-colors resize-none placeholder-stone-300 rounded-none"
                    placeholder="Descreva brevemente sua necessidade..."
                  ></textarea>
                </div>

                <div className="flex flex-col gap-4">
                   <BrutalistButton type="submit" variant="primary" className="w-full justify-between group">
                    <span>Enviar Solicitação</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </BrutalistButton>
                  
                  <div className="flex items-center justify-center gap-2 text-stone-400 text-xs font-mono mt-2">
                    <Mail size={12} />
                    <span>contato@arcab.com.br</span>
                  </div>
                </div>
              </div>

            </form>
            
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-eco-dark"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-eco-dark"></div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Contact;