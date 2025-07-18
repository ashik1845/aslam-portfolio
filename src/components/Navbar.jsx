import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from './ThemeContext'; 
import darkthemeIcon from '../assets/dark-theme-icon.png';
import whitethemeIcon from '../assets/white-theme-icon.png';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);

  const handleTalkClick = () => {
    navigate('/contact');
  };

  const handleNavClick = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  return (
    <nav className="navbar">
      <div
        className="navbar-left"
        onClick={() => navigate('/')}
        role="button"
        tabIndex={0}
      >
        PORTFOLIO
      </div>

      <div className="navbar-center">
        <span onClick={() => handleNavClick('about')}>About</span>
        <span onClick={() => handleNavClick('skills')}>Skills</span>
        <span onClick={() => handleNavClick('projects')}>Projects</span>
        <span onClick={() => handleNavClick('works')}>Works</span>
        <span onClick={() => handleNavClick('certificate')}>Certificate</span>
        <img
  src={isDarkTheme ? whitethemeIcon : darkthemeIcon}
  alt="Toggle Theme"
  className="theme-icon"
  onClick={toggleTheme}
/>

      </div>

      <div className="navbar-right">
        <button className="talk-button" onClick={handleTalkClick}>
          Let's Talk
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
