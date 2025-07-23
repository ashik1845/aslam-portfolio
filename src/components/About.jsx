import React, { useEffect, useRef } from 'react';
import aboutBgImg from '../assets/about-bg-img.png';
import personImg from '../assets/person-img.png';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const descriptionRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    const el = descriptionRef.current;
    if (!el || isInitialized.current) return;

    // Wait for the DOM and other ScrollTriggers to be set up
    const timer = setTimeout(() => {
      const chars = el.querySelectorAll('.char');
      
      if (chars.length === 0) {
        return;
      }

      // Don't kill any existing ScrollTriggers - just create ours
      // Use a unique trigger element to avoid conflicts
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'about-text-animation', // Give it a unique ID
          trigger: el, // Use the text element itself as trigger, not the section
          start: 'top 85%',
          end: 'center 45%',
          scrub: 1, // Smooth scrubbing
          invalidateOnRefresh: true,
        }
      });

      // Store the ScrollTrigger reference
      scrollTriggerRef.current = tl.scrollTrigger;
      isInitialized.current = true;

      tl.fromTo(
        chars,
        { 
          color: '#8B4C3C' 
        },
        {
          color: 'var(--about-description-color)', 
          stagger: {
            each: 0.02, // Slightly faster for smoother animation
            ease: 'power1.inOut',
          },
          ease: 'none',
          duration: 1
        }
      );

    }, 300); // Longer delay to let robot animation initialize first

    return () => {
      clearTimeout(timer);
      // Cleanup only our specific ScrollTrigger
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      isInitialized.current = false;
    };
  }, []); // Empty dependency array to run only once

  const description = `I'm an AI/ML Developer passionate about creating impactful solutions using language models and intelligent systems. With over two years of hands-on experience, I've worked on everything from generative AI apps to production-grade model deployments. I thrive at the intersection of problem-solving and innovation, and I'm always exploring new ways to push the boundaries of what AI can do.`;

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
        <p className="about-description" ref={descriptionRef}>
          {description.split('').map((char, i) => (
            <span key={i} className="char">{char}</span>
          ))}
        </p>
      </div>
    </section>
  );
};

export default About;