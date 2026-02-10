'use client'

import { motion } from 'framer-motion'
import { type HunterProfile } from '@/lib/types'

interface LevelUpModalProps {
  profile: HunterProfile
  isOpen: boolean
  onClose: () => void
  xpGained: number
}

export function LevelUpModal({
  profile,
  isOpen,
  onClose,
  xpGained,
}: LevelUpModalProps) {
  if (!isOpen) return null

  const isShadowMonarch = profile.level === 60
  const hasNewTitle =
    profile.level % 10 === 0 || profile.level === 60

  if (isShadowMonarch) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Void Background */}
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            background:
              'radial-gradient(circle, #000000 0%, #0a0a0f 100%)',
          }}
          transition={{ duration: 1.5 }}
        />

        {/* Purple Shadows */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-96 h-96 rounded-full bg-purple-600"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 3,
              opacity: [0, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              delay: 1.5,
              ease: 'easeOut',
            }}
            style={{
              filter: 'blur(80px)',
            }}
          />
        </motion.div>

        {/* Arise Text */}
        <motion.div
          className="absolute z-20 text-center"
          initial={{ scale: 0.5, opacity: 0, filter: 'blur(10px)' }}
          animate={{
            scale: [0.5, 1.3, 1],
            opacity: [0, 1, 1],
            filter: 'blur(0px)',
          }}
          transition={{
            duration: 2,
            delay: 3,
            times: [0, 0.6, 1],
          }}
        >
          <h1 className="text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
            ARISE
          </h1>
        </motion.div>

        {/* Title Reveal */}
        <motion.div
          className="absolute z-20 bottom-32 text-center space-y-2"
          initial={{ y: 30, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1.5,
            delay: 4.5,
          }}
        >
          <h2 className="text-4xl font-display font-bold text-purple-400">
            THE SHADOW MONARCH
          </h2>
          <p className="text-lg text-purple-300 italic">
            &quot;Arise&quot;
          </p>
        </motion.div>

        {/* Close Overlay */}
        <motion.button
          className="absolute inset-0 z-10 cursor-default"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 6 }}
        />
      </motion.div>
    )
  }

  if (hasNewTitle) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative z-20 text-center space-y-6 px-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl font-display font-black text-primary">
              LEVEL UP
            </h1>
            <p className="text-3xl font-display font-bold text-text-primary mt-2">
              Level {profile.level}
            </p>
          </motion.div>

          <motion.div
            className="h-1 w-32 bg-gradient-to-r from-primary to-accent mx-auto"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <p className="text-sm text-text-secondary uppercase tracking-widest">
              NEW TITLE ACQUIRED
            </p>
          </motion.div>

          <motion.div
            className="glass-card p-6 space-y-2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <h2 className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow">
              {profile.title}
            </h2>
            <p className="text-lg text-text-secondary italic">
              &quot;{profile.titleSubtitle}&quot;
            </p>
          </motion.div>

          <motion.p
            className="text-sm text-text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            +{xpGained} XP | Rank: {profile.rank}
          </motion.p>
        </motion.div>
      </motion.div>
    )
  }

  // Standard Level Up
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative z-20 text-center space-y-4 px-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
        exit={{
          scale: 1.2,
          opacity: 0,
          transition: { duration: 0.3, delay: 1.5 },
        }}
      >
        <h1 className="text-5xl font-display font-black text-primary">
          LEVEL UP
        </h1>
        <p className="text-3xl font-display font-bold text-text-primary">
          Level {profile.level}
        </p>
        <p className="text-sm text-text-secondary">
          +{xpGained} XP | Rank: {profile.rank}
        </p>
      </motion.div>
    </motion.div>
  )
}
