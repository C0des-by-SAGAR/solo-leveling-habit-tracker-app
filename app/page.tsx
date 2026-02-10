'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameState } from '@/hooks/use-game-state'
import { BottomNav } from '@/components/bottom-nav'
import { ProfileHeader } from '@/components/profile-header'
import { VitalsDisplay } from '@/components/vitals-display'
import { StatRadar } from '@/components/stat-radar'
import { QuestCard } from '@/components/quest-card'
import { SkillsGrid } from '@/components/skills-grid'
import { StreakView } from '@/components/streak-view'
import { LevelUpModal } from '@/components/level-up-modal'
import { ActivityLogger } from '@/components/activity-logger'
import { Button } from '@/components/ui/button'

type TabType = 'status' | 'quests' | 'skills' | 'streak'

export default function Home() {
  const { state, isLoaded, completeQuest, resetDailyQuests, addWorkout, logMeal } =
    useGameState()
  const [activeTab, setActiveTab] = useState<TabType>('status')
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [previousLevel, setPreviousLevel] = useState(1)

  const completionRate =
    (state.dailyQuests.filter((q) => q.completed).length /
      state.dailyQuests.length) *
    100

  useEffect(() => {
    if (state.profile.level > previousLevel) {
      setShowLevelUp(true)
      setPreviousLevel(state.profile.level)
    }
  }, [state.profile.level, previousLevel])

  const handleQuestComplete = (questId: string) => {
    completeQuest(questId)
  }

  const handleWorkoutComplete = (type: 'push' | 'pull' | 'legs' | 'cardio' | 'other', duration: number) => {
    addWorkout(type, duration)
  }

  const handleAddMeal = (category: 'breakfast' | 'lunch' | 'evening_snacks' | 'dinner' | 'miscellaneous', itemName: string) => {
    logMeal(category, itemName)
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-4xl animate-pulse">⚔️</div>
          <p className="text-text-secondary font-display">
            INITIALIZING SYSTEM...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <div className="max-w-md mx-auto pb-24">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-gradient-to-b from-bg-primary to-transparent p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-display font-bold text-primary">
              SOLO LEVELING
            </h1>
            <div className="text-sm text-text-secondary">
              {new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>

        <div className="px-4 space-y-4">
          <AnimatePresence mode="wait">
            {/* STATUS TAB */}
            {activeTab === 'status' && (
              <motion.div
                key="status"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <ProfileHeader profile={state.profile} />
                <VitalsDisplay vitals={state.vitals} />
                <StatRadar stats={state.stats} />

                <div className="glass-card p-4 space-y-2">
                  <h3 className="text-sm font-display text-primary">
                    DAILY PROGRESS
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">Quests</span>
                      <span className="font-mono-display text-primary">
                        {state.dailyQuests.filter((q) => q.completed).length}/
                        {state.dailyQuests.length}
                      </span>
                    </div>
                    <div className="relative h-2 bg-bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-primary-glow"
                        animate={{ width: `${completionRate}%` }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="glass-card p-4">
                  <p className="text-xs text-text-muted text-center">
                    ⚔️ Rise through the ranks and become the Shadow Monarch
                  </p>
                </div>
              </motion.div>
            )}

            {/* QUESTS TAB */}
            {activeTab === 'quests' && (
              <motion.div
                key="quests"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="glass-card p-4">
                  <h3 className="text-sm font-display text-primary mb-2">
                    DAILY QUESTS
                  </h3>
                  <p className="text-xs text-text-muted">
                    Complete all core quests to maximize daily XP gains
                  </p>
                </div>

                <div className="space-y-3">
                  {state.dailyQuests.map((quest) => (
                    <QuestCard
                      key={quest.id}
                      quest={quest}
                      onComplete={() => handleQuestComplete(quest.id)}
                    />
                  ))}
                </div>

                <ActivityLogger
                  title="Workouts"
                  icon="💪"
                  items={state.workouts.map((w) => ({
                    id: w.id,
                    name: `${w.type.toUpperCase()} - ${w.duration}min`,
                    details: `+${w.xpGained} XP`,
                    timestamp: w.timestamp,
                  }))}
                  onAdd={(name) => {
                    const duration = parseInt(name.split(' ')[1]) || 30
                    handleWorkoutComplete('cardio', duration)
                  }}
                  onRemove={() => {}}
                  placeholder="Duration in minutes..."
                />

                <Button
                  onClick={resetDailyQuests}
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  Reset Quests
                </Button>
              </motion.div>
            )}

            {/* SKILLS TAB */}
            {activeTab === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="glass-card p-4">
                  <h3 className="text-sm font-display text-primary mb-2">
                    SKILL PROGRESSION
                  </h3>
                  <p className="text-xs text-text-muted">
                    Gain skill XP by completing related quests
                  </p>
                </div>

                <SkillsGrid skills={state.skills} />
              </motion.div>
            )}

            {/* STREAK TAB */}
            {activeTab === 'streak' && (
              <motion.div
                key="streak"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="glass-card p-4">
                  <h3 className="text-sm font-display text-primary mb-2">
                    STREAK HISTORY
                  </h3>
                  <p className="text-xs text-text-muted">
                    Track your consistency across days
                  </p>
                </div>

                <StreakView streak={state.streak} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav active={activeTab} onChange={setActiveTab} />

      {/* Level Up Modal */}
      <AnimatePresence>
        {showLevelUp && (
          <LevelUpModal
            profile={state.profile}
            isOpen={showLevelUp}
            onClose={() => setShowLevelUp(false)}
            xpGained={100}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
