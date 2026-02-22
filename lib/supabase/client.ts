import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey)
}

// Lazy initialization: only create client when actually needed and configured
let supabaseInstance: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient {
  if (!supabaseInstance) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
    }
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseInstance
}
