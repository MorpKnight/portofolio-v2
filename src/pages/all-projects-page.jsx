import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Github, Filter, X, ChevronDown } from 'lucide-react';
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

  // Helper function to create theme-aware placeholder image
  const createPlaceholderImage = (title) => {
    // Create a simple SVG placeholder that matches the theme
    const svg = `
      <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="currentColor" style="color: var(--background-2)"/>
        <rect x="50" y="50" width="500" height="300" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--card-border)" rx="8"/>
        <circle cx="300" cy="150" r="40" fill="currentColor" style="color: var(--primary)" opacity="0.3"/>
        <rect x="200" y="220" width="200" height="20" fill="currentColor" style="color: var(--primary)" opacity="0.5" rx="4"/>
        <rect x="220" y="260" width="160" height="15" fill="currentColor" style="color: var(--text-muted)" opacity="0.4" rx="4"/>
        <text x="300" y="330" text-anchor="middle" fill="currentColor" style="color: var(--text-muted)" font-family="system-ui" font-size="14" opacity="0.6">${title}</text>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  // Function to clear all filters
  const clearAllFilters = () => {
    setSelectedFramework('');
    setSelectedType('');
    setSelectedLanguage('');
    setSelectedTools('');
  };

  // Check if any filters are active
  const hasActiveFilters = selectedFramework || selectedType || selectedLanguage || selectedTools;

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

        {/* Enhanced Filter Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[color:var(--text)] flex items-center">
              <Filter size={20} className="mr-2 text-[color:var(--primary)]" />
              Filter Projects
            </h2>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-[color:var(--secondary)] hover:text-[color:var(--primary)] text-sm flex items-center transition-colors"
              >
                <X size={16} className="mr-1" />
                Clear All
              </button>
            )}
          </div>
          
          <div className="bg-[color:var(--card-bg)] rounded-lg p-6 border border-[color:var(--card-border)] shadow-lg">
            <div className="project-filter-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Framework Filter */}
              <div className="relative">
                <label className="block text-sm font-medium text-[color:var(--text-muted)] mb-2">Framework</label>
                <div className="relative">
                  <select
                    className="project-filter-select w-full text-[color:var(--text)] px-4 py-3 pr-10 rounded-lg appearance-none cursor-pointer"
                    value={selectedFramework}
                    onChange={(e) => setSelectedFramework(e.target.value)}
                  >
                    <option value="">All Frameworks</option>
                    <option value="React">React</option>
                    <option value="Express.js">Express.js</option>
                    <option value="Spring Boot">Spring Boot</option>
                    <option value="WordPress">WordPress</option>
                  </select>
                  <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[color:var(--text-muted)] pointer-events-none" />
                </div>
              </div>

              {/* Type Filter */}
              <div className="relative">
                <label className="block text-sm font-medium text-[color:var(--text-muted)] mb-2">Type</label>
                <div className="relative">
                  <select
                    className="project-filter-select w-full text-[color:var(--text)] px-4 py-3 pr-10 rounded-lg appearance-none cursor-pointer"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="">All Types</option>
                    <option value="Backend">Backend</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Mobile">Mobile</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[color:var(--text-muted)] pointer-events-none" />
                </div>
              </div>

              {/* Language Filter */}
              <div className="relative">
                <label className="block text-sm font-medium text-[color:var(--text-muted)] mb-2">Language</label>
                <div className="relative">
                  <select
                    className="project-filter-select w-full text-[color:var(--text)] px-4 py-3 pr-10 rounded-lg appearance-none cursor-pointer"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                  >
                    <option value="">All Languages</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="VHDL">VHDL</option>
                    <option value="XML">XML</option>
                  </select>
                  <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[color:var(--text-muted)] pointer-events-none" />
                </div>
              </div>

              {/* Tools Filter */}
              <div className="relative">
                <label className="block text-sm font-medium text-[color:var(--text-muted)] mb-2">Tools & Tech</label>
                <div className="relative">
                  <select
                    className="project-filter-select w-full text-[color:var(--text)] px-4 py-3 pr-10 rounded-lg appearance-none cursor-pointer"
                    value={selectedTools}
                    onChange={(e) => setSelectedTools(e.target.value)}
                  >
                    <option value="">All Tools</option>
                    <option value="Docker">Docker</option>
                    <option value="MongoDB">MongoDB</option>
                    <option value="PostgreSQL">PostgreSQL</option>
                    <option value="FPGA">FPGA</option>
                    <option value="Android">Android</option>
                  </select>
                  <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[color:var(--text-muted)] pointer-events-none" />
                </div>
              </div>
            </div>
            
            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t border-[color:var(--card-border)]">
                <div className="flex flex-wrap gap-2">
                  {selectedFramework && (
                    <span className="filter-tag">
                      Framework: {selectedFramework}
                      <button
                        onClick={() => setSelectedFramework('')}
                        className="hover:bg-white hover:bg-opacity-20 rounded-full p-0.5"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  {selectedType && (
                    <span className="filter-tag">
                      Type: {selectedType}
                      <button
                        onClick={() => setSelectedType('')}
                        className="hover:bg-white hover:bg-opacity-20 rounded-full p-0.5"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  {selectedLanguage && (
                    <span className="filter-tag">
                      Language: {selectedLanguage}
                      <button
                        onClick={() => setSelectedLanguage('')}
                        className="hover:bg-white hover:bg-opacity-20 rounded-full p-0.5"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  {selectedTools && (
                    <span className="filter-tag">
                      Tools: {selectedTools}
                      <button
                        onClick={() => setSelectedTools('')}
                        className="hover:bg-white hover:bg-opacity-20 rounded-full p-0.5"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-[color:var(--text-muted)]">
            Showing <span className="font-semibold text-[color:var(--primary)]">{filteredProjects.length}</span> of <span className="font-semibold">{allProjects.length}</span> projects
          </p>
        </div>

        {filteredProjects.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="project-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <Link to={`/projects/${encodeURIComponent(project.id)}`} key={project.id} className="block group">
                <div className="project-card rounded-lg shadow-xl overflow-hidden flex flex-col h-full">
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
                            e.target.src = createPlaceholderImage(project.title);
                          }}
                        />
                      ))}
                    </Slider>
                  ) : (
                    <div className="w-full aspect-video bg-gradient-to-br from-[color:var(--background-1)] to-[color:var(--background-2)] border-b border-[color:var(--card-border)] flex items-center justify-center relative overflow-hidden">
                      {/* Theme-aware geometric pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-[color:var(--primary)] rounded-full"></div>
                        <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-[color:var(--secondary)] transform rotate-45"></div>
                        <div className="absolute bottom-1/3 left-1/2 w-8 h-20 bg-[color:var(--accent)] transform -rotate-12"></div>
                      </div>
                      
                      {/* Project title overlay */}
                      <div className="text-center z-10 px-4">
                        <div className="w-16 h-16 mx-auto mb-3 bg-[color:var(--primary)] bg-opacity-20 rounded-lg flex items-center justify-center">
                          <div className="w-8 h-8 bg-[color:var(--primary)] rounded opacity-60"></div>
                        </div>
                        <h4 className="text-lg font-semibold text-[color:var(--primary)] mb-1">{project.title}</h4>
                        <p className="text-sm text-[color:var(--text-muted)] opacity-75">Project Preview</p>
                      </div>
                    </div>
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
                    <div className="mt-auto flex flex-wrap gap-3 pt-4 border-t border-[color:var(--card-border)]">
                      {project.liveLink && project.liveLink !== "#" && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-enhanced text-sm inline-flex items-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {t('projects:allProjectsPage.liveLink', 'Live Demo')} <ExternalLink size={16} className="ml-2" />
                        </a>
                      )}
                      {project.repoLink && project.repoLink !== "#" && (
                        <a
                          href={project.repoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-enhanced-secondary text-sm inline-flex items-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {t('projects:allProjectsPage.repoLink', 'GitHub')} <Github size={16} className="ml-2" />
                        </a>
                      )}
                      {project.repoLinkFE && project.repoLinkFE !== "#" && (
                        <a
                          href={project.repoLinkFE}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-enhanced-secondary text-sm inline-flex items-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {t('projects:allProjectsPage.repoLink', 'GitHub')} FE <Github size={16} className="ml-2" />
                        </a>
                      )}
                      {project.repoLinkBE && project.repoLinkBE !== "#" && (
                        <a
                          href={project.repoLinkBE}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-enhanced-secondary text-sm inline-flex items-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {t('projects:allProjectsPage.repoLink', 'GitHub')} BE <Github size={16} className="ml-2" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-[color:var(--background-1)] rounded-full flex items-center justify-center">
                <Filter size={40} className="text-[color:var(--text-muted)]" />
              </div>
              <h3 className="text-xl font-semibold text-[color:var(--text)] mb-2">No projects found</h3>
              <p className="text-[color:var(--text-muted)] mb-6">
                {hasActiveFilters
                  ? "No projects match your current filters. Try adjusting your criteria."
                  : t('projects:allProjectsPage.noProjects')}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="btn-theme-primary font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </motion.div>
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