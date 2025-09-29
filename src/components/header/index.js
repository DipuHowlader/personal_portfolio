"use client"

import styles from "./header.module.scss";
import Navbar from "../navbar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Preloader from "@/utils/preloader/preloader";

const Header = () => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigation = (href) => {
    setIsNavigating(true);
    router.push(href); 
  };
  return (
    <>
      <div className={`${styles.circle} ${styles.circle_1} c1`}></div>
      <div
        className={`${styles.circle} ${styles.circle_2} c2 d-md-block d-none`}
      ></div>
      <header className={styles.main}>
        <Navbar />

        <div className={styles.header_content}>
          <div className="container-fluid">
            <div className="row justify-content-center ms-sm-3">
              <div className="ps-md-4 ps-0 col-md-8 ms-5 ms-md-0">
                <h5 className={`${styles.section_title} t1`}>Hello There</h5>

                <div className="oh__inner overflow-hidden">
                  <h1 className="name">I&apos;m Dipu</h1>
                </div>
                <div className="overflow-hidden">
                  <p className="p">
                    <span> A computer science student passionate </span>
                    <span> about building intelligent system and </span>
                    <span> solve complex problems </span>
                  </p>
                </div>

                <div className="d-block mt-3">
                  <Link href="/portfolio" className={styles.btn} onClick={() => handleNavigation("/portfolio")}>
                    View work
                  </Link>
                  {isNavigating && (
                    <Preloader />
                  )}
                </div>
                <div className={styles.outter}>
                  <div className={styles.scroll}></div>
                  <Link href="#" className={styles.mouse}>
                    <div className={styles.stick}></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
