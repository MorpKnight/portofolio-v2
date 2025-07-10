import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Github } from 'lucide-react';
import Slider from "react-slick";
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const pageMotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function AllProjectsPage() {
  const { t } = useTranslation(['projects', 'translation']);
  const allProjects = t('projects:projectsData', { returnObjects: true }) || [];
  const location = useLocation();

  const [selectedFramework, setSelectedFramework] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedTools, setSelectedTools] = useState('');

  const filteredProjects = allProjects.filter((project) => {
    const matchesFramework =
      !selectedFramework ||
      (project.tags && project.tags.includes(selectedFramework));
    const matchesType =
      !selectedType ||
      (selectedType === 'Other'
        ? project.tags && !['Backend', 'Frontend', 'Mobile'].some(typeTag => project.tags.includes(typeTag))
        : project.tags && project.tags.includes(selectedType)
      );
    const matchesLanguage =
      !selectedLanguage ||
      (project.tags && project.tags.includes(selectedLanguage));
    const matchesTools =
      !selectedTools ||
      (project.tags && project.tags.includes(selectedTools));
    return (
      matchesFramework &&
      matchesType &&
      matchesLanguage &&
      matchesTools
    );
  });

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };

  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageMotionProps}
      className="bg-[color:var(--background)] text-[color:var(--text)] font-sans min-h-screen pt-24 pb-16"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-[color:var(--text)] color-shift">
            {t('projects:allProjectsPage.title')}
          </h1>
          <p className="text-xl text-[color:var(--secondary)] max-w-2xl mx-auto">
            {t('projects:allProjectsPage.description')}
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-4">
          <select
            className="bg-[color:var(--card-bg)] text-[color:var(--text)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] border border-[color:var(--card-border)] min-w-[150px]"
            value={selectedFramework}
            onChange={(e) => setSelectedFramework(e.target.value)}
          >
            <option value="">All Frameworks</option>
            <option value="React">React</option>
            <option value="Express.js">Express.js</option>
            <option value="WordPress">WordPress</option>
            {/* Add more if needed */}
          </select>

          <select
            className="bg-[color:var(--card-bg)] text-[color:var(--text)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] border border-[color:var(--card-border)] min-w-[150px]"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Backend">Backend</option>
            <option value="Frontend">Frontend</option>
            <option value="Mobile">Mobile</option>
            <option value="Other">Other</option>
          </select>

          <select
            className="bg-[color:var(--card-bg)] text-[color:var(--text)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] border border-[color:var(--card-border)] min-w-[150px]"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="">All Languages</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="VHDL">VHDL</option>
            {/* Add more if needed */}
          </select>

          <select
            className="bg-[color:var(--card-bg)] text-[color:var(--text)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] border border-[color:var(--card-border)] min-w-[150px]"
            value={selectedTools}
            onChange={(e) => setSelectedTools(e.target.value)}
          >
            <option value="">All Tools</option>
            <option value="Docker">Docker</option>
            <option value="MongoDB">MongoDB</option>
            <option value="PostgreSQL">PostgreSQL</option>
            <option value="FPGA">FPGA</option>
            {/* Add more if needed */}
          </select>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Link to={`/projects/${encodeURIComponent(project.id)}`} key={project.id} className="block group">
                <div className="bg-[color:var(--card-bg)] rounded-lg shadow-xl overflow-hidden flex flex-col h-full transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02] border border-[color:var(--card-border)]">
                  {project.images && project.images.length > 0 ? (
                    <Slider {...carouselSettings}>
                      {project.images.map((imgUrl, idx) => (
                        <img
                          key={idx}
                          src={imgUrl}
                          alt={`${project.title} - ${idx}`}
                          className="w-full aspect-video object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://placehold.co/600x400/2A2A2A/C4B5FD?text=${encodeURIComponent(t('projects:allProjectsPage.imageNotFound'))}`;
                          }}
                        />
                      ))}
                    </Slider>
                  ) : (
                    <img
                      src={project.imageUrl || `https://placehold.co/600x400/4c1d95/ddd6fe?text=${encodeURIComponent(project.title)}`}
                      alt={project.title}
                      className="w-full aspect-video object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/600x400/2A2A2A/C4B5FD?text=${encodeURIComponent(t('projects:allProjectsPage.imageNotFound'))}`;
                      }}
                    />
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-semibold mb-2 text-[color:var(--primary)] group-hover:text-[color:var(--secondary)]">{project.title}</h3>
                    <p className="text-[color:var(--text)] text-sm leading-relaxed mb-4 flex-grow custom-scrollbar h-28 overflow-y-auto">
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
                    <div className="mt-auto flex items-center space-x-4 pt-4 border-t border-[color:var(--card-border)]">
                      {project.liveLink && project.liveLink !== "#" && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-theme-primary font-semibold px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 inline-flex items-center"
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
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-[color:var(--secondary)] text-xl">{t('projects:allProjectsPage.noProjects')}</p>
        )}

        <div className="text-center mt-16">
          <Link
            to="/#projects"
            className="btn-theme-primary font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            {t('projects:allProjectsPage.backToHome')}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}