"use client"


import { useEffect, useState } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";


const Animations = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    gsap.registerPlugin(ScrollTrigger);
    if (!isMounted) return;

    const isMobile = window.matchMedia("(max-width: 600px)").matches;

    const animateElement = (selector, yPercentValue) => {
      const element = document.querySelector(selector);
      if (element) {
        gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: isMobile ? "top bottom" : "top center",
            end: isMobile ? "bottom top" : "bottom center",
            scrub: true,
          },
        }).to(element, {
          ease: "none",
          yPercent: yPercentValue,
        }, "start");
      }
    };

    // Animate sections
    animateElement(".about", -120);
    animateElement(".protfolio", -120);
    animateElement(".footer", -120);

    const menuTimeline = gsap.timeline({});

    const menuButton = document.querySelector(".menu");
    const crossButton = document.querySelector(".cross");

    const handleMenuClick = () => {
      gsap.set(".menupage ul li a", { opacity: 0, yPercent: 0 });
      gsap.set(".menupage .info .box", { opacity: 0, yPercent: 0 });
      gsap.to(".menupage", { duration: 0.2, yPercent: 0, ease: "bounce.out" });
      menuTimeline.to('.menupage ul li a', { duration: 0.5, opacity: 1, yPercent: -20, delay: 0.7, stagger: 0.3 });
      menuTimeline.to('.menupage .info .box', { duration: 0.5, opacity: 1, yPercent: -20, stagger: 0.3 });
    };

    const handleCrossClick = () => {
      gsap.to(".menupage", { duration: 0.2, yPercent: -200, ease: "bounce.out" });
    };

    if (menuButton) {
      menuButton.addEventListener("click", handleMenuClick);
    }

    if (crossButton) {
      crossButton.addEventListener("click", handleCrossClick);
    }

    return () => {
      if (menuButton) menuButton.removeEventListener("click", handleMenuClick);
      if (crossButton) crossButton.removeEventListener("click", handleCrossClick);
    };

  }, [isMounted]); 

  if (!isMounted) return null;

  return null;
};

export default Animations;