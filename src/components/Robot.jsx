import React from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeContext } from './ThemeContext'; 
import { useContext } from 'react';
import robotBody from '../assets/robotBody.png';
import leftHand from '../assets/leftHand.png';
import rightHand from '../assets/rightHand.png';
import thoughtBubble from '../assets/thought.png';
import whiteThoughtBubble from '../assets/whiteThoughtBubble.png';
import robotShadow from '../assets/robotShadow.png';

const Robot = ({ showThoughtText, thoughtText }) => {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';
    const { isDarkTheme } = useContext(ThemeContext);


  return (
    <div className={`robot-scale-wrapper ${isContactPage ? 'robot-contact-scale' : ''}`}>
      <div className={`robot-wrapper ${isContactPage ? 'robot-contact' : ''}`}>
        <div className="thought-bubble">
           <img
        src={isDarkTheme ? whiteThoughtBubble : thoughtBubble}
        alt="Thought"
      />
          {showThoughtText && <span className="thought-text">{thoughtText}</span>}
        </div>

        <img src={leftHand} alt="Left Hand" className="robot-hand left-hand" />
        <img src={robotBody} alt="Robot Body" className="robot-body" />
        <img src={rightHand} alt="Right Hand" className="robot-hand right-hand" />
        <img src={robotShadow} alt="Robot Shadow" className="robot-shadow" />
      </div>
    </div>
  );
};

export default Robot;