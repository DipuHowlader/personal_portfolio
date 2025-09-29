
"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Preloader from "@/utils/preloader/preloader";
import FluidAnimation from "@/utils/fluid";
import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger } from "gsap/all";
import Animations from "@/utils/animations";
import { ThemeProvider } from "@/utils/theme/context";
import { ReactLenis } from 'lenis/react';

const ClientLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Set client flag once on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsClient(true);
  }, []);

  // Keep preloader visible until window 'load' fires (ensures resources are fetched)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleComplete = () => setLoading(false);

    // If the page is already fully loaded, hide immediately
    if (document.readyState === 'complete') {
      handleComplete();
    } else {
      window.addEventListener('load', handleComplete);
    }

    return () => {
      window.removeEventListener('load', handleComplete);
    };
  }, []);

  // existing client-only setup (Lenis, GSAP) runs when client is ready
  useEffect(() => {
    if (!isClient) return;

    gsap.ticker.lagSmoothing(0);

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

    const rafCb = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(rafCb);

    return () => {
      gsap.ticker.remove(rafCb);
    };
  }, [isClient]);

  return (
    <>
      <ThemeProvider>
        <Animations />
        <FluidAnimation />
        <ReactLenis root>
          {children}
        </ReactLenis>
        {/* Preloader overlay: shown while loading */}
        {loading && <Preloader />}
      </ThemeProvider>
    </>
  );
};

export default ClientLayout;