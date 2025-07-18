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
      // Retry after a short delay if elements aren't ready
      setTimeout(initializeRobotAnimation, 100);
      return;
    }

    let placed = false;
    let isAnimating = false;
    let animationTimeout = null;
    let lastProgress = 0;

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

    // Force layout recalculation
    robot.offsetHeight;
    
    const robotRect = robot.getBoundingClientRect();
    
    // Validate rect values
    if (robotRect.top === 0 && robotRect.left === 0 && robotRect.width === 0) {
      // Element not properly positioned yet, retry
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
        });

        if (rightHand) {
          gsap.to(rightHand, {
            rotation: handRotation,
            duration: 0.1,
            ease: 'power2.out',
          });
        }

        gsap.to([shadow, thought, thoughtText], {
          opacity: Math.max(0, 1 - progress * 2),
          duration: 0.1,
        });
      }
    };

    // Kill any existing ScrollTriggers first
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger === '.about-section') {
        trigger.kill();
      }
    });

    // Force ScrollTrigger to refresh
    ScrollTrigger.refresh();

    const scrollTrigger = ScrollTrigger.create({
      trigger: '.about-section',
      start: 'top 90%',
      end: 'top 10%',
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const progressDelta = Math.abs(progress - lastProgress);
        const isFastScroll = progressDelta > 0.1;

        if (animationTimeout) {
          clearTimeout(animationTimeout);
          animationTimeout = null;
        }

        if (isFastScroll) {
          gsap.killTweensOf([robot, rightHand, shadow, thought, thoughtText]);
          isAnimating = false;
        }

        if (progress > 0 && progress < 1) {
          gsap.set(robot, { animation: 'none' });
        } else if (progress === 0) {
          gsap.set(robot, {
            animation: 'floatUpDown 3s ease-in-out infinite',
          });
        }

        if (!placed && progress > 0 && progress < 0.99) {
          updateRobotPosition(progress, isFastScroll);
        }

        if (progress < 0.02 && !placed) {
          gsap.set(robot, {
            animation: 'floatUpDown 3s ease-in-out infinite',
          });
        }

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

        if (progress < 0.95 && placed) {
          placed = false;
          isAnimating = true;

          gsap.killTweensOf([robot, rightHand, shadow, thought, thoughtText]);

          gsap.set([thought, thoughtText], { opacity: 0 });

          const currentBounds = robot.getBoundingClientRect();
          
          originalParent.appendChild(robot);

          gsap.set(robot, {
            position: 'fixed',
            top: currentBounds.top + 'px',
            left: currentBounds.left + 'px',
            transform: `translate(0, 0) rotate(15deg) scale(0.6)`,
            zIndex: 10,
          });

          if (isFastScroll) {
            updateRobotPosition(progress, true);
            isAnimating = false;
            if (progress < 0.05) {
              gsap.set(robot, {
                animation: 'floatUpDown 3s ease-in-out infinite',
              });
            }
          } else {
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;
            const targetTop = gsap.utils.interpolate(robotRect.top, windowHeight * 0.07, progress);
            const targetLeft = gsap.utils.interpolate(robotRect.left, windowWidth * 0.3, progress);
            const targetRotate = gsap.utils.interpolate(0, 15, progress);
            const targetScale = gsap.utils.interpolate(1, 0.6, progress);
            const targetHandRotation = gsap.utils.interpolate(0, -100, progress);

            gsap.to(robot, {
              top: `${targetTop}px`,
              left: `${targetLeft}px`,
              transform: `translate(0, 0) rotate(${targetRotate}deg) scale(${targetScale})`,
              duration: 0.2,
              ease: 'power2.out',
              onComplete: () => {
                isAnimating = false;
                if (progress < 0.05) {
                  gsap.set(robot, {
                    animation: 'floatUpDown 3s ease-in-out infinite',
                  });
                }
              },
            });

            if (rightHand) {
              gsap.to(rightHand, {
                rotation: targetHandRotation,
                duration: 0.2,
                ease: 'power2.out',
              });
            }

            const shadowOpacity = Math.max(0, 1 - progress * 2);
            gsap.to([shadow, thought, thoughtText], {
              opacity: shadowOpacity,
              duration: 0.2,
            });
          }
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
    // Strategy 1: Wait for images to load
    const images = document.querySelectorAll('img');
    const imagePromises = Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve; // Resolve even on error
      });
    });

    Promise.all(imagePromises).then(() => {
      // Wait a bit more for CSS animations to settle
      setTimeout(() => {
        // Force layout recalculation
        document.body.offsetHeight;
        
        // Force ScrollTrigger refresh
        ScrollTrigger.refresh();
        
        // Initialize the animation
        initializeRobotAnimation();
      }, 150);
    });
  };

  // Strategy 2: Use multiple timing approaches
  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init);
  }

  // Strategy 3: Fallback timeout
  const fallbackTimeout = setTimeout(init, 500);

  // Cleanup
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
            <button className="resume-button">View Resume</button>
          </div>

          <div className="home-image-area">
  <img src={profileImg} alt="Ahmed Aslam" className="profile-bg-img" />
  <Robot showThoughtText={showThoughtText} thoughtText="Hello!" />

</div>

        </div>
      </div>

      
      <About/>
    </>
  );
};

export default Home;