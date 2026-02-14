export type MinionName = 'IGRIS' | 'BERU' | 'IRON' | 'KAISEL' | 'TUSK' | 'TANK'
export type EntranceType = 'phase_through_wall' | 'crystallize' | 'rise_from_shadow' | 'descend_from_top' | 'unfold_from_darkness' | 'roll_in'

export interface ShadowMinion {
  id: string
  name: MinionName
  assignedQuest: string
  personality: string
  reportLine: string
  dismissLine: string
  standDownLine: string
  entranceType: EntranceType
  position: 'left' | 'right' | 'center'
  size: 'sm' | 'md' | 'lg'
  sprite: string
  glowColor: string
}

export const SHADOW_ARMY: ShadowMinion[] = [
  {
    id: 'igris',
    name: 'IGRIS',
    assignedQuest: 'Gym',
    personality: 'Noble. Silent. Disappointed when you skip.',
    reportLine: 'My Lord... the training grounds remain untouched today.',
    dismissLine: 'I will accompany you to battle.',
    standDownLine: 'Strength worthy of a king.',
    entranceType: 'phase_through_wall',
    position: 'left',
    size: 'lg',
    sprite: '/minion-igris.png',
    glowColor: '#06b6d4',
  },
  {
    id: 'beru',
    name: 'BERU',
    assignedQuest: 'Study',
    personality: 'Aggressive. Frantic. Hates laziness with a passion.',
    reportLine: 'KEKEKE! You dare neglect your studies?! UNACCEPTABLE!',
    dismissLine: 'KEKEKE! Now you show intelligence! Go!',
    standDownLine: '...Acceptable. For now.',
    entranceType: 'crystallize',
    position: 'left',
    size: 'md',
    sprite: '/minion-beru.png',
    glowColor: '#06b6d4',
  },
  {
    id: 'iron',
    name: 'IRON',
    assignedQuest: 'Classes',
    personality: 'Stoic. Steadfast. A soldier who never misses formation.',
    reportLine: 'Your Majesty. Formation was missed. We do not abandon our post.',
    dismissLine: 'To the battlefield. I will guard your flank.',
    standDownLine: 'Discipline maintained. As expected.',
    entranceType: 'rise_from_shadow',
    position: 'left',
    size: 'lg',
    sprite: '/minion-iron.png',
    glowColor: '#6366f1',
  },
  {
    id: 'kaisel',
    name: 'KAISEL',
    assignedQuest: 'Programming',
    personality: 'Ancient. Patient. Wise. Speaks in low growls.',
    reportLine: '...The code lies dormant, My Lord. The dragon does not sleep forever.',
    dismissLine: 'Rise. Master what you must.',
    standDownLine: 'The ancient tongue bends to your will.',
    entranceType: 'descend_from_top',
    position: 'center',
    size: 'lg',
    sprite: '/minion-kaisel.png',
    glowColor: '#a855f7',
  },
  {
    id: 'tusk',
    name: 'TUSK',
    assignedQuest: 'Content',
    personality: 'Chaotic. Unsettling. Oddly enthusiastic about creative work.',
    reportLine: 'Heheheh... The world waits for your content, My Lord.',
    dismissLine: 'Heheheh... Create something worthy of fear.',
    standDownLine: 'The shadows spread your message.',
    entranceType: 'unfold_from_darkness',
    position: 'right',
    size: 'md',
    sprite: '/minion-tusk.png',
    glowColor: '#f97316',
  },
  {
    id: 'tank',
    name: 'TANK',
    assignedQuest: 'Sleep',
    personality: 'Gentle giant. Deeply protective. Worried when you stay up late.',
    reportLine: '...My Lord should rest. I will keep watch.',
    dismissLine: 'Sleep. Your army stands guard.',
    standDownLine: 'Good. Rest is strength.',
    entranceType: 'roll_in',
    position: 'left',
    size: 'sm',
    sprite: '/minion-tank.png',
    glowColor: '#10b981',
  },
]

export function getSummonedMinions(questNames: string[]): ShadowMinion[] {
  return SHADOW_ARMY.filter((minion) =>
    questNames.some((q) => q.toLowerCase().includes(minion.assignedQuest.toLowerCase()))
  ).slice(0, 3)
}
