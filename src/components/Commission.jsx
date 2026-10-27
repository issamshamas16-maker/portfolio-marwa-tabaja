import { useState, useRef } from "react";
// data
import { commissionState } from "../data";
// animations
import { motion, useInView } from "framer-motion";
import { headAnim } from "../animations";

const Commission = () => {
  const [commissionData] = useState(commissionState);

  // scroll animations
  const ref = useRef(null);
  useInView(ref);

  return (
    <section id="commission-container" ref={ref}>
      <div>
        <div className="hide">
          <motion.h3
            variants={headAnim}
            initial="hidden"
            whileInView="visible"
            viewport="viewport"
          >
            Services
          </motion.h3>
        </div>
        <div className="hide">
          <motion.h2
            variants={headAnim}
            initial="hidden"
            whileInView="visible"
            viewport="viewport"
          >
            Want Custom Art?
          </motion.h2>
        </div>
      </div>
      <div className="comm-card-wrapper">
        <div className="comm-card">
          <div className="comm-text-wrapper">
            <div className="comm-text">
              <p className="title">Traditional Illustration</p>
              <p>Original hand-drawn and hand-painted artwork for creative projects.</p>
              </div>
          </div>
        </div> 
        <div className="comm-card">
          <div className="comm-text-wrapper">
            <div className="comm-text">
              <p className="title">Book & Editorial Illustration</p>
              <p>Traditional illustrations for suitable publishing and editorial projects.</p>
              </div>
          </div>
        </div>
        <div className="comm-card">
          <div className="comm-text-wrapper">
            <div className="comm-text">
              <p className="title">Artwork for Products & Print</p>
              <p>Original artwork that may be adapted for products, stationery, greeting cards, and printed materials, subject to project requirements.</p>
            </div>
          </div>
        </div>
        <div className="comm-card">
          <div className="comm-text-wrapper">
            <div className="comm-text">
              <p className="title">Original Artwork Licensing</p>
              <p>Opportunities for businesses to license selected original artwork for agreed uses and terms.</p>
            </div>
          </div>
        </div>
      </div> 
    </section>
  );
};

export default Commission;
