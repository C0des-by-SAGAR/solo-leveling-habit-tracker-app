'use client'

import { motion } from 'framer-motion'
import { type DailyVitals } from '@/lib/types'

interface VitalsDisplayProps {
  vitals: DailyVitals
}

export function VitalsDisplay({ vitals }: VitalsDisplayProps) {
  const getStatusColor = (value: number) => {
    if (value >= 70) return 'from-success/60 to-success'
    if (value >= 40) return 'from-warning/60 to-warning'
    return 'from-danger/60 to-danger'
  }

  const vitalsData = [
    { label: 'HP', value: vitals.hp, icon: '❤️' },
    { label: 'MP', value: vitals.mp, icon: '⚡' },
    { label: 'FATIGUE', value: 100 - vitals.fatigue, icon: '😴' },
  ]

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="text-sm font-display text-primary">VITALS</h3>

      <div className="space-y-3">
        {vitalsData.map((vital) => (
          <div key={vital.label} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono-display text-text-secondary">
                {vital.icon} {vital.label}
              </span>
              <span className="text-xs font-mono-display text-text-muted">
                {Math.round(vital.value)}%
              </span>
            </div>
            <div className="relative h-2 bg-bg-secondary rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${getStatusColor(vital.value)}`}
                initial={{ width: 0 }}
                animate={{ width: `${vital.value}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{
                  boxShadow:
                    vital.value < 30
                      ? '0 0 15px rgba(239, 68, 68, 0.8)'
                      : '0 0 10px rgba(168, 85, 247, 0.5)',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-primary/20 space-y-2">
        <h4 className="text-xs font-display text-text-secondary">TODAY'S MOOD</h4>
        <div className="flex justify-between text-sm">
          <div className="text-center flex-1">
            <div className="text-2xl mb-1">⚡</div>
            <p className="text-xs text-text-muted">{vitals.energyRating}/10</p>
          </div>
          <div className="text-center flex-1">
            <div className="text-2xl mb-1">🧠</div>
            <p className="text-xs text-text-muted">{vitals.focusRating}/10</p>
          </div>
          <div className="text-center flex-1">
            <div className="text-2xl mb-1">😊</div>
            <p className="text-xs text-text-muted">{vitals.moodRating}/10</p>
          </div>
        </div>
      </div>
    </div>
  )
}
