// src/sections/featured-project.jsx
import React from 'react';
import Slider from "react-slick";
import { Briefcase, ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";

export default function Projects() {
  const { t } = useTranslation(['projects', 'translation']); // Ensure 'projects' namespace is loaded
  const allProjectsData = t('projects:projectsData', { returnObjects: true }) || [];
  const featuredProjectsData = allProjectsData.slice(0, 4);

  const slickSettings = {
    dots: true,
    infinite: featuredProjectsData.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'linear',
    pauseOnHover: true,
    arrows: featuredProjectsData.length > 1,
  };

  return (
    <section id="projects" className="py-16 md:py-24 relative bg-[color:var(--background)] text-[color:var(--text)]">
      <div className="featured-projects-bg"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <Briefcase className="mx-auto text-[color:var(--primary)] mb-4" size={48} />
          <h2 className="text-3xl font-bold mb-4 color-shift text-[color:var(--text)] drop-shadow-md">
            {t('projects:featuredProjects.title')}
          </h2>
          <p className="text-[color:var(--text)] max-w-xl mx-auto drop-shadow-sm">
            {t('projects:featuredProjects.description')}
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto pb-10 slick-container">
          {featuredProjectsData.length > 0 ? (
            <Slider {...slickSettings}>
              {featuredProjectsData.map((project) => {
                const imageSrc = project.images && project.images.length > 0
                  ? project.images[Math.floor(Math.random() * project.images.length)]
                  : project.imageUrl || `https://placehold.co/600x400/4c1d95/ddd6fe?text=${encodeURIComponent(project.title)}`;
                return (
                  <div key={project.id} className="outline-none focus:outline-none px-2">
                    <div className="bg-[color:var(--card-bg)] rounded-lg shadow-xl overflow-hidden flex flex-col h-full max-h-[550px] border border-[color:var(--card-border)]">
                      <img
                        src={imageSrc}
                        alt={project.title}
                        className="w-full h-48 sm:h-56 md:h-64 object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://placehold.co/600x400/2A2A2A/C4B5FD?text=${encodeURIComponent(t('projects:allProjectsPage.imageNotFound'))}`;
                        }}
                      />
                      <div className="p-4 md:p-6 flex flex-col flex-grow">
                        <h3 className="text-xl md:text-2xl font-semibold mb-2 text-[color:var(--primary)]">
                          {project.title}
                        </h3>
                        <p className="text-[color:var(--text)] mb-4 text-sm leading-relaxed h-20 sm:h-24 overflow-y-auto prose-sm prose-invert max-w-none custom-scrollbar flex-grow">
                          {project.description}
                        </p>
                        {project.tags && project.tags.length > 0 && (
                          <div className="mb-4 flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                              <span key={tag} className="inline-block bg-[color:var(--background-1)] text-[color:var(--secondary)] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[color:var(--card-border)]">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center space-x-4 mt-auto pt-4 border-t border-neutral-700/50">
                          {project.liveLink && project.liveLink !== "#" && (
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-[color:var(--primary)] hover:bg-[color:var(--secondary)] text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 inline-flex items-center"
                            >
                              Live Demo <ExternalLink size={16} className="ml-2" />
                            </a>
                          )}
                          {project.repoLink && project.repoLink !== "#" && (
                            <a
                              href={project.repoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-theme-secondary font-semibold px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 inline-flex items-center"
                            >
                              GitHub <Github size={16} className="ml-2" />
                            </a>
                          )}
                          {project.repoLinkFE && project.repoLinkFE !== "#" && (
                            <a
                              href={project.repoLinkFE}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-theme-secondary font-semibold px-4 py-2 rounded-lg inline-flex items-center"
                            >
                              GitHub FE <Github size={16} className="ml-2" />
                            </a>
                          )}
                          {project.repoLinkBE && project.repoLinkBE !== "#" && (
                            <a
                              href={project.repoLinkBE}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-theme-secondary font-semibold px-4 py-2 rounded-lg inline-flex items-center"
                            >
                              GitHub BE <Github size={16} className="ml-2" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          ) : (
            <p className="text-center text-[color:var(--secondary)]">{t('projects:featuredProjects.noProjects')}</p>
          )}
        </div>

        {featuredProjectsData.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="bg-[color:var(--primary)] hover:bg-[color:var(--secondary)] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              {t('projects:featuredProjects.viewAll')}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}