import React, { useRef, useEffect, useState } from 'react';

const EnhancedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: -1, y: -1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const stars: any[] = [];
    const shootingStars: any[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      for (let i = 0; i < 150; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.5 + 0.5,
          twinkle: Math.random() * 0.02,
        });
      }
    };

    const createShootingStar = () => {
      if (Math.random() < 0.02 && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * 50,
          len: Math.random() * 80 + 10,
          speed: Math.random() * 5 + 5,
          alpha: 1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw nebulas
      const nebula1 = ctx.createRadialGradient(canvas.width * 0.2, canvas.height * 0.3, 50, canvas.width * 0.2, canvas.height * 0.3, 300);
      nebula1.addColorStop(0, 'rgba(66, 153, 225, 0.05)');
      nebula1.addColorStop(1, 'rgba(66, 153, 225, 0)');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nebula2 = ctx.createRadialGradient(canvas.width * 0.8, canvas.height * 0.7, 50, canvas.width * 0.8, canvas.height * 0.7, 400);
      nebula2.addColorStop(0, 'rgba(129, 140, 248, 0.05)');
      nebula2.addColorStop(1, 'rgba(129, 140, 248, 0)');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach(star => {
        star.alpha += star.twinkle;
        if (star.alpha > 1 || star.alpha < 0.5) star.twinkle *= -1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });

      // Draw constellations
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dist = Math.hypot(stars[i].x - stars[j].x, stars[i].y - stars[j].y);
          const mouseDist = Math.hypot(stars[i].x - mousePosition.current.x, stars[i].y - mousePosition.current.y);

          if (dist < 100 && mouseDist < 150) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 * (1 - mouseDist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw shooting stars
      shootingStars.forEach((ss, index) => {
        ss.x += ss.speed;
        ss.y += ss.speed * 0.5;
        ss.alpha -= 0.02;

        if (ss.alpha <= 0) {
          shootingStars.splice(index, 1);
          return;
        }

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.len, ss.y - ss.len * 0.5);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ss.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      createShootingStar();
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    resizeCanvas();
    createStars();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 bg-gray-900" />;
};

export default EnhancedBackground;

