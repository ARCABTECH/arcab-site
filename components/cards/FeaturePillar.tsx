import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeaturePillarProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: 'primary' | 'accent' | 'blue';
  className?: string;
}

export const FeaturePillar: React.FC<FeaturePillarProps> = ({
  icon: Icon,
  title,
  description,
  color = 'primary',
  className = '',
}) => {
  const colorMap = {
    primary: {
      icon: 'text-eco-primary',
      border: 'border-eco-primary',
      hoverBorder: 'group-hover:border-eco-primary',
    },
    accent: {
      icon: 'text-eco-accent',
      border: 'border-eco-accent',
      hoverBorder: 'group-hover:border-eco-accent',
    },
    blue: {
      icon: 'text-blue-500',
      border: 'border-blue-500',
      hoverBorder: 'group-hover:border-blue-500',
    },
  };

  const colors = colorMap[color];

  return (
    <div className={`flex items-start gap-4 group ${className}`}>
      <div className={`p-2 bg-stone-900 border border-stone-800 ${colors.icon} ${colors.hoverBorder} transition-colors`}>
        <Icon size={20} />
      </div>
      <div>
        <h4 className="font-sans font-bold text-lg text-white">{title}</h4>
        <p className="font-mono text-xs text-stone-500 mt-1">{description}</p>
      </div>
    </div>
  );
};
