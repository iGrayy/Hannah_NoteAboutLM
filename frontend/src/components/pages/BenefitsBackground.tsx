import React, { useRef, useEffect } from 'react';

const BenefitsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create flowing wave patterns
      const waveCount = 5;
      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        const amplitude = 30 + i * 10;
        const frequency = 0.02 + i * 0.005;
        const phase = time * 0.01 + i * Math.PI / 3;
        
        for (let x = 0; x <= canvas.width; x += 2) {
          const y = canvas.height * 0.5 + Math.sin(x * frequency + phase) * amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        const opacity = 0.1 - i * 0.015;
        ctx.strokeStyle = `rgba(34, 197, 94, ${opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Create floating energy orbs
      const orbCount = 8;
      for (let i = 0; i < orbCount; i++) {
        const x = (canvas.width / orbCount) * i + Math.sin(time * 0.005 + i) * 50;
        const y = canvas.height * 0.3 + Math.cos(time * 0.007 + i * 2) * 80;
        const radius = 15 + Math.sin(time * 0.01 + i) * 5;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
        gradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.2)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Create pulsing grid
      const gridSize = 40;
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.1)';
      ctx.lineWidth = 0.5;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        const opacity = 0.1 + Math.sin(time * 0.01 + x * 0.01) * 0.05;
        ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        const opacity = 0.1 + Math.sin(time * 0.01 + y * 0.01) * 0.05;
        ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      time++;
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default BenefitsBackground;
