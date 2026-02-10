'use client'

import { motion } from 'framer-motion'

interface XPBarProps {
  current: number
  max: number
  label?: string
  showPercentage?: boolean
}

export function XPBar({
  current,
  max,
  label = 'XP',
  showPercentage = true,
}: XPBarProps) {
  const percentage = Math.min((current / max) * 100, 100)

  return (
    <div className="w-full space-y-2">
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-mono-display text-text-secondary">
            {label}
          </span>
          {showPercentage && (
            <span className="text-xs font-mono-display text-text-muted">
              {current}/{max}
            </span>
          )}
        </div>
      )}
      <div className="relative h-2 bg-bg-secondary rounded-full overflow-hidden border border-primary/20">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
          }}
          style={{
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.8)',
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>
    </div>
  )
}
