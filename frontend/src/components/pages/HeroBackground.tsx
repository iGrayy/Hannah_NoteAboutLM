import React, { useRef } from 'react';
import { motion, useTime, useTransform } from 'framer-motion';

const NUM_NODES = 80;
const NUM_CODE_SNIPPETS = 25;
const NUM_CONNECTIONS = 40;
const NUM_GEOMETRIC_SHAPES = 15;

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
  size: Math.random() * 3 + 1,
  color: ['blue', 'purple', 'cyan', 'green'][Math.floor(Math.random() * 4)],
  pulse: Math.random() * 2 + 1,
}));

const connections = Array.from({ length: NUM_CONNECTIONS }).map(() => {
  const from = Math.floor(Math.random() * NUM_NODES);
  let to = Math.floor(Math.random() * NUM_NODES);
  while (to === from) to = Math.floor(Math.random() * NUM_NODES);
  return { from, to, opacity: Math.random() * 0.3 + 0.1 };
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

const geometricShapes = Array.from({ length: NUM_GEOMETRIC_SHAPES }).map(() => ({
  x: Math.random() * 200 - 100,
  y: Math.random() * 200 - 100,
  z: Math.random() * 1200 - 600,
  size: Math.random() * 50 + 20,
  rotation: [Math.random() * 360, Math.random() * 360, Math.random() * 360],
  isWireframe: Math.random() > 0.5,
}));

const HeroBackground: React.FC = () => {
  const time = useTime();

  // Create a slow, looping rotation effect
  const rotateX = useTransform(time, [0, 20000], [5, -5], { clamp: false });
  const rotateY = useTransform(time, [0, 30000], [-5, 5], { clamp: false });

  return (
    <div className="absolute inset-0 z-0 bg-gray-900 overflow-hidden">
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
              border: shape.isWireframe ? '1px solid rgba(99, 102, 241, 0.3)' : 'none',
              backgroundColor: shape.isWireframe ? 'transparent' : 'rgba(99, 102, 241, 0.1)',
              borderRadius: Math.random() > 0.5 ? '50%' : '0',
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
          <motion.div
            key={`n-${pos.id}`}
            className={`absolute rounded-full`}
            style={{
              left: '50%', top: '50%',
              width: pos.size, height: pos.size,
              translateX: `${pos.x}vw`,
              translateY: `${pos.y}vh`,
              translateZ: `${pos.z}px`,
              backgroundColor: `rgba(var(--${pos.color}-rgb), 0.7)`,
            }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: pos.pulse, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Code Snippets & Symbols */}
        {snippetPositions.map((pos, i) => (
          <motion.div
            key={`c-${i}`}
            className="absolute text-gray-500 font-mono text-sm"
            style={{
              left: '50%', top: '50%',
              translateX: `${pos.x}vw`,
              translateY: `${pos.y}vh`,
              translateZ: `${pos.z}px`,
              scale: pos.scale,
              opacity: pos.scale * 0.8,
            }}
            animate={{ y: [pos.y, pos.y - 5, pos.y], rotate: [pos.rotation, pos.rotation + 5, pos.rotation] }}
            transition={{ duration: Math.random() * 10 + 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            {pos.text}
          </motion.div>
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
                strokeWidth={0.5}
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

export default HeroBackground;
