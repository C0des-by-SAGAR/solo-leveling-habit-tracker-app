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

export interface MealEntry {
  id: string;
  timestamp: string;
  category: 'breakfast' | 'lunch' | 'evening_snacks' | 'dinner' | 'miscellaneous';
  items: {
    name: string;
    quantity: string;
    calories?: number;
  }[];
}

export interface DailyDiet {
  date: string;
  meals: MealEntry[];
  proteinIntake: number;
  totalCalories: number;
  consistencyScore: number;
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
}
