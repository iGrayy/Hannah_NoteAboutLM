import React, { useRef, useState, useEffect } from 'react';
import { motion, useTime, useTransform, useMotionValue, useSpring } from 'framer-motion';

const NUM_NODES = 80;
const NUM_CODE_SNIPPETS = 25;
const NUM_CONNECTIONS = 40;
const NUM_GEOMETRIC_SHAPES = 15;
const NUM_PARTICLES = 100;

// AI/Software Engineering themed code snippets
const codeSnippets = [
  'AI', 'ML', 'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
  'useState()', 'useEffect()', 'async/await', 'Promise.all()', 'fetch()',
  'const', 'let', 'function', 'class', 'interface', 'type',
  '<div/>', '<App/>', 'npm', 'git', 'API', 'JSON', 'SQL',
  'algorithm', 'data', 'neural', 'deep', 'learning', 'model',
  '{}', '[]', '=>', '&&', '||', '===', '!==',
  'import', 'export', 'from', 'default', 'props', 'state'
];

const algorithmSymbols = ['∑', '∆', '∇', '∞', '∫', '∂', 'λ', 'π', 'α', 'β', 'γ', 'θ'];

const nodePositions = Array.from({ length: NUM_NODES }).map((_, i) => ({
  id: i,
  x: Math.random() * 180 - 90,
  y: Math.random() * 180 - 90,
  z: Math.random() * 1000 - 500,
  size: Math.random() * 2.5 + 1,
  color: ['blue', 'purple', 'cyan', 'green'][Math.floor(Math.random() * 4)],
  pulse: Math.random() * 3 + 2,
}));

const connections = Array.from({ length: NUM_CONNECTIONS }).map(() => {
  const from = Math.floor(Math.random() * NUM_NODES);
  let to = Math.floor(Math.random() * NUM_NODES);
  while (to === from) to = Math.floor(Math.random() * NUM_NODES);
  return { from, to, opacity: Math.random() * 0.4 + 0.2 };
});

const snippetPositions = Array.from({ length: NUM_CODE_SNIPPETS }).map(() => ({
  x: Math.random() * 160 - 80,
  y: Math.random() * 160 - 80,
  z: Math.random() * 800 - 400,
  text: Math.random() > 0.7
    ? algorithmSymbols[Math.floor(Math.random() * algorithmSymbols.length)]
    : codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
  rotation: Math.random() * 360,
  scale: Math.random() * 0.5 + 0.5,
}));

const orbPositions = [
  { x: -50, y: -50, z: -800, size: 400, color: 'blue' },
  { x: 50, y: 50, z: -600, size: 300, color: 'purple' },
  { x: -30, y: 40, z: -400, size: 250, color: 'cyan' },
  { x: 40, y: -30, z: -200, size: 200, color: 'green' },
];

const particlePositions = Array.from({ length: NUM_PARTICLES }).map(() => ({
  x: Math.random() * 300 - 150,
  y: Math.random() * 300 - 150,
  z: Math.random() * 1500 - 750,
  size: Math.random() * 1.5 + 0.5,
  duration: Math.random() * 5 + 5,
}));

const geometricShapes = Array.from({ length: NUM_GEOMETRIC_SHAPES }).map(() => ({
  x: Math.random() * 200 - 100,
  y: Math.random() * 200 - 100,
  z: Math.random() * 1200 - 600,
  size: Math.random() * 60 + 30,
  rotation: [Math.random() * 360, Math.random() * 360, Math.random() * 360],
  isWireframe: Math.random() > 0.5,
  color: ['blue', 'purple', 'cyan', 'green'][Math.floor(Math.random() * 4)],
}));

const HeroBackground: React.FC = () => {
  const time = useTime();
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);

  const handleMouseMove = ({ clientX, clientY }: React.MouseEvent) => {
    mouseX.set(clientX);
    mouseY.set(clientY);
  };


  // Create a slow, looping rotation effect
  const rotateX = useTransform(time, [0, 20000], [5, -5], { clamp: false });
  const rotateY = useTransform(time, [0, 30000], [-5, 5], { clamp: false });

  return (
    <div
      className="absolute inset-0 z-0 bg-gray-900 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
          rotateX,
          rotateY,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      >
        <GradientOrbs />
        <FloatingParticles mouseX={mouseX} mouseY={mouseY} />
        {/* Geometric Shapes - 3D Frames */}
        {geometricShapes.map((shape, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute"
            style={{
              left: '50%', top: '50%',
              width: shape.size,
              height: shape.size,
              translateX: `${shape.x}vw`,
              translateY: `${shape.y}vh`,
              translateZ: `${shape.z}px`,
              border: shape.isWireframe ? `1px solid rgba(var(--${shape.color}-rgb), 0.5)` : 'none',
              backgroundColor: shape.isWireframe ? 'transparent' : `rgba(var(--${shape.color}-rgb), 0.15)`,
              borderRadius: Math.random() > 0.5 ? '20%' : '50%',
            }}
            animate={{
              rotateX: [shape.rotation[0], shape.rotation[0] + 360],
              rotateY: [shape.rotation[1], shape.rotation[1] + 360],
              rotateZ: [shape.rotation[2], shape.rotation[2] + 180],
            }}
            transition={{
              duration: 20 + Math.random() * 30,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}

        {/* Nodes */}
        {nodePositions.map((pos) => (
          <RepelNode key={`n-${pos.id}`} pos={pos} mouseX={mouseX} mouseY={mouseY} />
        ))}

                {/* Code Snippets & Symbols */}
        {snippetPositions.map((pos, i) => (
          <RepelSnippet key={`c-${i}`} pos={pos} mouseX={mouseX} mouseY={mouseY} />
        ))}

        {/* Connections */}
        <svg className="absolute inset-0 w-full h-full opacity-20" style={{ transform: 'translateZ(-500px)' }}>
          {connections.map(({ from, to, opacity }, i) => {
            const p1 = nodePositions[from];
            const p2 = nodePositions[to];
            return (
              <motion.line
                key={`l-${i}`}
                x1={`${50 + p1.x / 2}%`}
                y1={`${50 + p1.y / 2}%`}
                x2={`${50 + p2.x / 2}%`}
                y2={`${50 + p2.y / 2}%`}
                stroke={`rgba(var(--${p1.color}-rgb), ${opacity})`}
                strokeWidth={0.7}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, opacity, 0] }}
                transition={{ duration: Math.random() * 4 + 3, repeat: Infinity }}
              />
            );
          })}
        </svg>
      </motion.div>


    </div>
  );
};

const GradientOrbs = () => (
  <>
    {orbPositions.map((orb, i) => (
      <motion.div
        key={`orb-${i}`}
        className="absolute rounded-full"
        style={{
          left: '50%',
          top: '50%',
          width: orb.size,
          height: orb.size,
          translateX: `${orb.x}vw`,
          translateY: `${orb.y}vh`,
          translateZ: `${orb.z}px`,
          backgroundImage: `radial-gradient(circle, rgba(var(--${orb.color}-rgb), 0.3) 0%, rgba(var(--${orb.color}-rgb), 0) 70%)`,
          filter: 'blur(50px)',
        }}
        animate={{
          scale: [1, 1.2 + Math.random() * 0.4, 1],
        }}
        transition={{
          duration: 8 + Math.random() * 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    ))}
  </>
);

const FloatingParticles = ({ mouseX, mouseY }) => (
  <>
        {particlePositions.map((particle, i) => (
      <RepelParticle key={`particle-${i}`} particle={particle} mouseX={mouseX} mouseY={mouseY} />
    ))}
  </>
);

const RepelNode = ({ pos, mouseX, mouseY }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const unsubscribeX = mouseX.onChange((mx) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const nodeCenterX = rect.left + rect.width / 2;
        const dist = Math.abs(mx - nodeCenterX);
        if (dist < 100) {
          const force = (1 - dist / 100) * 50 * Math.sign(nodeCenterX - mx);
          x.set(force);
        } else {
          x.set(0);
        }
      }
    });

    const unsubscribeY = mouseY.onChange((my) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const nodeCenterY = rect.top + rect.height / 2;
        const dist = Math.abs(my - nodeCenterY);
        if (dist < 100) {
          const force = (1 - dist / 100) * 50 * Math.sign(nodeCenterY - my);
          y.set(force);
        } else {
          y.set(0);
        }
      }
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, x, y]);

  return (
    <motion.div
      ref={ref}
      style={{
        left: '50%', top: '50%',
        width: pos.size, height: pos.size,
        translateX: `${pos.x}vw`,
        translateY: `${pos.y}vh`,
        translateZ: `${pos.z}px`,
        x: springX,
        y: springY,
      }}
      className={`absolute rounded-full`}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          backgroundColor: `rgba(var(--${pos.color}-rgb), 0.8)`,
          boxShadow: `0 0 8px rgba(var(--${pos.color}-rgb), 0.6), 0 0 16px rgba(var(--${pos.color}-rgb), 0.4)`,
        }}
      />
    </motion.div>
  );
};

const RepelParticle = ({ particle, mouseX, mouseY }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const updateForce = (coord, setter, dimension) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = dimension === 'x' ? rect.left + rect.width / 2 : rect.top + rect.height / 2;
      const dist = Math.abs(coord - center);
      if (dist < 80) {
        const force = (1 - dist / 80) * 40 * Math.sign(center - coord);
        setter.set(force);
      } else {
        setter.set(0);
      }
    };

    const unsubscribeX = mouseX.onChange((mx) => updateForce(mx, x, 'x'));
    const unsubscribeY = mouseY.onChange((my) => updateForce(my, y, 'y'));

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, x, y]);

  return (
    <motion.div
      ref={ref}
      className="absolute rounded-full bg-white/80"
      style={{
        left: '50%', top: '50%',
        width: particle.size, height: particle.size,
        translateX: `${particle.x}vw`, translateY: `${particle.y}vh`, translateZ: `${particle.z}px`,
        filter: 'blur(1px)',
        x: springX, y: springY,
      }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: particle.duration, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
};

const RepelSnippet = ({ pos, mouseX, mouseY }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const updateForce = (coord, setter, dimension) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = dimension === 'x' ? rect.left + rect.width / 2 : rect.top + rect.height / 2;
      const dist = Math.abs(coord - center);
      if (dist < 120) {
        const force = (1 - dist / 120) * 60 * Math.sign(center - coord);
        setter.set(force);
      } else {
        setter.set(0);
      }
    };

    const unsubscribeX = mouseX.onChange((mx) => updateForce(mx, x, 'x'));
    const unsubscribeY = mouseY.onChange((my) => updateForce(my, y, 'y'));

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, x, y]);

  return (
    <motion.div
      ref={ref}
      className="absolute text-gray-500 font-mono text-sm"
      style={{
        left: '50%', top: '50%',
        translateX: `${pos.x}vw`, translateY: `${pos.y}vh`, translateZ: `${pos.z}px`,
        scale: pos.scale, opacity: pos.scale * 0.8,
        x: springX, y: springY,
      }}
      animate={{ y: [pos.y, pos.y - 5, pos.y], rotate: [pos.rotation, pos.rotation + 5, pos.rotation] }}
      transition={{ duration: Math.random() * 10 + 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      {pos.text}
    </motion.div>
  );
};

export default HeroBackground;
