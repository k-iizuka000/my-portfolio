"use client";

import { motion } from 'framer-motion';
import { InProgressProps } from '../../types';

export const InProgress: React.FC<InProgressProps> = ({ inProgressProjects }) => {
  return (
    <section id="in-progress" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">進行中のプロジェクト</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {inProgressProjects.map((project, index) => (
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
                <p className="text-base leading-relaxed font-medium text-black mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1.5 bg-gray-100 text-black text-sm font-medium rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <span className="inline-block px-3 py-1.5 bg-yellow-100 text-black text-sm font-medium rounded">
                    {project.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
