"use client";

import { useState, useEffect } from 'react';

export const useScroll = (threshold = 100) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const toggleVisibility = () => {
      const currentScrollY = window.pageYOffset;
      setScrollY(currentScrollY);
      setIsVisible(currentScrollY > threshold);

      // セクションの可視性を更新
      const sections = ['about', 'summary', 'skills', 'projects', 'in-progress'];
      const visibleSectionsMap = sections.reduce((acc, section) => {
        const element = document.getElementById(section);
        if (!element) return acc;
        
        const rect = element.getBoundingClientRect();
        acc[section] = rect.top < window.innerHeight && rect.bottom >= 0;
        return acc;
      }, {} as { [key: string]: boolean });
      
      setVisibleSections(visibleSectionsMap);
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility(); // 初期状態を設定

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return {
    isVisible,
    scrollY,
    visibleSections,
    showScrollTop: isVisible,
    scrollToTop
  };
};
