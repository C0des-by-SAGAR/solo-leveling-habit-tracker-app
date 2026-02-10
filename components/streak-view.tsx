'use client'

import { motion } from 'framer-motion'
import { type StreakData } from '@/lib/types'

interface StreakViewProps {
  streak: StreakData
}

export function StreakView({ streak }: StreakViewProps) {
  const days = Array.from({ length: 35 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (34 - i))
    return date
  })

  const getStatusColor = (completionRate: number | undefined) => {
    if (!completionRate) return 'bg-bg-secondary'
    if (completionRate >= 80) return 'bg-success/70'
    if (completionRate >= 50) return 'bg-warning/70'
    return 'bg-danger/70'
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Streak Stats */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div
          className="glass-card p-4 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-display text-primary font-bold">
            {streak.current}
          </div>
          <p className="text-xs text-text-secondary mt-1">Current Streak</p>
        </motion.div>

        <motion.div
          className="glass-card p-4 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-display text-accent font-bold">
            {streak.longest}
          </div>
          <p className="text-xs text-text-secondary mt-1">Longest Streak</p>
        </motion.div>

        <motion.div
          className="glass-card p-4 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-display text-success font-bold">
            {streak.history.filter((h) => h.active).length}
          </div>
          <p className="text-xs text-text-secondary mt-1">Active Days</p>
        </motion.div>
      </div>

      {/* Calendar Heatmap */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-display text-primary mb-4">
          ACTIVITY HEATMAP
        </h3>

        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            const dateStr = date.toISOString().split('T')[0]
            const history = streak.history.find((h) => h.date === dateStr)
            const color = getStatusColor(history?.completionRate)

            return (
              <motion.div
                key={index}
                className={`aspect-square rounded-md ${color} border border-primary/20 cursor-pointer`}
                whileHover={{ scale: 1.2 }}
                title={dateStr}
              >
                <div className="w-full h-full flex items-center justify-center text-xs font-mono-display text-text-muted">
                  {date.getDate()}
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-4 flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-bg-secondary" />
            <span className="text-text-muted">No Data</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-danger/70" />
            <span className="text-text-muted">{'<50%'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-warning/70" />
            <span className="text-text-muted">50-79%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-success/70" />
            <span className="text-text-muted">80%+</span>
          </div>
        </div>
      </div>
    </div>
  )
}
