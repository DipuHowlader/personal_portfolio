"use client"

import Link from "next/link";
import styles from "./contact.module.scss"
import emailjs from 'emailjs-com';
import { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState(""); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    emailjs
      .sendForm('service_9f2ro48', 'your_template_id', e.target, 'your_user_id')
      .then(
        (result) => {
          console.log('Email sent successfully:', result.text);
          setStatus("Email sent successfully!"); 
          setFormData({
            name: '',
            email: '',
            company: '',
            message: '',
          });
        },
        (error) => {
          console.log('Error sending email:', error.text);
          setStatus("Error sending email. Please try again."); // Error message
        }
      );
  };

  return (
    <section id={styles.contact}>
      <div className="container-fluid px-3">
        <div className={`${styles.phone} ${styles.contact}`}>
          <span>Phone</span>
          <h3>+880 1735989339</h3>
        </div>
      </div>

      <div className={`${styles.form} mx-5 mx-md-auto`}>
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
            <label htmlFor="name">What&apos;s your name?</label>
            <input 
              onChange={handleChange} 
              name="name" 
              id="name" 
              placeholder="Type your full name" 
              type="text" 
              value={formData.name}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.side}>
              <span>02</span>
            </div>
            <label htmlFor="email">What&apos;s your email address?</label>
            <input 
              onChange={handleChange} 
              name="email" 
              id="email" 
              placeholder="example@email.com" 
              type="text" 
              value={formData.email}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.side}>
              <span>03</span>
            </div>
            <label htmlFor="company">What&apos;s your company/organization?</label>
            <input 
              onChange={handleChange} 
              name="company" 
              id="company" 
              placeholder="Type your company/organization name" 
              type="text" 
              value={formData.company}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.side}>
              <span>04</span>
            </div>
            <label htmlFor="message">Message</label>
            <textarea 
              onChange={handleChange} 
              name="message" 
              id="message" 
              placeholder="Say hi" 
              cols="30" 
              rows="10" 
              value={formData.message}
            />
          </div>

          <div className="d-block mt-4 text-center">
            <button type="submit" className={styles.btn}>
              Send
            </button>
          </div>

          {/* Display status messages */}
          {status && <p className={styles.statusMessage}>{status}</p>}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
