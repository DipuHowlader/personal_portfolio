"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Preloader from "@/utils/preloader/preloader";
import FluidAnimation from "@/utils/fluid";
import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger } from "gsap/all";
import Animations from "@/utils/animations";
import { ThemeProvider } from "@/utils/theme/context";

const ClientLayout = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);
    handleStart();

    gsap.ticker.lagSmoothing(0);
    const timer = setTimeout(() => {
      handleComplete();
    }, 500);

    if (window.innerWidth > 768) { 
      const lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      return () => {
        clearTimeout(timer);
        lenis.destroy();
      };

    }
    
  }, [pathname, searchParams]);

  return (
    <>
      <ThemeProvider>
      {loading && <Preloader />}
      <FluidAnimation />
      <Animations />
      {children}

      </ThemeProvider>
    </>
  );
};

export default ClientLayout;
