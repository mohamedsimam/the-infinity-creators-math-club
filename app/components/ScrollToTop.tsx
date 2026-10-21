'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Disable automatic browser scroll restoration on mobile and desktop
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Immediately scroll to the top of the page on route change or refresh
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollToTop();

    // Secondary frame check to ensure mobile browsers that delay layout don't reset to bottom
    const timer = setTimeout(scrollToTop, 20);
    const secondaryTimer = setTimeout(scrollToTop, 100);

    return () => {
      clearTimeout(timer);
      clearTimeout(secondaryTimer);
    };
  }, [pathname]);

  return null;
}
