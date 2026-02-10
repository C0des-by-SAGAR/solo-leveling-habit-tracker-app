'use client'

import { motion } from 'framer-motion'
import { type Stats } from '@/lib/types'

interface StatsEvolutionProps {
  stats: Stats
  increase?: Partial<Stats>
}

const STAT_LABELS: Record<keyof Stats, { label: string; icon: string }> = {
  strength: { label: 'STR', icon: '💪' },
  intelligence: { label: 'INT', icon: '🧠' },
  discipline: { label: 'DIS', icon: '🛡️' },
  creativity: { label: 'CRT', icon: '🎨' },
  consistency: { label: 'CON', icon: '🔥' },
}

export function StatsEvolution({ stats, increase }: StatsEvolutionProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  }

  return (
    <motion.div
      className="glass-card p-6 space-y-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <h3 className="text-sm font-display text-primary mb-4">STATS</h3>

      <div className="space-y-3">
        {(Object.keys(stats) as Array<keyof Stats>).map((statKey) => {
          const value = stats[statKey]
          const inc = increase?.[statKey]
          const meta = STAT_LABELS[statKey]

          return (
            <motion.div key={statKey} variants={item} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono-display text-text-secondary">
                  {meta.icon} {meta.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono-display font-bold text-text-primary">
                    {value}
                  </span>
                  {inc && inc > 0 && (
                    <motion.span
                      className="text-xs font-display text-success"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      +{inc}
                    </motion.span>
                  )}
                </div>
              </div>

              <div className="relative h-2 bg-bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-primary-glow"
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.min((value / 100) * 100, 100)}%` }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  style={{
                    boxShadow: '0 0 10px rgba(168, 85, 247, 0.6)',
                  }}
                />
              </div>
            </motion.div>
          )
        })}
      </div>

      {increase && Object.values(increase).some((v) => v && v > 0) && (
        <motion.div
          className="pt-4 border-t border-primary/20 text-xs text-center text-success"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Stats increased!
        </motion.div>
      )}
    </motion.div>
  )
}
