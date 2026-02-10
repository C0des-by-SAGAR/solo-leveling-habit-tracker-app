'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { HunterProfile } from '@/lib/types'

interface ProfileHeaderProps {
  profile: HunterProfile
}

const RANK_COLORS: Record<string, string> = {
  'E': 'from-danger to-warning',
  'D': 'from-warning to-accent',
  'C': 'from-accent to-success',
  'B': 'from-success to-primary',
  'A': 'from-primary to-primary-glow',
  'S': 'via-primary via-accent to-primary',
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const rankColor = RANK_COLORS[profile.rank] || 'from-primary to-accent'
  const levelProgress = (profile.currentXP / profile.xpToNextLevel) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden"
    >
      {/* Background with gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${rankColor} opacity-5 blur-xl`} />

      <div className="relative space-y-4">
        {/* Main Status Box */}
        <motion.div
          className="glass-card p-6 border-2 border-primary/50 epic-glow"
          whileHover={{ scale: 1.02 }}
        >
          {/* Header with name and level */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <motion.h2
                className="text-3xl font-display font-bold neon-text mb-2"
                animate={{ textShadow: ['0 0 10px rgba(168, 85, 247, 0.5)', '0 0 20px rgba(168, 85, 247, 0.8)', '0 0 10px rgba(168, 85, 247, 0.5)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {profile.name}
              </motion.h2>
              <p className="text-sm text-text-secondary font-mono-display">
                HUNTER RANK: <span className="text-primary font-bold">{profile.rank}</span>
              </p>
            </div>

            {/* Rank Badge */}
            <motion.div
              className={`text-5xl font-display font-black px-4 py-2 rounded-lg bg-gradient-to-br ${rankColor} text-white shadow-2xl border-2 border-white/30`}
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {profile.rank}
            </motion.div>
          </div>

          {/* Level Display */}
          <div className="bg-bg-secondary/50 p-4 rounded-lg mb-4 border border-primary/30">
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-xs font-display text-primary uppercase tracking-widest">
                Level
              </span>
              <span className="text-3xl font-display font-bold text-primary">
                {profile.level}
              </span>
            </div>

            {/* XP Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-text-secondary">
                  {profile.currentXP.toLocaleString()} / {profile.xpToNextLevel.toLocaleString()} XP
                </span>
                <span className="text-xs text-primary font-bold">
                  {Math.round(levelProgress)}%
                </span>
              </div>
              <div className="relative h-3 bg-bg-primary rounded-full overflow-hidden border border-primary/50">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent shadow-lg"
                  animate={{ width: `${levelProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2">
            <motion.div
              className="bg-primary/10 border border-primary/50 p-3 rounded-lg text-center"
              whileHover={{ borderColor: 'rgba(168, 85, 247, 0.8)', boxShadow: '0 0 15px rgba(168, 85, 247, 0.5)' }}
            >
              <p className="text-xs text-text-muted uppercase tracking-wider">Total Level</p>
              <p className="text-2xl font-display font-bold text-primary mt-1">
                {profile.level}
              </p>
            </motion.div>

            <motion.div
              className="bg-accent/10 border border-accent/50 p-3 rounded-lg text-center"
              whileHover={{ borderColor: 'rgba(6, 182, 212, 0.8)', boxShadow: '0 0 15px rgba(6, 182, 212, 0.5)' }}
            >
              <p className="text-xs text-text-muted uppercase tracking-wider">Rank</p>
              <p className="text-2xl font-display font-bold text-accent mt-1">
                {profile.rank}
              </p>
            </motion.div>

            <motion.div
              className="bg-success/10 border border-success/50 p-3 rounded-lg text-center"
              whileHover={{ borderColor: 'rgba(16, 185, 129, 0.8)', boxShadow: '0 0 15px rgba(16, 185, 129, 0.5)' }}
            >
              <p className="text-xs text-text-muted uppercase tracking-wider">Strength</p>
              <p className="text-2xl font-display font-bold text-success mt-1">
                {profile.totalStats}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Character Portrait Section */}
        <motion.div
          className="relative h-32 rounded-lg overflow-hidden border-2 border-primary/50 epic-glow"
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src="/jin-woo.jpg"
            alt="Sung Jin Woo"
            fill
            className="object-cover filter brightness-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />
          <motion.div
            className="absolute inset-0 border-2 border-primary/50"
            animate={{ boxShadow: ['0 0 20px rgba(168, 85, 247, 0.3)', '0 0 40px rgba(168, 85, 247, 0.6)', '0 0 20px rgba(168, 85, 247, 0.3)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Rank and Title Display */}
        <motion.div
          className="glass-card p-4 border border-primary/30"
          whileHover={{ borderColor: 'rgba(168, 85, 247, 0.8)' }}
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                Current Title
              </p>
              <p className="font-display font-bold text-primary">
                {profile.rank === 'S' ? 'Shadow Monarch' : 'Rising Hunter'}
              </p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                Status
              </p>
              <motion.p
                className="font-display font-bold text-accent"
                animate={{ opacity: [0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {profile.level % 10 === 0 ? 'LEVELING UP' : 'IN PROGRESS'}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
