'use client'

import React, { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const supportsCSS = useRef<boolean | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // On small screens, avoid observer/setup cost and reveal immediately.
    if (window.matchMedia('(max-width: 767px)').matches) {
      el.classList.remove('reveal-hidden');
      return;
    }

    // Check once if browser supports CSS scroll-driven animations
    if (supportsCSS.current === null) {
      supportsCSS.current = CSS.supports('animation-timeline: view()');
    }

    // If CSS handles the animation natively, no JS needed
    if (supportsCSS.current) {
      el.classList.add('reveal-css-native');
      el.classList.remove('reveal-hidden');
      return;
    }

    // JS fallback: IntersectionObserver with classList (no re-render)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} reveal-hidden`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
