export interface Stats {
  strength: number;
  intelligence: number;
  discipline: number;
  creativity: number;
  consistency: number;
}

export interface HunterProfile {
  name: string;
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
  title: string;
  titleSubtitle: string;
  createdAt: string;
}

export interface DailyVitals {
  date: string;
  hp: number;
  mp: number;
  fatigue: number;
  energyRating: number;
  focusRating: number;
  moodRating: number;
  sleep: {
    bedTime: string;
    wakeTime: string;
    quality: 1 | 2 | 3;
    duration: number;
  };
}

export interface QuestSubGoal {
  id: string;
  description: string;
  completed: boolean;
}

export interface DailyQuest {
  id: string;
  name: string;
  description: string;
  xpReward: number;
  statAffected: keyof Stats;
  statIncrease: number;
  completed: boolean;
  completedAt?: string;
  category: 'core' | 'optional';
  icon: string;
  subGoals?: QuestSubGoal[];
  skillId?: string;
}

export interface WorkoutSession {
  id: string;
  date: string;
  timestamp: string;
  type: 'push' | 'pull' | 'legs' | 'cardio' | 'other';
  duration: number;
  exercises: {
    name: string;
    sets: number;
    reps: number;
    weight?: number;
    notes?: string;
  }[];
  caloriesBurned?: number;
  xpGained: number;
  strengthIncrease: number;
  completed: boolean;
}

export interface FoodNutrition {
  foodName: string;
  quantity: number;
  unit: 'g' | 'oz' | 'cup' | 'piece' | 'ml';
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
}

export interface MealEntry {
  id: string;
  timestamp: string;
  category: 'breakfast' | 'lunch' | 'evening_snacks' | 'dinner' | 'miscellaneous';
  items: (FoodNutrition)[];
}

export interface DailyDiet {
  date: string;
  meals: MealEntry[];
  proteinIntake: number;
  proteinGoal: number;
  carbs: number;
  fats: number;
  totalCalories: number;
  consistencyScore: number;
}

export interface HabitWarningLevel {
  level: 'safe' | 'caution' | 'warning';
  threshold: number;
  xpPenalty: number;
  message: string;
}

export interface NegativeHabit {
  cigarettes: {
    count: number;
    warningLevel: 'safe' | 'caution' | 'warning';
    xpPenalty: number;
    breakStreak: boolean;
  };
  masturbation: {
    count: number;
    warningLevel: 'safe' | 'caution' | 'warning';
    xpPenalty: number;
    breakStreak: boolean;
  };
  alcohol: {
    count: number;
    warningLevel: 'safe' | 'caution' | 'warning';
    xpPenalty: number;
    breakStreak: boolean;
  };
}

export interface DailySleep {
  date: string;
  bedTime: string;
  wakeTime: string;
  duration: number;
  quality: 1 | 2 | 3;
  timestamp: string;
}

export interface SkillAbility {
  level: number;
  name: string;
  description: string;
  statBonus: Partial<Stats>;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  category: 'academic' | 'technical' | 'business' | 'physical' | 'creative';
  icon: string;
  relatedQuests: string[];
  abilities: SkillAbility[];
  unlockedAbilities: number[];
}

export interface DailySummary {
  date: string;
  oneWin: string;
  totalXPGained: number;
  totalXPLost: number;
  netXP: number;
  questCompletionRate: number;
  statsGained: Partial<Stats>;
  systemWarnings: string[];
  rank: string;
}

export interface StreakData {
  current: number;
  longest: number;
  lastActive: string;
  history: {
    date: string;
    active: boolean;
    completionRate: number;
  }[];
}

export interface GameState {
  profile: HunterProfile;
  stats: Stats;
  dailyQuests: DailyQuest[];
  vitals: DailyVitals;
  workouts: WorkoutSession[];
  diet: DailyDiet;
  skills: Skill[];
  streak: StreakData;
  habits: NegativeHabit;
  sleepLog: DailySleep[];
  dailySummaries: DailySummary[];
}
