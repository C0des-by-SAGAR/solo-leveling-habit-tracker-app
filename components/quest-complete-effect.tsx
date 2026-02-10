'use client'

import { motion } from 'framer-motion'

interface QuestCompleteEffectProps {
  isVisible: boolean
  questName: string
}

export function QuestCompleteEffect({
  isVisible,
  questName,
}: QuestCompleteEffectProps) {
  if (!isVisible) return null

  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i / 12) * Math.PI * 2,
  }))

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none flex items-center justify-center z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Center burst */}
      <motion.div
        className="absolute text-5xl"
        initial={{ scale: 0 }}
        animate={{
          scale: [0, 1.2, 0.8],
        }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
        }}
      >
        ⚡
      </motion.div>

      {/* Particles */}
      {particles.map((particle) => {
        const distance = 120
        const x = Math.cos(particle.angle) * distance
        const y = Math.sin(particle.angle) * distance

        return (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-primary rounded-full"
            initial={{
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x,
              y,
              opacity: 0,
              scale: 0.5,
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
          />
        )
      })}

      {/* Text popup */}
      <motion.div
        className="absolute text-center"
        initial={{
          scale: 0.5,
          opacity: 0,
          y: 20,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
          delay: 0.1,
        }}
      >
        <p className="text-xs font-display text-success font-bold uppercase tracking-wider">
          Quest Complete!
        </p>
      </motion.div>
    </motion.div>
  )
}
