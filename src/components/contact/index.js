"use client"

import Link from "next/link";
import styles from "./contact.module.scss";
import emailjs from "emailjs-com";
import { useState, useEffect, useRef } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false); 
  const formRef = useRef(null);
  // Track which fields were blurred and left empty
  const [blurredEmpty, setBlurredEmpty] = useState({});

  useEffect(() => {
    emailjs.init("9UoQKFY7jsngv8z7S"); 
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // If user starts typing, clear the red border for this field
    setBlurredEmpty((prev) => ({ ...prev, [name]: false }));
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all required fields that are empty as blurredEmpty
    const requiredFields = ["name", "email", "message"];
    let anyEmpty = false;
    const newBlurred = { ...blurredEmpty };
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newBlurred[field] = true;
        anyEmpty = true;
      }
    });
    setBlurredEmpty(newBlurred);

    if (anyEmpty) {
      setStatus("Please fill in all required fields (Name, Email, Message).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("Please enter a valid email address.");
      setBlurredEmpty((prev) => ({ ...prev, email: true }));
      return;
    }

    setIsSubmitting(true);
    setStatus("");

    emailjs
      .sendForm(
        "service_9f2ro48", 
        "template_80aqium", 
        e.target,
        "9UoQKFY7jsngv8z7S" 
      )
      .then(
        (result) => {
          setShowToast(true); 
          setFormData({
            name: "",
            email: "",
            company: "",
            message: "",
          });
          setIsSubmitting(false);

          setTimeout(() => {
            setShowToast(false);
          }, 2000);
        },
        (error) => {
          setStatus("Error sending email. Please try again.");
          setIsSubmitting(false);
        }
      );
  };
const nameRef = useRef(null);
const emailRef = useRef(null);
const companyRef = useRef(null);
const messageRef = useRef(null);


  const handleClick = (ref) => {
    console.log(ref.current);
    if (ref.current) {
      ref.current?.focus(); // selects all text inside the input
    }
  };


  // On blur, if input is empty, mark it for red border
  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    if (!value) {
      setBlurredEmpty((prev) => ({ ...prev, [name]: true }));
    } else {
      setBlurredEmpty((prev) => ({ ...prev, [name]: false }));
    }
  };

  return (
    <section id={styles.contact}>
      <div className="container-fluid px-3">
        <div className={`${styles.phone} ${styles.contact}`}>
          <span>Phone</span>
          <h3>+880 1735989339</h3>
        </div>
      </div>

  <div ref={formRef} className={`${styles.form} mx-5 mx-md-auto`}>
        <div className={styles.head}>
          <h2>Let&apos;s work together</h2>
          <p>
            I&apos;m here to help you achieve extraordinary results. Fill out the form below to schedule a consultation.
          </p>
        </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.field}>
              <div className={styles.side}>
                <span>01</span>
              </div>
              <label htmlFor="name">What&apos;s your name? *</label>
              <input
                ref={nameRef}
                onClick={() => handleClick(nameRef)}
                onChange={handleChange}
                onBlur={handleInputBlur}
                name="name"
                id="name"
                placeholder="Type your full name"
                type="text"
                value={formData.name}
                required
                style={blurredEmpty.name ? { borderBottom: '1px solid #ff2424' } : {}}
              />
            </div>

            <div className={styles.field}>
              <div className={styles.side}>
                <span>02</span>
              </div>
              <label htmlFor="email">What&apos;s your email address? *</label>
              <input
                ref={emailRef}
                onClick={() => handleClick(emailRef)}
                onChange={handleChange}
                onBlur={handleInputBlur}
                name="email"
                id="email"
                placeholder="example@email.com"
                type="email"
                value={formData.email}
                required
                style={blurredEmpty.email ? { borderBottom: '1px solid #ff2424' } : {}}
              />
            </div>

            <div className={styles.field}>
              <div className={styles.side}>
                <span>03</span>
              </div>
              <label htmlFor="company">What&apos;s your company/organization?</label>
              <input
              ref={companyRef}
                onClick={() => handleClick(companyRef)}
                onChange={handleChange}
                onBlur={handleInputBlur}
                name="company"
                id="company"
                placeholder="Type your company/organization name"
                type="text"
                value={formData.company}
                style={blurredEmpty.company ? { borderBottom: '1px solid #ff2424' } : {}}
              />
            </div>

            <div className={styles.field}>
              <div className={styles.side}>
                <span>04</span>
              </div>
              <label htmlFor="message">Message *</label>
              <textarea
              ref={messageRef}
                onClick={() => handleClick(messageRef)}
                onChange={handleChange}
                onBlur={handleInputBlur}
                name="message"
                id="message"
                placeholder="Say hi"
                cols="30"
                rows="10"
                value={formData.message}
                required
                style={blurredEmpty.message ? { borderBottom: '1px solid #ff2424' } : {}}
              />
            </div>

          <div className="d-block mt-4 text-center">
            <button
              type="submit"
              className={styles.btn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </div>

          {/* Error status message */}
          {status && <p className={styles.statusMessage}>{status}</p>}
        </form>

        {/* Toast notification */}
        {showToast && (
          <div className={styles.toast}>
            Email sent successfully!
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;