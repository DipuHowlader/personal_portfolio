"use client";

import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import { gsap } from "gsap";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); 
  const lightButtonRef = useRef(null);
  const darkButtonRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.classList.toggle('dark-theme', theme === 'dark');
    }
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    // Animate theme switch (synchronized)
    if (lightButtonRef.current && darkButtonRef.current) {
      gsap.to(lightButtonRef.current, {
        duration: 0.5,
        yPercent: newTheme === 'dark' ? 60 : 0, 
        rotate: newTheme === 'dark' ? -111 : 45,
        opacity: newTheme === 'dark' ? 0 : 1, 
        ease: "power.in",
      });

      gsap.to(darkButtonRef.current, {
        duration: 0.5,
        yPercent: newTheme === 'dark' ? 0 : 60, 
        rotate: newTheme === 'dark' ? 45 : -111,
        opacity: newTheme === 'dark' ? 1 : 0,
        ease: "power.in",
      });
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, lightButtonRef, darkButtonRef }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);