'use client'

import { motion } from 'framer-motion'

interface FloatingXPProps {
  amount: number
  x: number
  y: number
}

export function FloatingXP({ amount, x, y }: FloatingXPProps) {
  return (
    <motion.div
      className="fixed pointer-events-none font-mono-display font-bold text-primary text-lg"
      initial={{
        x,
        y,
        opacity: 1,
        scale: 1,
      }}
      animate={{
        y: y - 100,
        opacity: 0,
        scale: 1.5,
      }}
      transition={{
        duration: 1.5,
        ease: 'easeOut',
      }}
    >
      +{amount} XP
    </motion.div>
  )
}
