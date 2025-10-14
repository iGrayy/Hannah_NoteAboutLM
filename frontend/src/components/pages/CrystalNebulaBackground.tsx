import React, { useEffect, useRef } from 'react';

interface CrystalNebulaBackgroundProps {
  className?: string;
}

interface NebulaParticle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
  opacity: number;
  life: number;
  maxLife: number;
}

interface LightShard {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  angle: number;
  rotationSpeed: number;
}

const CrystalNebulaBackground: React.FC<CrystalNebulaBackgroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const nebulaParticlesRef = useRef<NebulaParticle[]>([]);
  const lightShardsRef = useRef<LightShard[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Use clientX/Y directly since canvas is fixed to viewport
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };

      // Create light shards on mouse movement
      if (Math.random() < 0.3) {
        lightShardsRef.current.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          size: Math.random() * 8 + 2,
          life: 100,
          maxLife: 100,
          angle: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.1
        });
      }
    };

    // Initialize nebula particles
    const initNebulaParticles = () => {
      nebulaParticlesRef.current = [];
      for (let i = 0; i < 150; i++) {
        nebulaParticlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          vz: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
          color: `hsl(${200 + Math.random() * 160}, 70%, 60%)`,
          opacity: Math.random() * 0.8 + 0.2,
          life: Math.random() * 1000 + 500,
          maxLife: Math.random() * 1000 + 500
        });
      }
    };



    const updateAndDrawNebula = (time: number) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      nebulaParticlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        // Orbital motion around crystal
        const distance = Math.sqrt(
          Math.pow(particle.x - centerX, 2) + Math.pow(particle.y - centerY, 2)
        );
        const angle = Math.atan2(particle.y - centerY, particle.x - centerX);
        const orbitalForce = 0.001;
        particle.vx += Math.cos(angle + Math.PI / 2) * orbitalForce;
        particle.vy += Math.sin(angle + Math.PI / 2) * orbitalForce;

        // Apply some drag
        particle.vx *= 0.999;
        particle.vy *= 0.999;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Calculate perspective
        const perspective = 1000;
        const scale = Math.max(0, perspective / (perspective + particle.z)); // Ensure scale is not negative
        const screenX = particle.x * scale + centerX * (1 - scale);
        const screenY = particle.y * scale + centerY * (1 - scale);

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity * scale;
        ctx.beginPath();
        ctx.arc(screenX, screenY, particle.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 10 * scale;
        ctx.fill();
        ctx.restore();

        // Update life
        particle.life--;
        if (particle.life <= 0) {
          // Respawn particle
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.z = Math.random() * 1000;
          particle.life = particle.maxLife;
        }
      });
    };

    const updateAndDrawLightShards = () => {
      lightShardsRef.current = lightShardsRef.current.filter(shard => {
        shard.x += shard.vx;
        shard.y += shard.vy;
        shard.angle += shard.rotationSpeed;
        shard.life--;

        const alpha = shard.life / shard.maxLife;
        
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(shard.x, shard.y);
        ctx.rotate(shard.angle);

        // Draw diamond-shaped shard
        const size = shard.size * alpha;
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size * 0.3, 0);
        ctx.lineTo(0, size);
        ctx.lineTo(-size * 0.3, 0);
        ctx.closePath();
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(200, 230, 255, 0.6)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();

        return shard.life > 0;
      });
    };

    const animate = (time: number) => {
      ctx.fillStyle = 'rgba(5, 10, 25, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      updateAndDrawNebula(time);
      updateAndDrawLightShards();

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initNebulaParticles();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full z-0 ${className}`}
      style={{
        background: 'linear-gradient(135deg, #0a0f1c 0%, #1a1f3a 50%, #2a1f3a 100%)',
        pointerEvents: 'none'
      }}
    />
  );
};

export default CrystalNebulaBackground;
