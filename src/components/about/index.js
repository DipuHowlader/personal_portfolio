import styles from "./about.module.scss";
import Image from "next/image";
import skills from "./skills.json";


const About = () => {
  return (
    <>
      <section class={`${styles.about} about`}>
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-12">
              <div className={`${styles.content} psMd-5 ps-0 ps-sm-0`}>
                <h5 className={styles.section_title}>About me</h5>
                <p>
                  I’m a Computer Science and Engineering student from a reputed university in Bangladesh, passionate about building intelligent systems that solve real-world problems. With expertise in Deep Learning, Computer Vision, and Natural Language Processing, I help businesses unlock actionable insights from data and tackle complex challenges.

                  When I’m not coding, you’ll find me grinding on LeetCode, competing in programming contests, or diving into Kaggle competitions to sharpen my skills. I’m also a fitness enthusiast who loves hitting the gym to stay energized and focused.

                  My journey is fueled by a relentless curiosity for learning, whether it’s mastering new algorithms, optimizing code, or exploring cutting-edge AI research. I thrive in dynamic environments where innovation meets impact, and I’m always ready to take on the next big challenge.
                </p>

                <h3 className={styles.techo_title}>
                  Here are few technology i've worked with
                </h3>
                <ul className={styles.skill_list}>
                  {skills.map((skill, index) => (
                    <li key={index}>
                      <svg
                        clipRule="evenodd"
                        fillRule="evenodd"
                        strokeLinejoin="round"
                        strokeMiterlimit="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z" />
                      </svg>
                      {skill.skill}
                    </li>
                  ))}

                </ul>

                <h3>Dipu Howlader</h3>
                <span>Data Scientist</span>
              </div>
            </div>
            <div className="col-sm-4 col-12">
              <div className={`${styles.imgBox} mtMb-0 ms-md-0 ms-lg-auto`}>
                <Image
                  src="/images/dipu-howlader.jpg"
                  width={396}
                  height={396}
                  alt="Picture of the author"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
