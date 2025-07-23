import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContext, useEffect, useRef } from "react";
import CloudDark from "../assets/Cloud-dark.png";
import Cloud from "../assets/Cloud.png";
import HomicideDark from "../assets/Homicide-dark.png";
import Homicide from "../assets/Homicide.png";
import ISLDark from "../assets/ISL-dark.png";
import ISL from "../assets/ISL.png";
import "../styles/Projects.css";
import { ThemeContext } from "./ThemeContext";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const sectionRef = useRef();
  const headerRef = useRef();
  const cardsRef = useRef([]);

  const projects = [
    {
      title: "Real-Time ISL Gesture Recognition & 3D Avatar System",
      icon: isDarkTheme ? ISLDark : ISL,
      highlight: "Mediapipe / HF / LSTM / iClone",
      hoverText: `Built a real-time ISL gesture recognition system using LSTM with 94% accuracy,
featuring multilingual speech-to-sign translation via a 3D avatar and a modular MediaPipe–YOLO–
Streamlit pipeline for bidirectional interaction. (IEEE (DOI: pending))`,
    },
    {
      title: "Homicide Prediction System",
      icon: isDarkTheme ? HomicideDark : Homicide,
      highlight: "XGB / ExtraTrees / CatBoost / RandomForest",
      hoverText: `Developed a predictive model for homicide trend analysis using geospatial and
temporal data, leveraging ensemble techniques like XGB, ExtraTrees, and CatBoost in a stacked
model with RandomForest as the meta-classifier, achieving 85.81% accuracy with strong precision
and recall. (IEEE (DOI: pending))`,
    },
    {
      title: "AI-Emotion-Recognition System",
      icon: isDarkTheme ? CloudDark : Cloud,
      highlight: "Streamlit / FastAPI / CNN-LSTM",
      hoverText: `Built an end-to-end emotion recognition system using a CNN-LSTM model. Integrated a FastAPI
backend for emotion prediction, book recommendations, and AI advice via Gemini, with a Streamlit
frontend for image uploads, emotion visualization, and chat. APIs were tested using Postman.`,
    },
  ];

  useEffect(() => {
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          scrub: true,
          pin: sectionRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const isMobile = window.innerWidth < 768;

      tl.fromTo(
        headerRef.current,
        {
          scale: isMobile ? 1.8 : 2.5,
          yPercent: -50,
          top: isMobile ? "25%" : "50%",
          position: "absolute",
          left: "50%",
          xPercent: -50,
        },
        {
          scale: 1,
          yPercent: 0,
          xPercent: -50,
          top: isMobile ? "2rem" : "3rem",
          position: "absolute",
          ease: "power2.out",
        }
      );

      tl.fromTo(
        cardsRef.current,
        { y: isMobile ? 100 : 200, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="project" ref={sectionRef}>
    <section className="project-section" id="projects">
      <h2 className="project-header gsap-project-header" ref={headerRef}>
        <span className="project-header-span1">PROJ</span>
        <span className="project-header-span2">ECTS</span>
      </h2>

      <div className="project-wrapper">
        <div className="project-cards">
          {projects.map((proj, idx) => (
            <div
              className="project-card"
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
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
                <p>{proj.hoverText}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default Projects;
