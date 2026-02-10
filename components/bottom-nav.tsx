'use client'

import { motion } from 'framer-motion'
import { Home, Zap, ListChecks as ListCheck, Trophy, Apple, Heart, BarChart3 } from 'lucide-react'

interface BottomNavProps {
  active: 'status' | 'quests' | 'skills' | 'streak' | 'habits' | 'nutrition' | 'vitals' | 'review'
  onChange: (tab: 'status' | 'quests' | 'skills' | 'streak' | 'habits' | 'nutrition' | 'vitals' | 'review') => void
}

export function BottomNav({ active, onChange }: BottomNavProps) {
  const tabs = [
    { id: 'status' as const, label: 'Status', icon: Home },
    { id: 'quests' as const, label: 'Quests', icon: ListCheck },
    { id: 'habits' as const, label: 'Habits', icon: Heart },
    { id: 'nutrition' as const, label: 'Diet', icon: Apple },
    { id: 'vitals' as const, label: 'Vitals', icon: BarChart3 },
    { id: 'skills' as const, label: 'Skills', icon: Zap },
    { id: 'streak' as const, label: 'Streak', icon: Trophy },
    { id: 'review' as const, label: 'Review', icon: BarChart3 },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-bg-primary/95 backdrop-blur border-t border-primary/20 px-2 py-2 max-w-md mx-auto">
      <div className="flex justify-around gap-1 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = active === tab.id

          return (
            <motion.button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-colors flex-shrink-0 ${
                isActive
                  ? 'bg-primary/20 text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <Icon size={16} />
              <span className="text-xs font-display font-semibold whitespace-nowrap">
                {tab.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="h-1 w-6 bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
