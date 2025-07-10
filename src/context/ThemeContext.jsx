import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark-slate');
  const [isAutoRotate, setIsAutoRotate] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark-slate';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    let intervalId;
    if (isAutoRotate) {
      const themes = ['dark-slate', 'dark-ocean', 'dark-forest', 'dark-sunset', 'light-stone', 'light-daybreak', 'light-blossom', 'light-meadow'];
      intervalId = setInterval(() => {
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        const newTheme = themes[nextIndex];
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      }, isAutoRotate);
    }
    return () => clearInterval(intervalId);
  }, [isAutoRotate, theme]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const setAutoRotate = (interval) => {
    setIsAutoRotate(interval);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, setAutoRotate }}>
      {children}
    </ThemeContext.Provider>
  );
};