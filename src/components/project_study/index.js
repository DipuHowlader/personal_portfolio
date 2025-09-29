import styles from "./protfolio.module.scss";
import Project from "../project";
import items from "./project_study.json";

import Link from "next/link";

const Protfolio = () => {
  return (
    <>
      <section id={styles.protfolio} className="protfolio">
        <div className={styles.background}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="container">
          <h5 className={styles.section_title}>Things I&apos;ve built</h5>
          <div className="row">
            {items.map((item, index) => (
               <Project key={index} item={item} />
            ))}
            <div className="row justify-content-center mt-5">
              <Link
                href="./protfolio"
                className={`${styles.portfolio_btn} btn`}
              >
                Load More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Protfolio;
