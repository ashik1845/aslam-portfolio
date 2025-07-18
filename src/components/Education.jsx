import React, { useEffect, useRef } from 'react';
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

useEffect(() => {
  const line = document.querySelector('.education-line');
  const entries = document.querySelectorAll('.education-entry');
  const sectionTop = sectionRef.current.offsetTop;
  const sectionHeight = sectionRef.current.offsetHeight;

 const handleScroll = () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  // Get the last icon image's bottom position
  const lastIcon = entries[entries.length - 1].querySelector('.education-icon');
  const timelineBottom = lastIcon.getBoundingClientRect().bottom + scrollY;

  // Use the bottom of the section as reference
  const sectionTop = sectionRef.current.offsetTop;
  const sectionHeight = sectionRef.current.offsetHeight;

  // Calculate the maximum height the line should grow
  const lineMaxHeight = timelineBottom - sectionTop;

  const progress = Math.min((scrollY + windowHeight * 0.4 - sectionTop) / sectionHeight, 1);
  const targetHeight = Math.min(progress * sectionHeight, lineMaxHeight);

  line.style.height = `${targetHeight}px`;

  entries.forEach((entry) => {
    const iconY = entry.querySelector('.education-icon-wrapper').getBoundingClientRect().top + window.scrollY;
    const timelineY = sectionTop + targetHeight;

    if (timelineY >= iconY - 100) {
      entry.classList.add('show');
    } else {
      entry.classList.remove('show');
    }
  });
};


  window.addEventListener('scroll', handleScroll);
  window.addEventListener('load', handleScroll); // Trigger scroll handler after full page load

  // In case fonts/images are lazy-loaded
  setTimeout(handleScroll, 500); // Safety re-trigger

  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('load', handleScroll);
  };
}, []);



  return (
    <section className="education-section" ref={sectionRef}>
      <h2 className="education-title">
        <span className="edu">EDUC</span>
        <span className="ation">ATION</span>
      </h2>

      <div className="education-timeline">
        <div className="education-line"></div>

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