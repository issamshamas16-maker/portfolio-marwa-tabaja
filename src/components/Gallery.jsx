
import { useState, useRef, useEffect } from "react";

// Gallery data
import { portfolio } from "../data";

// Framer Motion
import { motion, useInView, AnimatePresence } from "framer-motion";
import { portfilioItem, headAnim } from "../animations";

// Load gallery once
const gallery = portfolio();

const Gallery = () => {
  const [index, setIndex] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  // Current category
  const activeDisplay =
    gallery.find((item) => item.index === index) || gallery[0];

  // Selected artwork
  const activeImage =
    activeImageIndex === null
      ? null
      : activeDisplay?.imgs.find(
          (img) => img.imageIndex === activeImageIndex
        );

  const popup = activeImage !== null && activeImage !== undefined;

  // Change gallery category
  const changeCategory = (categoryIndex) => {
    setIndex(categoryIndex);
    setActiveImageIndex(null);
  };

  // Open selected artwork
  const openPopup = (imageIndex) => {
    setActiveImageIndex(imageIndex);
  };

  // Close popup
  const closePopup = () => {
    setActiveImageIndex(null);
  };

  // Close popup with Escape key
  useEffect(() => {
    if (!popup) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [popup]);

  // Scroll animations
  const ref = useRef(null);
  useInView(ref);

  return (
    <section id="portfolio">

      {/* GALLERY HEADER */}
      <div className="portfolio-head">
        <div className="hide">
          <motion.h2
            ref={ref}
            variants={headAnim}
            initial="hidden"
            whileInView="visible"
            viewport="viewport"
          >
            Gallery
          </motion.h2>
        </div>

        {/* CATEGORY BUTTONS */}
        <div className="btns">
          {gallery.map((item) => (
            <motion.button
              type="button"
              variants={headAnim}
              initial="hidden"
              whileInView="visible"
              viewport="viewport"
              onClick={() => changeCategory(item.index)}
              key={item.btnKey}
              className={item.index === index ? "active" : ""}
            >
              {item.btnText}
            </motion.button>
          ))}
        </div>
      </div>

      {/* GALLERY IMAGES */}
      <div className="portfolio-grid">
        <AnimatePresence mode="popLayout">
          {activeDisplay?.imgs.map((img) => (
            <motion.div
              className={`grid-img-wrapper ${img.className}`}
              key={img.key}
              variants={portfilioItem}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <img
                src={img.src}
                alt="Original artwork"
                loading="lazy"
                decoding="async"
              />

              <div className="image-btn">
                <button
                  type="button"
                  onClick={() => openPopup(img.imageIndex)}
                  aria-label="View artwork"
                >
                  View
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {activeDisplay?.imgs.length === 0 && (
          <p className="gallery-empty">
            No artworks available in this category yet.
          </p>
        )}
      </div>

      {/* IMAGE POPUP */}
      <div
        className={`popup-wrapper ${popup ? "active" : ""}`}
        onClick={closePopup}
        role="presentation"
      >
        <div className="overlay"></div>

        <div
          className="popup-img-wrapper"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="img">
            {activeImage && (
              <img
                src={activeImage.src}
                alt="Selected artwork"
              />
            )}
          </div>

          <p onClick={closePopup}>
            Click here to close
          </p>
        </div>
      </div>

    </section>
  );
};

export default Gallery;


// import { useEffect, useState, useRef } from "react";
// // portfilios
// import { portfolio } from "../data";
// // motion framer/ animations
// import { motion, useInView, AnimatePresence } from "framer-motion";
// import { portfilioItem, headAnim } from "../animations";

// const Gallery = () => {
//   const [gallery] = useState(portfolio);
//   const [index, setIndex] = useState(1);
//   const [activeDisplay, setActiveDisplay] = useState(gallery[index - 1]);
//   // popup state
//   const [popup, setPopup] = useState(false);
//   const [btnPopupIndex, setBtnPopupIndex] = useState(null);
//   const [activeImage, setActiveImage] = useState(activeDisplay.imgs);

//   useEffect(() => {
//     const currentDisplay = gallery.filter((element) => element.index === index);
//     setActiveDisplay(currentDisplay[0]);
//   }, [index, gallery]);

//   useEffect(() => {
//     const currentImage = activeDisplay.imgs.filter(
//       (element) => element.imageIndex === btnPopupIndex
//     );
//     setActiveImage(currentImage);
//   }, [popup, btnPopupIndex]);

//   const handlePopup = (e) => {
//     setPopup(!popup);
//     setBtnPopupIndex(Number(e.target.id));
//   };

//   // scroll animations
//   const ref = useRef(null);
//   useInView(ref);

//   return (
//     <section id="portfolio">
//       <div className="portfolio-head">
//         <div className="hide">
//           <motion.h2
//             ref={ref}
//             variants={headAnim}
//             initial="hidden"
//             whileInView="visible"
//             viewport="viewport"
//           >
//             Gallery
//           </motion.h2>
//         </div>
//         <div className="btns">
//           {gallery.map((item) => (
//             <motion.button
//               variants={headAnim}
//               initial="hidden"
//               whileInView="visible"
//               viewport="viewport"
//               onClick={(e) => setIndex(Number(e.target.id))}
//               id={item.index}
//               key={item.btnKey}
//               className={item.index === index ? "active" : ""}
//             >
//               {item.btnText}
//             </motion.button>
//           ))}
//         </div>
//       </div>

//       <div className="portfolio-grid">
//         <AnimatePresence>
//           {activeDisplay.imgs.map((img) => (
//             <motion.div
//               className={`grid-img-wrapper ${img.className}`}
//               key={img.key}
//               variants={portfilioItem}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//             >
//               <img src={img.src} alt="" />
//               <div className="image-btn">
//                 <button onClick={handlePopup} id={img.imageIndex}>
//                   View
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>

//       <div
//         className={`popup-wrapper ${popup ? "active" : ""}`}
//         onClick={() => setPopup(!popup)}
//       >
//         <div className="overlay"></div>
//         <div className="popup-img-wrapper">
//           <div className="img">
//             {activeImage.map((img) => (
//               <img src={img.src} alt="" key={img.key} />
//             ))}
//           </div>
//           <p>Click anywhere to close</p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Gallery;
