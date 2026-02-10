'use client'

import { motion } from 'framer-motion'
import { Zap, Lock } from 'lucide-react'
import { type Skill } from '@/lib/types'
import { getUnlockedAbilitiesForSkill, SKILL_ABILITIES } from '@/lib/skills-system'
import { XPBar } from './xp-bar'

interface SkillsGridProps {
  skills: Skill[]
}

const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  academic: { bg: 'bg-blue-500/10', border: 'border-blue-500/50', text: 'text-blue-400' },
  technical: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/50', text: 'text-cyan-400' },
  business: { bg: 'bg-purple-500/10', border: 'border-purple-500/50', text: 'text-purple-400' },
  physical: { bg: 'bg-red-500/10', border: 'border-red-500/50', text: 'text-red-400' },
  creative: { bg: 'bg-pink-500/10', border: 'border-pink-500/50', text: 'text-pink-400' },
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
      className="space-y-4 pb-20"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {skills.map((skill) => {
        const unlockedAbilities = getUnlockedAbilitiesForSkill(skill.id, skill.unlockedAbilities || [])
        const allAbilities = SKILL_ABILITIES[skill.id.toLowerCase()] || []
        const nextAbility = allAbilities.find((a) => a.level > skill.level)
        const colors = CATEGORY_COLORS[skill.category]

        return (
          <motion.div
            key={skill.id}
            variants={item}
            className={`glass-card p-5 border-2 ${colors.border} space-y-4 epic-glow`}
            whileHover={{ scale: 1.02 }}
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl">{skill.icon}</span>
                  <div>
                    <h3 className={`font-display font-bold ${colors.text} text-sm`}>
                      {skill.name}
                    </h3>
                    <p className="text-xs text-text-muted">{skill.description}</p>
                  </div>
                </div>
              </div>
              <motion.div
                className={`${colors.bg} ${colors.border} border px-3 py-2 rounded-lg text-center`}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-2xl font-display font-bold text-primary">
                  {skill.level}
                </p>
                <p className="text-xs text-text-muted">Level</p>
              </motion.div>
            </div>

            {/* XP Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-text-secondary">Experience</span>
                <span className="text-primary font-mono-display font-bold">
                  {skill.currentXP.toLocaleString()} / {skill.xpToNextLevel.toLocaleString()}
                </span>
              </div>
              <XPBar
                current={skill.currentXP}
                max={skill.xpToNextLevel}
                label=""
                showPercentage={true}
              />
            </div>

            {/* Unlocked Abilities */}
            {unlockedAbilities.length > 0 && (
              <motion.div
                className="pt-3 border-t border-primary/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-xs font-display text-accent uppercase tracking-widest mb-2">
                  Unlocked Abilities
                </p>
                <div className="space-y-2">
                  {unlockedAbilities.map((ability) => (
                    <motion.div
                      key={ability.level}
                      className="bg-primary/20 border border-primary/50 p-2 rounded-lg"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-primary">{ability.name}</p>
                          <p className="text-xs text-text-secondary">{ability.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Next Ability */}
            {nextAbility && (
              <motion.div
                className="pt-3 border-t border-primary/30"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-xs font-display text-warning uppercase tracking-widest mb-2">
                  Next Ability
                </p>
                <div className="bg-warning/10 border border-warning/50 p-3 rounded-lg">
                  <div className="flex items-start gap-2 mb-2">
                    <Lock className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-warning">{nextAbility.name}</p>
                      <p className="text-xs text-text-secondary">{nextAbility.description}</p>
                    </div>
                  </div>
                  <p className="text-xs text-warning font-mono-display">
                    Unlock at Level {nextAbility.level} ({nextAbility.level - skill.level} levels to go)
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )
      })}
    </motion.div>
  )
}
