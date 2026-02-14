'use client'

import { useState, useEffect, useCallback } from 'react'
import type {
  GameState,
  HunterProfile,
  Stats,
  DailyQuest,
  DailyVitals,
  Skill,
  StreakData,
  NegativeHabit,
  DailySleep,
  DailySummary,
} from '@/lib/types'

const STORAGE_KEY = 'solo-leveling-game-state'

const DEFAULT_STATS: Stats = {
  strength: 5,
  intelligence: 5,
  discipline: 5,
  creativity: 5,
  consistency: 5,
}

const DEFAULT_PROFILE: HunterProfile = {
  name: 'New Hunter',
  level: 1,
  currentXP: 0,
  xpToNextLevel: 100,
  rank: 'E',
  title: 'Awakened Hunter',
  titleSubtitle: 'A new journey begins',
  createdAt: new Date().toISOString(),
}

const DEFAULT_VITALS: DailyVitals = {
  date: new Date().toISOString().split('T')[0],
  hp: 85,
  mp: 60,
  fatigue: 40,
  energyRating: 7,
  focusRating: 6,
  moodRating: 7,
  sleep: {
    bedTime: '23:00',
    wakeTime: '07:00',
    quality: 2,
    duration: 8,
  },
}

const DEFAULT_QUESTS: DailyQuest[] = [
  {
    id: '1',
    name: 'Attend Classes',
    description: 'Attend MBA classes',
    xpReward: 50,
    statAffected: 'intelligence',
    statIncrease: 2,
    completed: false,
    category: 'core',
    icon: '🎓',
  },
  {
    id: '2',
    name: 'Study Block',
    description: 'Study for 2+ hours',
    xpReward: 80,
    statAffected: 'intelligence',
    statIncrease: 3,
    completed: false,
    category: 'core',
    icon: '📚',
  },
  {
    id: '3',
    name: 'Python Course',
    description: 'Complete 1.5 hours of Python course',
    xpReward: 75,
    statAffected: 'intelligence',
    statIncrease: 2,
    completed: false,
    category: 'core',
    icon: '🐍',
  },
  {
    id: '4',
    name: 'Gym Workout',
    description: 'Complete a full gym session',
    xpReward: 100,
    statAffected: 'strength',
    statIncrease: 4,
    completed: false,
    category: 'core',
    icon: '💪',
  },
  {
    id: '5',
    name: 'Content Creation',
    description: 'Create content for your channel',
    xpReward: 60,
    statAffected: 'creativity',
    statIncrease: 3,
    completed: false,
    category: 'core',
    icon: '🎬',
  },
  {
    id: '6',
    name: 'Sleep Before 11:30 PM',
    description: 'Get to bed by 11:30 PM',
    xpReward: 40,
    statAffected: 'discipline',
    statIncrease: 2,
    completed: false,
    category: 'core',
    icon: '😴',
  },
]

const DEFAULT_SKILLS: Skill[] = [
  {
    id: '1',
    name: 'Financial Management',
    description: 'Budget tracking, investment analysis',
    level: 1,
    currentXP: 0,
    xpToNextLevel: 100,
    category: 'business',
    icon: '💰',
  },
  {
    id: '2',
    name: 'Operations',
    description: 'Process optimization, systems thinking',
    level: 1,
    currentXP: 0,
    xpToNextLevel: 100,
    category: 'business',
    icon: '⚙️',
  },
  {
    id: '3',
    name: 'Business Research',
    description: 'Market analysis, data synthesis',
    level: 1,
    currentXP: 0,
    xpToNextLevel: 100,
    category: 'academic',
    icon: '📊',
  },
  {
    id: '4',
    name: 'Digital Marketing',
    description: 'Social media, content strategy',
    level: 1,
    currentXP: 0,
    xpToNextLevel: 100,
    category: 'business',
    icon: '📱',
  },
  {
    id: '5',
    name: 'Python Development',
    description: 'Data analysis, automation',
    level: 1,
    currentXP: 0,
    xpToNextLevel: 100,
    category: 'technical',
    icon: '🐍',
  },
  {
    id: '6',
    name: 'Physical Fitness',
    description: 'Strength, endurance, discipline',
    level: 1,
    currentXP: 0,
    xpToNextLevel: 100,
    category: 'physical',
    icon: '💪',
  },
  {
    id: '7',
    name: 'Content Creation',
    description: 'Video editing, storytelling',
    level: 1,
    currentXP: 0,
    xpToNextLevel: 100,
    category: 'creative',
    icon: '🎬',
  },
  {
    id: '8',
    name: 'Iron Discipline',
    description: 'Consistency, willpower, focus',
    level: 1,
    currentXP: 0,
    xpToNextLevel: 100,
    category: 'physical',
    icon: '🛡️',
  },
]

const DEFAULT_STREAK: StreakData = {
  current: 0,
  longest: 0,
  lastActive: new Date().toISOString().split('T')[0],
  history: [],
}

const DEFAULT_STATE: GameState = {
  profile: DEFAULT_PROFILE,
  stats: DEFAULT_STATS,
  dailyQuests: DEFAULT_QUESTS,
  vitals: DEFAULT_VITALS,
  workouts: [],
  diet: {
    date: new Date().toISOString().split('T')[0],
    meals: [],
    proteinIntake: 0,
    proteinGoal: 150,
    totalCalories: 0,
    consistencyScore: 0,
  },
  skills: DEFAULT_SKILLS,
  streak: DEFAULT_STREAK,
  habits: {
    cigarettes: { count: 0, xpPenalty: 0 },
    masturbation: { count: 0, xpPenalty: 0 },
    alcohol: { count: 0, xpPenalty: 0 },
  },
  sleepLog: [],
  dailySummaries: [],
}

export function useGameState() {
  const [state, setState] = useState<GameState>(DEFAULT_STATE)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setState(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load game state', e)
      }
    }
    setIsLoaded(true)
  }, [])

  const saveState = useCallback((newState: GameState) => {
    setState(newState)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
  }, [])

  const completeQuest = useCallback(
    (questId: string) => {
      const newState = { ...state }
      const quest = newState.dailyQuests.find((q) => q.id === questId)

      if (quest && !quest.completed) {
        quest.completed = true
        quest.completedAt = new Date().toISOString()

        // Add XP and stats
        newState.profile.currentXP += quest.xpReward
        newState.stats[quest.statAffected] += quest.statIncrease

        // Check for level up
        while (newState.profile.currentXP >= newState.profile.xpToNextLevel) {
          newState.profile.currentXP -=
            newState.profile.xpToNextLevel
          newState.profile.level += 1
          newState.profile.xpToNextLevel = calculateXPForLevel(
            newState.profile.level
          )
          updateRank(newState)
        }

        saveState(newState)
      }
    },
    [state, saveState]
  )

  const addWorkout = useCallback(
    (type: 'push' | 'pull' | 'legs' | 'cardio' | 'other', duration: number) => {
      const newState = { ...state }
      const xpGained = Math.floor(duration * 1.5)
      
      newState.workouts.push({
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        timestamp: new Date().toISOString(),
        type,
        duration,
        exercises: [],
        xpGained,
        strengthIncrease: Math.floor(duration / 30),
        completed: true,
      })

      newState.profile.currentXP += xpGained
      newState.stats.strength += Math.floor(duration / 30)

      while (newState.profile.currentXP >= newState.profile.xpToNextLevel) {
        newState.profile.currentXP -= newState.profile.xpToNextLevel
        newState.profile.level += 1
        newState.profile.xpToNextLevel = calculateXPForLevel(newState.profile.level)
        updateRank(newState)
      }

      saveState(newState)
    },
    [state, saveState]
  )

  const logMeal = useCallback(
    (category: 'breakfast' | 'lunch' | 'evening_snacks' | 'dinner' | 'miscellaneous', itemName: string) => {
      const newState = { ...state }
      const mealIndex = newState.diet.meals.findIndex((m) => m.category === category)
      
      if (mealIndex === -1) {
        newState.diet.meals.push({
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          category,
          items: [{ name: itemName, quantity: '1' }],
        })
      } else {
        newState.diet.meals[mealIndex].items.push({
          name: itemName,
          quantity: '1',
        })
      }

      saveState(newState)
    },
    [state, saveState]
  )

  const resetDailyQuests = useCallback(() => {
    const newState = { ...state }
    newState.dailyQuests = newState.dailyQuests.map((q) => ({
      ...q,
      completed: false,
      completedAt: undefined,
    }))
    saveState(newState)
  }, [state, saveState])

  const updateProfileName = useCallback(
    (name: string) => {
      const newState = { ...state }
      newState.profile.name = name
      saveState(newState)
    },
    [state, saveState]
  )

  const logHabit = useCallback(
    (type: 'cigarettes' | 'masturbation' | 'alcohol', data: any) => {
      const newState = { ...state }
      
      switch (type) {
        case 'cigarettes':
          newState.habits.cigarettes.count += 1
          if (newState.habits.cigarettes.count > 2) {
            newState.habits.cigarettes.xpPenalty = (newState.habits.cigarettes.count - 2) * 5
            newState.profile.currentXP -= 5
          }
          break
        case 'masturbation':
          newState.habits.masturbation.count += 1
          if (newState.habits.masturbation.count > 1) {
            newState.habits.masturbation.xpPenalty = (newState.habits.masturbation.count - 1) * 10
            newState.profile.currentXP -= 10
          }
          break
        case 'alcohol':
          newState.habits.alcohol.count += 1
          if (newState.habits.alcohol.count > 1) {
            newState.habits.alcohol.xpPenalty = (newState.habits.alcohol.count - 1) * 15
            newState.profile.currentXP -= 15
          }
          break
      }
      
      saveState(newState)
    },
    [state, saveState]
  )

  const logSleep = useCallback(
    (bedTime: string, wakeTime: string, quality: 1 | 2 | 3) => {
      const newState = { ...state }
      const bed = new Date(`2000-01-01 ${bedTime}`)
      const wake = new Date(`2000-01-02 ${wakeTime}`)
      const duration = (wake.getTime() - bed.getTime()) / (1000 * 60 * 60)
      
      newState.sleepLog.push({
        date: new Date().toISOString().split('T')[0],
        bedTime,
        wakeTime,
        duration: Math.round(duration * 10) / 10,
        quality,
        timestamp: new Date().toISOString(),
      })
      
      saveState(newState)
    },
    [state, saveState]
  )

  const logDailySummary = useCallback(
    (oneWin: string, totalXpGained: number, totalXpLost: number) => {
      const newState = { ...state }
      const completionRate = (newState.dailyQuests.filter((q) => q.completed).length / newState.dailyQuests.length) * 100
      
      newState.dailySummaries.push({
        date: new Date().toISOString().split('T')[0],
        oneWin,
        totalXPGained: totalXpGained,
        totalXPLost: totalXpLost,
        netXP: totalXpGained - totalXpLost,
        questCompletionRate: completionRate,
        statsGained: {},
        systemWarnings: [],
        rank: newState.profile.rank,
      })
      
      saveState(newState)
    },
    [state, saveState]
  )

  return {
    state,
    isLoaded,
    completeQuest,
    addWorkout,
    logMeal,
    logHabit,
    logSleep,
    logDailySummary,
    saveState,
    resetDailyQuests,
    updateProfileName,
  }
}

function calculateXPForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1))
}

function updateRank(state: GameState) {
  const { level } = state.profile
  if (level >= 60) {
    state.profile.rank = 'S'
    state.profile.title = 'The Shadow Monarch'
    state.profile.titleSubtitle = 'Arise'
  } else if (level >= 40) {
    state.profile.rank = 'A'
    state.profile.title = 'Unparalleled Hunter'
    state.profile.titleSubtitle = 'At the peak of strength'
  } else if (level >= 25) {
    state.profile.rank = 'B'
    state.profile.title = 'High-Rank Hunter'
    state.profile.titleSubtitle = 'Standing above the rest'
  } else if (level >= 15) {
    state.profile.rank = 'C'
    state.profile.title = 'Intermediate Hunter'
    state.profile.titleSubtitle = 'Growing stronger'
  } else if (level >= 8) {
    state.profile.rank = 'D'
    state.profile.title = 'Novice Hunter'
    state.profile.titleSubtitle = 'The awakening path'
  }
}
