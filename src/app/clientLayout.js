
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
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsClient(true); 

    if (isClient) {
      const handleStart = () => setLoading(true);
      const handleComplete = () => setLoading(false);

      const timer = setTimeout(() => {
        handleComplete();
      }, 1000);

      gsap.ticker.lagSmoothing(0);

      const lenis = new Lenis({
        lerp: 0.1, 
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      ScrollTrigger.refresh();

      return () => {
        clearTimeout(timer);
        lenis.destroy();
        gsap.ticker.remove((time) => lenis.raf(time * 1000));
      };
    }
  }, [isClient, pathname, searchParams]); 

  if (!isClient) {
    return <Preloader />;
  }

  return (
    <>
      <ThemeProvider>
        <Animations />
        <FluidAnimation />
        {children}
      </ThemeProvider>
    </>
  );
};

export default ClientLayout;