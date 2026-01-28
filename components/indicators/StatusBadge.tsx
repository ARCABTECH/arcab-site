import React from 'react';

interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'info' | 'running' | 'waiting';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  size = 'sm',
  showDot = true,
  className = '',
}) => {
  const colorMap = {
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    running: 'bg-green-500',
    waiting: 'bg-amber-500',
  };

  const sizeMap = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  const textSizeMap = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showDot && (
        <div className={`${sizeMap[size]} ${colorMap[status]} rounded-full`}></div>
      )}
      {label && (
        <span className={`${textSizeMap[size]} font-mono text-stone-400`}>
          {label}
        </span>
      )}
    </div>
  );
};
