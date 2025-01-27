"use client";

import React from 'react';
import { SkillsProps } from '../../types';

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <section id="skills" className="py-20 bg-gray-50 relative z-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">スキル</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* フロントエンド */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 card-heading">フロントエンド</h3>
            <ul className="space-y-2">
              {skills.frontend.map((skill, index) => (
                <li key={index} className="card-list-item">{skill}</li>
              ))}
            </ul>
          </div>

          {/* バックエンド */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 card-heading">バックエンド</h3>
            <ul className="space-y-2">
              {skills.backend.map((skill, index) => (
                <li key={index} className="card-list-item">{skill}</li>
              ))}
            </ul>
          </div>

          {/* その他 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 card-heading">その他</h3>
            <ul className="space-y-2">
              {skills.other.map((skill, index) => (
                <li key={index} className="card-list-item">{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
