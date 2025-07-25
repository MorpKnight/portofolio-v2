import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const { t } = useTranslation(['projects', 'translation']);
  const allProjects = t('projects:projectsData', { returnObjects: true }) || [];
  const project = allProjects.find(p => p.id === projectId);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    customPaging: i => (
      <div className="mt-2 w-3 h-3 bg-[color:var(--primary)] rounded-full opacity-50 slick-active:opacity-100"></div>
    ),
  };

  if (!project) {
    return (
      <div className="bg-[color:var(--background)] text-[color:var(--text)] font-sans min-h-screen flex flex-col items-center justify-center p-6 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-4 text-[color:var(--text)]">{t('projects:projectDetailPage.projectNotFoundTitle', 'Project Not Found')}</h1>
        <p className="text-xl text-[color:var(--secondary)] mb-8 text-center">{t('projects:projectDetailPage.projectNotFoundDescription', 'The project you are looking for does not exist or the ID is incorrect.')}</p>
        <Link
          to="/projects"
          className="bg-[color:var(--primary)] hover:bg-[color:var(--secondary)] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 inline-flex items-center"
        >
          <ArrowLeft size={20} className="mr-2" />
          {t('projects:projectDetailPage.backToAllProjects', 'Back to All Projects')}
        </Link>
      </div>
    );
  }

  const processImagePath = (imgPath) => {
    if (imgPath.startsWith('./images/')) {
      return `/${imgPath.substring(2)}`;
    }
    return imgPath;
  };


  return (
    <div className="bg-[color:var(--background)] text-[color:var(--text)] font-sans min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        <Link
          to="/projects"
          className="inline-flex items-center text-[color:var(--primary)] hover:text-[color:var(--secondary)] mb-8 group text-lg"
        >
          <ArrowLeft size={22} className="mr-2 transition-transform group-hover:-translate-x-1" />
          {t('projects:projectDetailPage.backToAllProjects', 'Back to All Projects')}
        </Link>

        <article className="bg-[color:var(--card-bg)] rounded-lg shadow-2xl overflow-hidden border border-[color:var(--card-border)]">
          {project.images && project.images.length > 0 ? (
            <div className="bg-[color:var(--background-1)]">
              <Slider {...carouselSettings}>
                {project.images.map((imgUrl, idx) => (
                  <div key={idx} className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-[color:var(--background-1)] overflow-hidden">
                    <img
                      src={processImagePath(imgUrl)}
                      alt={`${project.title} - Screenshot ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/800x500/2A2A2A/C4B5FD?text=${encodeURIComponent(t('projects:allProjectsPage.imageNotFound'))}`;
                      }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
             <div className="w-full h-[300px] bg-[color:var(--background-1)] flex items-center justify-center text-[color:var(--primary)] text-xl">
                {t('projects:allProjectsPage.imageNotFound')}
             </div>
          )}
          
          <div className="p-6 md:p-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 text-[color:var(--primary)] color-shift">{project.title}</h1>

            <div className="grid md:grid-cols-3 gap-x-8 gap-y-6 mb-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-semibold text-[color:var(--secondary)] mb-3 border-b border-neutral-700 pb-2">{t('projects:projectDetailPage.descriptionLabel', 'Description')}</h2>
                <p className="text-[color:var(--text)] leading-relaxed whitespace-pre-line custom-scrollbar max-h-96 overflow-y-auto">{project.description}</p>
              </div>
              <div className="md:col-span-1 space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-[color:var(--secondary)] mb-3 border-b border-neutral-700 pb-2">{t('projects:projectDetailPage.projectInfoLabel', 'Project Info')}</h2>
                  <div className="space-y-2 text-[color:var(--text)]">
                    {project.myRole && (
                      <p><strong>{t('projects:projectDetailPage.myRoleLabel', 'My Role')}:</strong> {project.myRole}</p>
                    )}
                    {project.workBy && (
                      <p><strong>{t('projects:projectDetailPage.workByLabel', 'Work Type')}:</strong> {project.workBy}</p>
                    )}
                  </div>
                </div>
                {project.tags && project.tags.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-[color:var(--secondary)] mb-3 border-b border-neutral-700 pb-2">{t('projects:projectDetailPage.technologiesUsedLabel', 'Technologies Used')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="bg-[color:var(--background-1)] hover:bg-[color:var(--background-2)] text-[color:var(--secondary)] text-sm font-medium px-3 py-1.5 rounded-full transition-colors border border-[color:var(--card-border)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {project.implementation && project.implementation.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-[color:var(--secondary)] mb-3 border-b border-neutral-700 pb-2">
                  {t('projects:projectDetailPage.implementationLabel', 'Implementation Details')}
                </h2>
                <ul className="list-disc list-outside pl-5 space-y-2 text-[color:var(--text)] leading-relaxed">
                  {project.implementation.map((item, index) => {
                    if (typeof item === 'string') {
                      return <li key={index}>{item}</li>;
                    }

                    if (typeof item === 'object' && item !== null && Array.isArray(item.content)) {
                      return (
                        <li key={index} style={item.style || {}}>
                          {item.content.map((part, partIndex) => {
                            if (part.type === 'text') {
                              return <span key={partIndex} style={part.style || {}}>{part.value}</span>;
                            }
                            if (part.type === 'link') {
                              return (
                                <a
                                  key={partIndex}
                                  href={part.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[color:var(--primary)] hover:text-[color:var(--secondary)] underline"
                                  style={part.style || {}}
                                >
                                  {part.label}
                                </a>
                              );
                            }
                            return null;
                          })}
                        </li>
                      );
                    }
                    
                    return <li key={index}>Invalid item format</li>;
                  })}
                </ul>
              </div>
            )}

            {(project.liveLink || project.repoLink || project.repoLinkFE || project.repoLinkBE) && (
              <div className="mt-8 pt-6 border-t border-[color:var(--card-border)]">
                <h2 className="text-2xl font-semibold text-[color:var(--primary)] mb-4">{t('projects:projectDetailPage.projectLinksLabel', 'Project Links')}</h2>
                <div className="flex flex-wrap gap-4 items-center">
                  {project.liveLink && project.liveLink !== "#" && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-enhanced text-sm inline-flex items-center"
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
                    >
                      {t('projects:allProjectsPage.repoLink', 'GitHub')} BE <Github size={16} className="ml-2" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
