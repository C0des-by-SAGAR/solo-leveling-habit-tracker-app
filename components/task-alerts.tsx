'use client'

import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { DailyQuest } from '@/lib/types'
import { SHADOW_ARMY, getSummonedMinions, type ShadowMinion } from '@/lib/shadow-army'

interface TaskAlertsProps {
  incompleteTasks: DailyQuest[]
  onTaskClick?: (taskId: string) => void
}

const Sparkle = ({ position, delay }: { position: { top: string; left: string; size: number }; delay: number }) => (
  <motion.div
    className="absolute"
    style={{ top: position.top, left: position.left }}
    animate={{
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      rotate: [0, 45, 90],
    }}
    transition={{
      duration: 1.8,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
  >
    <svg width={position.size} height={position.size} viewBox="0 0 20 20" fill="none">
      <path d="M10 2 L12 8 L18 10 L12 12 L10 18 L8 12 L2 10 L8 8 Z" fill="#22d3ee" opacity="0.8" />
    </svg>
  </motion.div>
)

const ShadowAlert = ({ minion, quest, onGo, onClose }: { minion: ShadowMinion; quest: DailyQuest; onGo: () => void; onClose: (minion: ShadowMinion) => void }) => {
  const getEntranceAnimation = (type: string) => {
    switch (type) {
      case 'phase_through_wall':
        return {
          initial: { x: 100, opacity: 0, filter: 'blur(20px)' },
          animate: { x: 0, opacity: [0, 0.5, 1], filter: ['blur(20px)', 'blur(8px)', 'blur(0px)'] },
          transition: { duration: 0.9 },
        }
      case 'crystallize':
        return {
          initial: { scale: 0, opacity: 0, rotate: -15 },
          animate: { scale: [0, 1.3, 1], opacity: 1, rotate: 0 },
          transition: { duration: 0.8, delay: 0.3 },
        }
      case 'rise_from_shadow':
        return {
          initial: { y: 50, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          transition: { duration: 0.8, delay: 0.3, type: 'spring', stiffness: 100 },
        }
      case 'descend_from_top':
        return {
          initial: { y: -100, scale: 0.3, opacity: 0, filter: 'blur(15px)' },
          animate: { y: 0, scale: 1, opacity: 1, filter: 'blur(0px)' },
          transition: { duration: 1.1 },
        }
      case 'unfold_from_darkness':
        return {
          initial: { scale: 0, opacity: 1, borderRadius: '50%' },
          animate: { scale: 1, borderRadius: '0%' },
          transition: { duration: 0.9 },
        }
      case 'roll_in':
        return {
          initial: { x: -80, y: 80, rotate: -30, opacity: 0, scale: 0.5 },
          animate: { x: 0, y: 0, rotate: [0, 20, 0], opacity: 1, scale: 1 },
          transition: { duration: 1.0 },
        }
      default:
        return {}
    }
  }

  const entranceAnim = getEntranceAnimation(minion.entranceType)
  const sparkles = [
    { top: '5%', left: '60%', size: 16, delay: 0 },
    { top: '25%', left: '-10%', size: 12, delay: 0.4 },
    { top: '70%', left: '65%', size: 10, delay: 0.8 },
    { top: '85%', left: '10%', size: 8, delay: 1.2 },
    { top: '45%', left: '-15%', size: 14, delay: 0.6 },
  ]

  return (
    <motion.div
      className="fixed bottom-24 left-0 right-0 mx-auto w-full max-w-md px-4 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-flex-end gap-3">
        {/* Minion Section */}
        <motion.div className="relative flex flex-col items-center" {...entranceAnim}>
          <div className="relative w-32 h-40">
            {/* Sparkles */}
            {sparkles.map((sparkle, i) => (
              <Sparkle key={i} position={{ top: sparkle.top, left: sparkle.left, size: sparkle.size }} delay={sparkle.delay} />
            ))}
            {/* Minion Image */}
            <motion.img
              src={minion.sprite}
              alt={minion.name}
              className="w-full h-full object-contain"
              style={{
                filter: `drop-shadow(0 0 12px ${minion.glowColor}) drop-shadow(0 0 24px ${minion.glowColor})`,
              }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
          <p className="text-xs font-display font-bold text-text-secondary mt-2 tracking-wider uppercase">
            {minion.name}
          </p>
        </motion.div>

        {/* Alert Card */}
        <motion.div
          className="flex-1 p-5 rounded-2xl border-2 backdrop-blur-2xl relative"
          style={{
            background: 'rgba(8, 6, 18, 0.88)',
            borderColor: minion.glowColor,
            boxShadow: `
              0 0 0 1px ${minion.glowColor}30,
              0 0 20px ${minion.glowColor}CC,
              0 0 50px ${minion.glowColor}80,
              0 0 90px ${minion.glowColor}40,
              inset 0 0 20px ${minion.glowColor}15
            `,
          }}
          animate={{
            boxShadow: [
              `0 0 0 1px ${minion.glowColor}30, 0 0 20px ${minion.glowColor}CC, 0 0 50px ${minion.glowColor}80, 0 0 90px ${minion.glowColor}40, inset 0 0 20px ${minion.glowColor}15`,
              `0 0 0 1px ${minion.glowColor}40, 0 0 30px ${minion.glowColor}FF, 0 0 70px ${minion.glowColor}A0, 0 0 120px ${minion.glowColor}60, inset 0 0 25px ${minion.glowColor}25`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Close Button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              onClose(minion)
            }}
            className="absolute -top-3 -right-3 p-1.5 rounded-full z-50 cursor-pointer hover:opacity-80 transition-opacity"
            style={{
              background: minion.glowColor,
              boxShadow: `0 0 8px ${minion.glowColor}`,
            }}
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.15 }}
          >
            <X size={18} className="text-black font-bold" strokeWidth={3} />
          </motion.button>

          <p className="text-xs font-display font-bold tracking-widest text-primary uppercase mb-2">
            Shadow Alert
          </p>
          <h3 className="text-lg font-bold text-white mb-4 leading-tight">
            {quest.name} — Earn +{quest.xpReward} XP
          </h3>
          <motion.button
            onClick={onGo}
            className="ml-auto px-6 py-2 rounded-lg font-display font-bold text-sm tracking-wider uppercase text-white transition-all"
            style={{
              background: minion.glowColor,
            }}
            whileTap={{ scale: 0.95 }}
            whileHover={{
              boxShadow: `0 0 20px ${minion.glowColor}99`,
            }}
          >
            Go
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function TaskAlerts({ incompleteTasks, onTaskClick }: TaskAlertsProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  const summonedMinions = useMemo(() => {
    const questNames = incompleteTasks.map((q) => q.name).filter((name) => !dismissed.has(name))
    return getSummonedMinions(questNames)
  }, [incompleteTasks, dismissed])

  const getQuestForMinion = (minion: ShadowMinion): DailyQuest | undefined => {
    return incompleteTasks.find((q) => q.name.toLowerCase().includes(minion.assignedQuest.toLowerCase()))
  }

  const handleGo = (minion: ShadowMinion) => {
    const quest = getQuestForMinion(minion)
    if (quest) {
      onTaskClick?.(quest.id)
      setDismissed((prev) => new Set([...prev, minion.assignedQuest]))
    }
  }

  const handleClose = (minion: ShadowMinion) => {
    setDismissed((prev) => new Set([...prev, minion.assignedQuest]))
  }

  if (!summonedMinions.length) return null

  return (
    <AnimatePresence>
      {summonedMinions.map((minion) => {
        const quest = getQuestForMinion(minion)
        return quest ? (
          <ShadowAlert
            key={minion.id}
            minion={minion}
            quest={quest}
            onGo={() => handleGo(minion)}
            onClose={() => handleClose(minion)}
          />
        ) : null
      })}
    </AnimatePresence>
  )
}
