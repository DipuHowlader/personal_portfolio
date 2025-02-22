"use client";

import {useEffect, useRef} from "react";
import styles from "./navbar.module.scss";
import Link from "next/link";
import { useTheme } from "@/utils/theme/context";

import {gsap} from "gsap";

const Navbar = () => {

  const lightButtonRef = useRef(null);
  const darkButtonRef = useRef(null);
  const menuTimelineRef = useRef(gsap.timeline());
  const { theme, toggleTheme } = useTheme();
  


  useEffect(() => {
    gsap.set(".menupage", {yPercent: -200});
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    const menupage = document.querySelector(".menupage");
    const menuLinks = document.querySelectorAll(".menupage ul li a");
    const menuBoxes = document.querySelectorAll(".menupage .info .box");

    gsap.set(menuLinks, {opacity: 0, yPercent: 0});
    gsap.set(menuBoxes, {opacity: 0, yPercent: 0});
    gsap.to(menupage, {duration: 0.2, yPercent: 0, ease: "bounce.out"});

    menuTimelineRef.current
      .to(menuLinks, {
        duration: 0.5,
        opacity: 1,
        yPercent: -20,
        delay: 0.7,
        stagger: 0.3,
      })
      .to(menuBoxes, {
        duration: 0.5,
        opacity: 1,
        yPercent: -20,
        stagger: 0.3,
      });
  };

  return (
    <>
      <div id={styles.navbar}>
        <nav className="navbar">
          <Link className={styles.navbar_brand} href="/">
            Dipu
          </Link>

          <div
            className={`${styles.right} ms-md-auto mb-sm-auto mb-md-0 d-flex justify-content-between align-items-center`}
          >
            <div className={styles.theme}>
              <div
                ref={lightButtonRef}
                className={`${styles.theme_btn} light ${theme === 'light' ? '' : 'hidden'}`}
                onClick={() => toggleTheme(lightButtonRef, darkButtonRef)} 
                role="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.069 13h-4.069v-2h4.069c-.041.328-.069.661-.069 1s.028.672.069 1zm3.034-7.312l-2.881-2.881-1.414 1.414 2.881 2.881c.411-.529.885-1.003 1.414-1.414zm11.209 1.414l2.881-2.881-1.414-1.414-2.881 2.881c.528.411 1.002.886 1.414 1.414zm-6.312-3.102c.339 0 .672.028 1 .069v-4.069h-2v4.069c.328-.041.661-.069 1-.069zm0 16c-.339 0-.672-.028-1-.069v4.069h2v-4.069c-.328.041-.661.069-1 .069zm7.931-9c.041.328.069.661.069 1s-.028.672-.069 1h4.069v-2h-4.069zm-3.033 7.312l2.88 2.88 1.415-1.414-2.88-2.88c-.412.528-.886 1.002-1.415 1.414zm-11.21-1.415l-2.88 2.88 1.414 1.414 2.88-2.88c-.528-.411-1.003-.885-1.414-1.414zm6.312-10.897c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z" />
                </svg>
              </div>

              <div
              ref={darkButtonRef}
                className={`${styles.theme_btn} dark ${theme === 'dark' ? '' : 'hidden'}`}
                onClick={() => toggleTheme(lightButtonRef, darkButtonRef)}
                role="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#000"
                >
                  <path d="M22 12c0 5.514-4.486 10-10 10-4.826 0-8.864-3.436-9.797-7.99 3.573.142 6.903-1.818 8.644-5.013 1.202-2.206 1.473-4.679.83-6.992 5.608-.194 10.323 4.338 10.323 9.995zm-10-12c-1.109 0-2.178.162-3.197.444 3.826 5.933-2.026 13.496-8.781 11.128l-.022.428c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12z" />
                </svg>
              </div>
            </div>

            <a className={`${styles.menu} m-0`} onClick={handleClick}>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
