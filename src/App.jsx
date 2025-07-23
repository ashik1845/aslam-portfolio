import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Contact from './components/Contact';
import Education from './components/Education';
import Home from './components/Home';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Footer from './components/Footer';
import Work from './components/Work';
import LoadingPage from './components/Loading';
import { ThemeProvider } from './components/ThemeContext';
import Lenis from '@studio-freight/lenis';

// 👇 Main content rendering component with scroll and load handling
function MainPage() {
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Smooth scroll with Lenis
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handleFullLoad = async () => {
      if (document.readyState !== 'complete') {
        await new Promise((resolve) => {
          window.addEventListener('load', resolve, { once: true });
        });
      }

      const images = document.querySelectorAll('img');
      await Promise.all(
        Array.from(images).map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve;
              })
        )
      );

      setTimeout(() => {
        setIsLoaded(true);
      }, 500);
    };

    handleFullLoad();

    // Scroll to specific section if passed via location state
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000);
    }
  }, [location]);

  if (!isLoaded) return <LoadingPage />;

  return (
    <>
      <Home />
      <Education />
      <Skills />
      <Projects />
      <Work />
      <Certificates />
      <Footer />
    </>
  );
}

// 👇 Root App component with routes and theme context
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
