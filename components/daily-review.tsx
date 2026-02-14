'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { GameState } from '@/lib/types'

interface DailyReviewProps {
  gameState: GameState
  onSubmitReview: (oneWin: string) => void
}

export function DailyReview({ gameState, onSubmitReview }: DailyReviewProps) {
  const [oneWin, setOneWin] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const completedQuests = gameState.dailyQuests.filter((q) => q.completed).length
  const totalQuests = gameState.dailyQuests.length
  const questCompletionRate = (completedQuests / totalQuests) * 100

  const calculateDailyXP = () => {
    let total = 0
    gameState.dailyQuests.forEach((q) => {
      if (q.completed) total += q.xpReward
    })
    gameState.workouts.forEach((w) => {
      if (w.completed) total += w.xpGained
    })
    return total
  }

  const calculateDailyPenalties = () => {
    let total = 0
    total += gameState.habits.cigarettes.xpPenalty
    total += gameState.habits.alcohol.xpPenalty
    total += gameState.habits.masturbation.xpPenalty
    return total
  }

  const dailyXPGained = calculateDailyXP()
  const dailyPenalties = calculateDailyPenalties()
  const netXP = dailyXPGained - dailyPenalties

  const handleSubmit = () => {
    if (oneWin.trim()) {
      onSubmitReview(oneWin)
      setSubmitted(true)
      setTimeout(() => {
        setOneWin('')
        setSubmitted(false)
      }, 2000)
    }
  }

  return (
    <div className="space-y-4 pb-20">
      {/* Quest Completion */}
      <motion.div className="glass-card p-4" whileHover={{ scale: 1.02 }}>
        <h3 className="text-sm font-display text-primary mb-4">Quest Summary</h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-text-secondary">Quests Completed</span>
            <span className="text-xl font-display text-primary">
              {completedQuests}/{totalQuests}
            </span>
          </div>

          <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-primary-glow"
              animate={{ width: `${questCompletionRate}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>

          <div className="text-xs text-text-muted text-center">
            {Math.round(questCompletionRate)}% Complete
          </div>
        </div>
      </motion.div>

      {/* XP Breakdown */}
      <motion.div className="glass-card p-4" whileHover={{ scale: 1.02 }}>
        <h3 className="text-sm font-display text-accent mb-4">Daily XP Report</h3>

        <div className="space-y-3">
          {/* Gained */}
          <div className="flex items-center justify-between p-2 bg-success/10 rounded-lg border border-success/20">
            <span className="text-xs text-text-secondary">XP Gained</span>
            <span className="text-sm font-mono-display text-success">+{dailyXPGained}</span>
          </div>

          {/* Penalties */}
          {dailyPenalties > 0 && (
            <div className="flex items-center justify-between p-2 bg-danger/10 rounded-lg border border-danger/20">
              <span className="text-xs text-text-secondary">XP Penalties</span>
              <span className="text-sm font-mono-display text-danger">-{dailyPenalties}</span>
            </div>
          )}

          {/* Net XP */}
          <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/30">
            <span className="text-sm font-display text-primary">NET XP</span>
            <span className={`text-lg font-mono-display ${netXP > 0 ? 'text-success' : 'text-danger'}`}>
              {netXP > 0 ? '+' : ''}{netXP}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Stats Gained */}
      <motion.div className="glass-card p-4" whileHover={{ scale: 1.02 }}>
        <h3 className="text-sm font-display text-primary mb-3">Stats Increased</h3>

        <div className="grid grid-cols-2 gap-2">
          {Object.entries(gameState.stats).map(([stat, value]) => (
            <div key={stat} className="p-2 bg-bg-secondary/50 rounded text-center">
              <div className="text-xs text-text-muted capitalize mb-1">{stat}</div>
              <div className="text-lg font-display text-accent">{value}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* One Win Reflection */}
      <motion.div className="glass-card p-4" whileHover={{ scale: 1.02 }}>
        <h3 className="text-sm font-display text-primary mb-3 flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          One Win Today
        </h3>

        <div className="space-y-3">
          <textarea
            value={oneWin}
            onChange={(e) => setOneWin(e.target.value)}
            placeholder="What was your single biggest achievement today? Write it here..."
            maxLength={200}
            className="w-full h-20 px-3 py-2 text-xs rounded-lg bg-bg-secondary border border-primary/20 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary resize-none"
          />

          <div className="flex justify-between items-center">
            <span className="text-xs text-text-muted">{oneWin.length}/200</span>
            <Button
              onClick={handleSubmit}
              disabled={!oneWin.trim()}
              className="flex items-center gap-2"
            >
              <Send className="w-3 h-3" />
              Submit
            </Button>
          </div>

          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-2 bg-success/10 text-success text-xs rounded border border-success/20 text-center"
            >
              Win recorded! Keep crushing it!
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* System Warnings */}
      <motion.div className="glass-card p-4" whileHover={{ scale: 1.02 }}>
        <h3 className="text-sm font-display text-warning mb-3">System Warnings</h3>

        <div className="space-y-2">
          {gameState.habits.cigarettes.count > 2 && (
            <div className="text-xs text-warning p-2 bg-warning/10 rounded border border-warning/20">
              Cigarette consumption exceeds safe levels
            </div>
          )}

          {gameState.habits.alcohol.count > 1 && (
            <div className="text-xs text-warning p-2 bg-warning/10 rounded border border-warning/20">
              Alcohol intake approaching excess threshold
            </div>
          )}

          {gameState.habits.masturbation.count > 1 && (
            <div className="text-xs text-warning p-2 bg-warning/10 rounded border border-warning/20">
              Masturbation habit above caution threshold
            </div>
          )}

          {completedQuests < totalQuests / 2 && (
            <div className="text-xs text-danger p-2 bg-danger/10 rounded border border-danger/20">
              Below 50% quest completion - Streak at risk!
            </div>
          )}

          {completedQuests === totalQuests && (
            <div className="text-xs text-success p-2 bg-success/10 rounded border border-success/20 text-center font-bold">
              Perfect Day! All quests completed!
            </div>
          )}
        </div>
      </motion.div>

      {/* Level & Rank Info */}
      <motion.div className="glass-card p-4" whileHover={{ scale: 1.02 }}>
        <h3 className="text-sm font-display text-accent mb-3">Progression</h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-bg-secondary/50 rounded">
            <div className="text-xs text-text-muted mb-1">Level</div>
            <div className="text-2xl font-display text-primary">{gameState.profile.level}</div>
          </div>
          <div className="text-center p-2 bg-bg-secondary/50 rounded">
            <div className="text-xs text-text-muted mb-1">Rank</div>
            <div className="text-2xl font-display text-accent">{gameState.profile.rank}</div>
          </div>
        </div>

        <p className="text-xs text-text-muted text-center mt-3">
          {gameState.profile.title} - {gameState.profile.titleSubtitle}
        </p>
      </motion.div>
    </div>
  )
}
