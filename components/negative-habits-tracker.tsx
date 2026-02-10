'use client'

import { motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { NegativeHabit } from '@/lib/types'

interface NegativeHabitsTrackerProps {
  habits: NegativeHabit
  onLogHabit: (type: 'cigarettes' | 'masturbation' | 'alcohol' | 'screenTime', data: any) => void
}

export function NegativeHabitsTracker({ habits, onLogHabit }: NegativeHabitsTrackerProps) {
  const getHabitStatus = (count: number, thresholds: { yellow: number; red: number }) => {
    if (count <= thresholds.yellow) return { color: 'bg-success/50', label: 'Safe', textColor: 'text-success' }
    if (count <= thresholds.red) return { color: 'bg-warning/50', label: 'Warning', textColor: 'text-warning' }
    return { color: 'bg-danger/50', label: 'Excess', textColor: 'text-danger' }
  }

  const cigaretteStatus = getHabitStatus(habits.cigarettes.count, { yellow: 2, red: 4 })
  const masturbationStatus = getHabitStatus(habits.masturbation.count, { yellow: 2, red: 4 })
  const alcoholStatus = getHabitStatus(habits.alcohol.count, { yellow: 1, red: 3 })
  const screenTimeTotal = habits.screenTime.instagram + habits.screenTime.youtube + habits.screenTime.netflix + habits.screenTime.other
  const screenTimeStatus = getHabitStatus(screenTimeTotal, { yellow: 120, red: 240 })

  return (
    <div className="space-y-4 pb-20">
      {/* Cigarettes */}
      <motion.div className="glass-card p-4" whileHover={{ scale: 1.02 }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-display text-primary">Cigarettes</h3>
          <span className={`text-xs font-mono-display px-2 py-1 rounded ${cigaretteStatus.color} ${cigaretteStatus.textColor}`}>
            {cigaretteStatus.label}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-3xl font-display text-text-primary">{habits.cigarettes.count}</div>
          <div className="flex-1 space-y-1">
            <div className="text-xs text-text-muted">Today's count</div>
            {habits.cigarettes.xpPenalty > 0 && (
              <div className="text-xs text-danger">-{habits.cigarettes.xpPenalty} XP</div>
            )}
          </div>
          <Button
            onClick={() => onLogHabit('cigarettes', {})}
            size="sm"
            className="bg-primary/20 hover:bg-primary/30"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* Masturbation */}
      <motion.div className="glass-card p-4" whileHover={{ scale: 1.02 }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-display text-primary">Masturbation</h3>
          <span className={`text-xs font-mono-display px-2 py-1 rounded ${masturbationStatus.color} ${masturbationStatus.textColor}`}>
            {masturbationStatus.label}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-3xl font-display text-text-primary">{habits.masturbation.count}</div>
          <div className="flex-1 space-y-1">
            <div className="text-xs text-text-muted">Today's count</div>
            {habits.masturbation.triggers.length > 0 && (
              <div className="text-xs text-text-secondary">Triggers: {habits.masturbation.triggers.join(', ')}</div>
            )}
          </div>
          <Button
            onClick={() => onLogHabit('masturbation', {})}
            size="sm"
            className="bg-primary/20 hover:bg-primary/30"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* Alcohol */}
      <motion.div className="glass-card p-4" whileHover={{ scale: 1.02 }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-display text-primary">Alcohol</h3>
          <span className={`text-xs font-mono-display px-2 py-1 rounded ${alcoholStatus.color} ${alcoholStatus.textColor}`}>
            {alcoholStatus.label}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-3xl font-display text-text-primary">{habits.alcohol.count}</div>
          <div className="flex-1 space-y-1">
            <div className="text-xs text-text-muted">Drinks today</div>
            {habits.alcohol.xpPenalty > 0 && (
              <div className="text-xs text-danger">-{habits.alcohol.xpPenalty} XP</div>
            )}
          </div>
          <Button
            onClick={() => onLogHabit('alcohol', {})}
            size="sm"
            className="bg-primary/20 hover:bg-primary/30"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* Screen Time */}
      <motion.div className="glass-card p-4" whileHover={{ scale: 1.02 }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-display text-primary">Screen Time</h3>
          <span className={`text-xs font-mono-display px-2 py-1 rounded ${screenTimeStatus.color} ${screenTimeStatus.textColor}`}>
            {screenTimeStatus.label}
          </span>
        </div>
        <div className="space-y-2 mb-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-secondary">Instagram</span>
            <span className="text-sm font-mono-display text-accent">{habits.screenTime.instagram}m</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-secondary">YouTube</span>
            <span className="text-sm font-mono-display text-accent">{habits.screenTime.youtube}m</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-secondary">Netflix</span>
            <span className="text-sm font-mono-display text-accent">{habits.screenTime.netflix}m</span>
          </div>
          <div className="border-t border-primary/20 pt-2 flex justify-between items-center">
            <span className="text-xs text-text-secondary font-bold">Total</span>
            <span className="text-sm font-mono-display text-primary font-bold">{screenTimeTotal}m</span>
          </div>
        </div>
        {habits.screenTime.xpPenalty > 0 && (
          <div className="text-xs text-danger mb-3">-{habits.screenTime.xpPenalty} XP</div>
        )}
      </motion.div>

      {/* Warning Legend */}
      <div className="glass-card p-4">
        <h4 className="text-xs font-display text-accent mb-3">WARNING LEVELS</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success/70" />
            <span className="text-xs text-text-muted">Safe - No XP penalty</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-warning/70" />
            <span className="text-xs text-text-muted">Warning - Approaching limits</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-danger/70" />
            <span className="text-xs text-text-muted">Excess - XP penalty active</span>
          </div>
        </div>
      </div>
    </div>
  )
}
