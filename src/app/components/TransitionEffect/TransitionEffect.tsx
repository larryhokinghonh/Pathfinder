'use client';
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function TransitionEffect({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        // Intially, page is transparent, 20 pixels below its final resting place
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            >
            {children}
        </motion.div>
    )
}