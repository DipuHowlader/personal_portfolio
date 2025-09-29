"use client"
import Link from "next/link";
import styles from "./menu.module.scss";
import { gsap } from "gsap";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Preloader from "@/utils/preloader/preloader";

const Menu = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    document.querySelector(`.${styles.menupage}`).classList.remove("d-none");
  }, []);

  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const closeMenu = () => {
    return gsap.to(`.${styles.menupage}`, {
      duration: 0.5,
      yPercent: -200,
      ease: "power2.out",
    });
  };

  const handleNavigation = (e, href) => {
    e.preventDefault();
    closeMenu().then(() => {
      setIsNavigating(true);
      router.push(href);
    });
  };

  return (
    <div className={`${styles.menupage} menupage d-none`}>
      <div className={`cross ${styles.cross}`} onClick={(e) => closeMenu(e)}>
        <svg
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
        </svg>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <ul>
          <li>
            <Link
              href="/portfolio"
              onClick={(e) => handleNavigation(e, "/portfolio")}
            >
              Portfolio
            </Link>
            {isNavigating && (
                    <Preloader />
                  )}
          </li>
          <li>
            <Link href="/contact" onClick={(e) => handleNavigation(e, "/contact")}>
              Contact
            </Link>
          </li>
        </ul>

        <div className={`${styles.info} info`}>
          <div className={`${styles.location} ${styles.box} box`}>
            <span>Hasannagar</span>
            <span>Borhunuddin, Bhola</span>
          </div>
          <div className={`${styles.email} ${styles.box} box`}>
            <span>I&apos;m also available</span>
            <Link
              className={styles.mail}
              href="mailto:dipuhowlader33@gmail.com"
            >
              dipuhowlader33@gmail.com
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;