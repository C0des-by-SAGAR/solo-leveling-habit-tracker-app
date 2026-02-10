'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { DailyDiet, MealEntry } from '@/lib/types'

interface NutritionLoggerProps {
  diet: DailyDiet
  onAddMeal: (category: 'breakfast' | 'lunch' | 'evening_snacks' | 'dinner' | 'miscellaneous', itemName: string, protein: number) => void
  onRemoveMeal: (mealId: string, itemIndex: number) => void
}

export function NutritionLogger({ diet, onAddMeal, onRemoveMeal }: NutritionLoggerProps) {
  const [expandedCategory, setExpandedCategory] = useState<'breakfast' | 'lunch' | 'evening_snacks' | 'dinner' | 'miscellaneous' | null>(null)
  const [inputValues, setInputValues] = useState<Record<string, { name: string; protein: string }>>({
    breakfast: { name: '', protein: '' },
    lunch: { name: '', protein: '' },
    evening_snacks: { name: '', protein: '' },
    dinner: { name: '', protein: '' },
    miscellaneous: { name: '', protein: '' },
  })

  const categoryLabels = {
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    evening_snacks: 'Evening Snacks',
    dinner: 'Dinner',
    miscellaneous: 'Miscellaneous',
  }

  const getMealsForCategory = (category: 'breakfast' | 'lunch' | 'evening_snacks' | 'dinner' | 'miscellaneous') => {
    return diet.meals.filter((m) => m.category === category)
  }

  const handleAddMeal = (category: 'breakfast' | 'lunch' | 'evening_snacks' | 'dinner' | 'miscellaneous') => {
    const input = inputValues[category]
    if (input.name.trim()) {
      const protein = parseInt(input.protein) || 0
      onAddMeal(category, input.name, protein)
      setInputValues({
        ...inputValues,
        [category]: { name: '', protein: '' },
      })
    }
  }

  const proteinProgress = (diet.proteinIntake / diet.proteinGoal) * 100

  return (
    <div className="space-y-4 pb-20">
      {/* Protein Goal Progress */}
      <motion.div className="glass-card p-4" whileHover={{ scale: 1.02 }}>
        <h3 className="text-sm font-display text-primary mb-4">Protein Goal</h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-mono-display text-accent">{diet.proteinIntake}g</span>
            <span className="text-xs text-text-muted">of {diet.proteinGoal}g</span>
          </div>

          <div className="w-full h-3 bg-bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-primary-glow"
              animate={{ width: `${Math.min(proteinProgress, 100)}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className={proteinProgress >= 100 ? 'text-success' : 'text-text-muted'}>
              {proteinProgress >= 100
                ? 'Goal achieved!'
                : `${Math.round(100 - proteinProgress)}% remaining`}
            </span>
            <span className="text-text-muted">{Math.round(proteinProgress)}%</span>
          </div>
        </div>
      </motion.div>

      {/* Meal Categories */}
      {(Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>).map((category) => {
        const meals = getMealsForCategory(category)
        const categoryProtein = meals.reduce((sum, meal) => sum + (meal.items || []).reduce((itemSum, item) => itemSum + (parseInt(item.quantity) || 0), 0), 0)

        return (
          <motion.div key={category} className="glass-card p-4" whileHover={{ scale: 1.02 }}>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() =>
                setExpandedCategory(expandedCategory === category ? null : category)
              }
            >
              <div className="flex-1">
                <h3 className="text-sm font-display text-accent">{categoryLabels[category]}</h3>
                <p className="text-xs text-text-muted mt-1">Protein: {categoryProtein}g</p>
              </div>
              <motion.div
                animate={{ rotate: expandedCategory === category ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Plus className="w-4 h-4 text-primary" />
              </motion.div>
            </div>

            <motion.div
              initial={false}
              animate={{
                height: expandedCategory === category ? 'auto' : 0,
                opacity: expandedCategory === category ? 1 : 0,
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-primary/20 space-y-3">
                {meals.length > 0 && (
                  <div className="space-y-2">
                    {meals.map((meal) => (
                      <div key={meal.id} className="space-y-2 p-2 bg-bg-secondary/30 rounded">
                        {meal.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <div>
                              <span className="text-text-primary">{item.name}</span>
                              {item.quantity && <span className="text-text-muted ml-2">({item.quantity}g protein)</span>}
                            </div>
                            <button
                              onClick={() => onRemoveMeal(meal.id, idx)}
                              className="text-danger hover:text-danger/80"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Food item"
                    value={inputValues[category].name}
                    onChange={(e) =>
                      setInputValues({
                        ...inputValues,
                        [category]: { ...inputValues[category], name: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg bg-bg-secondary border border-primary/20 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
                  />
                  <input
                    type="number"
                    placeholder="Protein (g)"
                    value={inputValues[category].protein}
                    onChange={(e) =>
                      setInputValues({
                        ...inputValues,
                        [category]: { ...inputValues[category], protein: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg bg-bg-secondary border border-primary/20 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
                  />
                  <Button
                    onClick={() => handleAddMeal(category)}
                    className="w-full"
                    size="sm"
                  >
                    Add Item
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )
      })}

      {/* Nutrition Summary */}
      <motion.div className="glass-card p-4" whileHover={{ scale: 1.02 }}>
        <h3 className="text-sm font-display text-primary mb-3">Daily Summary</h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-text-secondary">Meals Logged</span>
            <span className="font-mono-display text-accent">{diet.meals.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Protein Total</span>
            <span className="font-mono-display text-primary">{diet.proteinIntake}g</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Progress</span>
            <span className="font-mono-display text-success">{Math.round(proteinProgress)}%</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
