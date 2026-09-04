import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <motion.div
        id="scroll-progress-indicator"
        className="h-full w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-300 origin-left shadow-xs"
        style={{ scaleX }}
      />
    </div>
  );
};
