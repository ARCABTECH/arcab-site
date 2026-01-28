'use client'

import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error';

export interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`transform transition-all duration-300 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div
        className={`
          bg-white border-2 border-eco-dark shadow-sharp-lg
          px-6 py-4 min-w-[320px] max-w-md
          flex items-center gap-4
          font-mono text-sm
          ${type === 'success' ? 'text-eco-dark' : 'text-eco-dark'}
        `}
      >
        <div className="flex-shrink-0">
          {type === 'success' ? (
            <CheckCircle2 size={20} className="text-eco-primary" strokeWidth={2} />
          ) : (
            <XCircle size={20} className="text-red-600" strokeWidth={2} />
          )}
        </div>
        
        <p className="flex-1 font-sans text-eco-dark leading-relaxed">{message}</p>
        
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 hover:bg-stone-100 transition-colors rounded-none focus:outline-none focus:ring-2 focus:ring-eco-primary"
          aria-label="Fechar notificação"
        >
          <X size={16} className="text-stone-600" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

// Toast Container Component
export interface ToastContainerProps {
  toasts: Array<{ id: string; message: string; type: ToastType }>;
  removeToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          style={{ 
            transform: `translateY(${index * 8}px)`,
            zIndex: 50 + index 
          }}
        >
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
};
