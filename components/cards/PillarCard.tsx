'use client'

import React, { useState } from 'react';
import { PillarItem } from '../../data/servicesData';
import { Hash, Cpu, ScanBarcode } from 'lucide-react';
import { CornerDecorators } from '../layout/CornerDecorators';

interface PillarCardProps {
  item: PillarItem;
  index: number;
}

export const PillarCard: React.FC<PillarCardProps> = ({ item, index }) => {
  const [showAll, setShowAll] = useState(false);
  const serialNumber = (index + 1).toString().padStart(2, '0');

  const visibleLimit = 3;
  const hasMore = item.services.length > visibleLimit;
  const displayedServices = showAll ? item.services : item.services.slice(0, visibleLimit);
  const hiddenCount = item.services.length - visibleLimit;

  return (
    <div className="group border border-stone-200 bg-stone-50 p-6 md:p-8 hover:border-eco-dark transition-all duration-300 relative flex flex-col h-full hover:bg-white hover:shadow-sharp-lg hover:-translate-y-1 min-h-[420px]">
      
      <CornerDecorators size="md" />

      {/* Top Header: Icon & Serial */}
      <div className="flex justify-between items-start mb-6 pb-5 border-b border-stone-200 border-dashed">
        <div className="p-3 bg-eco-dark text-eco-accent group-hover:bg-eco-primary group-hover:text-white transition-colors duration-300">
          <item.icon size={32} strokeWidth={1.5} />
        </div>
        <div className="flex flex-col items-end">
          <span className="font-mono text-xs font-bold text-stone-600 group-hover:text-eco-accent transition-colors">
            MOD_{serialNumber}
          </span>
          <div className="flex gap-1 mt-1.5">
            <div className="w-1.5 h-1.5 bg-stone-300 rounded-full group-hover:bg-eco-dark transition-colors delay-75"></div>
            <div className="w-1.5 h-1.5 bg-stone-300 rounded-full group-hover:bg-eco-dark transition-colors delay-100"></div>
            <div className="w-1.5 h-1.5 bg-stone-300 rounded-full group-hover:bg-eco-dark transition-colors delay-150"></div>
          </div>
        </div>
      </div>
      
      {/* Pillar Name (A BASE / O CÉREBRO / O CORPO) */}
      <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-eco-dark mb-2">
        {item.pillarName}
      </span>

      {/* Title */}
      <h3 className="font-sans font-bold text-2xl md:text-3xl mb-2 text-eco-dark tracking-tight group-hover:text-eco-primary transition-colors leading-tight">
        {item.title}
      </h3>

      {/* Subtitle */}
      <p className="font-mono text-sm italic text-stone-500 mb-4">
        &ldquo;{item.subtitle}&rdquo;
      </p>

      {/* Description */}
      <p className="font-mono text-sm text-stone-600 leading-relaxed flex-grow">
        {item.description}
      </p>

      {/* Sub-services Tags */}
      <div className="mt-6 pt-4 border-t border-stone-200">
        <div className="flex flex-wrap gap-2">
          {displayedServices.map((service) => (
            <span
              key={service.name}
              className="inline-flex items-center gap-1.5 font-mono text-xs border border-stone-300 px-2.5 py-1.5 text-stone-600 group-hover:border-eco-dark group-hover:text-eco-dark transition-colors"
            >
              <service.icon size={12} strokeWidth={1.5} className="text-stone-400 group-hover:text-eco-primary transition-colors" />
              {service.name}
            </span>
          ))}
          {hasMore && !showAll && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex items-center font-mono text-xs border border-dashed border-stone-300 px-2.5 py-1.5 text-stone-600 hover:border-eco-primary hover:text-eco-primary transition-colors cursor-pointer"
            >
              +{hiddenCount}
            </button>
          )}
        </div>
      </div>

      {/* Technical Footer */}
      <div className="mt-4 pt-3 border-t border-stone-100 flex justify-between items-center opacity-50 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
          <Hash size={10} />
          <span className="uppercase tracking-widest">{item.id.substring(0, 8).toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-2 text-stone-300 group-hover:text-stone-400">
          <Cpu size={14} strokeWidth={1} />
          <ScanBarcode size={14} strokeWidth={1} />
        </div>
      </div>
    </div>
  );
};
