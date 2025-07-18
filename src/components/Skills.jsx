import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Skills.css';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  {
    title: 'Programming Languages',
    items: ['Python', 'C', 'SQL', 'R', 'JavaScript'],
  },
  {
    title: 'AI/ML Tools',
    items: [
      'Scikit-learn', 'NumPy', 'Pandas', 'OpenCV',
      'Hugging Face', 'LangChain', 'MLflow', 'AWS SageMaker',
    ],
  },
  {
    title: 'LLMs',
    items: ['OpenAI', 'Gemini', 'Claude', 'LLaMA', 'Mistral'],
  },
  {
    title: 'Frameworks',
    items: ['TensorFlow', 'PyTorch', 'Keras', 'FastAPI', 'Flask', 'Streamlit'],
  },
  {
    title: 'Databases',
    items: ['MySQL', 'SQLite', 'PostgreSQL', 'Vector DB (Pinecone)'],
  },
  {
    title: 'Web & Deplyment Technologies',
    items: ['HTML', 'CSS','AWS EC2', 'Docker', 'Postman'],
  },
  {
    title: 'Visualization Tools',
    items: ['Matplotlib', 'Seaborn', 'Power BI', 'Tableau'],
  },
];

const Skills = () => {
  const carouselRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
  const el = carouselRef.current;
  const wrapper = wrapperRef.current;

  if (!el || !wrapper) return;

  const scrollDistance = el.scrollWidth - wrapper.offsetWidth;

  gsap.to(el, {
    x: () => `-${scrollDistance}px`,
    ease: 'none',
    scrollTrigger: {
      trigger: wrapper,
      start: 'center center',
      end: () => `+=${scrollDistance}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true, 
    },
  });

  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);

  return (
    <section id='skills' className="skills-section">
      
      <div className="skills-carousel-outer" ref={wrapperRef}>
        <h2 className="skills-title">
        <span className="highlight-dark">SK</span>
        <span className="highlight-brown">ILLS</span>
      </h2>
        <div className="skills-cards" ref={carouselRef}>
          {skillsData.map((category, index) => (
            <div className="skills" key={index}>
              <h3 className="card-title">{category.title}</h3>
              <div className="card-body">
                <div className="card-items">
                  {category.items.map((item, idx) => (
                    <span className="skill-item" key={idx}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
