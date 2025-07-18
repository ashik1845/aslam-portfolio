import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contact from './components/Contact';
import Education from './components/Education';
import Home from './components/Home';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeContext';
import Works from './components/Works';

function MainPage() {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = location.state?.scrollTo;
    if (scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); 
    }
  }, [location]);

  return (
    <>
      <Home />
      <Education />
      <Skills />
      <Projects />
      <Works/>
      <Certificates/>
      <Footer/>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
