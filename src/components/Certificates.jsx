import React, { useState } from 'react';
import '../styles/Certificates.css';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import cert1 from '../assets/ICAISS.jpeg';
import cert2 from '../assets/ICCRTEE.jpeg';
import cert3 from '../assets/LangChain.jpeg';
import cert4 from '../assets/OpenCV.jpeg';
import cert5 from '../assets/International Level Student Workshop.jpeg';
import cert6 from '../assets/Forage.jpeg';
import cert7 from '../assets/AWS.jpeg';
import cert8 from '../assets/Power BI.jpeg';
import cert9 from '../assets/Excel Statistics.jpeg';
import cert10 from '../assets/Essential Training.jpeg';
import cert11 from '../assets/Python Data Analysis.jpeg';

const certs = [
  { image: cert1, description: 'Presented a paper on "Real-Time Indian Sign Language Recognition & Multilingual Sign Generation" at the ICAISS-2025 conference.'},
  { image: cert2, description: 'Presented research paper "XEC-CrimePredictor: A Stacking Ensemble Model for Homicide Trend Prediction" at the ICCRTEE 2025 conference.' },
  { image: cert3, description: 'LangChain for LLM Application Development – Learned to build LLM-based apps using LangChain, prompts, memory, and agent workflows.' },
  { image: cert4, description: 'OpenCV Bootcamp & GUVI Webinar on DevOps – Attended sessions on OpenCV basics and foundational DevOps workflows and tools.' },
  { image: cert5, description: 'Participated in the "International Level Student Workshop - 2k24 on Data Science using Python," organized by B.S. Abdur Rahman Crescent Institute of Science and Technology in association with Brainovision Solutions India Pvt. Ltd.' },
  { image: cert6, description: 'Forage – Tata Data Visualization Program – Completed industry-simulated tasks using Power BI for insights and decision support.' },
  { image: cert7, description: 'AWS AI & ML Scholars – Completed Udacity & AWS program covering core and applied AI/ML techniques through hands-on projects.' },
  { image: cert8, description: 'Power BI Essential Training: Completed a LinkedIn Learning course on Power BI, covering essential skills for using the Microsoft Power BI tool for data visualization and business intelligence.' },
  { image: cert9, description: 'Excel Statistics Essential Training 1: Completed a LinkedIn Learning course on Excel Statistics, covering essential statistical concepts and their application in Microsoft Excel.' },
  { image: cert10, description: 'Excel Essential Training (Microsoft 365): Completed a LinkedIn Learning course providing essential training in Microsoft Excel, specifically for the Microsoft 365 version.' },
  { image: cert11, description: 'Python Data Analysis: Completed a LinkedIn Learning course on Python Data Analysis, focusing on data analysis techniques using Python programming.' }
];

const Certificates = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(Array(certs.length).fill(false));
  const [isSliding, setIsSliding] = useState(false);

  const prevIndex = (currentIndex - 1 + certs.length) % certs.length;
  const nextIndex = (currentIndex + 1) % certs.length;

  const handleClick = (index) => {
    if (index === prevIndex || index === nextIndex) {
      setIsSliding(true);
      setCurrentIndex(index);
      setTimeout(() => setIsSliding(false), 600);
    }
  };

  const toggleOverlay = (index) => {
    const updated = [...showOverlay];
    updated[index] = !updated[index];
    setShowOverlay(updated);
  };

  const changeIndex = (newIndex) => {
    setIsSliding(true);
    setCurrentIndex(newIndex);
    setTimeout(() => setIsSliding(false), 600);
  };

  return (
    <section className="certificates-section" id='certificate'>
      <h2 className="certificates-title">
        <span className="dark">CERTIF</span><span className="brown">ICATES</span>
      </h2>

      <div className={`cert-carousel ${isSliding ? 'is-sliding' : ''}`}>
        {certs.map((cert, index) => {
          let position = 'hidden';
          if (index === currentIndex) position = 'center';
          else if (index === prevIndex) position = 'left';
          else if (index === nextIndex) position = 'right';

          return (
            <div
              key={index}
              className={`cert-card ${position} ${showOverlay[index] ? 'show-overlay' : ''}`}
              onClick={() => handleClick(index)}
            >
              <img src={cert.image} alt={`Certificate ${index + 1}`} />
              <div className="cert-overlay">{cert.description}</div>
              <button
                className="info-button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOverlay(index);
                }}
              >
                <IoIosInformationCircleOutline className="info-icon" /> Info
              </button>
            </div>
          );
        })}

        
        <button
          className="plain-arrow left-arrow"
          onClick={() => changeIndex((currentIndex - 1 + certs.length) % certs.length)}
        >
          &#8592;
        </button>
        <button
          className="plain-arrow right-arrow"
          onClick={() => changeIndex((currentIndex + 1) % certs.length)}
        >
          &#8594;
        </button>

        
        <div className="dot-indicators">
          {certs.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => changeIndex(i)}
            ></span>
          ))}
        </div>

        
        <div className={`line-wrapper left-line ${isSliding ? 'fade-out' : ''}`}>
          <div className="horizontal-line" />
          <div className="vertical-line" />
          <div className="horizontal-line-extend" />
        </div>
        <div className={`line-dot left1-dot ${isSliding ? 'fade-out' : ''}`} />
        <div className={`line-dot left2-dot ${isSliding ? 'fade-out' : ''}`} />
        <div className={`line-wrapper right-line ${isSliding ? 'fade-out' : ''}`}>
          <div className="horizontal-line" />
          <div className="vertical-line" />
          <div className="horizontal-line-extend" />
        </div>
        <div className={`line-dot right1-dot ${isSliding ? 'fade-out' : ''}`} />
        <div className={`line-dot right2-dot ${isSliding ? 'fade-out' : ''}`} />
      </div>
    </section>
  );
};

export default Certificates;
