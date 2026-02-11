'use client'

import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ShadowSoldier } from './shadow-soldier'
import type { DailyQuest } from '@/lib/types'

interface TaskAlertsProps {
  incompleteTasks: DailyQuest[]
  onTaskClick?: (taskId: string) => void
  onDismissAlert?: (id: string) => void
}

export function TaskAlerts({ incompleteTasks, onTaskClick, onDismissAlert }: TaskAlertsProps) {
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set())

  // Generate active alerts based on incomplete tasks only
  const activeAlerts = useMemo(() => {
    const alerts: Array<{
      id: string
      message: string
      taskType: 'quest'
      action?: () => void
    }> = []

    // Quest completion alerts - show up to 2 most urgent tasks
    if (incompleteTasks && incompleteTasks.length > 0) {
      incompleteTasks.slice(0, 2).forEach((task) => {
        alerts.push({
          id: 'quest-' + task.id,
          message: `${task.name} - Earn +${task.xpReward} XP`,
          taskType: 'quest',
          action: () => onTaskClick?.(task.id),
        })
      })
    }

    // Filter dismissed alerts
    return alerts.filter((alert) => !dismissedAlerts.has(alert.id))
  }, [incompleteTasks, dismissedAlerts, onTaskClick])

  const handleDismiss = (id: string) => {
    const newDismissed = new Set(dismissedAlerts)
    newDismissed.add(id)
    setDismissedAlerts(newDismissed)
    onDismissAlert?.(id)
  }

  if (!activeAlerts.length) return null

  return (
    <AnimatePresence>
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {activeAlerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="glass-card border-2 border-primary/50 p-4 bg-primary/10 shadow-lg shadow-primary/30"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-sm font-display text-primary mb-1">SHADOW ALERT</p>
                <p className="text-xs text-text-secondary">{alert.message}</p>
              </div>
              <motion.button
                onClick={() => {
                  alert.action?.()
                  handleDismiss(alert.id)
                }}
                className="px-3 py-1.5 bg-primary/30 hover:bg-primary/50 rounded text-xs font-bold text-primary transition-colors flex-shrink-0"
                whileTap={{ scale: 0.9 }}
              >
                GO
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
