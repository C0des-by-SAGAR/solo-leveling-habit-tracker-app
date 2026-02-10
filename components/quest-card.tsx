'use client'

import { motion } from 'framer-motion'
import { Checkbox } from '@/components/ui/checkbox'
import { type DailyQuest } from '@/lib/types'

interface QuestCardProps {
  quest: DailyQuest
  onComplete: () => void
}

export function QuestCard({ quest, onComplete }: QuestCardProps) {
  const handleComplete = () => {
    onComplete()
  }

  return (
    <motion.div
      className={`glass-card p-4 space-y-3 transition-all ${
        quest.completed ? 'opacity-60 bg-opacity-40' : ''
      }`}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="flex items-start gap-3">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Checkbox
            checked={quest.completed}
            onChange={handleComplete}
            className="mt-1"
          />
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{quest.icon}</span>
            <h3 className="font-display font-semibold text-text-primary truncate">
              {quest.name}
            </h3>
          </div>
          <p className="text-xs text-text-secondary mb-2">
            {quest.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex gap-2 text-xs">
              <span className="px-2 py-1 rounded bg-primary/20 text-primary font-mono-display">
                +{quest.xpReward} XP
              </span>
              <span className="px-2 py-1 rounded bg-accent/20 text-accent font-mono-display">
                +{quest.statIncrease} {quest.statAffected}
              </span>
            </div>
          </div>
        </div>

        {quest.completed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-success text-xl"
          >
            ✓
          </motion.div>
        )}
      </div>

      {quest.category === 'core' && (
        <div className="text-xs text-warning px-2 py-1 rounded bg-warning/10 border border-warning/30">
          ⚠️ Core Quest - Cannot skip without penalty
        </div>
      )}
    </motion.div>
  )
}
