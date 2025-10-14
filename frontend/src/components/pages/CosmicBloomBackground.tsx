import React, { useRef, useEffect } from 'react';

const CosmicBloomBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];
    const particleCount = 200;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    class Particle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      speed: number;
      angle: number;
      radius: number;
      life: number;
      maxLife: number;
      color: string;

      constructor(x: number, y: number) {
        // Start particles from a small area around the center, not a single point
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 50; // Originate within a 50px radius circle
        this.originX = x + Math.cos(angle) * radius;
        this.originY = y + Math.sin(angle) * radius;

        this.x = this.originX;
        this.y = this.originY;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 2 + 0.5; // Slightly slower speed
        this.radius = Math.random() * 2 + 1; // Slightly smaller particles
        this.maxLife = Math.random() * 250 + 150; // Longer life for a more spread out feel
        this.life = this.maxLife;
        this.color = `rgba(${180 + Math.random() * 75}, ${200 + Math.random() * 55}, 255, 1)`;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.life -= 1;

        // Reset particle when it dies
        if (this.life <= 0) {
          this.x = this.originX;
          this.y = this.originY;
          this.life = this.maxLife;
          this.speed = Math.random() * 3 + 0.5;
        }
      }

      draw() {
        if (!ctx) return;
        const opacity = this.life / this.maxLife;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace('1)', `${opacity * 0.8})`);
        ctx.fill();
      }
    }

    const init = () => {
      resizeCanvas();
      particles.length = 0; // Clear existing particles
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width / 2, canvas.height / 2));
      }
    };

    const animate = (time: number) => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.15)'; // Fading effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw central core
      const coreRadius = 15 + Math.sin(time * 0.001) * 5; // Smaller and less pulsating core
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, coreRadius
      );
      gradient.addColorStop(0, 'rgba(200, 220, 255, 0.3)'); // Reduced core brightness
      gradient.addColorStop(0.5, 'rgba(150, 180, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(100, 120, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, coreRadius * 2, 0, Math.PI * 2);
      ctx.fill();

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate(0);

    window.addEventListener('resize', init);

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default CosmicBloomBackground;

