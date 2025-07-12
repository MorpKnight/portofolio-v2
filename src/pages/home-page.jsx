import React, { useEffect } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { motion } from 'framer-motion';

import About from '../sections/about-me';
import Education from '../sections/education';
import Experience from '../sections/employment-history';
import Projects from '../sections/featured-project';
import DownloadCV from '../sections/download-cv';
import ContactMe from '../sections/contact-me';

const pageMotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function HomePage() {
  const { t } = useTranslation();
  const { socialLinks } = useOutletContext();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.hash, location.pathname]);

  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageMotionProps}
    >
      <header
        id="home"
        className="pt-32 pb-16 md:pt-48 md:pb-24 bg-[color:var(--background)] flex items-center justify-center text-center relative"
      >
        <div className="container mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-[color:var(--text)]">
            <Trans i18nKey="homePage.greeting">
              My name is <span className="text-[color:var(--primary)]">Giovan</span>.
            </Trans>
          </h1>
          <p className="text-xl sm:text-2xl text-[color:var(--text)] mb-8 max-w-2xl mx-auto">
            <Trans i18nKey="homePage.introduction">
              As a <span className="font-semibold text-[color:var(--secondary)]">[Your Role Here e.g., Full-Stack Developer]</span>, I am passionate about creating modern and responsive web applications and designing efficient hardware.
            </Trans>
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#projects"
              className="btn-enhanced text-lg w-full sm:w-auto inline-flex items-center justify-center"
            >
              {t('homePage.viewProjects')}
            </a>
            <a
              href="#contact"
              className="btn-enhanced-secondary text-lg w-full sm:w-auto inline-flex items-center justify-center"
            >
              {t('homePage.contactMe')}
            </a>
          </div>
        </div>
      </header>

      <About />
      <Education />
      <Experience />
      <Projects />
      <DownloadCV />
      <ContactMe socialLinks={socialLinks} />
    </motion.div>
  );
}