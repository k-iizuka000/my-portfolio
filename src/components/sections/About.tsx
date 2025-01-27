import React from 'react';
import { SectionProps, AboutData } from '../../types';

interface AboutSectionProps extends SectionProps {
  data: AboutData;
}

export const About: React.FC<AboutSectionProps> = ({ visibleSections, scrollY, data }) => {
  const formatDescription = (description: string) => {
    return description.split('\n').map((line, index) => (
      <p key={index} className="text-lg leading-relaxed mb-4 last:mb-0">
        {line}
      </p>
    ));
  };

  return (
    <section 
      id="about" 
      className="section relative py-12"
      style={{
        transform: `translateY(${
          visibleSections.about ? scrollY * 0.1 : 0
        }px)`,
        transition: 'transform 0.1s linear'
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-6">{data.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {formatDescription(data.description)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};