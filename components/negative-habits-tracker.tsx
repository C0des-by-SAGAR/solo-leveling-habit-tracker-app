'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { NegativeHabit } from '@/lib/types'
import { calculateHabitWarningLevel } from '@/lib/nutrition-db'

interface NegativeHabitsTrackerProps {
  habits: NegativeHabit
  onLogHabit: (type: 'cigarettes' | 'masturbation' | 'alcohol', data: any) => void
  onStreakBroken?: (habit: string) => void
}

export function NegativeHabitsTracker({
  habits,
  onLogHabit,
  onStreakBroken,
}: NegativeHabitsTrackerProps) {
  const [showAnimation, setShowAnimation] = useState<string | null>(null)

  const handleHabitIncrement = (habitType: string) => {
    setShowAnimation(habitType)
    onLogHabit(habitType as any, {})
    setTimeout(() => setShowAnimation(null), 600)
  }

  const cigaretteWarning = calculateHabitWarningLevel(
    'cigarettes',
    habits.cigarettes.count
  )
  const alcoholWarning = calculateHabitWarningLevel(
    'alcohol',
    habits.alcohol.count
  )
  const masturbationWarning = calculateHabitWarningLevel(
    'masturbation',
    habits.masturbation?.count ?? 0
  )

  const getWarningColor = (level: 'safe' | 'caution' | 'warning') => {
    switch (level) {
      case 'safe':
        return 'bg-success/20 border-success/50 text-success'
      case 'caution':
        return 'bg-warning/20 border-warning/50 text-warning'
      case 'warning':
        return 'bg-danger/20 border-danger/50 text-danger'
    }
  }

  return (
    <div className="space-y-4 pb-20">
      {/* System Warnings Alert */}
      {(cigaretteWarning.breakStreak ||
        alcoholWarning.breakStreak ||
        masturbationWarning.breakStreak) && (
        <motion.div
          className="glass-card border-danger/50 bg-danger/10 p-4"
          animate={{ borderColor: ['rgba(239, 68, 68, 0.5)', 'rgba(239, 68, 68, 0.2)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
            <div className="text-sm text-danger space-y-1">
              <p className="font-bold">⚠️ STREAK BREAKING ALERT</p>
              <p className="text-xs text-danger/80">
                Your consistency streak has been broken due to excessive habits.
                XP penalties are active.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Cigarettes */}
      <motion.div
        className={`glass-card p-4 border-2 transition-all ${getWarningColor(cigaretteWarning.level)}`}
        whileHover={{ scale: 1.02 }}
        animate={showAnimation === 'cigarettes' ? { scale: [1, 1.05, 1] } : {}}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-display text-primary">Cigarettes</h3>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-mono-display px-2 py-1 rounded font-bold ${getWarningColor(cigaretteWarning.level)}`}
            >
              {cigaretteWarning.level.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-display text-text-primary">
              {habits.cigarettes.count}
            </div>
            <motion.button
              onClick={() => handleHabitIncrement('cigarettes')}
              className="bg-primary/30 hover:bg-primary/50 p-3 rounded-lg transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <Plus className="w-5 h-5 text-primary" />
            </motion.button>
          </div>
          <p className="text-xs text-text-secondary">
            {cigaretteWarning.message}
          </p>
          {cigaretteWarning.xpPenalty > 0 && (
            <div className="text-xs font-bold text-danger">
              -{cigaretteWarning.xpPenalty} XP Penalty
            </div>
          )}
          {cigaretteWarning.breakStreak && (
            <div className="text-xs font-bold text-danger">
              🔥 Streak Broken
            </div>
          )}
        </div>
      </motion.div>

      {/* Alcohol */}
      <motion.div
        className={`glass-card p-4 border-2 transition-all ${getWarningColor(alcoholWarning.level)}`}
        whileHover={{ scale: 1.02 }}
        animate={showAnimation === 'alcohol' ? { scale: [1, 1.05, 1] } : {}}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-display text-primary">Alcohol</h3>
          <span
            className={`text-xs font-mono-display px-2 py-1 rounded font-bold ${getWarningColor(alcoholWarning.level)}`}
          >
            {alcoholWarning.level.toUpperCase()}
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-display text-text-primary">
              {habits.alcohol.count}
            </div>
            <motion.button
              onClick={() => handleHabitIncrement('alcohol')}
              className="bg-primary/30 hover:bg-primary/50 p-3 rounded-lg transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <Plus className="w-5 h-5 text-primary" />
            </motion.button>
          </div>
          <p className="text-xs text-text-secondary">
            {alcoholWarning.message}
          </p>
          {alcoholWarning.xpPenalty > 0 && (
            <div className="text-xs font-bold text-danger">
              -{alcoholWarning.xpPenalty} XP Penalty
            </div>
          )}
          {alcoholWarning.breakStreak && (
            <div className="text-xs font-bold text-danger">
              🔥 Streak Broken
            </div>
          )}
        </div>
      </motion.div>

      {/* Masturbation */}
      <motion.div
        className={`glass-card p-4 border-2 transition-all ${getWarningColor(masturbationWarning.level)}`}
        whileHover={{ scale: 1.02 }}
        animate={showAnimation === 'masturbation' ? { scale: [1, 1.05, 1] } : {}}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-display text-primary">Masturbation</h3>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-mono-display px-2 py-1 rounded font-bold ${getWarningColor(masturbationWarning.level)}`}
            >
              {masturbationWarning.level.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-display text-text-primary">
              {habits.masturbation?.count ?? 0}
            </div>
            <motion.button
              onClick={() => handleHabitIncrement('masturbation')}
              className="bg-primary/30 hover:bg-primary/50 p-3 rounded-lg transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <Plus className="w-5 h-5 text-primary" />
            </motion.button>
          </div>
          <p className="text-xs text-text-secondary">
            {masturbationWarning.message}
          </p>
          {masturbationWarning.xpPenalty > 0 && (
            <div className="text-xs font-bold text-danger">
              -{masturbationWarning.xpPenalty} XP Penalty
            </div>
          )}
          {masturbationWarning.breakStreak && (
            <div className="text-xs font-bold text-danger">
              🔥 Streak Broken
            </div>
          )}
        </div>
      </motion.div>

      {/* Warning Legend */}
      <div className="glass-card p-4">
        <h4 className="text-xs font-display text-accent mb-3">WARNING LEVELS</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success/70" />
            <div>
              <span className="text-xs font-bold text-success">Safe</span>
              <p className="text-xs text-text-muted">No XP penalties applied</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning/70" />
            <div>
              <span className="text-xs font-bold text-warning">Caution</span>
              <p className="text-xs text-text-muted">Minor XP penalty</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-danger/70" />
            <div>
              <span className="text-xs font-bold text-danger">Warning</span>
              <p className="text-xs text-text-muted">
                Heavy XP penalty + Streak Breaking
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
