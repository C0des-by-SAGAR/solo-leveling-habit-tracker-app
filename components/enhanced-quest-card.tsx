'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { DailyQuest } from '@/lib/types'

interface EnhancedQuestCardProps {
  quest: DailyQuest
  onComplete: (questId: string) => void
  onToggleSubGoal?: (questId: string, subGoalId: string) => void
}

export function EnhancedQuestCard({
  quest,
  onComplete,
  onToggleSubGoal,
}: EnhancedQuestCardProps) {
  const subGoals = quest.subGoals || []
  const completedSubGoals = subGoals.filter((sg) => sg.completed).length
  const subGoalProgress = subGoals.length > 0 ? (completedSubGoals / subGoals.length) * 100 : 0

  const getRarityColor = (category: string) => {
    switch (category) {
      case 'core':
        return 'from-primary to-primary/60'
      case 'optional':
        return 'from-accent to-accent/60'
      default:
        return 'from-text-secondary to-text-secondary/60'
    }
  }

  return (
    <motion.div
      className={`glass-card p-4 border-l-4 ${
        quest.completed ? 'border-l-success opacity-75' : 'border-l-primary'
      }`}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onComplete(quest.id)}
          className="mt-1 flex-shrink-0 focus:outline-none"
        >
          {quest.completed ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <CheckCircle2 className="w-6 h-6 text-success" />
            </motion.div>
          ) : (
            <Circle className="w-6 h-6 text-text-secondary hover:text-primary transition-colors" />
          )}
        </button>

        {/* Quest Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-display text-text-primary">{quest.name}</h3>
              <p className="text-xs text-text-muted mt-0.5">{quest.description}</p>
            </div>
            <div className="flex-shrink-0 text-lg">{quest.icon}</div>
          </div>

          {/* Sub Goals */}
          {subGoals.length > 0 && (
            <motion.div
              className="mt-3 space-y-2"
              initial={false}
              animate={{ opacity: 1 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-text-secondary font-display">
                  OBJECTIVE
                </span>
                <span className="text-xs font-mono-display text-accent">
                  {completedSubGoals}/{subGoals.length}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-primary-glow"
                  animate={{ width: `${subGoalProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Sub Goal Items */}
              <div className="space-y-1">
                {subGoals.map((subGoal) => (
                  <div
                    key={subGoal.id}
                    className="flex items-center gap-2 p-2 rounded-lg bg-bg-secondary/30 cursor-pointer hover:bg-bg-secondary/50 transition-colors"
                    onClick={() => onToggleSubGoal?.(quest.id, subGoal.id)}
                  >
                    {subGoal.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-text-muted flex-shrink-0" />
                    )}
                    <span
                      className={`text-xs ${
                        subGoal.completed
                          ? 'text-text-muted line-through'
                          : 'text-text-secondary'
                      }`}
                    >
                      {subGoal.description}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Rewards */}
          <div className="mt-3 flex items-center justify-between pt-3 border-t border-primary/10">
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-muted">Rewards:</span>
              <span className="text-xs font-mono-display text-primary">
                +{quest.xpReward} XP
              </span>
              <span className="text-xs text-text-muted">|</span>
              <span className="text-xs font-mono-display text-accent">
                +{quest.statIncrease}{' '}
                {quest.statAffected[0].toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Warning for failed quests */}
      {!quest.completed && (
        <motion.div
          className="mt-3 p-2 text-xs text-warning bg-warning/10 rounded-lg border border-warning/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          WARNING: Failure to complete daily quests results in XP penalty.
        </motion.div>
      )}
    </motion.div>
  )
}
