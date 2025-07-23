import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";


export default function LoadingPage() {
  const canvasRef = useRef(null);
  const [bootDone, setBootDone] = useState(false);
  const [lineText, setLineText] = useState("");

  const bootLines = [
    "Importing essential libraries...",
    "Initializing data pipelines...",
    "Loading AI models...",
    "Applying custom preprocessing steps...",
    "Activating feature engineering modules...",
    "Configuring neural network layers...",
    "Calibrating hyperparameters...",
    "Connecting to GPU acceleration...",
    "Applying visual styles...",
    "Finalizing deployment setup...",
    "Launching portfolio interface..."
  ];

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;

    const typeNextChar = () => {
      if (lineIndex >= bootLines.length) {
        setBootDone(true);
        return;
      }

      const currentLine = bootLines[lineIndex];

      if (charIndex < currentLine.length) {
       setLineText(currentLine.slice(0, charIndex + 1));

        charIndex++;
        setTimeout(typeNextChar, 40);
      } else {
        setTimeout(() => {
          setLineText("");
          charIndex = 0;
          lineIndex++;
          typeNextChar();
        }, 1000);
      }
    };

    typeNextChar();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const nodes = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#8b5e3c";

      for (let i = 0; i < nodes.length; i++) {
        let n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          let n2 = nodes[j];
          let dx = n.x - n2.x;
          let dy = n.y - n2.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(139, 94, 60, ${1 - dist / 120})`;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    };

    draw();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
     <Helmet>
  <title>AI/ML Engineer Boot</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap"
    rel="stylesheet"
  />
</Helmet>

      <style jsx global>{`
        body {
          margin: 0;
          background-color: #0f0f10;
          color: #ffffff;
          font-family: 'Montserrat', sans-serif;
          overflow: hidden;
        }
      `}</style>
      <canvas
        id="neuralCanvas"
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 10,
          background: "#0b0c10"
        }}
      />
      {!bootDone && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            color: "#8b5e3c",
            fontSize: "1.5rem",
            whiteSpace: "pre-wrap"
          }}
        >
          <span>{lineText}</span>
          <span
            style={{
              display: "inline-block",
              width: "10px",
              backgroundColor: "#8b5e3c",
              animation: "blink 1s step-end infinite",
              marginLeft: "5px"
            }}
          ></span>
        </div>
      )}
      {bootDone && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            textAlign: "left",
            width: "fit-content",
            background: "rgba(0, 0, 0, 0.4)",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "0 0 20px rgba(139, 94, 60, 0.4)"
          }}
        >
          <span style={{ color: "#8b5e3c" }}>
            System Ready. Launching Interface... █
          </span>
        </div>
      )}
    </>
  );
}