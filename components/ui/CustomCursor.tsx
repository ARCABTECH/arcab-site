'use client'

import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if the device is a touch device (coarse pointer)
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    if (mediaQuery.matches) {
      setIsTouchDevice(true);
      return; // Stop execution here for touch devices
    }

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea' ||
        target.tagName.toLowerCase() === 'select' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer');
      
      setIsPointer(!!isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateHoverState);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateHoverState);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Do not render anything on touch devices
  if (isTouchDevice || !isVisible) return null;

  return (
    <div 
      className="fixed pointer-events-none z-[9999] mix-blend-exclusion text-white"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: `translate(-50%, -50%)`,
      }}
    >
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-all duration-300 ease-out ${isClicking ? 'scale-75' : 'scale-100'}`}
      >
        {/* State 1: Default Crosshair (Normal) */}
        <g className={`transition-opacity duration-300 ${isPointer ? 'opacity-0' : 'opacity-100'}`}>
           <line x1="16" y1="6" x2="16" y2="26" stroke="currentColor" strokeWidth="1.5"/>
           <line x1="6" y1="16" x2="26" y2="16" stroke="currentColor" strokeWidth="1.5"/>
        </g>

        {/* State 2: Diamond / Losango (Hover) */}
        <g className={`transition-all duration-300 origin-center ${isPointer ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-45 scale-50'}`}>
           {/* Filled center for impact */}
           <polygon 
             points="16,6 26,16 16,26 6,16" 
             fill="currentColor" 
             className="opacity-20"
           />
           {/* Stroke outline */}
           <polygon 
             points="16,6 26,16 16,26 6,16" 
             stroke="currentColor" 
             strokeWidth="1.5" 
             fill="none"
           />
           {/* Small accent dots at tips */}
           {isPointer && (
             <>
               <circle cx="16" cy="4" r="1" fill="currentColor" className="animate-pulse" />
               <circle cx="16" cy="28" r="1" fill="currentColor" className="animate-pulse" />
               <circle cx="28" cy="16" r="1" fill="currentColor" className="animate-pulse" />
               <circle cx="4" cy="16" r="1" fill="currentColor" className="animate-pulse" />
             </>
           )}
        </g>
      </svg>
    </div>
  );
};

export default CustomCursor;