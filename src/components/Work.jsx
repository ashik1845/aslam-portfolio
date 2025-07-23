import React, { useEffect, useRef, useState } from 'react';
import '../styles/Work.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import humai from '../assets/workimage1.png';
import turing from '../assets/workimage2.png';

gsap.registerPlugin(ScrollTrigger);

const workItems = [
  {
    company: 'HUM1AI',
    role: 'CV & ML Full Stack Developer Intern',
    stipend: '(Remote) (stipend ₹20,000+ incentives)',
    description: `Developed Smart Specs with vision models, multilingual OCR, and gesture control using Roboflow, EasyOCR, and MediaPipe.Deployed on GPU-accelerated hardware, optimized for real-time performance on wearables.`,
    duration: 'May 2024 - Present',
    image: humai,
  },
  {
    company: 'Tamizh',
    role: 'AI & ML Engineer Intern ',
    stipend: '(In-office)',
    description: `Built vision models for Smart Specs using Roboflow and Florence, integrated multilingual OCR with EasyOCR, and developed gesture control with MediaPipe. Deployed and optimized for GPU-based wearable devices.`,
    duration: 'June 2024 – Present',
    image: turing,
  },
    {
    company: 'XTROP RESEARCH',
    role: 'Research Intern',
    stipend: '(Offline)',
    description: `Engaged in research activities focused on advanced technology solutions. Contributed to experimental setups and data analysis as part of an offline, hands-on research environment.`,
    duration: 'December 2024 – January 2025',
    image: humai,
  },
];

const Work = () => {
  const containerRef = useRef(null);
  const roleRef = useRef(null);
  const fadeTextRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [internalScroll, setInternalScroll] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const sectionCount = workItems.length;

  const hijackScrollDistance = 1600;

  useEffect(() => {
    const pinTarget = containerRef.current;
    if (!pinTarget) return;

    const st = ScrollTrigger.create({
      trigger: pinTarget,
      start: 'top top',
      end: `+=${hijackScrollDistance}`,
      pin: pinTarget.querySelector('.work-section'),
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        setInternalScroll(self.progress * hijackScrollDistance);
      },
    });

    return () => {
      st.kill();
      ScrollTrigger.refresh();
    };
  }, []);

  const internalProgress = internalScroll / hijackScrollDistance;

  useEffect(() => {
    let newIndex = 0;
    if (internalProgress > 0.66) {
    newIndex = 2;
  } else if (internalProgress > 0.33) {
    newIndex = 1;
  } else {
    newIndex = 0;
  }

    if (newIndex !== activeIndex && !transitioning) {
      setTransitioning(true);
      gsap.to([roleRef.current, fadeTextRef.current], {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          setActiveIndex(newIndex);
          gsap.to([roleRef.current, fadeTextRef.current], {
            opacity: 1,
            duration: 0.4,
            delay: 0.05,
            onComplete: () => setTransitioning(false),
          });
        },
      });
    }
  }, [internalProgress, activeIndex, transitioning]);

  return (
    <div id='works' className='work-section-wrapper 'ref={containerRef}>
    <section className="work-section" >
      <h1 className="work-title">
        <span className="work-title-dark">WO</span>
        <span className="work-title-accent">RK</span>
      </h1>

      <div className="work-content">
        <div className="work-left">
          <p className="work-role" ref={roleRef}>
            {workItems[activeIndex].role}
          </p>

          <div className="work-company-wrapper">
            <div
              className="work-company"
              style={{ transform: `translateY(-${activeIndex * 33}%)` }}
            >
              {workItems.map((item, idx) => (
                <h2 className="company-title" key={idx}>
                  {item.company}
                </h2>
              ))}
            </div>
          </div>

          <div className="work-fade-text" ref={fadeTextRef}>
            <p className="work-stipend">{workItems[activeIndex].stipend}</p>
            <p className="work-description">{workItems[activeIndex].description}</p>
            <div className="work-duration">{workItems[activeIndex].duration}</div>
          </div>
        </div>

        <div className="work-right">
          <div className="work-image-scroll">
            
            <div
              className="work-image-inner"
              style={{
                transform: `translateY(-${activeIndex * 33.33}%)`,
              }}
            >
              {workItems.map((item, idx) => (
                <img
                  key={idx}
                  src={item.image}
                  className="work-image"
                  alt={`Work ${idx}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Work;
