import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedMeshBackgroundProps {
  className?: string;
  variant?: 'default' | 'hero' | 'subtle';
}

const variantOpacity = {
  default: 'opacity-30',
  hero: 'opacity-50',
  subtle: 'opacity-20',
} as const;

export function AnimatedMeshBackground({
  className,
  variant = 'default',
}: AnimatedMeshBackgroundProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;

    const start = () => {
      if (cancelled) return;
      const w = window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      };
      if (typeof w.requestIdleCallback === 'function') {
        idleHandle = w.requestIdleCallback(() => {
          if (!cancelled) setAnimate(true);
        }, { timeout: 2000 });
      } else {
        timeoutHandle = window.setTimeout(() => {
          if (!cancelled) setAnimate(true);
        }, 250);
      }
    };

    if (document.readyState === 'complete') {
      start();
    } else {
      window.addEventListener('load', start, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', start);
      const w = window as Window & { cancelIdleCallback?: (handle: number) => void };
      if (idleHandle !== undefined && typeof w.cancelIdleCallback === 'function') {
        w.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== undefined) {
        window.clearTimeout(timeoutHandle);
      }
    };
  }, []);

  const wrapperClass = cn(
    'fixed inset-0 -z-10 overflow-hidden pointer-events-none',
    variantOpacity[variant],
    className,
  );

  if (!animate) {
    return (
      <div aria-hidden className={wrapperClass} data-testid="animated-mesh-placeholder">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-green-500" />
      </div>
    );
  }

  return (
    <motion.div
      aria-hidden
      className={wrapperClass}
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
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-bl from-cyan-500 via-teal-500 to-green-600"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
      />

      <div className="absolute inset-0 backdrop-blur-3xl" />
    </motion.div>
  );
}
