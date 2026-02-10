'use client'

import { motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HabitTrackerProps {
  label: string
  icon: string
  count: number
  onIncrease: () => void
  onDecrease: () => void
  thresholdYellow: number
  thresholdRed: number
  unit?: string
}

export function HabitTracker({
  label,
  icon,
  count,
  onIncrease,
  onDecrease,
  thresholdYellow,
  thresholdRed,
  unit = '',
}: HabitTrackerProps) {
  const getStatus = () => {
    if (count >= thresholdRed) return 'danger'
    if (count >= thresholdYellow) return 'warning'
    return 'safe'
  }

  const status = getStatus()
  const statusColors = {
    safe: 'border-success/50 bg-success/10',
    warning: 'border-warning/50 bg-warning/10',
    danger: 'border-danger/50 bg-danger/10',
  }

  const statusIcons = {
    safe: '🟢',
    warning: '🟡',
    danger: '🔴',
  }

  return (
    <motion.div
      className={`glass-card p-4 border ${statusColors[status]} space-y-3`}
      animate={
        status === 'danger'
          ? {
              boxShadow: [
                '0 0 0 rgba(239, 68, 68, 0)',
                '0 0 20px rgba(239, 68, 68, 0.5)',
                '0 0 0 rgba(239, 68, 68, 0)',
              ],
            }
          : {}
      }
      transition={{ duration: 2, repeat: status === 'danger' ? Infinity : 0 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <div>
            <h3 className="font-display font-semibold text-text-primary">
              {label}
            </h3>
            <p className="text-xs text-text-muted">
              {thresholdYellow} | {thresholdRed}
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-mono-display font-bold text-text-primary">
            {count}
            {unit && <span className="text-xs ml-1">{unit}</span>}
          </div>
          <p className="text-xs text-text-muted">{statusIcons[status]}</p>
        </div>
      </div>

      <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${
            status === 'safe'
              ? 'bg-success'
              : status === 'warning'
                ? 'bg-warning'
                : 'bg-danger'
          }`}
          animate={{
            width: `${Math.min((count / thresholdRed) * 100, 100)}%`,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={onDecrease}
          className="flex-1 bg-transparent"
        >
          <Minus size={16} />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onIncrease}
          className="flex-1 bg-transparent"
        >
          <Plus size={16} />
        </Button>
      </div>
    </motion.div>
  )
}
