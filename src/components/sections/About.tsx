import React from 'react';
import { SectionProps, AboutData } from '../../types';

interface AboutSectionProps extends SectionProps {
  data: AboutData;
}

export const About: React.FC<AboutSectionProps> = ({ visibleSections, scrollY, data }) => {
  const formatDescription = (description: string) => {
    return description.split('\n').map((line, index) => (
      <p key={index} className="text-xl leading-relaxed mb-4">
        {line}
      </p>
    ));
  };

  return (
    <section 
      id="about" 
      className="section relative min-h-screen flex items-center py-24"
      style={{
        transform: `translateY(${
          visibleSections.about ? scrollY * 0.1 : 0
        }px)`,
        transition: 'transform 0.1s linear'
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12">{data.title}</h2>
        <div className="bg-white rounded-lg shadow-lg p-8">
          {formatDescription(data.description)}
        </div>
      </div>
    </section>
  );
};