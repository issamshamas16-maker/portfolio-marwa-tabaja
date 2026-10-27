import artist from "../images/artist.jpg";
import { useRef } from "react";
// Animations
import { motion, useInView } from "framer-motion";
import { textAnim, headAnim } from "../animations";

const AboutSection = () => {
  // framer motion animations
  const ref = useRef(null);
  useInView(ref);

  return (
    <section className="about-container" id="about" ref={ref}>
      {/* <div className="about-img">
        <img src={artist} alt="me drawing" />
      </div> */}
      <div className="about-text">
        <div className="about-head">
          <div className="hide">
            <motion.h3
              variants={headAnim}
              initial="hidden"
              whileInView="visible"
              viewport="viewport"
            >
              About
            </motion.h3>
          </div>
          <div className="hide">
            <motion.h2
              variants={headAnim}
              initial="hidden"
              whileInView="visible"
              viewport="viewport"
            >
              Who Am I?
            </motion.h2>
          </div>
        </div>
        <motion.p
          variants={textAnim}
          initial="hidden"
          whileInView="visible"
          viewport="viewport"
        >
          I&apos;m Marwa Tabaja, and welcome to my portfolio!<br />
          I am a traditional Artist & Illustrator,<br />
          and I like bringing ideas to life through color, emotion, and traditional art.
        </motion.p>
        {/* <motion.p
          variants={textAnim}
          initial="hidden"
          whileInView="visible"
          viewport="viewport"
        >
          
        </motion.p> */}
      </div>
    </section>
  );
};

export default AboutSection;
