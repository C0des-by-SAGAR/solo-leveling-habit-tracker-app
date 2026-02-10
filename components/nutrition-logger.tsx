'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, X, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { DailyDiet, FoodNutrition } from '@/lib/types'
import { getNutritionData, FOOD_DATABASE } from '@/lib/nutrition-db'

interface NutritionLoggerProps {
  diet: DailyDiet
  onAddFood: (food: FoodNutrition) => void
  onRemoveFood: (mealIndex: number, foodIndex: number) => void
}

export function NutritionLogger({
  diet,
  onAddFood,
  onRemoveFood,
}: NutritionLoggerProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    'breakfast' | 'lunch' | 'evening_snacks' | 'dinner' | 'miscellaneous'
  >('breakfast')
  const [foodInput, setFoodInput] = useState('')
  const [quantity, setQuantity] = useState('100')
  const [unit, setUnit] = useState<'g' | 'oz' | 'cup' | 'piece' | 'ml'>('g')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [selectedFood, setSelectedFood] = useState<FoodNutrition | null>(null)

  const categories = [
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'evening_snacks', label: 'Snacks' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'miscellaneous', label: 'Other' },
  ] as const

  const handleFoodSearch = (value: string) => {
    setFoodInput(value)
    if (value.length > 1) {
      const matches = Object.keys(FOOD_DATABASE)
        .filter((food) => food.includes(value.toLowerCase()))
        .slice(0, 5)
      setSuggestions(matches)
    } else {
      setSuggestions([])
    }
  }

  const handleSelectFood = (foodName: string) => {
    const nutrition = getNutritionData(foodName, parseFloat(quantity), unit)
    if (nutrition) {
      setSelectedFood(nutrition)
      setFoodInput(foodName)
      setSuggestions([])
    }
  }

  const handleAddFood = () => {
    if (selectedFood) {
      onAddFood(selectedFood)
      setFoodInput('')
      setQuantity('100')
      setUnit('g')
      setSelectedFood(null)
    }
  }

  const totalProtein = diet.meals.reduce(
    (sum, meal) =>
      sum + meal.items.reduce((mealSum, item) => mealSum + item.protein, 0),
    0
  )
  const totalCarbs = diet.meals.reduce(
    (sum, meal) =>
      sum + meal.items.reduce((mealSum, item) => mealSum + item.carbs, 0),
    0
  )
  const totalFats = diet.meals.reduce(
    (sum, meal) =>
      sum + meal.items.reduce((mealSum, item) => mealSum + item.fats, 0),
    0
  )
  const totalCalories = diet.meals.reduce(
    (sum, meal) =>
      sum + meal.items.reduce((mealSum, item) => mealSum + item.calories, 0),
    0
  )

  const proteinProgress = (totalProtein / diet.proteinGoal) * 100

  return (
    <div className="space-y-4 pb-20">
      {/* Daily Totals */}
      <motion.div className="glass-card p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h3 className="text-sm font-display text-primary mb-4">DAILY NUTRITION</h3>

        <div className="space-y-3">
          {/* Protein Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-text-secondary">Protein</span>
              <span className="text-sm font-mono-display text-accent">
                {Math.round(totalProtein)}g / {diet.proteinGoal}g
              </span>
            </div>
            <div className="relative h-2 bg-bg-secondary rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full transition-all ${
                  proteinProgress >= 100
                    ? 'bg-gradient-to-r from-success to-accent'
                    : 'bg-gradient-to-r from-primary to-primary-glow'
                }`}
                animate={{ width: `${Math.min(proteinProgress, 100)}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
            {proteinProgress < 70 && (
              <p className="text-xs text-text-muted mt-1">
                {Math.round(diet.proteinGoal - totalProtein)}g more needed
              </p>
            )}
            {proteinProgress >= 100 && (
              <p className="text-xs text-success mt-1">✓ Goal reached!</p>
            )}
          </div>

          {/* Macros Overview */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-primary/20">
            <div className="text-center">
              <div className="text-sm font-mono-display text-accent">
                {Math.round(totalCarbs)}g
              </div>
              <p className="text-xs text-text-muted">Carbs</p>
            </div>
            <div className="text-center">
              <div className="text-sm font-mono-display text-accent">
                {Math.round(totalFats)}g
              </div>
              <p className="text-xs text-text-muted">Fats</p>
            </div>
            <div className="text-center">
              <div className="text-sm font-mono-display text-accent">
                {totalCalories}
              </div>
              <p className="text-xs text-text-muted">Calories</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Food Input Section */}
      <motion.div className="glass-card p-4">
        <h3 className="text-sm font-display text-primary mb-3">ADD FOOD</h3>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-display whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-primary/30 text-primary'
                  : 'bg-bg-secondary text-text-secondary hover:text-text-primary'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        <div className="space-y-3">
          {/* Food Search Input */}
          <div>
            <label className="text-xs text-text-secondary mb-2 block">
              Food Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search or type food..."
                value={foodInput}
                onChange={(e) => handleFoodSearch(e.target.value)}
                className="w-full bg-bg-secondary border border-primary/20 rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50"
              />
              {suggestions.length > 0 && (
                <motion.div
                  className="absolute top-full left-0 right-0 bg-bg-secondary border border-primary/20 rounded-lg mt-1 z-10"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {suggestions.map((food) => (
                    <motion.button
                      key={food}
                      onClick={() => handleSelectFood(food)}
                      className="w-full text-left px-3 py-2 text-xs text-text-secondary hover:text-primary hover:bg-bg-primary/50 transition-colors"
                      whileHover={{ paddingLeft: 16 }}
                    >
                      {food}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Quantity Input */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-text-secondary mb-2 block">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-bg-secondary border border-primary/20 rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary/50"
              />
            </div>
            <div>
              <label className="text-xs text-text-secondary mb-2 block">
                Unit
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as any)}
                className="w-full bg-bg-secondary border border-primary/20 rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary/50"
              >
                <option value="g">grams</option>
                <option value="oz">ounces</option>
                <option value="cup">cup</option>
                <option value="piece">piece</option>
                <option value="ml">ml</option>
              </select>
            </div>
          </div>

          {/* Nutrition Preview */}
          {selectedFood && (
            <motion.div
              className="bg-bg-secondary/50 border border-success/20 p-3 rounded-lg space-y-2"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h4 className="text-xs font-bold text-success">
                Nutrition Preview
              </h4>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>
                  <p className="text-text-muted">Protein</p>
                  <p className="font-bold text-accent">
                    {selectedFood.protein}g
                  </p>
                </div>
                <div>
                  <p className="text-text-muted">Carbs</p>
                  <p className="font-bold text-accent">
                    {selectedFood.carbs}g
                  </p>
                </div>
                <div>
                  <p className="text-text-muted">Fats</p>
                  <p className="font-bold text-accent">{selectedFood.fats}g</p>
                </div>
                <div>
                  <p className="text-text-muted">Cal</p>
                  <p className="font-bold text-accent">
                    {selectedFood.calories}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <Button
            onClick={handleAddFood}
            disabled={!selectedFood}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Food
          </Button>
        </div>
      </motion.div>

      {/* Meals by Category */}
      {categories.map((cat) => {
        const meal = diet.meals.find((m) => m.category === cat.id)
        if (!meal || meal.items.length === 0) return null

        return (
          <motion.div key={cat.id} className="glass-card p-4">
            <h3 className="text-sm font-display text-accent mb-3">
              {cat.label.toUpperCase()}
            </h3>
            <div className="space-y-2">
              {meal.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center justify-between bg-bg-secondary/50 p-2 rounded-lg"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-text-primary truncate">
                      {item.foodName}
                    </p>
                    <p className="text-xs text-text-muted">
                      {item.quantity}{item.unit} • {item.protein}g protein • {item.calories}cal
                    </p>
                  </div>
                  <motion.button
                    onClick={() => onRemoveFood(diet.meals.indexOf(meal), idx)}
                    className="text-danger hover:bg-danger/20 p-1.5 rounded transition-colors flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
