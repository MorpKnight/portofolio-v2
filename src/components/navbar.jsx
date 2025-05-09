import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { Languages, ChevronDown } from 'lucide-react';
import Hamburger from 'hamburger-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsLangDropdownOpen(false); 
  };
  
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const toggleLangDropdown = () => {
    setIsLangDropdownOpen(!isLangDropdownOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangDropdownOpen(false); 
    closeMobileMenu(); 
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [langDropdownRef]);

  const navLinksData = [
    { href: "/#about", textKey: "nav.about" },
    { href: "/#education", textKey: "nav.education" },
    { href: "/#experience", textKey: "nav.experience" },
    { href: "/#projects", textKey: "nav.featured" },
    { href: "/#cv", textKey: "nav.downloadCV" },
    { href: "/#contact", textKey: "nav.contact" },
  ];

  const languageOptions = [
    { code: 'en', label: 'EN' },
    { code: 'ja', label: 'JA' },
  ];

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05
      }
    }
  };

  return (
    <nav className="bg-neutral-800/80 backdrop-blur-md shadow-lg fixed w-full z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <RouterLink
            to="/"
            className="text-2xl font-bold color-shift transition-colors"
            onClick={closeMobileMenu}
          >
            {t('siteName')}
          </RouterLink>

          <div className="hidden md:flex items-center space-x-1">
            {navLinksData.map((link) => (
              <NavLink
                key={link.textKey}
                to={link.href}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive && !link.href.includes("#")
                      ? "text-violet-400 bg-neutral-700"
                      : "text-violet-200 hover:text-violet-400"
                  }`
                }
              >
                {t(link.textKey)}
              </NavLink>
            ))}
            <div className="relative ml-3" ref={langDropdownRef}>
              <button
                onClick={toggleLangDropdown}
                className="text-violet-200 hover:text-violet-400 p-2 focus:outline-none flex items-center rounded-md hover:bg-neutral-700 transition-colors"
                aria-label="Change language"
                aria-haspopup="true"
                aria-expanded={isLangDropdownOpen}
              >
                <Languages size={20} />
                <span className="ml-1 uppercase">{i18n.language}</span>
                <ChevronDown size={16} className={`ml-1 transform transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-neutral-700 rounded-md shadow-xl py-1 z-50 border border-neutral-600">
                  {languageOptions.map(lang => (
                    <a
                      key={lang.code}
                      href="#"
                      onClick={(e) => { e.preventDefault(); changeLanguage(lang.code); }}
                      className={`block px-4 py-2 text-sm text-left ${i18n.language === lang.code ? 'text-violet-400 font-semibold bg-neutral-600' : 'text-violet-100'} hover:bg-neutral-600 hover:text-violet-300 transition-colors`}
                    >
                      {lang.code.toUpperCase()} - {t(`languageLabel.${lang.code}`, lang.label === 'EN' ? 'English' : '日本語')}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => changeLanguage(i18n.language === 'en' ? 'ja' : 'en')}
              className="text-violet-200 hover:text-violet-400 p-2 focus:outline-none flex items-center rounded-md hover:bg-neutral-700 transition-colors mr-1"
              aria-label="Switch language"
            >
              <Languages size={20} />
              <span className="ml-1 uppercase">{i18n.language === 'en' ? 'JA' : 'EN'}</span>
            </button>
            
            <div className="relative z-50">
                <Hamburger
                    toggled={isMobileMenuOpen}
                    toggle={setIsMobileMenuOpen}
                    size={24}
                    color="rgb(221 214 254)"
                    duration={0.6}
                    label={isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
                    rounded
                />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobileMenu"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="md:hidden bg-neutral-800/95 backdrop-blur-sm absolute w-full shadow-lg left-0"
            style={{ top: '4rem' }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinksData.map((link) => (
                <NavLink
                  key={link.textKey}
                  to={link.href}
                  onClick={closeMobileMenu} 
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive && !link.href.includes("#")
                        ? "text-violet-300 bg-neutral-700"
                        : "text-violet-100 hover:bg-neutral-700 hover:text-violet-300"
                    }`
                  }
                >
                  {t(link.textKey)}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}