// Simple food nutrition database for common foods
export const FOOD_DATABASE: Record<
  string,
  {
    calories: number
    protein: number
    carbs: number
    fats: number
    fiber: number
  }
> = {
  // Proteins
  'chicken breast': {
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 3.6,
    fiber: 0,
  },
  'egg white': { calories: 17, protein: 3.6, carbs: 0.4, fats: 0.1, fiber: 0 },
  'whole egg': { calories: 78, protein: 6.3, carbs: 0.6, fats: 5.3, fiber: 0 },
  salmon: { calories: 208, protein: 20, carbs: 0, fats: 13, fiber: 0 },
  beef: { calories: 250, protein: 26, carbs: 0, fats: 15, fiber: 0 },
  'greek yogurt': {
    calories: 59,
    protein: 10,
    carbs: 3.3,
    fats: 0.4,
    fiber: 0,
  },
  milk: { calories: 61, protein: 3.2, carbs: 4.8, fats: 3.3, fiber: 0 },
  tofu: { calories: 76, protein: 8, carbs: 1.9, fats: 4.8, fiber: 1 },
  'whey protein': {
    calories: 120,
    protein: 25,
    carbs: 3,
    fats: 1,
    fiber: 0,
  },

  // Carbs
  rice: { calories: 130, protein: 2.7, carbs: 28, fats: 0.3, fiber: 0.4 },
  oats: { calories: 150, protein: 5, carbs: 27, fats: 3, fiber: 4 },
  bread: { calories: 265, protein: 9, carbs: 49, fats: 3.3, fiber: 2.7 },
  banana: { calories: 89, protein: 1.1, carbs: 23, fats: 0.3, fiber: 2.6 },
  apple: { calories: 52, protein: 0.3, carbs: 14, fats: 0.2, fiber: 2.4 },
  'sweet potato': {
    calories: 86,
    protein: 1.6,
    carbs: 20,
    fats: 0.1,
    fiber: 3,
  },
  pasta: { calories: 131, protein: 5, carbs: 25, fats: 1.1, fiber: 1.8 },
  quinoa: { calories: 120, protein: 4.4, carbs: 21, fats: 1.9, fiber: 2.8 },

  // Fats
  avocado: { calories: 160, protein: 2, carbs: 9, fats: 15, fiber: 7 },
  'olive oil': { calories: 119, protein: 0, carbs: 0, fats: 13.5, fiber: 0 },
  almonds: { calories: 579, protein: 21, carbs: 22, fats: 50, fiber: 12.5 },
  'peanut butter': {
    calories: 588,
    protein: 25,
    carbs: 20,
    fats: 50,
    fiber: 6,
  },
  'dark chocolate': {
    calories: 598,
    protein: 8,
    carbs: 46,
    fats: 43,
    fiber: 4,
  },

  // Vegetables
  broccoli: { calories: 34, protein: 2.8, carbs: 7, fats: 0.4, fiber: 2.4 },
  spinach: { calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4, fiber: 2.2 },
  carrot: { calories: 41, protein: 0.9, carbs: 10, fats: 0.2, fiber: 2.8 },
  cabbage: { calories: 25, protein: 1.3, carbs: 5.8, fats: 0.1, fiber: 2.4 },
  'bell pepper': {
    calories: 31,
    protein: 1,
    carbs: 6,
    fats: 0.3,
    fiber: 2,
  },
  onion: { calories: 40, protein: 1.1, carbs: 9, fats: 0.1, fiber: 1.7 },
}

export function getNutritionData(
  foodName: string,
  quantity: number,
  unit: 'g' | 'oz' | 'cup' | 'piece' | 'ml' = 'g'
) {
  const normalized = foodName.toLowerCase().trim()
  const baseData = FOOD_DATABASE[normalized]

  if (!baseData) {
    return null
  }

  // Convert quantity to grams for base calculation (assuming base is per 100g)
  let grams = quantity
  switch (unit) {
    case 'oz':
      grams = quantity * 28.35
      break
    case 'cup':
      grams = quantity * 240 // approximate for most foods
      break
    case 'piece':
      grams = quantity * 50 // average piece weight
      break
    case 'ml':
      grams = quantity // assume 1ml = 1g for liquids
      break
  }

  const multiplier = grams / 100

  return {
    foodName,
    quantity,
    unit,
    calories: Math.round(baseData.calories * multiplier),
    protein: Math.round(baseData.protein * multiplier * 10) / 10,
    carbs: Math.round(baseData.carbs * multiplier * 10) / 10,
    fats: Math.round(baseData.fats * multiplier * 10) / 10,
    fiber: Math.round(baseData.fiber * multiplier * 10) / 10,
  }
}

export function calculateHabitWarningLevel(
  habitType: 'cigarettes' | 'alcohol' | 'screenTime',
  count: number
): {
  level: 'safe' | 'caution' | 'warning'
  xpPenalty: number
  message: string
  breakStreak: boolean
} {
  switch (habitType) {
    case 'cigarettes':
      if (count === 0) {
        return {
          level: 'safe',
          xpPenalty: 0,
          message: 'Great job staying smoke-free!',
          breakStreak: false,
        }
      } else if (count <= 2) {
        return {
          level: 'caution',
          xpPenalty: 5 * count,
          message: `${count} cigarette(s) consumed. Caution zone.`,
          breakStreak: false,
        }
      } else {
        return {
          level: 'warning',
          xpPenalty: 10 * (count - 2),
          message: `⚠️ ${count} cigarettes! Streak broken. Heavy penalty.`,
          breakStreak: true,
        }
      }

    case 'alcohol':
      if (count === 0) {
        return {
          level: 'safe',
          xpPenalty: 0,
          message: 'Alcohol-free day. Excellent!',
          breakStreak: false,
        }
      } else if (count === 1) {
        return {
          level: 'caution',
          xpPenalty: 15,
          message: '1 drink logged. Caution zone.',
          breakStreak: false,
        }
      } else {
        return {
          level: 'warning',
          xpPenalty: 30 * count,
          message: `⚠️ ${count} drinks! Streak broken. Major penalty.`,
          breakStreak: true,
        }
      }

    case 'screenTime':
      if (count <= 120) {
        return {
          level: 'safe',
          xpPenalty: 0,
          message: `${count}min screen time. Within healthy limits.`,
          breakStreak: false,
        }
      } else if (count <= 180) {
        return {
          level: 'caution',
          xpPenalty: Math.floor((count - 120) / 20) * 5,
          message: `${count}min screen time. Caution zone.`,
          breakStreak: false,
        }
      } else {
        return {
          level: 'warning',
          xpPenalty: Math.floor((count - 180) / 30) * 15,
          message: `⚠️ ${count}min screen time! Excessive. Streak broken.`,
          breakStreak: true,
        }
      }

    default:
      return {
        level: 'safe',
        xpPenalty: 0,
        message: '',
        breakStreak: false,
      }
  }
}
