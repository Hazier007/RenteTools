import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { floatPulse } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface FloatingNumberProps {
  value: string | number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function FloatingNumber({ 
  value, 
  suffix = '', 
  duration = 1,
  className 
}: FloatingNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100
  });
  const displayNumber = useTransform(springValue, (latest) => {
    // Preserve one decimal place for decimal numbers
    const hasDecimals = numericValue % 1 !== 0;
    return hasDecimals 
      ? latest.toLocaleString('nl-BE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
      : Math.round(latest).toLocaleString('nl-BE');
  });

  useEffect(() => {
    motionValue.set(numericValue);
  }, [numericValue, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [springValue]);

  return (
    <motion.span
      className={cn(
        'inline-block font-bold tabular-nums',
        className
      )}
      variants={floatPulse}
      initial="initial"
      animate="animate"
      data-testid="floating-number"
    >
      <motion.span>
        {displayNumber}
      </motion.span>
      {suffix && (
        <motion.span
          className="ml-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: duration * 0.8 }}
        >
          {suffix}
        </motion.span>
      )}
    </motion.span>
  );
}
