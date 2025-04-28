export const fadeandSlideInFromTop = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
}

export const fadeIn = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1},
    transition: { duration: 0.5, ease: 'easeOut'}
}