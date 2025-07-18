import React from 'react';
import aboutBgImg from '../assets/about-bg-img.png';
import personImg from '../assets/person-img.png';
import '../styles/About.css'; 
const About = () => {
  return (
    <section id='about' className="about-section">
      <div className="about-left">
        <img src={aboutBgImg} alt="Background" className="about-bg-img" />
        <img src={personImg} alt="Ahmed Aslam" className="about-person-img" />
      </div>
      <div className="about-right">
        <h2 className="about-title">
          <span className="dark">ABO</span><span className="brown">UT</span>
        </h2>
        <p className="about-description">
          I’m an AI/ML Developer passionate about creating impactful solutions using language models and
          intelligent systems. With over two years of hands-on experience, I’ve worked on everything from
          generative AI apps to production-grade model deployments. I thrive at the intersection of problem-solving
          and innovation, and I’m always exploring new ways to push the boundaries of what AI can do.
        </p>
      </div>
    </section>
  );
};

export default About;
