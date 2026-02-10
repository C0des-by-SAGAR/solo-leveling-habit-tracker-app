'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface IntroScreenProps {
  onComplete: () => void
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const [showInput, setShowInput] = useState(false)
  const [playerName, setPlayerName] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInput(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleStartGame = () => {
    if (playerName.trim()) {
      onComplete()
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-bg-primary flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Main Title */}
      <motion.div
        className="text-center space-y-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="text-6xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ⚔️
        </motion.div>

        <div className="space-y-2">
          <motion.h1
            className="text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            SOLO LEVELING
          </motion.h1>

          <motion.p
            className="text-text-secondary text-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            SYSTEM INITIALIZED
          </motion.p>
        </div>
      </motion.div>

      {/* Loading Bar */}
      <motion.div
        className="w-64 h-1 bg-bg-secondary rounded-full overflow-hidden mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-primary-glow"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Status Text */}
      <motion.p
        className="text-text-muted text-xs font-mono-display"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        LOADING HUNTER PROFILE...
      </motion.p>

      {/* Input Section */}
      {showInput && (
        <motion.div
          className="mt-12 w-full max-w-sm px-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-6">
            <p className="text-text-secondary text-sm">
              What is your hunter name?
            </p>
          </div>

          <div className="glass-card p-4 space-y-3">
            <input
              type="text"
              placeholder="Enter your name..."
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleStartGame()
              }}
              className="w-full bg-bg-secondary border border-primary/30 rounded-lg px-4 py-2 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-primary/50"
              autoFocus
            />

            <motion.button
              onClick={handleStartGame}
              disabled={!playerName.trim()}
              className="w-full py-2 px-4 bg-gradient-to-r from-primary to-primary-glow text-white font-display font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              BEGIN JOURNEY
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
