import React from 'react';

interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: string;
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = 'bg-eco-accent',
  height = 'h-1',
  showLabel = false,
  label,
  className = '',
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full ${height} bg-stone-200 overflow-hidden relative`}>
        <div
          className={`h-full w-full ${color} transition-transform duration-300 ease-out origin-left`}
          style={{ transform: `scaleX(${clampedProgress / 100})` }}
        ></div>
      </div>
      {showLabel && label && (
        <div className="mt-2 text-xs font-mono text-stone-500 text-center">
          {label}
        </div>
      )}
    </div>
  );
};
