"use client"
import React, { useState, useEffect, Suspense } from "react";
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
    // Set isClient immediately on mount
    setIsClient(true);

    if (!isClient) return;

    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // Simulate loading with a timeout
    const timer = setTimeout(() => {
      handleComplete();
    }, 1000);

    // GSAP setup
    gsap.ticker.lagSmoothing(0);

    // Lenis smooth scrolling setup (moved outside condition for broader use)
    const lenis = new Lenis({
      lerp: 0.1, // Adjust for smoothness
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Optional: Trigger ScrollTrigger refresh
    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      clearTimeout(timer);
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, [isClient, pathname, searchParams]); // Dependencies trigger re-run on navigation

  return (
    <Suspense fallback={<Preloader />}>
      <ThemeProvider>
        {loading && <Preloader />} {/* Show preloader during loading */}
        <Animations />
        <FluidAnimation />
        {children}
      </ThemeProvider>
    </Suspense>
  );
};

export default ClientLayout;