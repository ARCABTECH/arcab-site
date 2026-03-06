'use client'

import React from 'react';
import { Check } from 'lucide-react';

interface CustomCheckboxProps {
  checked: boolean;
  label: string;
  onChange: () => void;
  disabled?: boolean;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  label,
  onChange,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className={`w-full text-left flex items-center gap-3 py-2 transition-colors ${
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
      }`}
    >
      <span
        className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${
          checked
            ? 'border-eco-primary bg-eco-accent text-eco-dark'
            : 'border-stone-400 bg-transparent text-transparent'
        }`}
      >
        <Check size={13} strokeWidth={2.5} />
      </span>
      <span className="text-sm font-sans text-stone-700">{label}</span>
    </button>
  );
};
