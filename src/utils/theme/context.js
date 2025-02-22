"use client"

import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import { gsap } from "gsap";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  
  const [theme, setTheme] = useState();
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      setTheme(localStorage.getItem('theme') || 'light');
    }


  }, []);
  const lightButtonRef = useRef(null);
  const darkButtonRef = useRef(null);

  const toggleTheme = (lightButtonRef, darkButtonRef) => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    // Update body class
    document.body.classList.toggle('dark-theme', newTheme === 'dark');

    // Update theme button visibility
    lightButtonRef.current.classList.toggle('hidden', newTheme === 'dark');
    darkButtonRef.current.classList.toggle('hidden', newTheme === 'light');

     // Animate theme switch (synchronized)

     gsap.to(lightButtonRef.current, {
       duration: 0.5,
       yPercent: newTheme === 'dark' ? 60 : 0, // Move up if switching to dark
       rotate: newTheme === 'dark' ? -111 : 45, // Rotate to the left if switching to dark
       opacity: newTheme === 'dark' ? 0 : 1, // Fade out if switching to dark
       ease: "power.in",
     })
     gsap.to(darkButtonRef.current, {
       duration: 0.5,
       yPercent: newTheme === 'dark' ? 0 : 60, // Move down if switching to dark
       rotate: newTheme === 'dark' ? 45 : -111, // Rotate to the right if switching to dark
       opacity: newTheme === 'dark' ? 1 : 0, // Fade in if switching to dark
       ease: "power.in",
     });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, lightButtonRef, darkButtonRef }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
