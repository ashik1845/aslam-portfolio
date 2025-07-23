import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import profileImg from '../assets/profile.png';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Robot from './Robot';
import Navbar from './Navbar';
import About from './About';
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const names = ['Ahmed Aslam', 'AI ML Engineer'];
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [showThoughtText, setShowThoughtText] = useState(false);

  useEffect(() => {
    if (index >= names.length) return;

    const currentText = names[index];
    const delay = reverse ? 50 : 100;

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, delay);

    if (!reverse && subIndex === currentText.length + 1) {
      setTimeout(() => setReverse(true), 1000);
      clearTimeout(timeout);
    } else if (reverse && subIndex === 0) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % names.length);
    }

    setText(currentText.substring(0, subIndex));
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowThoughtText(true);
    });
    return () => clearTimeout(timeout);
  }, []);

useEffect(() => {
  // Wait for DOM and images to be fully loaded
  const initializeRobotAnimation = () => {
    const robot = document.querySelector('.robot-wrapper');
    const shadow = document.querySelector('.robot-shadow');
    const thought = document.querySelector('.thought-bubble');
    const thoughtText = document.querySelector('.thought-text');
    const aboutLeft = document.querySelector('.about-left');
    const originalParent = robot?.parentElement;
    const rightHand = robot?.querySelector('.right-hand');

    if (!robot || !aboutLeft || !originalParent) {
      setTimeout(initializeRobotAnimation, 100);
      return;
    }

    let placed = false;
    let isAnimating = false;
    let animationTimeout = null;
    let lastProgress = 0;
    let robotRect = null; // Cache the original rect

    const originalStyles = {
      position: window.getComputedStyle(robot).position,
      top: window.getComputedStyle(robot).top,
      left: window.getComputedStyle(robot).left,
      bottom: window.getComputedStyle(robot).bottom,
      right: window.getComputedStyle(robot).right,
      transform: window.getComputedStyle(robot).transform,
    };

    if (window.innerWidth < 1024) {
      gsap.set(robot, {
        animation: 'floatUpDown 3s ease-in-out infinite',
        position: originalStyles.position,
        top: originalStyles.top,
        left: originalStyles.left,
        transform: originalStyles.transform,
        zIndex: 10,
      });
      return;
    }

    // Force layout recalculation and cache the rect
    robot.offsetHeight;
    robotRect = robot.getBoundingClientRect();
    
    if (robotRect.top === 0 && robotRect.left === 0 && robotRect.width === 0) {
      setTimeout(initializeRobotAnimation, 100);
      return;
    }

    const startStyles = {
      position: 'fixed',
      top: robotRect.top + 'px',
      left: robotRect.left + 'px',
      bottom: 'auto',
      right: 'auto',
      transform: 'translate(0, 0) rotate(0deg) scale(1)',
      zIndex: 10,
    };

    gsap.set(robot, startStyles);

const updateRobotPosition = (progress, immediate = false) => {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  const startTop = robotRect.top;
  const startLeft = robotRect.left;
  const endTop = windowHeight * 0.07;
  const endLeft = windowWidth * 0.3;

  const topValue = gsap.utils.interpolate(startTop, endTop, progress);
  const leftValue = gsap.utils.interpolate(startLeft, endLeft, progress);
  const rotateValue = gsap.utils.interpolate(0, 15, progress);
  const scaleValue = gsap.utils.interpolate(1, 0.6, progress);
  const handRotation = gsap.utils.interpolate(0, -100, progress);

  if (immediate) {
    // Kill any existing tweens first
    gsap.killTweensOf([robot, rightHand]);
    
    gsap.set(robot, {
      top: `${topValue}px`,
      left: `${leftValue}px`,
      transform: `translate(0, 0) rotate(${rotateValue}deg) scale(${scaleValue})`,
    });

    if (rightHand) {
      gsap.set(rightHand, { rotation: handRotation });
    }

    gsap.set([shadow, thought, thoughtText], {
      opacity: Math.max(0, 1 - progress * 2),
    });
  } else {
    gsap.to(robot, {
      top: `${topValue}px`,
      left: `${leftValue}px`,
      transform: `translate(0, 0) rotate(${rotateValue}deg) scale(${scaleValue})`,
      duration: 0.1,
      ease: 'power2.out',
      overwrite: 'auto', // Automatically overwrite conflicting tweens
    });

    if (rightHand) {
      gsap.to(rightHand, {
        rotation: handRotation,
        duration: 0.1,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    gsap.to([shadow, thought, thoughtText], {
      opacity: Math.max(0, 1 - progress * 2),
      duration: 0.1,
      overwrite: 'auto',
    });
  }
};

    // Helper function to safely move robot to original parent
    const moveToOriginalParent = (currentBounds) => {
      if (robot.parentElement !== originalParent) {
        originalParent.appendChild(robot);
      }
      
      gsap.set(robot, {
        position: 'fixed',
        top: currentBounds.top + 'px',
        left: currentBounds.left + 'px',
        transform: `translate(0, 0) rotate(15deg) scale(0.6)`,
        zIndex: 10,
      });
    };

ScrollTrigger.getAll().forEach(trigger => {
  // Only kill triggers that don't have the about-text-animation ID
  if (trigger.vars && trigger.vars.id !== 'about-text-animation') {
    // Check if it's targeting the about-section for robot animation
    if (trigger.trigger && (
      trigger.trigger.classList?.contains('about-section') ||
      trigger.trigger === '.about-section'
    )) {
      trigger.kill();
    }
  }
});

ScrollTrigger.refresh();

    const scrollTrigger = ScrollTrigger.create({
  id: 'robot-animation', // Give it a unique ID
      trigger: '.about-section',
      start: 'top 90%',
      end: 'top 10%',
      scrub: true,
      invalidateOnRefresh: true,
      // Replace the onUpdate function in your ScrollTrigger.create with this improved version:

onUpdate: (self) => {
  const progress = self.progress;
  const progressDelta = Math.abs(progress - lastProgress);
  const isFastScroll = progressDelta > 0.03;
  const isScrollingBack = progress < lastProgress;

  if (animationTimeout) {
    clearTimeout(animationTimeout);
    animationTimeout = null;
  }

  // Kill all animations on fast scroll
  if (isFastScroll) {
    gsap.killTweensOf([robot, rightHand, shadow, thought, thoughtText]);
    isAnimating = false;
  }

  // Handle animation states
  if (progress > 0 && progress < 1) {
    gsap.set(robot, { animation: 'none' });
  } else if (progress === 0) {
    gsap.set(robot, {
      animation: 'floatUpDown 3s ease-in-out infinite',
    });
  }

  // IMPROVED: Handle moving robot back from placed state
  if (progress < 0.95 && placed) {
    placed = false;
    isAnimating = true;

    gsap.killTweensOf([robot, rightHand, shadow, thought, thoughtText]);
    gsap.set([thought, thoughtText], { opacity: 0 });

    const currentBounds = robot.getBoundingClientRect();
    
    // Move to original parent first
    moveToOriginalParent(currentBounds);

    // ALWAYS update position immediately when moving back from placed state
    updateRobotPosition(progress, true);
    
    // Reset floating animation if near beginning
    if (progress < 0.05) {
      gsap.set(robot, {
        animation: 'floatUpDown 3s ease-in-out infinite',
      });
    }
    
    isAnimating = false;
  }

  // IMPROVED: Main animation logic for non-placed robot
  if (!placed && progress > 0 && progress < 0.99) {
    // Ensure robot is in original parent during animation
    if (robot.parentElement !== originalParent) {
      const currentBounds = robot.getBoundingClientRect();
      originalParent.appendChild(robot);
      gsap.set(robot, {
        position: 'fixed',
        top: currentBounds.top + 'px',
        left: currentBounds.left + 'px',
        transform: robot.style.transform,
        zIndex: 10,
      });
    }
    
    // CRITICAL FIX: Always update position immediately for fast scroll OR scrolling back
    if (isFastScroll || isScrollingBack) {
      updateRobotPosition(progress, true);
    } else {
      updateRobotPosition(progress, false);
    }
  }

  // IMPROVED: Handle very beginning of scroll more reliably
  if (progress <= 0.02 && !placed) {
    // Ensure robot is back to original position and parent
    if (robot.parentElement !== originalParent) {
      const currentBounds = robot.getBoundingClientRect();
      originalParent.appendChild(robot);
      gsap.set(robot, {
        position: 'fixed',
        top: robotRect.top + 'px',
        left: robotRect.left + 'px',
        transform: 'translate(0, 0) rotate(0deg) scale(1)',
        zIndex: 10,
      });
    }
    
    gsap.set(robot, {
      animation: 'floatUpDown 3s ease-in-out infinite',
    });
  }

  // Place robot in about-left section
  if (progress >= 0.99 && !placed && !isAnimating) {
    placed = true;
    isAnimating = true;

    gsap.killTweensOf([robot, rightHand, shadow, thought, thoughtText]);

    const bounds = robot.getBoundingClientRect();
    const parentBounds = aboutLeft.getBoundingClientRect();
    const offsetTop = bounds.top - parentBounds.top;
    const offsetLeft = bounds.left - parentBounds.left;

    aboutLeft.appendChild(robot);

    gsap.set(robot, {
      position: 'absolute',
      top: offsetTop,
      left: offsetLeft,
      transform: 'translate(0, 0) rotate(15deg) scale(0.6)',
      zIndex: 5,
    });

    gsap.to(robot, {
      top: window.innerWidth <= 1200 ? -140 : -150,
      left:
        window.innerWidth <= 1100
          ? 230
          : window.innerWidth <= 1200
          ? 260
          : 300,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        isAnimating = false;
        gsap.to([thought, thoughtText], {
          opacity: 1,
          duration: 0.4,
        });
      },
    });
  }

  // IMPROVED: Handle edge cases more aggressively
  if (progress < 0.1 && !placed && robot.parentElement !== originalParent) {
    const currentBounds = robot.getBoundingClientRect();
    moveToOriginalParent(currentBounds);
    updateRobotPosition(progress, true);
  }

  // ADDITIONAL FIX: Handle fast scroll back from any position
  if (isScrollingBack && isFastScroll && !placed) {
    updateRobotPosition(progress, true);
  }

  lastProgress = progress;
},
    });

    // Cleanup function
    return () => {
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
      if (robot && originalParent && robot.parentElement !== originalParent) {
        originalParent.appendChild(robot);
        gsap.set(robot, originalStyles);
      }
      scrollTrigger.kill();
    };
  };

  // Multiple initialization strategies
  const init = () => {
    const images = document.querySelectorAll('img');
    const imagePromises = Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    Promise.all(imagePromises).then(() => {
      setTimeout(() => {
        document.body.offsetHeight;
        ScrollTrigger.refresh();
        initializeRobotAnimation();
      }, 150);
    });
  };

  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init);
  }

  const fallbackTimeout = setTimeout(init, 500);

  return () => {
    clearTimeout(fallbackTimeout);
    window.removeEventListener('load', init);
  };
}, []);

  return (
    <>
      <div className="home-section">
        
        <Navbar/>

        
        <div className="home-content">
          <div className="home-text">
            <p className="intro-text">Hey, I'm</p>
            <h1 className="name">
              <span className="typed">{text}</span>
              <span className="cursor">|</span>
            </h1>
            <p className="description">
              Passionate about building intelligent systems that solve real-world problems. With expertise in machine
learning, deep learning, and data science, I turn complex data into smart solutions.
            </p>
           <a
  href="/resume.pdf"  
  target="_blank"
  rel="noopener noreferrer"
  className="resume-button"
>
  View Resume
</a>
          </div>
          <div className="home-image-area">


</div>

        </div>
      </div>

      
      <About/>
    </>
  );
};

export default Home;