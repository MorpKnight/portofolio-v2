import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { Languages, ChevronDown, ArrowUp } from 'lucide-react';
import Hamburger from 'hamburger-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const langDropdownRef = useRef(null);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const toggleLangDropdown = () => {
    setIsLangDropdownOpen(!isLangDropdownOpen);
  };

  // Simplified scroll handling for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / totalHeight) * 100;
      
      // Update scroll progress
      setScrollProgress(progress);
      
      // Update scrolled state for enhanced styling
      setIsScrolled(currentScrollY > 50);
      
      // Show/hide scroll to top button
      setShowScrollTop(currentScrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangDropdownOpen(false);
    closeMobileMenu();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />
      
      <nav className={`navbar-enhanced bg-nav backdrop-blur-md shadow-lg fixed top-0 w-full z-50 border-b border-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <RouterLink
              to="/"
              className="site-name-modern"
              onClick={closeMobileMenu}
            >
              {/* Full name for large screens */}
              <span className="hidden xl:inline">
                {t('siteName')}
              </span>
              {/* Medium name for medium screens */}
              <span className="hidden md:inline xl:hidden">
                {t('siteNameShort')}
              </span>
              {/* Short name for small screens */}
              <span className="inline md:hidden">
                {t('siteNameMobile')}
              </span>
            </RouterLink>

            <div className="hidden lg:flex items-center space-x-1">
            {navLinksData.map((link) => (
              <NavLink
                key={link.textKey}
                to={link.href}
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive && !link.href.includes("#")
                      ? "text-[color:var(--primary)] bg-[color:var(--nav-hover)] active"
                      : "text-nav hover:text-[color:var(--nav-text-hover)] hover:bg-[color:var(--nav-hover)]"
                  }`
                }
              >
                {t(link.textKey)}
              </NavLink>
            ))}
            <div className="relative ml-3" ref={langDropdownRef}>
              <button
                onClick={toggleLangDropdown}
                className="lang-selector-modern text-nav hover:text-[color:var(--nav-text-hover)] focus:outline-none flex items-center"
                aria-label="Change language"
                aria-haspopup="true"
                aria-expanded={isLangDropdownOpen}
              >
                <Languages size={20} />
                <span className="ml-2 uppercase font-medium">{i18n.language}</span>
                <ChevronDown size={16} className={`ml-1 transform transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`dropdown-modern absolute right-0 mt-2 w-40 z-50 ${isLangDropdownOpen ? 'show' : ''}`}>
                {languageOptions.map(lang => (
                  <a
                    key={lang.code}
                    href="#"
                    onClick={(e) => { e.preventDefault(); changeLanguage(lang.code); }}
                    className={`dropdown-item block text-sm text-left ${i18n.language === lang.code ? 'text-[color:var(--primary)] font-semibold' : 'text-[color:var(--text)]'}`}
                  >
                    {lang.code.toUpperCase()} - {t(`languageLabel.${lang.code}`, lang.label === 'EN' ? 'English' : '日本語')}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => changeLanguage(i18n.language === 'en' ? 'ja' : 'en')}
              className="lang-selector-modern text-nav hover:text-[color:var(--nav-text-hover)] focus:outline-none flex items-center mr-2"
              aria-label="Switch language"
            >
              <Languages size={18} />
              <span className="ml-1 uppercase font-medium text-sm">{i18n.language === 'en' ? 'JA' : 'EN'}</span>
            </button>
            
            <div className="relative z-50">
                <Hamburger
                    toggled={isMobileMenuOpen}
                    toggle={setIsMobileMenuOpen}
                    size={24}
                    color="var(--nav-text)"
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
            className="mobile-menu-modern lg:hidden absolute w-full left-0"
            style={{ top: '4rem' }} 
          >
            {navLinksData.map((link) => (
              <NavLink
                key={link.textKey}
                to={link.href}
                onClick={closeMobileMenu} 
                className={({ isActive }) =>
                  `nav-link block text-base font-medium ${
                    isActive && !link.href.includes("#")
                      ? "text-[color:var(--primary)] bg-[color:var(--hover-bg)] active"
                      : "text-nav hover:text-[color:var(--nav-text-hover)]"
                  }`
                }
              >
                {t(link.textKey)}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="scroll-to-top-btn fixed bottom-8 right-8 z-40 w-12 h-12 bg-[color:var(--primary)] hover:bg-[color:var(--secondary)] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} className="group-hover:scale-110 transition-transform duration-200" />
          </motion.button>
        )}
      </AnimatePresence>
    </nav>
    </>
  );
}