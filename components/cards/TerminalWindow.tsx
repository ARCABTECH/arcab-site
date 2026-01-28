import React from 'react';

interface LogEntry {
  time?: string;
  type?: string;
  message: string;
  client?: string;
}

interface TerminalWindowProps {
  title: string;
  logs?: LogEntry[];
  children?: React.ReactNode;
  className?: string;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title,
  logs,
  children,
  className = '',
}) => {
  return (
    <div className={`bg-eco-dark rounded-sm p-1 shadow-sharp-lg overflow-hidden max-w-[100vw] ${className}`}>
      {/* Terminal Bar */}
      <div className="bg-stone-800 px-4 py-2 flex items-center justify-between rounded-t-sm mb-1">
        <span className="font-mono text-[10px] text-stone-400 truncate mr-2">{title}</span>
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
        </div>
      </div>
      
      {/* Terminal Content */}
      <div className="bg-black/90 p-4 md:p-6 font-mono text-xs md:text-sm h-full min-h-[300px] flex flex-col justify-end relative">
        {children || (
          <div className="space-y-4 pb-2">
            {logs?.map((log, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3 border-b border-white/5 md:border-none pb-3 md:pb-0 last:border-0">
                {log.time && log.type && (
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-stone-500 whitespace-nowrap">[{log.time}]</span>
                    <span className={`font-bold whitespace-nowrap ${
                      log.type === 'SUCCESS' ? 'text-green-500' : 
                      log.type === 'DEPLOY' ? 'text-blue-500' :
                      log.type === 'OPTIMIZE' ? 'text-purple-500' : 'text-yellow-500'
                    }`}>{log.type}:</span>
                  </div>
                )}
                <div className="flex-grow flex flex-col md:flex-row md:justify-between gap-1">
                  <span className="text-stone-300 break-words leading-relaxed">{log.message}</span>
                  {log.client && (
                    <span className="text-stone-600 opacity-50 text-[10px] md:text-xs whitespace-nowrap shrink-0">//{log.client}</span>
                  )}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 mt-4 animate-pulse">
              <span className="text-eco-accent font-bold">{'>'}</span>
              <span className="w-2 h-4 bg-eco-accent block"></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
