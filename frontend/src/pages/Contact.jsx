// src/pages/Contact.jsx
import "../assets/style.css";

export default function Contact() {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p className="contact-intro">
        Got questions? Want to host an event or just say hi? We’d love to hear from you!
      </p>

      <div className="contact-grid">
        <div className="contact-info">
          <h3>📍 Our Office</h3>
          <p>123 Spark Street, Innovation City, IN 40912</p>

          <h3>📞 Call Us</h3>
          <p>+1 (800) 123-4567</p>

          <h3>✉️ Email</h3>
          <p>hello@eventspark.com</p>
        </div>

        <div className="contact-form">
          <form>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Your name" required />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Your email" required />

            <label htmlFor="message">Message</label>
            <textarea id="message" placeholder="Write your message here..." rows="5" required />

            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
