import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedMeshBackgroundProps {
  className?: string;
  variant?: 'default' | 'hero' | 'subtle';
}

export function AnimatedMeshBackground({ 
  className, 
  variant = 'default' 
}: AnimatedMeshBackgroundProps) {
  const variantStyles = {
    default: 'opacity-30',
    hero: 'opacity-50',
    subtle: 'opacity-20'
  };

  return (
    <motion.div
      className={cn(
        'fixed inset-0 -z-10 overflow-hidden pointer-events-none',
        variantStyles[variant],
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-green-500 animate-mesh-gradient" />
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-blue-400 via-cyan-400 to-teal-400"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-bl from-cyan-500 via-teal-500 to-green-600"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5
        }}
      />
      
      <div className="absolute inset-0 backdrop-blur-3xl" />
    </motion.div>
  );
}
