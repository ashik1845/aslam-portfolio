import React from 'react';
import '../styles/Footer.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleScrollTo = (sectionId) => {
    navigate('/', { state: { scrollTo: sectionId } });
  };

  return (
    <footer className="custom-footer">
      <div className="footer-content">
        <div className="footer-left">
          <h2>Ahmed Aslam</h2>
        </div>
        <div className="footer-center">
          <ul>
            <li onClick={() => handleScrollTo('projects')}>Projects</li>
            <li onClick={() => handleScrollTo('works')}>Work</li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-right">
  <a
    href="https://github.com/AhmedAslam28"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaGithub className="footer-icon" />
  </a>
  <a
    href="https://www.linkedin.com/in/ahmed-aslam-m-65546a268"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaLinkedin className="footer-icon" />
  </a>
</div>

      </div>
      <div className="footer-bottom">
  <p>
    Designed and Developed by{' '}
    <a href="https://mitbots.in" target="_blank" rel="noopener noreferrer">
      Mitbots
    </a>
  </p>
</div>

    </footer>
  );
};

export default Footer;
