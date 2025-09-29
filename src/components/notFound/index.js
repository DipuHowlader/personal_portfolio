"use client"

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './notFound.module.scss';

const NotFound = () => {
    const glitchRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        const el = glitchRef.current;
        if (!el) return;

        const mouseOver = () => { el.style.animationDuration = '0.8s'; };
        const mouseOut = () => { el.style.animationDuration = '5s'; };

        el.addEventListener('mouseover', mouseOver);
        el.addEventListener('mouseout', mouseOut);

        intervalRef.current = setInterval(() => {
            el.style.animation = 'none';
            // force reflow
            // eslint-disable-next-line no-unused-expressions
            el.offsetHeight;
            setTimeout(() => { el.style.animation = 'glitch 5s infinite'; }, 100);
        }, 0);

        return () => {
            el.removeEventListener('mouseover', mouseOver);
            el.removeEventListener('mouseout', mouseOut);
            clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <section className={styles.notfound}>
            <div className={styles.container}>
                <h1 ref={glitchRef} className={`${styles['error-code']} glitch`} data-text="404">404</h1>
                <p className={styles.message}>The page you&apos;re looking for seems to have vanished into the digital void. It might have been moved, deleted, or perhaps it never existed in the first place.</p>
                <Link href="/" className={styles.btn} onClick={() => handleNavigation("/portfolio")}>
                    Return to Homepage
                  </Link>
                {/* <Link href='/' className={styles.btn}></Link> */}

                <div className={styles.scanlines} aria-hidden />
                <div className={styles.noise} aria-hidden />
            </div>

        </section>
    );
};

export default NotFound;
