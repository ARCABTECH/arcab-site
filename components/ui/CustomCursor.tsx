'use client'

import React, { useEffect, useRef, useCallback } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const crosshairRef = useRef<SVGGElement>(null);
  const diamondRef = useRef<SVGGElement>(null);
  const dotsRef = useRef<SVGGElement>(null);
  const isPointerRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const nextXRef = useRef(0);
  const nextYRef = useRef(0);

  const updateCursorClasses = useCallback(() => {
    if (!svgRef.current || !crosshairRef.current || !diamondRef.current || !dotsRef.current) return;
    const pointer = isPointerRef.current;
    crosshairRef.current.style.opacity = pointer ? '0' : '1';
    diamondRef.current.style.opacity = pointer ? '1' : '0';
    diamondRef.current.style.transform = pointer ? 'rotate(0deg) scale(1)' : 'rotate(45deg) scale(0.5)';
    dotsRef.current.style.display = pointer ? '' : 'none';
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(pointer: coarse)');
    if (mediaQuery.matches) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    const updatePosition = (e: MouseEvent) => {
      nextXRef.current = e.clientX;
      nextYRef.current = e.clientY;

      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(() => {
          cursor.style.transform = `translate3d(${nextXRef.current}px, ${nextYRef.current}px, 0) translate(-50%, -50%)`;
          rafRef.current = null;
        });
      }

      cursor.style.display = '';
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = !!target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer');

      const newPointer = !!isClickable;
      if (newPointer !== isPointerRef.current) {
        isPointerRef.current = newPointer;
        updateCursorClasses();
      }
    };

    const handleMouseDown = () => {
      if (svgRef.current) svgRef.current.style.transform = 'scale(0.75)';
    };
    const handleMouseUp = () => {
      if (svgRef.current) svgRef.current.style.transform = 'scale(1)';
    };
    const handleMouseLeave = () => {
      if (cursor) cursor.style.display = 'none';
    };
    const handleMouseEnter = () => {
      if (cursor) cursor.style.display = '';
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateHoverState);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateHoverState);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [updateCursorClasses]);

  // Don't render on touch devices (checked via SSR-safe ref)
  // The ref check happens in useEffect, so we always render the DOM
  // but hide it by default
  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] mix-blend-exclusion text-white"
      style={{
        display: 'none',
        transform: 'translate3d(0, 0, 0) translate(-50%, -50%)',
        willChange: 'transform',
      }}
    >
      <svg
        ref={svgRef}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transition: 'transform 300ms ease-out' }}
      >
        {/* State 1: Default Crosshair (Normal) */}
        <g ref={crosshairRef} style={{ transition: 'opacity 300ms', opacity: 1 }}>
          <line x1="16" y1="6" x2="16" y2="26" stroke="currentColor" strokeWidth="1.5" />
          <line x1="6" y1="16" x2="26" y2="16" stroke="currentColor" strokeWidth="1.5" />
        </g>

        {/* State 2: Diamond / Losango (Hover) */}
        <g
          ref={diamondRef}
          style={{
            transition: 'opacity 300ms, transform 300ms',
            transformOrigin: 'center',
            opacity: 0,
            transform: 'rotate(45deg) scale(0.5)',
          }}
        >
          <polygon
            points="16,6 26,16 16,26 6,16"
            fill="currentColor"
            opacity="0.2"
          />
          <polygon
            points="16,6 26,16 16,26 6,16"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </g>

        {/* Accent dots at tips (shown on hover) */}
        <g ref={dotsRef} style={{ display: 'none' }}>
          <circle cx="16" cy="4" r="1" fill="currentColor" className="animate-pulse" />
          <circle cx="16" cy="28" r="1" fill="currentColor" className="animate-pulse" />
          <circle cx="28" cy="16" r="1" fill="currentColor" className="animate-pulse" />
          <circle cx="4" cy="16" r="1" fill="currentColor" className="animate-pulse" />
        </g>
      </svg>
    </div>
  );
};

export default CustomCursor;
