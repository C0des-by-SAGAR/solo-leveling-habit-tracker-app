'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'

interface ShadowSoldierProps {
  id: string
  message: string
  taskType: 'quest' | 'habit' | 'nutrition' | 'sleep' | 'review'
  action?: () => void
  onDismiss: () => void
}

export function ShadowSoldier({
  id,
  message,
  taskType,
  action,
  onDismiss,
}: ShadowSoldierProps) {
  const getTaskColor = (type: string) => {
    switch (type) {
      case 'quest':
        return 'from-primary to-accent'
      case 'habit':
        return 'from-danger to-primary'
      case 'nutrition':
        return 'from-success to-primary'
      case 'sleep':
        return 'from-accent to-success'
      case 'review':
        return 'from-primary to-warning'
      default:
        return 'from-primary to-accent'
    }
  }

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, x: 100, rotateY: 90 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      exit={{ opacity: 0, x: 100, rotateY: 90 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="fixed bottom-28 right-4 z-50 perspective"
    >
      <motion.div
        className={`relative bg-gradient-to-r ${getTaskColor(taskType)} rounded-lg p-4 shadow-2xl border border-primary/50 overflow-hidden w-64`}
        whileHover={{ scale: 1.05 }}
      >
        {/* Glowing background effect */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <div className="relative z-10 space-y-3">
          {/* Shadow Soldier Icon */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center text-sm"
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ⚡
              </motion.div>
              <span className="text-xs font-display font-bold text-white uppercase tracking-widest">
                Shadow Alert
              </span>
            </div>
            <motion.button
              onClick={onDismiss}
              className="text-white/70 hover:text-white"
              whileHover={{ scale: 1.2 }}
            >
              <X size={16} />
            </motion.button>
          </div>

          {/* Message */}
          <p className="text-sm text-white font-medium">{message}</p>

          {/* Action button */}
          {action && (
            <motion.button
              onClick={action}
              className="w-full bg-white/20 hover:bg-white/30 text-white text-xs py-2 rounded font-display font-bold transition-colors border border-white/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ACCEPT MISSION
            </motion.button>
          )}
        </div>

        {/* Glow effect */}
        <motion.div
          className="absolute -inset-0.5 opacity-0 blur-lg z-0"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            background: `linear-gradient(135deg, var(--primary), var(--accent))`,
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export function ShadowSoldierPortrait() {
  return (
    <motion.div
      className="fixed bottom-4 right-4 z-40 pointer-events-none"
      animate={{ y: [0, -10, 0], rotateZ: [-2, 2, -2] }}
      transition={{ duration: 4, repeat: Infinity }}
    >
      <div className="relative w-24 h-24">
        <Image
          src="/shadow-soldier.jpg"
          alt="Shadow Soldier"
          fill
          className="object-cover rounded-lg filter drop-shadow-xl"
          style={{
            filter:
              'drop-shadow(0 0 20px rgba(168, 85, 247, 0.6)) drop-shadow(0 0 40px rgba(6, 182, 212, 0.3))',
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-primary"
          animate={{ boxShadow: ['0 0 10px rgba(168, 85, 247, 0.5)', '0 0 30px rgba(168, 85, 247, 0.8)', '0 0 10px rgba(168, 85, 247, 0.5)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  )
}
