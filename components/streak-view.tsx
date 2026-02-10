'use client'

import { motion } from 'framer-motion'
import { type StreakData } from '@/lib/types'

interface StreakViewProps {
  streak: StreakData
}

export function StreakView({ streak }: StreakViewProps) {
  const getStatusColor = (completionRate: number | undefined) => {
    if (!completionRate) return 'bg-bg-secondary'
    if (completionRate >= 80) return 'bg-success/70'
    if (completionRate >= 50) return 'bg-warning/70'
    return 'bg-danger/70'
  }

  // Generate calendar data for the past 3 months
  const generateCalendarMonths = () => {
    const months = []
    const today = new Date()

    for (let i = 2; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
      const year = date.getFullYear()
      const month = date.getMonth()

      // Get first day of month and number of days
      const firstDay = new Date(year, month, 1).getDay()
      const daysInMonth = new Date(year, month + 1, 0).getDate()

      const weeks = []
      let currentWeek = Array(firstDay).fill(null)

      for (let day = 1; day <= daysInMonth; day++) {
        const cellDate = new Date(year, month, day)
        currentWeek.push(cellDate)

        if (currentWeek.length === 7) {
          weeks.push(currentWeek)
          currentWeek = []
        }
      }

      if (currentWeek.length > 0) {
        while (currentWeek.length < 7) {
          currentWeek.push(null)
        }
        weeks.push(currentWeek)
      }

      months.push({
        name: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        weeks,
      })
    }

    return months
  }

  const months = generateCalendarMonths()
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="space-y-6 pb-20">
      {/* Streak Stats */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div
          className="glass-card p-4 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-display text-primary font-bold">
            {streak.current}
          </div>
          <p className="text-xs text-text-secondary mt-1">Current Streak</p>
        </motion.div>

        <motion.div
          className="glass-card p-4 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-display text-accent font-bold">
            {streak.longest}
          </div>
          <p className="text-xs text-text-secondary mt-1">Longest Streak</p>
        </motion.div>

        <motion.div
          className="glass-card p-4 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-display text-success font-bold">
            {streak.history.filter((h) => h.active).length}
          </div>
          <p className="text-xs text-text-secondary mt-1">Active Days</p>
        </motion.div>
      </div>

      {/* Calendar Heatmap */}
      <div className="glass-card p-6 space-y-6">
        <div>
          <h3 className="text-sm font-display text-primary mb-4">
            ACTIVITY HEATMAP
          </h3>

          {/* Month Calendars */}
          {months.map((monthData, monthIdx) => (
            <motion.div
              key={monthIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: monthIdx * 0.1 }}
              className="mb-8 last:mb-0"
            >
              <h4 className="text-xs font-display text-accent mb-3">
                {monthData.name}
              </h4>

              {/* Day labels */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayLabels.map((label) => (
                  <div
                    key={label}
                    className="text-center text-xs text-text-muted font-mono-display"
                  >
                    {label}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="space-y-1">
                {monthData.weeks.map((week, weekIdx) => (
                  <div key={weekIdx} className="grid grid-cols-7 gap-1">
                    {week.map((date, dayIdx) => {
                      if (!date) {
                        return (
                          <div
                            key={dayIdx}
                            className="aspect-square rounded-md"
                          />
                        )
                      }

                      const dateStr = date.toISOString().split('T')[0]
                      const history = streak.history.find(
                        (h) => h.date === dateStr
                      )
                      const color = getStatusColor(history?.completionRate)
                      const isToday =
                        dateStr === new Date().toISOString().split('T')[0]

                      return (
                        <motion.div
                          key={dayIdx}
                          className={`aspect-square rounded-md ${color} border ${
                            isToday
                              ? 'border-primary'
                              : 'border-primary/20'
                          } cursor-pointer transition-all`}
                          whileHover={{ scale: 1.15, boxShadow: '0 0 10px rgba(168, 85, 247, 0.5)' }}
                          title={`${dateStr}: ${
                            history?.completionRate
                              ? `${history.completionRate}% complete`
                              : 'No data'
                          }`}
                        >
                          <div className="w-full h-full flex items-center justify-center text-xs font-mono-display text-text-muted font-bold">
                            {date.getDate()}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="border-t border-primary/20 pt-4">
          <p className="text-xs text-text-muted mb-3">Legend</p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-bg-secondary" />
              <span className="text-text-muted">No Data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-danger/70" />
              <span className="text-text-muted">{'<50%'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-warning/70" />
              <span className="text-text-muted">50-79%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-success/70" />
              <span className="text-text-muted">80%+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
