import React, { useEffect, useRef, useState } from 'react';
import '../styles/Education.css';
import timelineIcon from '../assets/timeline-icon.png';

const educationData = [
  {
    date: 'May 2025',
    description: `B. S. Abdur Rahman Crescent Institute Of Science And Technology, Chennai, Tamil Nadu —
B.Tech Artificial Intelligence And Data Science (GPA: 8.65 / 10.00) `,
    position: 'right',
  },
  {
    date: '2020 - 2021',
    description: `Sunshine Senior Secondary School, Chennai, Tamil Nadu – CBSE. HSC - 88.2 percentage 
`,
    position: 'left',
  },
  {
    date: '2018 - 2019',
    description: `Apex Pon Vidyashram, Chennai, Tamil Nadu – CBSE. SSLC -82.2 percentage`,
    position: 'right',
  },
];

const Education = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Ensure DOM is fully loaded
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const handleScroll = () => {
      // Use refs instead of querySelector for better reliability
      const line = lineRef.current;
      const section = sectionRef.current;
      
      if (!line || !section) return;

      const entries = section.querySelectorAll('.education-entry');
      if (entries.length === 0) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Get the last entry's icon position
      const lastEntry = entries[entries.length - 1];
      const lastIcon = lastEntry.querySelector('.education-icon-wrapper');
      
      if (!lastIcon) return;

      const lastIconRect = lastIcon.getBoundingClientRect();
      const timelineBottom = lastIconRect.top + window.scrollY;
      const lineMaxHeight = timelineBottom - sectionTop - 99;

      // Calculate progress with better bounds checking
      const viewportTrigger = scrollY + windowHeight * 0.4;
      const progress = Math.max(0, Math.min((viewportTrigger - sectionTop) / sectionHeight, 1));
      const targetHeight = Math.max(0, Math.min(progress * sectionHeight, lineMaxHeight));

      // Apply the height with requestAnimationFrame for smoother animation
      requestAnimationFrame(() => {
        line.style.height = `${targetHeight}px`;
      });

      // Handle entry visibility
      entries.forEach((entry) => {
        const iconWrapper = entry.querySelector('.education-icon-wrapper');
        if (!iconWrapper) return;

        const iconRect = iconWrapper.getBoundingClientRect();
        const iconY = iconRect.top + window.scrollY;
        const timelineY = sectionTop + targetHeight;

        if (timelineY >= iconY - 100) {
          entry.classList.add('show');
        } else {
          entry.classList.remove('show');
        }
      });
    };

    // Initial call
    handleScroll();
    
    // Add scroll listener with throttling
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', handleScroll); // Handle window resize

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isLoaded]);

  return (
    <section className="education-section" ref={sectionRef}>
      <h2 className="education-title">
        <span className="edu">EDUC</span>
        <span className="ation">ATION</span>
      </h2>

      <div className="education-timeline">
        <div className="education-line" ref={lineRef}></div>

        {educationData.map((item, index) => (
          <div key={index} className={`education-entry ${item.position}`}>
            {item.position === 'left' && (
              <div className="education-content-box">
                <div className="education-date">{item.date}</div>
                <div className="education-description">
                  {item.description.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="education-icon-wrapper">
              <img src={timelineIcon} alt="icon" className="education-icon" />
            </div>

            {item.position === 'right' && (
              <div className="education-content-box">
                <div className="education-date">{item.date}</div>
                <div className="education-description">
                  {item.description.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;