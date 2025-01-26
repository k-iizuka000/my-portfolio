"use client";

import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { Header } from './Header';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { InProgress } from './sections/InProgress';
import { Summary } from './sections/Summary';
import { Footer } from './Footer';
import { ScrollTopButton } from './ScrollTopButton';
import { useScroll } from '../hooks/useScroll';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { MenuItems } from '../types';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';

const menuItems: MenuItems[] = [
  { id: 'about', label: 'About' },
  { id: 'summary', label: 'Summary' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'in-progress', label: 'In Progress' },
];

const PortfolioWebsite: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY, visibleSections, showScrollTop } = useScroll();
  const { data, loading, error } = usePortfolioData();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        menuItems={menuItems}
        visibleSections={visibleSections}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        scrollToSection={scrollToSection}
      />

      <div className="md:pr-48">
        <Header scrollY={scrollY} />
        
        <main className="relative bg-gray-50">
          <About 
            visibleSections={visibleSections} 
            scrollY={scrollY} 
            data={data.about}
          />
          <Summary 
            visibleSections={visibleSections} 
            scrollY={scrollY} 
            data={data.summary}
          />
          <Skills 
            visibleSections={visibleSections} 
            scrollY={scrollY} 
            skills={data.skills}
          />
          <Projects 
            visibleSections={visibleSections} 
            scrollY={scrollY} 
            projects={data.projects}
          />
          <InProgress 
            visibleSections={visibleSections} 
            scrollY={scrollY} 
            inProgressProjects={data.inProgress}
          />
        </main>

        <Footer />
      </div>

      <ScrollTopButton showScrollTop={showScrollTop} scrollToTop={scrollToTop} />
    </div>
  );
};

export default PortfolioWebsite;