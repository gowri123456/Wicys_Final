import React, { useState, useCallback } from "react";
import "./ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("http://localhost:3001/contact", {


        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (response.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(`❌ Error: ${result.message || "Failed to send message."}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("❌ Failed to send message. Check console for details.");
    }
  }, [formData]);

  return (
    <div className="contact-container">
      <h2>📩 Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={status === "Sending..."}>Send</button>
      </form>
      {status && <p>{status}</p>}

      <div className="social-links">
        <a href="https://instagram.com/YOUR_INSTAGRAM" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href="https://linkedin.com/in/YOUR_LINKEDIN" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <p>Email: sluwicys@gmail.com</p>
      </div>
    </div>
  );
};

export default ContactPage;
