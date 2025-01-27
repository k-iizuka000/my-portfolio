import React from 'react';
import { SectionProps } from '../../types';

interface SummaryData {
  totalExperience: string;
  highlights: string[];
  coreTechnologies: Array<{
    name: string;
    years: number;
    level: string;
  }>;
}

interface SummarySectionProps extends SectionProps {
  data: SummaryData;
}

export const Summary: React.FC<SummarySectionProps> = ({ visibleSections, scrollY, data }) => {
  return (
    <section
      id="summary"
      className="section relative py-16"
      style={{
        transform: `translateY(${
          visibleSections.summary ? scrollY * 0.1 : 0
        }px)`,
        transition: 'transform 0.1s linear'
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">経験概要</h2>
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg relative z-20">
          <div className="p-8">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">総経験年数</h3>
                <p className="text-xl">{data.totalExperience}</p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">主な特徴</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {data.highlights.map((highlight, index) => (
                    <li key={index} className="text-xl">{highlight}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">主要技術</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {data.coreTechnologies.map((tech, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-xl font-semibold mb-2">{tech.name}</h4>
                      <p className="text-lg">経験年数: {tech.years}年</p>
                      <p className="text-lg">レベル: {tech.level}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 