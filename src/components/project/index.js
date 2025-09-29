import Image from "next/image";
import styles from "./project.module.scss";
import Link from 'next/link';

const Project = ({item}) => {
  return (
    <>
      <div className="col-md-4 col-sm-6">
        <div className={styles.case_study}>
          <div className={styles.img_box}>
            <Image
              src={item.image}
              alt="case study" 
              width={500}
              height={256}
              style={{ width: '100%', height: 'auto' }}
            />

            <div className={styles.after_hover}>
              <div className="d-flex justify-content-center align-items-center">
                <h3>Read Case study</h3>
                <Link href={item.host} className={styles.live}>
                  <svg
                    clipRule="evenodd"
                    fillRule="evenodd"
                    strokeLinejoin="round"
                    strokeMiterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="40px"
                  >
                    <path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z" />
                  </svg>
                </Link>

              </div>
            </div>
          </div>
          <div className={styles.project_details}>
            <h2 className={styles.project_title}>{item.name}</h2>
            <p className={`${styles.pra} text-center`}>
             {item.description}
            </p>
            <div className={styles.footer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <Link href={item.host} className={styles.live}>
                Live
            </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
