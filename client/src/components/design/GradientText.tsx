import { ReactNode, createElement } from 'react';
import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  outline?: boolean;
}

export function GradientText({ 
  children, 
  className, 
  as = 'span',
  outline = false
}: GradientTextProps) {
  return createElement(
    as,
    {
      className: cn(
        'bg-gradient-to-r from-primary via-secondary to-green-500',
        'bg-clip-text text-transparent',
        'font-bold',
        'animate-gradient',
        outline && 'gradient-text-outline',
        className
      ),
      'data-testid': 'gradient-text'
    },
    children
  );
}
