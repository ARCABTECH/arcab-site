'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export interface CustomSelectOption {
  value: string;
  label: string;
  description?: string;
}

interface CustomSelectFieldProps {
  label: string;
  name?: string;
  value: string;
  options: CustomSelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const CustomSelectField: React.FC<CustomSelectFieldProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  placeholder = 'Selecione uma opção...',
  required = false,
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`group relative ${className}`} ref={dropdownRef}>
      <label className="block font-mono text-xs font-bold uppercase mb-2 tracking-widest text-stone-600 group-focus-within:text-eco-dark transition-colors">
        {label}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          disabled={disabled}
          className={`w-full text-left bg-transparent border-b py-3 text-lg font-sans focus:outline-none transition-colors rounded-none flex items-center justify-between ${
            disabled
              ? 'border-stone-200 text-stone-400 cursor-not-allowed'
              : isOpen
                ? 'border-eco-primary'
                : 'border-stone-300 group-hover:border-stone-400'
          }`}
        >
          <span className={selectedOption ? 'text-eco-dark' : 'text-stone-500'}>
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown
            size={20}
            strokeWidth={1.5}
            className={`text-stone-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-eco-primary' : ''}`}
          />
        </button>

        {isOpen && !disabled && (
          <div className="absolute top-full left-0 w-full mt-1 bg-stone-50 border border-stone-800 shadow-sharp z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-left">
            <ul className="py-1 max-h-72 overflow-y-auto" role="listbox">
              {options.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => handleOptionSelect(option.value)}
                    className="w-full text-left px-4 py-3 font-mono text-stone-600 hover:bg-eco-accent hover:text-eco-dark transition-colors flex items-center justify-between group/opt"
                  >
                    <div>
                      <span className="text-sm font-bold">{option.label}</span>
                      {option.description && (
                        <span className="block text-xs text-stone-500 group-hover/opt:text-stone-700 mt-0.5">
                          {option.description}
                        </span>
                      )}
                    </div>
                    {value === option.value && (
                      <Check size={14} className="text-eco-primary group-hover/opt:text-eco-dark shrink-0 ml-2" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {name && <input type="hidden" name={name} value={value} required={required} />}
    </div>
  );
};
