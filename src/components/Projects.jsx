import React, { useEffect, useState, useContext } from 'react';
import '../styles/Projects.css';
import ISL from '../assets/ISL.png';
import ISLDark from '../assets/ISL-dark.png';
import Homicide from '../assets/Homicide.png';
import HomicideDark from '../assets/Homicide-dark.png';
import Cloud from '../assets/Cloud.png';
import CloudDark from '../assets/Cloud-dark.png';
import { ThemeContext } from './ThemeContext'; 

const Projects = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleCardClick = (index) => {
    if (window.innerWidth < 768) {
      const card = document.querySelectorAll('.project-card')[index];
      card.classList.add('clicked');

      setTimeout(() => {
        card.classList.remove('clicked');
      }, 600); // match CSS transition duration

      setActiveIndex((prev) => (prev === index ? null : index));
    }
  };

  const projects = [
    {
      title: "Real-Time ISL Gesture Recognition & 3D Avatar System",
      icon: isDarkTheme ? ISLDark : ISL,
      highlight: "Mediapipe / HF / LSTM / iClone",
      hoverText: ` Built a real-time ISL gesture recognition system using LSTM with 94% accuracy, 
featuring multilingual speech-to-sign translation via a 3D avatar and a modular MediaPipe–YOLO
Streamlit pipeline for bidirectional interaction. (IEEE (DOI: pending)) `
    },
    {
      title: "Homicide Prediction System",
      icon: isDarkTheme ? HomicideDark : Homicide,
      highlight: "XGB / ExtraTrees / CatBoost / RandomForest ",
      hoverText: `Developed a predictive model for homicide trend analysis using geospatial and
temporal data, leveraging ensemble techniques like XGB, ExtraTrees, and CatBoost in a stacked
model with RandomForest as the meta-classifier, achieving 85.81% accuracy with strong precision
and recall. (IEEE (DOI: pending))`
    },
    {
      title: "AI-Emotion-Recognition System",
      icon: isDarkTheme ? CloudDark : Cloud,
      highlight: "Streamlit / FastAPI / CNN-LSTM",
      hoverText: `Built an end-to-end emotion recognition system using a CNN-LSTM model. Integrated a FastAPI
backend for emotion prediction, book recommendations, and AI advice via Gemini, with a Streamlit
frontend for image uploads, emotion visualization, and chat. APIs were tested using Postman.`
    }
  ];

  return (
    <section className="project-section" id='projects'>
      <h2 className="project-header">
        <span className="project-header-span1">PROJ</span>
        <span className="project-header-span2">ECTS</span>
      </h2>

      <div className="project-wrapper">
        <div className="project-cards">
          {projects.map((proj, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                className={`project-card ${isActive ? 'active' : ''}`}
                key={idx}
                onClick={() => handleCardClick(idx)}
              >
                <div className="project-main-content">
                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-info">
                    <strong className="project-tools-header">Tools Used :</strong>
                    <span className="tools-highlight"> {proj.highlight} </span>
                  </p>
                  <div className="project-icon">
                    <img src={proj.icon} alt="project icon" />
                  </div>
                </div>

                <div className="project-hover-content">
                  <p style={{ whiteSpace: 'pre-line' }}>{proj.hoverText}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
