import React from 'react';

interface CornerDecoratorsProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  hoverColor?: string;
  className?: string;
}

export const CornerDecorators: React.FC<CornerDecoratorsProps> = ({
  size = 'sm',
  color = 'border-stone-300',
  hoverColor = 'group-hover:border-eco-dark',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-2 h-2',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };
  
  const sizeClass = sizeMap[size];
  
  return (
    <>
      <div className={`absolute top-0 left-0 ${sizeClass} border-l border-t ${color} ${hoverColor} transition-colors ${className}`}></div>
      <div className={`absolute top-0 right-0 ${sizeClass} border-r border-t ${color} ${hoverColor} transition-colors ${className}`}></div>
      <div className={`absolute bottom-0 left-0 ${sizeClass} border-l border-b ${color} ${hoverColor} transition-colors ${className}`}></div>
      <div className={`absolute bottom-0 right-0 ${sizeClass} border-r border-b ${color} ${hoverColor} transition-colors ${className}`}></div>
    </>
  );
};
