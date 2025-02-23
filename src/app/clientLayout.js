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
  const [loading, setLoading] = useState(true); // Default to true so preloader shows
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // Simulate loading completion with a timeout
    const timer = setTimeout(() => {
      handleComplete();
    }, 1500); // Adjust the timeout duration as per your preference

    gsap.ticker.lagSmoothing(0);
    
    // Only initialize Lenis for larger screens
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

    return () => {
      clearTimeout(timer); // Clear the timer on cleanup
    };
  }, [pathname, searchParams]);

  return (
    <>
      <ThemeProvider>
        {loading && <Preloader />} {/* Show preloader if loading is true */}
        <FluidAnimation />
        <Animations />
        {children}
      </ThemeProvider>
    </>
  );
};

export default ClientLayout;
