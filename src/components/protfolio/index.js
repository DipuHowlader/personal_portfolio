import styles from "./protfolio.module.scss";
import Link from "next/link";
import data from "./data.json";
import Image from "next/image";


const Protfolio = () => {

  return (
    <>
      <section className={styles.projects}>
        <div className="container-fluid px-5">
          <div className={styles.project}>

            {data.map((item) => (
              <div className={styles.project}>
                <div className={`${styles.framer} d-none d-md-flex justify-content-between`}>
                  <h5>{item.year}</h5>
                  <h5>{item.ML_Model}</h5>
                  <h5>{item.name}</h5>

                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className={styles.left}>
                      <h2 className={styles.project_name}>{item.name}</h2>
                      <p className={styles.desc}>{item.description}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={styles.right}>
                      <Image
                        className={styles.box}
                        src={item.image}
                        alt="case study"
                        width={500}
                        height={256}
                      />

                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Protfolio;
