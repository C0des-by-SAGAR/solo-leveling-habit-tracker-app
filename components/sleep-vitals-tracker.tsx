'use client'

import { motion } from 'framer-motion'
import { Sliders } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { DailyVitals, DailySleep } from '@/lib/types'

interface SleepVitalsTrackerProps {
  vitals: DailyVitals
  sleepLog: DailySleep[]
  onLogSleep: (bedTime: string, wakeTime: string, quality: 1 | 2 | 3) => void
  onUpdateVitals: (energyRating: number, focusRating: number, moodRating: number) => void
}

export function SleepVitalsTracker({
  vitals,
  sleepLog,
  onLogSleep,
  onUpdateVitals,
}: SleepVitalsTrackerProps) {
  const todaySleep = sleepLog.find((s) => s.date === new Date().toISOString().split('T')[0])
  const averageSleep = sleepLog.length > 0 ? (sleepLog.reduce((sum, s) => sum + s.duration, 0) / sleepLog.length).toFixed(1) : 0

  const getSleepQualityIcon = (quality: 1 | 2 | 3) => {
    switch (quality) {
      case 1:
        return '😴'
      case 2:
        return '💤'
      case 3:
        return '⭐'
      default:
        return '😴'
    }
  }

  return (
    <div className="space-y-4 pb-20">
      {/* Energy/Focus/Mood Sliders */}
      <motion.div className="glass-card p-4" whileHover={{ scale: 1.02 }}>
        <h3 className="text-sm font-display text-primary mb-4 flex items-center gap-2">
          <Sliders className="w-4 h-4" />
          Daily Vitals
        </h3>

        <div className="space-y-4">
          {/* Energy Level */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-text-secondary">Energy Level</label>
              <span className="text-sm font-mono-display text-primary">{vitals.energyRating}/10</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={vitals.energyRating}
              onChange={(e) => onUpdateVitals(parseInt(e.target.value), vitals.focusRating, vitals.moodRating)}
              className="w-full h-2 bg-bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Focus Level */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-text-secondary">Focus Level</label>
              <span className="text-sm font-mono-display text-accent">{vitals.focusRating}/10</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={vitals.focusRating}
              onChange={(e) => onUpdateVitals(vitals.energyRating, parseInt(e.target.value), vitals.moodRating)}
              className="w-full h-2 bg-bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
            />
          </div>

          {/* Mood Rating */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-text-secondary">Mood Rating</label>
              <span className="text-sm font-mono-display text-success">{vitals.moodRating}/10</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={vitals.moodRating}
              onChange={(e) => onUpdateVitals(vitals.energyRating, vitals.focusRating, parseInt(e.target.value))}
              className="w-full h-2 bg-bg-secondary rounded-lg appearance-none cursor-pointer accent-success"
            />
          </div>
        </div>
      </motion.div>

      {/* Sleep Tracking */}
      <motion.div className="glass-card p-4" whileHover={{ scale: 1.02 }}>
        <h3 className="text-sm font-display text-primary mb-4">Sleep Quality</h3>

        {todaySleep ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-bg-secondary/50 p-3 rounded-lg">
                <div className="text-xs text-text-muted mb-1">Bed Time</div>
                <div className="text-lg font-mono-display text-accent">{todaySleep.bedTime}</div>
              </div>
              <div className="bg-bg-secondary/50 p-3 rounded-lg">
                <div className="text-xs text-text-muted mb-1">Wake Time</div>
                <div className="text-lg font-mono-display text-primary">{todaySleep.wakeTime}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-bg-secondary/50 p-3 rounded-lg">
                <div className="text-xs text-text-muted mb-1">Duration</div>
                <div className="text-lg font-mono-display text-accent">{todaySleep.duration}h</div>
              </div>
              <div className="bg-bg-secondary/50 p-3 rounded-lg">
                <div className="text-xs text-text-muted mb-1">Quality</div>
                <div className="text-xl">{getSleepQualityIcon(todaySleep.quality)}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-xs text-text-muted mb-3">No sleep logged today</p>
          </div>
        )}
      </motion.div>

      {/* Sleep History */}
      <motion.div className="glass-card p-4" whileHover={{ scale: 1.02 }}>
        <h3 className="text-sm font-display text-accent mb-3">Sleep History (Last 7 Days)</h3>

        {sleepLog.length > 0 ? (
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {sleepLog.slice(-7).reverse().map((sleep) => (
              <div key={sleep.date} className="flex items-center justify-between text-xs p-2 bg-bg-secondary/30 rounded">
                <span className="text-text-muted">{new Date(sleep.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                <div className="flex items-center gap-2">
                  <span className="text-text-secondary">{sleep.duration}h</span>
                  <span className="text-lg">{getSleepQualityIcon(sleep.quality)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-text-muted text-center py-2">No sleep history yet</p>
        )}

        {sleepLog.length > 0 && (
          <div className="mt-3 pt-3 border-t border-primary/20">
            <div className="text-xs text-text-muted text-center">
              Avg: <span className="text-accent font-mono-display">{averageSleep}h</span>
            </div>
          </div>
        )}
      </motion.div>

      {/* HP/MP/Fatigue Bars */}
      <motion.div className="glass-card p-4" whileHover={{ scale: 1.02 }}>
        <h3 className="text-sm font-display text-primary mb-4">Battle Vitals</h3>

        <div className="space-y-3">
          {/* HP Bar */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-text-secondary">HP (Health Points)</span>
              <span className="text-xs font-mono-display text-success">{vitals.hp}/100</span>
            </div>
            <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-success to-success/70"
                animate={{ width: `${vitals.hp}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* MP Bar */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-text-secondary">MP (Mana Points)</span>
              <span className="text-xs font-mono-display text-accent">{vitals.mp}/100</span>
            </div>
            <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-accent/70"
                animate={{ width: `${vitals.mp}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Fatigue Bar */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-text-secondary">Fatigue (Lower is Better)</span>
              <span className="text-xs font-mono-display text-warning">{vitals.fatigue}/100</span>
            </div>
            <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-warning to-danger"
                animate={{ width: `${vitals.fatigue}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
