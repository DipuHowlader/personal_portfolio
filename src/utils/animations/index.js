import { useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Animations = () => {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 600px)").matches;
    const textTimeline = gsap.timeline();

    gsap
    .timeline({
      scrollTrigger: {
        trigger: document.querySelector(".about"), 
        start:  isMobile ? "top bottom" : "",
        end:  isMobile ? "bottom top" : "",
        scrub: true,
      },
    })
    .to(
      document.querySelector(".about"),
      {
        ease: "none",
        yPercent: -120,
      },
      "start"
    );

    gsap
      .timeline({
        scrollTrigger: {
          trigger: document.querySelector(".protfolio"), 
          start:  isMobile ? "top bottom" : "",
          end:  isMobile ? "bottom top" : "",
          scrub: true,
        },
      })
      .to(
        document.querySelector(".protfolio"),
        {
          ease: "none",
          yPercent: -120,
        },
        "start"
      );

      gsap
      .timeline({
        scrollTrigger: {
          trigger: document.querySelector(".footer"), 
          start:  isMobile ? "top bottom" : "",
          end:  isMobile ? "bottom top" : "",
          scrub: true,
        },
      })
      .to(
        document.querySelector(".about"),
        {
          ease: "none",
          yPercent: -120,
        },
        "start"
      );

    // Menu Animations
    const menuTimeline = gsap.timeline({});

    const menuButton = document.querySelector(".menu");
    if (menuButton) {
      menuButton.addEventListener("click", () => {
        gsap.set(".menupage ul li a", { opacity: 0, yPercent: 0 });
        gsap.set(".menupage .info .box", { opacity: 0, yPercent: 0 });
        gsap.to(".menupage", { duration: 0.2, yPercent: 0, ease: "bounce.out" });
        menuTimeline.to('.menupage ul li a', { duration: 0.5, opacity: 1, yPercent: -20, delay: 0.7, stagger: 0.3 });
        menuTimeline.to('.menupage .info .box', { duration: 0.5, opacity: 1, yPercent: -20, stagger: 0.3 });
      });
    }

    const crossButton = document.querySelector(".cross");
    if (crossButton) {
      crossButton.addEventListener("click", () => {
        gsap.to(".menupage", { duration: 0.2, yPercent: -200, ease: "bounce.out" });
      });
    }

    // Clean up function
    return () => {
      if (menuButton) menuButton.removeEventListener("click", () => {});
      if (crossButton) crossButton.removeEventListener("click", () => {});
    };

  }, []);

  return null;
};

export default Animations;
