'use client'

import { motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ActivityItem {
  id: string
  name: string
  details?: string
  timestamp: string
}

interface ActivityLoggerProps {
  title: string
  icon: string
  items: ActivityItem[]
  onAdd: (name: string, details?: string) => void
  onRemove: (id: string) => void
  placeholder?: string
}

export function ActivityLogger({
  title,
  icon,
  items,
  onAdd,
  onRemove,
  placeholder = 'Activity name...',
}: ActivityLoggerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [detailsValue, setDetailsValue] = useState('')

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue, detailsValue || undefined)
      setInputValue('')
      setDetailsValue('')
      setIsOpen(false)
    }
  }

  return (
    <div className="glass-card p-4 space-y-4">
      <h3 className="text-sm font-display text-primary flex items-center gap-2">
        <span>{icon}</span>
        {title}
      </h3>

      {/* Activity List */}
      {items.length > 0 ? (
        <motion.div className="space-y-2" layout>
          {items.map((item) => (
            <motion.div
              key={item.id}
              className="flex items-start gap-3 p-3 bg-bg-secondary rounded-lg"
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {item.name}
                </p>
                {item.details && (
                  <p className="text-xs text-text-muted">{item.details}</p>
                )}
                <p className="text-xs text-text-muted mt-1">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onRemove(item.id)}
                className="p-1 hover:bg-danger/20 rounded"
              >
                <X size={16} className="text-danger" />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-xs text-text-muted text-center py-4">
          No activities logged yet
        </p>
      )}

      {/* Add Form */}
      {isOpen && (
        <motion.div
          className="space-y-2 pt-2 border-t border-primary/20"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Input
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAdd()
            }}
            className="bg-bg-secondary border-primary/30"
          />
          <Input
            placeholder="Details (optional)..."
            value={detailsValue}
            onChange={(e) => setDetailsValue(e.target.value)}
            className="bg-bg-secondary border-primary/30 text-xs"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleAdd}
              className="flex-1"
              disabled={!inputValue.trim()}
            >
              Add
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </motion.div>
      )}

      {!isOpen && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="w-full"
        >
          <Plus size={16} className="mr-2" />
          Add Activity
        </Button>
      )}
    </div>
  )
}
