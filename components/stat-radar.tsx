'use client'

import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts'
import { type Stats } from '@/lib/types'

interface StatRadarProps {
  stats: Stats
}

export function StatRadar({ stats }: StatRadarProps) {
  const data = [
    {
      name: 'STR',
      value: stats.strength,
      fullMark: 100,
    },
    {
      name: 'INT',
      value: stats.intelligence,
      fullMark: 100,
    },
    {
      name: 'DIS',
      value: stats.discipline,
      fullMark: 100,
    },
    {
      name: 'CRT',
      value: stats.creativity,
      fullMark: 100,
    },
    {
      name: 'CON',
      value: stats.consistency,
      fullMark: 100,
    },
  ]

  return (
    <div className="glass-card p-6">
      <h3 className="text-sm font-display text-primary mb-4 text-center">
        STAT DISTRIBUTION
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <RadarChart data={data}>
          <PolarGrid stroke="rgba(168, 85, 247, 0.3)" />
          <PolarAngleAxis
            dataKey="name"
            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
            stroke="rgba(168, 85, 247, 0.3)"
          />
          <Radar
            name="Stats"
            dataKey="value"
            stroke="var(--primary)"
            fill="var(--primary)"
            fillOpacity={0.3}
            animationDuration={1000}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
