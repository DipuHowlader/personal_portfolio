import styles from "./footer.module.scss";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="footer" id={styles.footer}>
        <div className="container">
          <h2>Find me</h2>
          <Link
            className={styles.social_links}
            href="https://www.linkedin.com/in/dipu-howlader-054190203/"
          >
            Linkedin
          </Link>
          <Link className={styles.social_links} href="https://www.kaggle.com/arafathowlader">
            Kaggle
          </Link>
          <Link className={styles.social_links} href="https://leetcode.com/u/dipu__/">
          Leetcode
          </Link>
          <Link className={styles.social_links} href="https://github.com/DipuHowlader">
            Github
          </Link>

          <p className={styles.contact}>Lets Get in Touch.</p>
          <Link className={styles.mail} href="mailto:dipuhowlader33@gmail.com">
            <h1>dipuhowlader33@gmail.com</h1>
          </Link>

          <p className={styles.copyright}>
            <span id={styles.currentYear}>{new Date().getFullYear()}</span>, Dipu.
            Made with passion.
          </p>
        </div>
        <div className={styles.circle}></div>
        <div className={`${styles.circle} ${styles.cricle_2} c2`}></div>
      </footer>
    </>
  );
};

export default Footer;
