import React, { useState, useRef, useEffect } from 'react';
import '../styles/Works.css';
import Computer from '../assets/Computer.png';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const workItems = [
  {
    date: 'May 2024 - Present',
    icon: Computer,
    role: 'CV & ML Full Stack Developer Intern',
    company: 'HUMIAI (Remote)',
    stipend: '(stipend ₹20,000+ incentives)',
    description:
      'Designed and deployed ML workflows for LLM-based projects on EC2 instances using AWS, with additional work on NVIDIA and GCP platforms.',
  },
  {
    date: 'June 2023 - April 2024',
    icon: '🧠',
    role: 'AI Research Intern',
    company: 'TechLabs (Hybrid)',
    stipend: '₹15,000',
    description:
      'Built transformer-based models for cognitive signal analysis and integrated real-time dashboards with React and Flask.',
  },
];

const Works = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const workcontentRef = useRef(null);
  const workcontentRef2 = useRef(null);
  const workdescriptionRef1 = useRef(null);
  const workdescriptionRef2 = useRef(null);
  const workdescriptionwrapper = useRef(null);

  const handleDotClick = (index) => {
    const trigger = ScrollTrigger.getById(window.innerWidth > 740 ? 'workScrollTimeline' : 'workScrollTimeline2');
    if (!trigger) return;

    gsap.to(window, {
      scrollTo: {
        y: trigger.start + (index === 1 ? (trigger.end - trigger.start) : 0),
      },
      duration: 1,
      ease: 'power2.inOut',
    });

    setCurrentSlide(index);
  };

  useEffect(() => {
      let ctx;
  
      const handleResize = () => {
        if (ctx) ctx.revert();
  
        if (window.innerWidth > 740) {
          ctx = gsap.context(() => {
            gsap.set(workcontentRef2.current, { x: 500 });
            gsap.set(workdescriptionRef1.current, { display: 'flex', opacity: 1 });
            gsap.set(workdescriptionRef2.current, { display: 'none', opacity: 0 });
            gsap.set(workdescriptionwrapper.current, { justifyContent: 'flex-end' });
  
            const tl = gsap.timeline({
              scrollTrigger: {
                id: 'workScrollTimeline',
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=2000',
                scrub: true,
                pin: sectionRef.current.querySelector('.work-section'),
                onUpdate: (self) => {
                  if (self.progress >= 0.99) setCurrentSlide(1);
                  else if (self.progress <= 0.05) setCurrentSlide(0);
                },
              },
            });
  
            tl.fromTo(contentRef.current, { x: '0vw', opacity: 1 }, { x: '50vw', opacity: 1, duration: 2, ease: 'power1.out' })
              .fromTo(workcontentRef.current, { x: 0, opacity: 1 }, { x: -800, opacity: 1, duration: 2, ease: 'power1.out' }, '<')
              .fromTo(workcontentRef2.current, { x: 500, opacity: 1 }, { x: 0, opacity: 1, duration: 2, ease: 'power1.out' }, '<')
              .to(workdescriptionRef1.current, { opacity: 0, duration: 1 }, '<')
              .set(workdescriptionRef1.current, { display: 'none' }, '>')
              .set(workdescriptionRef2.current, { display: 'flex', opacity: 0.8 }, '<')
              .set(workdescriptionwrapper.current, { justifyContent: 'flex-start' }, '<')
              .to(workdescriptionRef2.current, { opacity: 1, duration: 1 }, '<');
  
            ScrollTrigger.refresh();
          }, sectionRef);
        }
      };
  
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
        if (ctx) ctx.revert();
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    // Mobile animation
    useEffect(() => {
      let ctx;
  
      const handleResize = () => {
        const screenWidth = window.innerWidth;
        if (ctx) {
          ctx.revert();
          ctx = null;
        }
  
        if (screenWidth <= 740) {
          let contentY = '25vw';
          if (screenWidth <= 325) contentY = '68vw';
          else if (screenWidth <= 340) contentY = '63vw';
          else if (screenWidth <= 380) contentY = '55vw';
          else if (screenWidth <= 400) contentY = '50vw';
          else if (screenWidth <= 430) contentY = '45vw';
          else if (screenWidth <= 460) contentY = '43vw';
          else if (screenWidth <= 480) contentY = '39vw';
          else if (screenWidth <= 500) contentY = '37vw';
          else if (screenWidth <= 550) contentY = '35vw';
          else if (screenWidth <= 600) contentY = '32vw';
          else if (screenWidth <= 660) contentY = '28vw';
  
          gsap.set(workcontentRef2.current, { y: 200 });
          gsap.set(workdescriptionRef1.current, { display: 'flex', opacity: 1 });
          gsap.set(workdescriptionRef2.current, { display: 'none', opacity: 0 });
          gsap.set(workdescriptionwrapper.current, { alignItems: 'flex-end' });
  
          ctx = gsap.context(() => {
            const tl = gsap.timeline({
              scrollTrigger: {
                id: 'workScrollTimeline2',
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=2000',
                scrub: true,
                pin: sectionRef.current.querySelector('.work-section'),
                onUpdate: (self) => {
                  if (self.progress >= 0.99) setCurrentSlide(1);
                  else if (self.progress <= 0.05) setCurrentSlide(0);
                },
              },
            });
  
            tl.fromTo(contentRef.current, { y: '0vw', opacity: 1 }, { y: contentY, opacity: 1, duration: 2, ease: 'power1.out' })
              .fromTo(workcontentRef.current, { y: 0, opacity: 1 }, { y: -200, opacity: 1, duration: 2, ease: 'power1.out' }, '<')
              .fromTo(workcontentRef2.current, { y: 200, opacity: 1 }, { y: 0, opacity: 1, duration: 2, ease: 'power1.out' }, '<')
              .to(workdescriptionRef1.current, { opacity: 0, duration: 1 }, '<')
              .set(workdescriptionRef1.current, { display: 'none' }, '>')
              .set(workdescriptionRef2.current, { display: 'flex', opacity: 0.5 }, '<')
              .set(workdescriptionwrapper.current, { alignItems: 'flex-start' }, '<')
              .to(workdescriptionRef2.current, { opacity: 1, duration: 1 }, '<');
  
            ScrollTrigger.refresh();
          }, sectionRef);
        }
      };
  
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
        if (ctx) ctx.revert();
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  return (
    <div className="work-pin-wrapper" ref={sectionRef} id='works'>
    <div className="work-section" >
      <h2 className="work-header">
        <span className="work-header-span1">WO</span>
        <span className="work-header-span2">RK</span>
      </h2>

      <div className="work-wrapper">
        <div className="work-main-content1" ref={contentRef}>
          <div className="work-content-container">
            <div className="work-content" ref={workcontentRef}>
              <span className="work-date">May 2024 - Present</span>
              <div className="work-icon">
                <img src={Computer} alt="project icon" />
              </div>
              <h3 className="work-role">CV & ML Full Stack Developer Intern</h3>
              <div>
                <p className="work-company">HUMIAI (Remote)</p>
                <p className="work-stipend">(stipend ₹20,000+ incentives)</p>
              </div>
            </div>
            <div className="work-content2" ref={workcontentRef2}>
              <span className="work-date">Jun 2024 – Present</span>
              <div className="work-icon">
                <img src={Computer} alt="project icon" />
              </div>
              <h3 className="work-role">AI & ML Engineer Intern</h3>
              <p className="work-company">Tamizh - TN Startup (In-office)</p>
            </div>
          </div>
        </div>

        <div className="work-description-container" ref={workdescriptionwrapper}>
          <div className="work-description-2" ref={workdescriptionRef2}>
            <p>
              Built vision models for the Smart Specs project using Roboflow and Florence, implemented multilingual OCR with EasyOCR, and developed a gesture-based cursor system with Mediapipe. Deployed models via a GPU-accelerated setup and optimized performance for wearables.
            </p>
          </div>
          <div className="work-description-1" ref={workdescriptionRef1}>
            <p>
              Built and deployed LLM-based ML workflows on AWS, GCP, and NVIDIA. Developed generative AI pipelines with OpenAI, Gemini, LangChain, and Pinecone, and created secure APIs using Flask and FastAPI. Delivered POCs with MLOps, Hugging Face models, and conversational agents with generative avatars.
            </p>
          </div>
        </div>
      </div>

      <div className="work-dots-container">
  {[0, 1].map((index) => (
    <span
      key={index}
      className={`work-dot ${currentSlide === index ? 'active' : ''}`}
      onClick={() => handleDotClick(index)}
    ></span>
  ))}
</div>

    </div>
    </div>
  );
};

export default Works;