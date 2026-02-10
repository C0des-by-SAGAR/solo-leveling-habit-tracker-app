import type { Skill, Stats } from './types'

export interface SkillAbility {
  level: number
  name: string
  description: string
  statBonus: Partial<Stats>
}

// Define abilities for each skill that unlock at specific levels
export const SKILL_ABILITIES: Record<string, SkillAbility[]> = {
  'communication': [
    {
      level: 5,
      name: 'Confident Speaker',
      description: '+2 Charisma - Improved persuasion ability',
      statBonus: { charisma: 2 },
    },
    {
      level: 10,
      name: 'Master Communicator',
      description: '+5 Charisma - Unlock Leadership potential',
      statBonus: { charisma: 5 },
    },
    {
      level: 25,
      name: 'Legendary Orator',
      description: '+10 Charisma - Command respect in any room',
      statBonus: { charisma: 10 },
    },
  ],
  'programming': [
    {
      level: 5,
      name: 'Code Novice',
      description: '+3 Intelligence - Faster problem solving',
      statBonus: { intelligence: 3 },
    },
    {
      level: 10,
      name: 'Code Expert',
      description: '+8 Intelligence - Expert-level skills',
      statBonus: { intelligence: 8 },
    },
    {
      level: 25,
      name: 'Tech Architect',
      description: '+15 Intelligence - Design complex systems',
      statBonus: { intelligence: 15 },
    },
  ],
  'fitness': [
    {
      level: 5,
      name: 'Athlete',
      description: '+3 Strength - Enhanced physical power',
      statBonus: { strength: 3 },
    },
    {
      level: 10,
      name: 'Elite Athlete',
      description: '+8 Strength + +5 Agility',
      statBonus: { strength: 8, agility: 5 },
    },
    {
      level: 25,
      name: 'Peak Condition',
      description: '+15 Strength + +10 Agility - Peak performance',
      statBonus: { strength: 15, agility: 10 },
    },
  ],
  'writing': [
    {
      level: 5,
      name: 'Emerging Writer',
      description: '+3 Creativity - Unique perspectives',
      statBonus: { creativity: 3 },
    },
    {
      level: 10,
      name: 'Skilled Writer',
      description: '+8 Creativity - Compelling narratives',
      statBonus: { creativity: 8 },
    },
    {
      level: 25,
      name: 'Master Storyteller',
      description: '+15 Creativity - Shape narratives that inspire',
      statBonus: { creativity: 15 },
    },
  ],
}

// Calculate skill XP gained from a quest
export function calculateSkillXPFromQuest(baseXP: number, difficulty: number = 1): number {
  return Math.floor(baseXP * 0.3 * difficulty) // 30% of quest XP goes to related skill
}

// Check for unlocked abilities when skill levels up
export function checkUnlockedAbilities(
  skillId: string,
  newLevel: number,
  currentlyUnlocked: number[] = []
): number[] {
  const abilities = SKILL_ABILITIES[skillId.toLowerCase()] || []
  const newUnlocked = [...currentlyUnlocked]

  abilities.forEach((ability, index) => {
    if (newLevel >= ability.level && !currentlyUnlocked.includes(ability.level)) {
      newUnlocked.push(ability.level)
    }
  })

  return newUnlocked
}

// Get all unlocked abilities for a skill
export function getUnlockedAbilitiesForSkill(
  skillId: string,
  unlockedLevels: number[]
): SkillAbility[] {
  const abilities = SKILL_ABILITIES[skillId.toLowerCase()] || []
  return abilities.filter((ability) => unlockedLevels.includes(ability.level))
}

// Calculate total stat bonus from all unlocked abilities
export function calculateTotalSkillBonus(skills: Skill[]): Partial<Stats> {
  const totalBonus: Partial<Stats> = {
    strength: 0,
    intelligence: 0,
    agility: 0,
    charisma: 0,
    creativity: 0,
  }

  skills.forEach((skill) => {
    const unlockedAbilities = getUnlockedAbilitiesForSkill(
      skill.id,
      skill.unlockedAbilities
    )
    unlockedAbilities.forEach((ability) => {
      Object.entries(ability.statBonus).forEach(([stat, value]) => {
        const statKey = stat as keyof Stats
        if (totalBonus[statKey] !== undefined) {
          totalBonus[statKey]! += value
        }
      })
    })
  })

  return totalBonus
}

// Format skill data for display
export function getSkillDisplay(skill: Skill) {
  const abilities = getUnlockedAbilitiesForSkill(skill.id, skill.unlockedAbilities)
  const nextAbility = SKILL_ABILITIES[skill.id.toLowerCase()]?.find(
    (a) => a.level > skill.level
  )

  return {
    ...skill,
    unlockedAbilitiesList: abilities,
    nextAbility,
  }
}
