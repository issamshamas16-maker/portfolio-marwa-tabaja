import { useEffect, useState, useRef } from "react";
// images
import profileImg from "../images/bwonsamdi.jpg";
// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faEnvelope,
  faPaperPlane,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
// form validation
import { useFormik } from "formik";
import * as Yup from "yup";
// animations
import { motion, useInView } from "framer-motion";
import { headAnim, textAnim, contactImg } from "../animations";

const Contact = () => {
  // const [submit, setSubmit] = useState(false);

  // useEffect(() => {
  //   if (submit === true) {
  //     setTimeout(() => {
  //       setSubmit(!submit);
  //     }, 3500);
  //   }
  // }, [submit]);
  const [submit, setSubmit] = useState(false);
  const [sendError, setSendError] = useState("");
  const [senderName, setSenderName] = useState("");

  useEffect(() => {
    if (!submit) return;

    const timer = setTimeout(() => {
      setSubmit(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [submit]);

  // formik
  // const formik = useFormik({
  //   initialValues: {
  //     name: "",
  //     email: "",
  //     message: "",
  //   },
  //   // validate form
  //   validationSchema: Yup.object({
  //     name: Yup.string().required("Please fill out first & last name."),
  //     email: Yup.string()
  //       .required("Please fill out Email")
  //       .email("Invalid Email address"),
  //     message: Yup.string().required("Please fill out Message"),
  //   }),
  //   // submit form
  //   onSubmit: (values) => {
  //     setSubmit(!submit);
  //   },
  // });
  
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required("Please fill out first & last name."),
      email: Yup.string()
        .required("Please fill out Email")
        .email("Invalid Email address"),
      message: Yup.string()
        .required("Please fill out Message"),
    }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSendError("");

      try {
        const response = await fetch(
          "https://api.web3forms.com/submit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              access_key: "7d6a9b6d-2240-40c6-a717-2e060707968d",
              subject: "New Contact Message - Marwa Arts",
              from_name: "Marwa Arts Website",
              name: values.name,
              email: values.email,
              message: values.message,
            }),
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Failed to send message"
          );
        }

        setSenderName(values.name);
        // Show your existing success animation
        setSubmit(true);

        // Clear the form
        resetForm();

      } catch (error) {
        console.error("Email error:", error);
        setSendError(
          "Unable to send your message. Please try again."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  // scroll animations
  const ref = useRef(null);
  useInView(ref);

  return (
    <section id="contact" ref={ref}>
      <div className="contact-text">
        <div>
          <div className="hide">
            <motion.h2
              variants={headAnim}
              initial="hidden"
              whileInView="visible"
              viewport="viewport"
            >
              Contact Me
            </motion.h2>
          </div>
          <motion.p
            variants={textAnim}
            initial="hidden"
            whileInView="visible"
            viewport="viewport"
          >
            Have a creative project in mind?
            I'm open to collaboration opportunities with publishers, creative studios, and brands interested in traditional illustration and original artwork.
            <br />
            For professional inquiries and collaborations, please get in touch.
          </motion.p>
        </div>
        <div>
          <motion.h3
            variants={textAnim}
            initial="hidden"
            whileInView="visible"
            viewport="viewport"
          >
            <FontAwesomeIcon icon={faPhone} /> Phone
          </motion.h3>
          <motion.p
            variants={textAnim}
            initial="hidden"
            whileInView="visible"
            viewport="viewport"
          >
            76-951646
          </motion.p>
          <hr />
        </div>
        <div>
          <motion.h3
            variants={textAnim}
            initial="hidden"
            whileInView="visible"
            viewport="viewport"
          >
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </motion.h3>
          <motion.p
            variants={textAnim}
            initial="hidden"
            whileInView="visible"
            viewport="viewport"
          >
            marwatabaja332@gmail.com
          </motion.p>
          <hr />
        </div>
        <div>
          <motion.h3
            variants={textAnim}
            initial="hidden"
            whileInView="visible"
            viewport="viewport"
          >
            Follow Me
          </motion.h3>
          <div className="links">
            <motion.a
              variants={textAnim}
              initial="hidden"
              whileInView="visible"
              viewport="viewport"
              href="https://www.instagram.com/marwa.artss?vrfl=MW0xaGwyNGhkZDE3ag=="
              target="blank"
              aria-label="Instagram link"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </motion.a>
            {/* <motion.a
              variants={textAnim}
              initial="hidden"
              whileInView="visible"
              viewport="viewport"
              href="https://www.facebook.com/"
              target="blank"
              aria-label="Facebook link"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </motion.a>
            <motion.a
              variants={textAnim}
              initial="hidden"
              whileInView="visible"
              viewport="viewport"
              href="https://www.youtube.com/"
              target="blank"
              aria-label="Youtube link"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </motion.a>
            <motion.a
              variants={textAnim}
              initial="hidden"
              whileInView="visible"
              viewport="viewport"
              href="https://www.tiktok.com/"
              target="blank"
              aria-label="TikTok link"
            >
              <FontAwesomeIcon icon={faTiktok} />
            </motion.a> */}
          </div>
        </div>
      </div>
      <div className="img-form-wrapper">
        <div className="img">
          {/* <img src={profileImg} alt="" /> */}
        </div>
        <div className={`submit-message ${submit ? "active" : ""}`}>
          <span>
            <FontAwesomeIcon icon={faHandshake} />
          </span>
          {/* <p>{`Thank you ${formik.values.name}!`}</p> */}
          <p>{`Thank you ${senderName}!`}</p>
          <p>Your message has been sent!</p>
        </div>
        <motion.form
          variants={contactImg}
          initial="hidden"
          whileInView="visible"
          viewport="viewport"
          action=""
          onSubmit={formik.handleSubmit}
          className={submit ? "active" : ""}
        >
          <h4>Send a Message</h4>
          <div>
            <label
              htmlFor="name"
              className={formik.touched.name && formik.errors.name ? "red" : ""}
            >
              {formik.touched.name && formik.errors.name
                ? formik.errors.name
                : "First & Last Name"}
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className={
                formik.touched.email && formik.errors.email ? "red" : ""
              }
            >
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : "Email"}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className={
                formik.touched.message && formik.errors.message ? "red" : ""
              }
            >
              {formik.touched.message && formik.errors.message
                ? formik.errors.message
                : "Message"}
            </label>
            <textarea
              name="message"
              id="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
          </div>
          {/* <button>
            Send <FontAwesomeIcon icon={faPaperPlane} />
          </button> */}
          <button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Sending..." : "Send"}
            {" "}
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
          {sendError && (
            <p role="alert" style={{ color: "#ffdddd" }}>
              {sendError}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
