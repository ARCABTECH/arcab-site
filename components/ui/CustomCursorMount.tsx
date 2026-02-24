'use client'

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const CustomCursor = dynamic(() => import('./CustomCursor'), {
  ssr: false,
});

const CustomCursorMount: React.FC = () => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const update = () => setShouldRender(mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);

    return () => {
      mediaQuery.removeEventListener('change', update);
    };
  }, []);

  if (!shouldRender) return null;

  return <CustomCursor />;
};

export default CustomCursorMount;
