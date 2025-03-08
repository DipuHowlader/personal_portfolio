"use client";

import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import { gsap } from "gsap";

// Create ThemeContext
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default theme
  const lightButtonRef = useRef(null);
  const darkButtonRef = useRef(null);

  // Initialize theme from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, []);

  // Update body class when theme changes
  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark');
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
        yPercent: newTheme === 'dark' ? 60 : 0, // Move up if switching to dark
        rotate: newTheme === 'dark' ? -111 : 45, // Rotate to the left if switching to dark
        opacity: newTheme === 'dark' ? 0 : 1, // Fade out if switching to dark
        ease: "power.in",
      });

      gsap.to(darkButtonRef.current, {
        duration: 0.5,
        yPercent: newTheme === 'dark' ? 0 : 60, // Move down if switching to dark
        rotate: newTheme === 'dark' ? 45 : -111, // Rotate to the right if switching to dark
        opacity: newTheme === 'dark' ? 1 : 0, // Fade in if switching to dark
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

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);