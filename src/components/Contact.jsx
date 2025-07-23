import emailjs from "emailjs-com";
import { useState } from "react";
import { IoMdMail } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";
import profileImg from "../assets/profile.png";
import "../styles/Contact.css";
import Navbar from "./Navbar";
import Robot from "./Robot";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const verify = () => {
    const { name, email, message } = formData;

    if (!name.trim()) return false;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return false;
    if (!message.trim()) return false;

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verify()) {
      alert("Kindly enter valid details");
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        "serviceid",
        "templateid",
        {
          Name: formData.name,
          Email: formData.email,
          Message: formData.message,
        },
        "publicurl"
      );

      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      alert("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-wrapper">
      <Navbar />
      <div className="contact-box">
        <h2 className="contact-title">Contact Us</h2>

        <div className="contact-content">
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <textarea
              placeholder="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
            />
            <button type="submit" className="send-button" disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </button>
          </form>

          <div className="contact-info">
            <div className="info-row">
              <MdLocalPhone className="icon" />
              <a href="tel:+919444855558" className="contact-link">
                +91 94448 55558
              </a>
            </div>
            <div className="info-row">
              <IoMdMail className="icon" />
              <a href="mailto:2828aslam@gmail.com" className="contact-link">
                2828aslam@gmail.com
              </a>
            </div>

            <div className="robot-container">
              <img
                src={profileImg}
                alt="Profile"
                className="contact-profile-bg"
              />
              <div className="robot">
                <Robot showThoughtText={true} thoughtText="Msg me" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;