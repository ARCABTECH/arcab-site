import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  rows?: number;
  as?: 'input' | 'textarea';
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  rows = 4,
  as = 'input',
  className = '',
}) => {
  const baseInputStyles = "w-full bg-transparent border-b border-stone-300 py-3 text-lg font-sans text-eco-dark focus:outline-none focus:border-eco-primary transition-colors placeholder-stone-500 rounded-none";
  
  return (
    <div className={`group ${className}`}>
      <label className="block font-mono text-xs font-bold uppercase mb-2 tracking-widest text-stone-600 group-focus-within:text-eco-dark transition-colors">
        {label}
      </label>
      {as === 'textarea' ? (
        <textarea
          name={name}
          required={required}
          rows={rows}
          value={value}
          onChange={onChange}
          className={`${baseInputStyles} resize-none`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className={baseInputStyles}
          placeholder={placeholder}
        />
      )}
      {error && (
        <p className="mt-1 text-xs font-mono text-red-600">{error}</p>
      )}
    </div>
  );
};
