'use client'

import React, { useMemo, useState } from 'react';
import { BrutalistButton } from './ui/BrutalistButton';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';
import { ScrollReveal } from './ui/ScrollReveal';
import { useToast } from './ui/useToast';
import { ToastContainer } from './ui/Toast';
import { SectionHeader } from './layout/SectionHeader';
import { FormField } from './forms/FormField';
import { CustomCheckbox } from './forms/CustomCheckbox';
import { CustomSelectField } from './forms/CustomSelectField';
import { CornerDecorators } from './layout/CornerDecorators';
import {
  DynamicFieldSchema,
  FieldOption,
  MAIN_AREAS,
  MainAreaId,
  OTHER_SERVICE_FIELDS,
  getSubServiceById,
  getSubServicesByArea,
} from '@/data/serviceFormSchemas';

type DynamicAnswers = Record<string, string | string[]>;

const getOptionLabel = (options: FieldOption[] | undefined, value: string): string =>
  options?.find((option) => option.value === value)?.label ?? value;

const isFieldVisible = (field: DynamicFieldSchema, answers: DynamicAnswers): boolean => {
  if (!field.condition) {
    return true;
  }
  const conditionValue = answers[field.condition.fieldId];
  return typeof conditionValue === 'string' && conditionValue === field.condition.equals;
};

const isMissingFieldValue = (field: DynamicFieldSchema, value: string | string[] | undefined): boolean => {
  if (!field.required) {
    return false;
  }

  if (field.type === 'multi-select') {
    return !Array.isArray(value) || value.length === 0;
  }

  return typeof value !== 'string' || value.trim() === '';
};

const formatFieldValue = (field: DynamicFieldSchema, value: string | string[] | undefined): string => {
  if (field.type === 'multi-select') {
    if (!Array.isArray(value) || value.length === 0) {
      return '';
    }
    return value.map((item) => getOptionLabel(field.options, item)).join(', ');
  }

  if (typeof value !== 'string' || value.trim() === '') {
    return '';
  }

  if (field.type === 'single-select') {
    return getOptionLabel(field.options, value);
  }

  return value;
};

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    mainArea: '',
    subService: '',
    message: ''
  });
  const [dynamicAnswers, setDynamicAnswers] = useState<DynamicAnswers>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number | null>(null);
  const { toasts, showToast, removeToast } = useToast();

  // Rate limiting: máximo 1 envio a cada 30 segundos
  const RATE_LIMIT_MS = 30000;

  const currentArea = formState.mainArea as MainAreaId | '';
  const availableSubServices = useMemo(
    () => (currentArea ? getSubServicesByArea(currentArea) : []),
    [currentArea]
  );
  const selectedSubService = formState.subService ? getSubServiceById(formState.subService) : undefined;
  const dynamicFieldSchema = currentArea === 'outro'
    ? OTHER_SERVICE_FIELDS
    : selectedSubService?.fields ?? [];
  const visibleDynamicFields = dynamicFieldSchema.filter((field) => isFieldVisible(field, dynamicAnswers));
  const mainAreaOptions = useMemo(
    () =>
      MAIN_AREAS.map((option) => ({
        value: option.value,
        label: option.label,
        description: option.hint,
      })),
    []
  );
  const subServiceOptions = useMemo(
    () =>
      availableSubServices.map((subService) => ({
        value: subService.id,
        label: subService.label,
        description: subService.description,
      })),
    [availableSubServices]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleAreaSelect = (value: MainAreaId) => {
    setFormState({ ...formState, mainArea: value, subService: '' });
    setDynamicAnswers({});
  };

  const handleSubServiceChange = (value: string) => {
    setFormState({
      ...formState,
      subService: value,
    });
    setDynamicAnswers({});
  };

  const updateDynamicText = (fieldId: string, value: string) => {
    setDynamicAnswers((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const toggleDynamicMultiSelect = (fieldId: string, value: string) => {
    setDynamicAnswers((prev) => {
      const current = prev[fieldId];
      const currentArray = Array.isArray(current) ? current : [];
      const next = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];
      return { ...prev, [fieldId]: next };
    });
  };

  const renderDynamicField = (field: DynamicFieldSchema) => {
    const fieldValue = dynamicAnswers[field.id];
    const labelClassName =
      'block font-mono text-xs font-bold uppercase mb-2 tracking-widest text-stone-600';
    const inputClassName =
      'w-full bg-transparent border-b border-stone-300 py-3 text-lg font-sans text-eco-dark focus:outline-none focus:border-eco-primary transition-colors placeholder-stone-500 rounded-none';

    if (field.type === 'textarea') {
      return (
        <div key={field.id} className="group">
          <label className={labelClassName}>{field.label}</label>
          <textarea
            rows={4}
            value={typeof fieldValue === 'string' ? fieldValue : ''}
            onChange={(event) => updateDynamicText(field.id, event.target.value)}
            className={`${inputClassName} resize-none`}
            placeholder={field.placeholder}
            required={field.required}
          />
          {field.helpText && <p className="mt-1 text-xs font-mono text-stone-500">{field.helpText}</p>}
        </div>
      );
    }

    if (field.type === 'single-select') {
      return (
        <div key={field.id}>
          <CustomSelectField
            label={field.label}
            value={typeof fieldValue === 'string' ? fieldValue : ''}
            options={(field.options ?? []).map((option) => ({
              value: option.value,
              label: option.label,
            }))}
            onChange={(value) => updateDynamicText(field.id, value)}
            placeholder="Selecione uma opção..."
            required={field.required}
          />
          {field.helpText && <p className="mt-1 text-xs font-mono text-stone-500">{field.helpText}</p>}
        </div>
      );
    }

    if (field.type === 'multi-select') {
      const selected = Array.isArray(fieldValue) ? fieldValue : [];
      return (
        <div key={field.id} className="group">
          <label className={labelClassName}>{field.label}</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
            {field.options?.map((option) => {
              const checked = selected.includes(option.value);
              return (
                <label
                  key={option.value}
                  className="block"
                >
                  <CustomCheckbox
                    checked={checked}
                    onChange={() => toggleDynamicMultiSelect(field.id, option.value)}
                    label={option.label}
                  />
                </label>
              );
            })}
          </div>
          {field.helpText && <p className="mt-1 text-xs font-mono text-stone-500">{field.helpText}</p>}
        </div>
      );
    }

    return (
      <div key={field.id} className="group">
        <label className={labelClassName}>{field.label}</label>
        <input
          type="text"
          value={typeof fieldValue === 'string' ? fieldValue : ''}
          onChange={(event) => updateDynamicText(field.id, event.target.value)}
          className={inputClassName}
          placeholder={field.placeholder}
          required={field.required}
        />
        {field.helpText && <p className="mt-1 text-xs font-mono text-stone-500">{field.helpText}</p>}
      </div>
    );
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
    if (!formState.name || !formState.email || !formState.mainArea || !formState.message) {
      showToast('Por favor, preencha todos os campos.', 'error');
      return;
    }

    if (formState.mainArea !== 'outro' && !formState.subService) {
      showToast('Selecione um subserviço antes de enviar.', 'error');
      return;
    }

    const firstMissingField = visibleDynamicFields.find((field) =>
      isMissingFieldValue(field, dynamicAnswers[field.id])
    );

    if (firstMissingField) {
      showToast(`Preencha o campo "${firstMissingField.label}".`, 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      
      if (!accessKey) {
        throw new Error('Chave de acesso Web3Forms não configurada');
      }

      const selectedArea = MAIN_AREAS.find((opt) => opt.value === formState.mainArea);
      const areaLabel = selectedArea?.label || formState.mainArea;
      const subServiceLabel = formState.mainArea === 'outro'
        ? 'Outro tipo de serviço'
        : selectedSubService?.label || formState.subService;

      const detailsLines = visibleDynamicFields
        .map((field) => {
          const formattedValue = formatFieldValue(field, dynamicAnswers[field.id]);
          if (!formattedValue) {
            return '';
          }
          return `${field.label}: ${formattedValue}`;
        })
        .filter(Boolean);

      const prazoInvestimentoLines = detailsLines.filter(
        (line) => line.startsWith('Prazo') || line.startsWith('Faixa de investimento')
      );
      const briefingLines = detailsLines.filter(
        (line) => !line.startsWith('Prazo') && !line.startsWith('Faixa de investimento')
      );
      const combinedMessage = [
        'RESUMO DO PROJETO',
        formState.message || 'Não informado.',
        '',
        'ESCOPO SOLICITADO',
        `Área: ${areaLabel}`,
        `Subserviço: ${subServiceLabel}`,
        '',
        'DETALHES DO BRIEFING',
        ...(briefingLines.length > 0 ? briefingLines.map((line) => `- ${line}`) : ['- Sem detalhes adicionais.']),
        '',
        'PRAZO E INVESTIMENTO',
        ...(prazoInvestimentoLines.length > 0 ? prazoInvestimentoLines.map((line) => `- ${line}`) : ['- Não informado.']),
      ].join('\n');
      
      const formData = new FormData();
      formData.append('access_key', accessKey);
      formData.append('subject', `Nova solicitação: ${areaLabel} - ${subServiceLabel}`);
      formData.append('from_name', formState.name);
      formData.append('email', formState.email);
      formData.append('name', formState.name);
      formData.append('service', `${areaLabel} > ${subServiceLabel}`);
      formData.append('message', combinedMessage);

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
          mainArea: '',
          subService: '',
          message: ''
        });
        setDynamicAnswers({});
      } else {
        showToast(
          data.message || 'Erro ao enviar mensagem. Por favor, tente novamente.',
          'error'
        );
      }
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error submitting form:', error);
      }
      showToast('Erro ao enviar mensagem. Por favor, tente novamente mais tarde.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-24 px-4 bg-white border-t border-stone-200 relative z-10 scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        
        <ScrollReveal>
          <div className="mb-16">
            <SectionHeader
              label=""
              title="INICIAR UM PROJETO"
              description="Integramos engenharia de dados e desenvolvimento de software para transformar contexto de negócio em solução escalável, da arquitetura à entrega."
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

                <CustomSelectField
                  label="Grande Área"
                  name="mainArea"
                  value={formState.mainArea}
                  options={mainAreaOptions}
                  onChange={(value) => handleAreaSelect(value as MainAreaId)}
                  placeholder="Selecione uma opção..."
                  required
                />

                <CustomSelectField
                  label="Subserviço"
                  name="subService"
                  value={formState.subService}
                  options={subServiceOptions}
                  onChange={handleSubServiceChange}
                  placeholder={
                    formState.mainArea
                      ? formState.mainArea === 'outro'
                        ? 'Não se aplica para "Outro tipo de serviço"'
                        : 'Selecione o subserviço...'
                      : 'Selecione a grande área primeiro'
                  }
                  required={formState.mainArea !== 'outro'}
                  disabled={!formState.mainArea || formState.mainArea === 'outro'}
                />
              </div>

              <div className="flex flex-col justify-between">
                <div className="mb-8">
                  <FormField
                    label="Descrição Geral do Projeto"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Descreva brevemente sua necessidade principal..."
                    required
                    rows={4}
                    as="textarea"
                  />
                </div>
                {formState.mainArea === 'outro' && (
                  <div className="text-xs font-mono text-stone-600 border border-stone-200 bg-transparent p-3">
                    Fluxo aberto ativo: responda os campos de briefing abaixo.
                  </div>
                )}
              </div>

              {visibleDynamicFields.length > 0 && (
                <div className="md:col-span-2 border border-stone-200 bg-transparent p-6 md:p-8 space-y-6">
                  <p className="font-mono text-xs font-bold uppercase tracking-widest text-stone-600">
                    Briefing Específico
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {visibleDynamicFields.map((field) => (
                      <div key={field.id} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                        {renderDynamicField(field)}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="md:col-span-2 flex flex-col gap-4">
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
                
                <div className="flex items-center justify-center gap-2 text-stone-600 text-xs font-mono mt-2">
                  <Mail size={12} />
                  <span>contato@arcab.com.br</span>
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