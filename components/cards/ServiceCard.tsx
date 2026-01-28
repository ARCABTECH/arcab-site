import React from 'react';
import { ServiceItem } from '../../data/servicesData';
import { ScanBarcode, Hash, Cpu } from 'lucide-react';
import { CornerDecorators } from '../layout/CornerDecorators';

interface ServiceCardProps {
  item: ServiceItem;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ item, index }) => {
  const isDev = item.category === 'Desenvolvimento';
  const serialNumber = (index + 1).toString().padStart(2, '0');
  
  return (
    <div className="group border border-stone-200 bg-stone-50 p-6 md:p-8 hover:border-eco-dark transition-all duration-300 relative flex flex-col h-full hover:bg-white hover:shadow-sharp min-h-[320px]">
      
      <CornerDecorators />

      {/* Top Header: Icon & Serial */}
      <div className="flex justify-between items-start mb-6 pb-4 border-b border-stone-200 border-dashed">
        <div className={`p-2 border ${isDev ? 'bg-blue-50 border-blue-100 text-blue-700' : 'bg-emerald-50 border-emerald-100 text-emerald-700'} group-hover:scale-110 transition-transform duration-300`}>
          <item.icon size={20} strokeWidth={1.5} />
        </div>
        <div className="flex flex-col items-end">
          <span className="font-mono text-xs font-bold text-stone-300 group-hover:text-eco-accent transition-colors">
            MOD_{serialNumber}
          </span>
          <div className="flex gap-1 mt-1">
             <div className="w-1 h-1 bg-stone-300 rounded-full group-hover:bg-eco-dark transition-colors delay-75"></div>
             <div className="w-1 h-1 bg-stone-300 rounded-full group-hover:bg-eco-dark transition-colors delay-100"></div>
             <div className="w-1 h-1 bg-stone-300 rounded-full group-hover:bg-eco-dark transition-colors delay-150"></div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-3">
           <span className={`w-1.5 h-1.5 rounded-sm ${isDev ? 'bg-blue-500' : 'bg-emerald-500'}`}></span>
           <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
             {item.category}
           </span>
        </div>
        
        <h3 className="font-sans font-bold text-xl mb-3 text-eco-dark tracking-tight group-hover:text-eco-primary transition-colors">
          {item.title}
        </h3>
        <p className="font-mono text-sm text-stone-500 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Technical Footer (Non-clickable, purely aesthetic) */}
      <div className="mt-8 pt-3 border-t border-stone-100 flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity">
         <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400">
            <Hash size={10} />
            <span className="uppercase tracking-widest">{item.id.substring(0, 6).toUpperCase()}</span>
         </div>
         
         {/* Fake Barcode / Chip Visual */}
         <div className="flex items-center gap-2 text-stone-300 group-hover:text-stone-400">
            <Cpu size={14} strokeWidth={1} />
            <ScanBarcode size={14} strokeWidth={1} />
         </div>
      </div>
    </div>
  );
};
