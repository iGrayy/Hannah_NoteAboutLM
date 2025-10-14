import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FeatureBackground from './FeatureBackground';
import BenefitsBackground from './BenefitsBackground';
import VortexBackground from './VortexBackground';

const MasterBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Define scroll ranges for each section's background to be visible.
  // These values are percentages of the total scrollable height.
  // Example: [start fading in, fully visible, start fading out, fully transparent]
  const featureOpacity = useTransform(scrollYProgress, [0.20, 0.25, 0.45, 0.50], [0, 1, 1, 0]);
  const benefitsOpacity = useTransform(scrollYProgress, [0.48, 0.53, 0.73, 0.78], [0, 1, 1, 0]);
  const vortexOpacity = useTransform(scrollYProgress, [0.76, 0.81, 1.0, 1.0], [0, 1, 1, 1]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen -z-10 pointer-events-none">
      {/* Feature Section Background */}
      <motion.div style={{ opacity: featureOpacity }} className="absolute inset-0">
        <FeatureBackground />
      </motion.div>

      {/* Benefits Section Background */}
      <motion.div style={{ opacity: benefitsOpacity }} className="absolute inset-0">
        <BenefitsBackground />
      </motion.div>

      {/* CTA Section Background */}
      <motion.div style={{ opacity: vortexOpacity }} className="absolute inset-0">
        <VortexBackground />
      </motion.div>
    </div>
  );
};

export default MasterBackground;

