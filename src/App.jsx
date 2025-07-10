import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ThemeSettings from './components/ThemeSettings'; // Import ThemeSettings
import { Github, Linkedin, MessageCircleMore, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AnimatePresence } from 'framer-motion';

import "./App.css";

export default function AppLayout() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const storedLang = localStorage.getItem('i18nextLng');
    if (!storedLang || !storedLang.startsWith('ja')) {
      fetch('https://get.geojs.io/v1/ip/country.json')
        .then(response => response.json())
        .then(data => {
          if (data.country === 'JP' && i18n.language !== 'ja') {
            const detectedLng = i18n.services.languageDetector.detect();
            const preferredLng = Array.isArray(detectedLng) ? detectedLng[0] : detectedLng;
            if (!preferredLng || !preferredLng.startsWith('ja')) {
                i18n.changeLanguage('ja');
            }
          }
        })
        .catch(error => console.error('Error fetching IP geolocation:', error));
    }
  }, [i18n]);

  const socialLinks = [
    {
      href: "https://github.com/MorpKnight",
      icon: <Github size={24} />,
      label: "GitHub",
    },
    {
      href: "https://linkedin.com/in/giovanchristoffel",
      icon: <Linkedin size={24} />,
      label: "LinkedIn",
    },
    // {
    //   href: "https://x.com/mrpknght",
    //   icon: <Twitter size={24} />,
    //   label: "X (formerly Twitter)",
    // },
    {
      href: "https://wa.me/6281281083891",
      icon: <MessageCircleMore size={24} />,
      label: "Whatsapp",
    }
  ];

  return (
    <div className="min-h-screen bg-[color:var(--background)] text-[color:var(--text)] font-sans flex flex-col">
      <Analytics />
      <SpeedInsights />
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Outlet context={{ socialLinks }} />
        </AnimatePresence>
      </main>
      <Footer socialLinks={socialLinks} />
      <ThemeSettings /> {/* Add ThemeSettings component */}
    </div>
  );
}