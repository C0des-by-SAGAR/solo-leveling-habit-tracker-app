import { getSupabaseClient, isSupabaseConfigured } from './client'
import type { GameState } from '@/lib/types'

export async function fetchGameState(userId: string): Promise<GameState | null> {
  if (!isSupabaseConfigured()) return null
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from('game_state')
    .select('state')
    .eq('user_id', userId)
    .maybeSingle()
  if (error) {
    console.error('Supabase fetch game_state error:', error)
    return null
  }
  return (data?.state as GameState) ?? null
}

export async function upsertGameState(userId: string, state: GameState): Promise<boolean> {
  if (!isSupabaseConfigured()) return false
  const supabase = getSupabaseClient()
  const { error } = await supabase
    .from('game_state')
    .upsert(
      { user_id: userId, state, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' }
    )
  if (error) {
    console.error('Supabase upsert game_state error:', error)
    return false
  }
  return true
}
