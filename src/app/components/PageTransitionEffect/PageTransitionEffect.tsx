'use client';
import { usePathname } from 'next/navigation';
import { motion, MotionProps } from 'framer-motion';

interface PageTransitionEffectProps {
    children: React.ReactNode,
    animation?: {
        initial: MotionProps['initial'];
        animate: MotionProps['animate'];
        transition?: MotionProps['transition'];
        exit?: MotionProps['exit'];
    };
}

export default function PageTransitionEffect({ children, animation }: PageTransitionEffectProps) {
    const pathname = usePathname();

    // fadeandSlideInFromTop
    const defaultAnimation = {
        initial: { opacity: 0, y: -30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        exit: { }
    };

    const animationEffect = animation || defaultAnimation;

    return (
        // Intially, page is transparent, 20 pixels below its final resting place
        <motion.div
            key={pathname}
            initial={animationEffect.initial}
            animate={animationEffect.animate}
            transition={animationEffect.transition}
            exit={animationEffect.exit}
            >
            {children}
        </motion.div>
    )
}