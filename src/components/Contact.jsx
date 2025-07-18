import React from 'react';
import { MdLocalPhone } from 'react-icons/md';
import { IoMdMail } from 'react-icons/io';
import Navbar from './Navbar';
import Robot from './Robot';
import profileImg from '../assets/profile.png';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <div className="contact-wrapper">
      <Navbar />
      <div className="contact-box">
        <h2 className="contact-title">Contact Us</h2>

        <div className="contact-content">
          
          <div className="contact-form">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email Address" />
            <textarea placeholder="Message" rows={4}></textarea>
            <button className="send-button">Send</button>
          </div>

         
          <div className="contact-info">
  <div className="info-row">
    <MdLocalPhone className="icon" />
    <a href="tel:+919444855558" className="contact-link">+91 94448 55558</a>
  </div>
  <div className="info-row">
    <IoMdMail className="icon" />
    <a href="mailto:2828aslam@gmail.com" className="contact-link">2828aslam@gmail.com</a>
  </div>



            
            <div className="robot-container">
              <img src={profileImg} alt="Profile" className="contact-profile-bg" />
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
