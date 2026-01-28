import React from 'react';

interface SectionHeaderProps {
  number?: string;
  label: string;
  title: string | React.ReactNode;
  description?: string;
  variant?: 'default' | 'dark' | 'centered';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  label,
  title,
  description,
  variant = 'default',
  className = '',
}) => {
  const isDark = variant === 'dark';
  const isCentered = variant === 'centered';
  
  const textColor = isDark ? 'text-stone-100' : 'text-eco-dark';
  const labelColor = isDark ? 'text-stone-400' : 'text-eco-dark';
  const descriptionColor = isDark ? 'text-stone-400' : 'text-stone-500';
  const accentColor = isDark ? 'bg-stone-400' : 'bg-eco-accent';
  const borderColor = isDark ? 'border-stone-800' : 'border-stone-200';

  return (
    <div className={`${isCentered ? 'text-center' : ''} ${className}`}>
      {label && (
        number ? (
          <div className={`inline-flex items-center gap-2 mb-4 ${isCentered ? 'justify-center' : ''}`}>
            <span className={`${accentColor} font-mono text-xs`}>{number}</span>
            <div className={`h-px w-8 ${accentColor}`}></div>
            <span className={`font-mono text-xs font-bold uppercase tracking-widest ${labelColor}`}>
              {label}
            </span>
          </div>
        ) : (
          <div className={`inline-flex items-center gap-2 mb-4 ${isCentered ? 'justify-center' : ''}`}>
            <div className={`w-2 h-2 ${accentColor} rounded-full`}></div>
            <span className={`font-mono text-xs font-bold uppercase tracking-widest ${labelColor}`}>
              {label}
            </span>
          </div>
        )
      )}
      
      <h2 className={`font-sans font-medium text-4xl md:text-5xl mb-6 ${textColor} leading-tight`}>
        {title}
      </h2>
      
      {description && (
        <p className={`font-mono text-sm md:text-base ${descriptionColor} ${isCentered ? 'max-w-lg mx-auto' : 'max-w-md'} ${variant === 'default' ? 'border-l-2 ' + borderColor + ' pl-4' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
};
