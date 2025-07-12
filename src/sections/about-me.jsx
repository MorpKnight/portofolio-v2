import React from 'react';
import { UserCircle, Code, Zap, Terminal, Database, Brain, Server, Cpu } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

function About() {
  const { t } = useTranslation();

  const skillCategories = [
    {
      icon: <Code size={20} className="mr-3 text-[color:var(--primary)] flex-shrink-0" />,
      title: t('aboutMe.skills.languagesTitle'),
      skills: t('aboutMe.skills.languagesList', { returnObjects: true }),
    },
    {
      icon: <Zap size={20} className="mr-3 text-[color:var(--primary)] flex-shrink-0" />,
      title: t('aboutMe.skills.frameworksLibrariesTitle'),
      skills: t('aboutMe.skills.frameworksLibrariesList', { returnObjects: true }),
    },
    {
      icon: <Terminal size={20} className="mr-3 text-[color:var(--primary)] flex-shrink-0" />,
      title: t('aboutMe.skills.toolsPlatformsTitle'),
      skills: t('aboutMe.skills.toolsPlatformsList', { returnObjects: true }),
    },
    {
      icon: <Database size={20} className="mr-3 text-[color:var(--primary)] flex-shrink-0" />,
      title: t('aboutMe.skills.databasesTitle'),
      skills: t('aboutMe.skills.databasesList', { returnObjects: true }),
    },
    {
      icon: <Brain size={20} className="mr-3 text-[color:var(--primary)] flex-shrink-0" />,
      title: t('aboutMe.skills.otherTitle'),
      skills: t('aboutMe.skills.otherList', { returnObjects: true }),
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-[color:var(--background-1)] relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center">
          
          <UserCircle className="mx-auto text-[color:var(--primary)] mb-4" size={48} />
          <h2 className="text-3xl font-bold mb-4 color-shift">{t('aboutMe.title')}</h2>
          
          <p className="text-[color:var(--text)] max-w-3xl mx-auto leading-relaxed mb-10">
            <Trans i18nKey="aboutMe.introduction">
              Hello! I'm Giovan, a dedicated and results-oriented <span className="font-semibold text-[color:var(--secondary)]">[Your Role Here]</span> with a passion for crafting efficient solutions, whether in software or hardware. I thrive in collaborative environments and am always eager to learn new technologies and take on challenging projects.
            </Trans>
          </p>
          
          <div className="max-w-3xl mx-auto text-left md:text-center mb-12">
            <h3 className="text-xl font-semibold text-[color:var(--secondary)] mb-3 text-center">{t('aboutMe.keyAreasTitle')}</h3>
            <ul className="space-y-2 text-[color:var(--text)] inline-block text-left">
              <li className="flex items-center">
                <Server size={20} className="mr-3 text-[color:var(--primary)] flex-shrink-0" />
                <span>{t('aboutMe.areaBackend')}</span>
              </li>
              <li className="flex items-center">
                <Cpu size={20} className="mr-3 text-[color:var(--primary)] flex-shrink-0" />
                <span>{t('aboutMe.areaVHDL')}</span>
              </li>
              <li className="flex items-center">
                <Brain size={20} className="mr-3 text-[color:var(--primary)] flex-shrink-0" />
                <span>{t('aboutMe.areaAI')}</span>
              </li>
            </ul>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-[color:var(--secondary)] mb-8 text-center">
              {t('aboutMe.skillsSectionTitle', 'My Technical Skills')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {skillCategories.map((category) => (
                <div key={category.title} className="skill-item">
                  <h4 className="text-lg font-semibold text-[color:var(--primary)] mb-3 flex items-center">
                    {category.icon}
                    {category.title}
                  </h4>
                  <ul className="space-y-2">
                    {category.skills.map((skill) => (
                      <li key={skill} className="text-[color:var(--text)] text-sm flex items-start">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="14" 
                          height="14" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2.5"
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="text-[color:var(--primary)] mr-2 mt-0.5 flex-shrink-0"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;