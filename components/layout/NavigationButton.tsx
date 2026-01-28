import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  ariaLabel?: string;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  direction,
  onClick,
  variant = 'secondary',
  className = '',
  ariaLabel,
}) => {
  const isPrimary = variant === 'primary';
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
  
  const baseStyles = "w-12 h-12 flex items-center justify-center border border-stone-800 shadow-sharp active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all group";
  
  const variantStyles = isPrimary
    ? "bg-eco-dark text-white hover:bg-eco-accent hover:text-eco-dark"
    : "bg-white hover:bg-eco-dark hover:text-white";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
      aria-label={ariaLabel || `${direction === 'left' ? 'Previous' : 'Next'} item`}
    >
      <Icon size={20} strokeWidth={1.5} className="group-active:scale-90 transition-transform" />
    </button>
  );
};
