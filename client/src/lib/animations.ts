import { type Variants } from 'framer-motion';

export const staggerChildren: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const tiltHover: Variants = {
  initial: {
    rotateX: 0,
    rotateY: 0,
    scale: 1
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};

export const floatPulse: Variants = {
  initial: {
    y: 0,
    scale: 1
  },
  animate: {
    y: [-4, 4, -4],
    scale: [1, 1.02, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const glowHover: Variants = {
  initial: {
    boxShadow: '0 0 0 rgba(59, 130, 246, 0)'
  },
  hover: {
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const animationConfig = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    verySlow: 0.8
  },
  easing: {
    easeOut: [0.22, 1, 0.36, 1],
    easeIn: [0.55, 0.085, 0.68, 0.53],
    easeInOut: [0.65, 0, 0.35, 1],
    spring: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    },
    bounce: {
      type: 'spring',
      stiffness: 400,
      damping: 25
    }
  },
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15
  },
  delay: {
    none: 0,
    short: 0.1,
    medium: 0.2,
    long: 0.3
  }
};

export const cardHover: Variants = {
  initial: {
    y: 0,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
  },
  hover: {
    y: -5,
    boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
    transition: {
      duration: animationConfig.duration.normal,
      ease: animationConfig.easing.easeOut
    }
  }
};

export const numberCounter: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'backOut'
    }
  }
};

export const shimmer: Variants = {
  initial: {
    backgroundPosition: '-200% 0'
  },
  animate: {
    backgroundPosition: '200% 0',
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};
