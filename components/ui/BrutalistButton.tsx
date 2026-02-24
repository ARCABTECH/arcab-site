import React from 'react';

interface BrutalistButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  children: React.ReactNode;
  className?: string;
}

type BrutalistButtonAnchorProps = BrutalistButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type BrutalistButtonNativeProps = BrutalistButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type BrutalistButtonProps = BrutalistButtonAnchorProps | BrutalistButtonNativeProps;

export const BrutalistButton: React.FC<BrutalistButtonProps> = ({
  variant = 'primary', 
  children, 
  className = '',
  ...props
}) => {
  const baseStyles = "px-6 py-3 font-medium text-base transition-all duration-200 border border-eco-dark font-mono uppercase tracking-wide flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-eco-accent text-eco-dark shadow-sharp hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-sharp-hover",
    // Updated secondary to have green hover effect
    secondary: "bg-eco-dark text-white shadow-sharp hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-sharp-hover hover:bg-eco-accent hover:text-eco-dark hover:border-eco-accent",
    outline: "bg-transparent text-eco-dark hover:bg-eco-dark hover:text-white",
    ghost: "border-transparent hover:bg-stone-100 shadow-none hover:shadow-none",
  };

  if ('href' in props && typeof props.href === 'string') {
    return (
      <a className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};