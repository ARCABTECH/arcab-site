'use client'

import React, { useState, useRef, useEffect } from 'react';
import { BrutalistButton } from './ui/BrutalistButton';
import { Mail, ArrowRight, ChevronDown, Check, Loader2 } from 'lucide-react';
import { ScrollReveal } from './ui/ScrollReveal';
import { useToast } from './ui/useToast';
import { ToastContainer } from './ui/Toast';
import { SectionHeader } from './layout/SectionHeader';
import { FormField } from './forms/FormField';
import { CornerDecorators } from './layout/CornerDecorators';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toasts, showToast, removeToast } = useToast();

  // Rate limiting: máximo 1 envio a cada 30 segundos
  const RATE_LIMIT_MS = 30000;

  const interestOptions = [
    { value: 'engenharia-dados', label: 'Engenharia de Dados', hint: 'Scraping, ETL, Consultoria' },
    { value: 'inteligencia-dados', label: 'Inteligência de Dados', hint: 'Dashboards, NLP & IA, Preditiva' },
    { value: 'engenharia-software', label: 'Engenharia de Software', hint: 'SaaS, APIs, Web Apps, RPA' },
    { value: 'outro', label: 'Outro', hint: 'Descreva nos detalhes do projeto' },
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
    
    // Rate limiting check
    const now = Date.now();
    if (lastSubmissionTime && (now - lastSubmissionTime) < RATE_LIMIT_MS) {
      const remainingSeconds = Math.ceil((RATE_LIMIT_MS - (now - lastSubmissionTime)) / 1000);
      showToast(
        `Aguarde ${remainingSeconds} segundo${remainingSeconds > 1 ? 's' : ''} antes de enviar novamente.`,
        'error'
      );
      return;
    }

    // Validação básica
    if (!formState.name || !formState.email || !formState.service || !formState.message) {
      showToast('Por favor, preencha todos os campos.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      
      if (!accessKey) {
        throw new Error('Chave de acesso Web3Forms não configurada');
      }

      const selectedLabel = interestOptions.find(opt => opt.value === formState.service)?.label || formState.service;
      
      const formData = new FormData();
      formData.append('access_key', accessKey);
      formData.append('subject', `Nova solicitação: ${selectedLabel}`);
      formData.append('from_name', formState.name);
      formData.append('email', formState.email);
      formData.append('name', formState.name);
      formData.append('service', selectedLabel);
      formData.append('message', formState.message);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        showToast('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        setLastSubmissionTime(Date.now());
        
        // Reset form
        setFormState({
          name: '',
          email: '',
          service: '',
          message: ''
        });
      } else {
        showToast(
          data.message || 'Erro ao enviar mensagem. Por favor, tente novamente.',
          'error'
        );
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showToast('Erro ao enviar mensagem. Por favor, tente novamente mais tarde.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedLabel = interestOptions.find(opt => opt.value === formState.service)?.label;

  return (
    <section id="contato" className="py-24 px-4 bg-white border-t border-stone-200 relative z-10">
      <div className="max-w-5xl mx-auto">
        
        <ScrollReveal>
          <div className="mb-16">
            <SectionHeader
              label=""
              title="INICIAR UM PROJETO"
              description="Seu sistema precisa de refatoração ou escala? Nossa engenharia avalia a maturidade do seu ecossistema digital para propor a arquitetura ideal."
              variant="centered"
              className="text-center"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="bg-stone-50 border border-stone-200 p-8 md:p-12 relative shadow-sharp-lg">
            <CornerDecorators size="md" color="border-eco-dark" hoverColor="" />
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              
              <div className="space-y-6">
                <FormField
                  label="Nome / Empresa"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  required
                />

                <FormField
                  label="Email Corporativo"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="email@empresa.com"
                  required
                />

                {/* Custom Styled Select Component */}
                <div className="group relative" ref={dropdownRef}>
                  <label className="block font-mono text-xs font-bold uppercase mb-2 tracking-widest text-stone-400 group-focus-within:text-eco-dark transition-colors">Área de Interesse</label>
                  
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
                                className="w-full text-left px-4 py-3 font-mono text-stone-600 hover:bg-eco-accent hover:text-eco-dark transition-colors flex items-center justify-between group/opt"
                              >
                                <div>
                                  <span className="text-sm font-bold">{option.label}</span>
                                  <span className="block text-xs text-stone-400 group-hover/opt:text-stone-600 mt-0.5">{option.hint}</span>
                                </div>
                                {formState.service === option.value && (
                                  <Check size={14} className="text-eco-primary group-hover/opt:text-eco-dark shrink-0 ml-2" />
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
                <div className="mb-8">
                  <FormField
                    label="Detalhes do Projeto"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Descreva brevemente sua necessidade..."
                    required
                    rows={4}
                    as="textarea"
                  />
                </div>

                <div className="flex flex-col gap-4">
                   <BrutalistButton 
                    type="submit" 
                    variant="primary" 
                    className="w-full justify-between group"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}</span>
                    {isSubmitting ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    )}
                  </BrutalistButton>
                  
                  <div className="flex items-center justify-center gap-2 text-stone-400 text-xs font-mono mt-2">
                    <Mail size={12} />
                    <span>contato@arcab.com.br</span>
                  </div>
                </div>
              </div>

            </form>
          </div>
        </ScrollReveal>
      </div>
      
      {/* Toast Container */}
      {toasts.length > 0 && (
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      )}
    </section>
  );
};

export default Contact;