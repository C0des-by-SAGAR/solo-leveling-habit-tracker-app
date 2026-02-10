'use client'

import { motion } from 'framer-motion'
import { type Skill } from '@/lib/types'
import { XPBar } from './xp-bar'

interface SkillsGridProps {
  skills: Skill[]
}

const CATEGORY_COLORS: Record<string, string> = {
  academic: 'border-blue-500/50',
  technical: 'border-cyan-500/50',
  business: 'border-purple-500/50',
  physical: 'border-red-500/50',
  creative: 'border-pink-500/50',
}

export function SkillsGrid({ skills }: SkillsGridProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="grid grid-cols-2 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {skills.map((skill) => (
        <motion.div
          key={skill.id}
          variants={item}
          className={`glass-card p-4 border ${CATEGORY_COLORS[skill.category]} space-y-3`}
        >
          <div className="text-3xl">{skill.icon}</div>
          <div>
            <h3 className="font-display font-semibold text-text-primary text-sm line-clamp-2">
              {skill.name}
            </h3>
            <p className="text-xs text-text-muted mt-1">{skill.description}</p>
          </div>

          <div className="pt-2 border-t border-primary/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-display text-primary">
                Lv. {skill.level}
              </span>
              <span className="text-xs font-mono-display text-text-muted">
                {skill.currentXP}/{skill.xpToNextLevel}
              </span>
            </div>
            <XPBar
              current={skill.currentXP}
              max={skill.xpToNextLevel}
              label=""
              showPercentage={false}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
