import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { cardHover, glowHover } from '@/lib/animations';
import { ReactNode, useRef, MouseEvent } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  tilt?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  hover = true,
  tilt = false 
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!tilt || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (!tilt) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        'relative rounded-xl border border-white/20 dark:border-white/10',
        'bg-white/10 dark:bg-white/5',
        'backdrop-blur-md backdrop-saturate-150',
        'shadow-lg',
        'before:absolute before:inset-0 before:rounded-xl',
        'before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-50',
        'after:absolute after:inset-0 after:rounded-xl',
        'after:bg-gradient-to-br after:from-primary/10 after:via-secondary/10 after:to-transparent',
        className
      )}
      variants={hover ? cardHover : undefined}
      initial="initial"
      whileHover={hover ? 'hover' : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tilt ? {
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      } : undefined}
      data-testid="glass-card"
    >
      <motion.div
        className="relative z-10 p-6"
        variants={hover ? glowHover : undefined}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
