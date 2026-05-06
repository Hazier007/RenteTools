import { GlassCard } from './GlassCard';
import { GradientText } from './GradientText';
import { cn } from '@/lib/utils';
import { Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { useLocation } from 'wouter';

function calculatorRouteFor(slug: string, category: string): string {
  const normalized = category.toLowerCase();
  if (normalized === 'overige') {
    return `/${slug}`;
  }
  return `/${normalized}/${slug}`;
}

interface CalculatorCardProps {
  title: string;
  description: string;
  slug: string;
  category: string;
  previewImage?: string;
  onClick?: () => void;
  className?: string;
}

export function CalculatorCard({
  title,
  description,
  slug,
  category,
  previewImage,
  onClick,
  className
}: CalculatorCardProps) {
  const [, setLocation] = useLocation();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setLocation(calculatorRouteFor(slug, category));
    }
  };
  
  return (
    <motion.div
      variants={fadeInUp}
      className={cn('group cursor-pointer', className)}
      onClick={handleClick}
      data-testid={`calculator-card-${slug}`}
    >
      <GlassCard hover tilt>
        <div className="space-y-4">
          <div className="relative h-40 -m-6 mb-0 rounded-t-xl overflow-hidden">
            {previewImage ? (
              <img
                src={previewImage}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 via-secondary/20 to-green-500/20 flex items-center justify-center">
                <Calculator className="w-16 h-16 text-primary/40 dark:text-primary/30" />
              </div>
            )}
            
            <div className="absolute top-3 right-3">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/90 dark:bg-black/90 text-foreground backdrop-blur-sm">
                {category}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <GradientText as="h3" className="text-xl group-hover:scale-105 transition-transform duration-300">
              {title}
            </GradientText>
            
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 dark:border-white/5">
            <span className="text-xs text-muted-foreground">
              Gratis berekenen
            </span>
            <motion.div
              className="text-primary"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
