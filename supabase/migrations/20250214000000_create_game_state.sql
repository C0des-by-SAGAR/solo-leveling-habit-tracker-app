-- Solo Leveling Habit Tracker – game state table
-- Run this in Supabase: SQL Editor → New query → paste → Run
-- Requires Supabase Auth (enable Anonymous or another provider so each user has auth.users.id).

-- One row per user; full app state stored as JSON (profile, quests, habits, diet, skills, streak, sleep, etc.)
create table if not exists public.game_state (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  state jsonb not null default '{}',
  updated_at timestamptz not null default now(),
  unique(user_id)
);

-- Index for fast lookup by user
create index if not exists game_state_user_id_idx on public.game_state(user_id);

-- Row Level Security: users can only read/write their own row
alter table public.game_state enable row level security;

create policy "Users can read own game_state"
  on public.game_state for select
  using (auth.uid() = user_id);

create policy "Users can insert own game_state"
  on public.game_state for insert
  with check (auth.uid() = user_id);

create policy "Users can update own game_state"
  on public.game_state for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own game_state"
  on public.game_state for delete
  using (auth.uid() = user_id);

comment on table public.game_state is 'Solo Leveling habit tracker: one document per user. state = full GameState JSON (profile, dailyQuests, habits, diet, skills, streak, sleepLog, dailySummaries, etc.).';
