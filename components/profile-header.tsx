'use client'

import { motion } from 'framer-motion'
import { type HunterProfile } from '@/lib/types'
import { XPBar } from './xp-bar'

interface ProfileHeaderProps {
  profile: HunterProfile
}

const RANK_COLORS: Record<string, string> = {
  E: 'from-slate-500 to-slate-600',
  D: 'from-blue-500 to-blue-600',
  C: 'from-purple-500 to-purple-600',
  B: 'from-pink-500 to-pink-600',
  A: 'from-yellow-500 to-yellow-600',
  S: 'from-red-500 to-red-600',
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const rankColor = RANK_COLORS[profile.rank] || RANK_COLORS.E

  return (
    <div className="glass-card p-6 space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-text-primary">
              {profile.name}
            </h2>
            <p className="text-sm text-text-secondary">{profile.title}</p>
          </div>
          <motion.div
            className={`px-4 py-2 rounded-lg bg-gradient-to-br ${rankColor} text-white font-display font-bold text-lg shadow-lg`}
            animate={{
              boxShadow: [
                '0 0 20px rgba(168, 85, 247, 0.5)',
                '0 0 40px rgba(168, 85, 247, 0.8)',
                '0 0 20px rgba(168, 85, 247, 0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {profile.rank}
          </motion.div>
        </div>

        <p className="text-xs text-text-muted italic">
          &quot;{profile.titleSubtitle}&quot;
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-lg font-display text-primary">
            LEVEL {profile.level}
          </span>
          <span className="text-xs font-mono-display text-text-muted">
            {profile.currentXP}/{profile.xpToNextLevel}
          </span>
        </div>
        <XPBar
          current={profile.currentXP}
          max={profile.xpToNextLevel}
          label=""
          showPercentage={false}
        />
      </div>
    </div>
  )
}
