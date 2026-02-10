'use client'

import { useState, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ShadowSoldier } from './shadow-soldier'
import type { GameState } from '@/lib/types'

interface TaskAlertsProps {
  gameState: GameState
  onDismissAlert?: (id: string) => void
}

export function TaskAlerts({ gameState, onDismissAlert }: TaskAlertsProps) {
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set())

  // Generate active alerts based on game state
  const activeAlerts = useMemo(() => {
    const alerts: Array<{
      id: string
      message: string
      taskType: 'quest' | 'habit' | 'nutrition' | 'sleep' | 'review'
      action?: () => void
    }> = []

    // Quest completion alerts
    const incompletQuests = gameState.dailyQuests.filter((q) => !q.completed)
    if (incompletQuests.length > 0) {
      alerts.push({
        id: 'quest-' + incompletQuests[0].id,
        message: `Complete: ${incompletQuests[0].name} - Earn +${incompletQuests[0].xpReward} XP`,
        taskType: 'quest',
      })
    }

    // Habit monitoring alerts
    if (gameState.habits.cigarettes.warningLevel === 'warning') {
      alerts.push({
        id: 'habit-cigarettes',
        message: 'CRITICAL: Excessive cigarette consumption! XP penalty active.',
        taskType: 'habit',
      })
    }

    if (gameState.habits.alcohol.warningLevel === 'warning') {
      alerts.push({
        id: 'habit-alcohol',
        message: 'WARNING: Alcohol consumption exceeding limits. Reduce intake.',
        taskType: 'habit',
      })
    }

    if (gameState.habits.screenTime.warningLevel === 'warning') {
      alerts.push({
        id: 'habit-screentime',
        message: `ALERT: Screen time at ${gameState.habits.screenTime.total}m. Limit: 180m. Step outside!`,
        taskType: 'habit',
      })
    }

    // Nutrition alerts
    const proteinDeficiency =
      gameState.diet.proteinIntake <
      gameState.diet.proteinGoal * 0.5
    if (proteinDeficiency && gameState.diet.meals.length > 0) {
      alerts.push({
        id: 'nutrition-protein',
        message: `Low protein: ${gameState.diet.proteinIntake}g / ${gameState.diet.proteinGoal}g. Add more protein-rich foods.`,
        taskType: 'nutrition',
      })
    }

    // Sleep alerts
    const lastSleep = gameState.sleepLog[gameState.sleepLog.length - 1]
    if (!lastSleep || lastSleep.quality < 2) {
      alerts.push({
        id: 'sleep-quality',
        message: 'Poor sleep quality detected. Prioritize rest for recovery.',
        taskType: 'sleep',
      })
    }

    // Daily review alert
    const today = new Date().toISOString().split('T')[0]
    const todaySummary = gameState.dailySummaries.find(
      (s) => s.date === today
    )
    if (!todaySummary && gameState.dailyQuests.some((q) => q.completed)) {
      alerts.push({
        id: 'daily-review',
        message: 'Complete your daily review to reflect on your progress.',
        taskType: 'review',
      })
    }

    // Filter dismissed alerts
    return alerts.filter((alert) => !dismissedAlerts.has(alert.id))
  }, [gameState, dismissedAlerts])

  const handleDismiss = (id: string) => {
    const newDismissed = new Set(dismissedAlerts)
    newDismissed.add(id)
    setDismissedAlerts(newDismissed)
    onDismissAlert?.(id)
  }

  return (
    <div className="fixed bottom-28 right-4 z-50 space-y-3 max-w-sm">
      <AnimatePresence>
        {activeAlerts.map((alert) => (
          <ShadowSoldier
            key={alert.id}
            id={alert.id}
            message={alert.message}
            taskType={alert.taskType}
            action={alert.action}
            onDismiss={() => handleDismiss(alert.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
