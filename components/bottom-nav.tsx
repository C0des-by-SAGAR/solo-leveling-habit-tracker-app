'use client'

import { motion } from 'framer-motion'
import { Home, Zap, ListChecks as ListCheck, Trophy } from 'lucide-react'

interface BottomNavProps {
  active: 'status' | 'quests' | 'skills' | 'streak'
  onChange: (tab: 'status' | 'quests' | 'skills' | 'streak') => void
}

export function BottomNav({ active, onChange }: BottomNavProps) {
  const tabs = [
    { id: 'status' as const, label: 'Status', icon: Home },
    { id: 'quests' as const, label: 'Quests', icon: ListCheck },
    { id: 'skills' as const, label: 'Skills', icon: Zap },
    { id: 'streak' as const, label: 'Streak', icon: Trophy },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-bg-primary/95 backdrop-blur border-t border-primary/20 px-4 py-3 max-w-md mx-auto">
      <div className="flex justify-around gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = active === tab.id

          return (
            <motion.button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary/20 text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <Icon size={20} />
              <span className="text-xs font-display font-semibold">
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
