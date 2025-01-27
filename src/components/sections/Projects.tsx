"use client";

import { motion } from 'framer-motion';
import { ProjectsProps } from '../../types';

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const formatDescription = (description: string) => {
    const lines = description.split('\n').filter(line => line.trim() !== '');
    return lines.map((line, index) => (
      <p key={index} className="text-base leading-relaxed font-medium text-black mb-2">
        {line}
      </p>
    ));
  };

  const formatTechnology = (tech: string | { name: string; role: string }) => {
    if (typeof tech === 'string') {
      return tech;
    }
    return `${tech.name} (${tech.role})`;
  };

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">プロジェクト</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-black">{project.title}</h3>
                <div className="mb-4">
                  {formatDescription(project.description)}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1.5 bg-gray-100 text-black text-sm font-medium rounded"
                    >
                      {formatTechnology(tech)}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-gray-800 font-medium"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
