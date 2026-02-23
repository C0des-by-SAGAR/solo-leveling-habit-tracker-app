# Solo Leveling Habit Tracker - Complete Documentation

## Overview

Solo Leveling Habit Tracker is a gamified habit and fitness tracking application inspired by the popular anime/manhwa "Solo Leveling". The app transforms daily tasks and habits into an immersive gaming experience with shadow minions, XP rewards, and character progression.

**Live Demo**: Built with Next.js 16, Tailwind CSS, Framer Motion, and Supabase
**Repository**: C0des-by-SAGAR/solo-leveling-habit-tracker-app

---

## Table of Contents

1. [Core Features](#core-features)
2. [Technical Architecture](#technical-architecture)
3. [Recent Updates](#recent-updates)
4. [Authentication System](#authentication-system)
5. [Database Schema](#database-schema)
6. [Shadow Alert System](#shadow-alert-system)
7. [UI Components & Design](#ui-components--design)
8. [Getting Started](#getting-started)
9. [Deployment](#deployment)

---

## Core Features

### 1. **Gamified Habit Tracking**
Users create and track daily quests (habits) with rewards:
- XP (Experience Points) for quest completion
- Stat increases (Strength, Constitution, Intelligence, Wisdom, Dexterity, Charm)
- Level progression (starts at E-rank, unlocks higher ranks)
- Daily quest system with completion tracking

### 2. **Shadow Army Notification System**
Six unique shadow minions appear as notifications when quests are incomplete:
- **Iron** - Classes/Study (Purple glow, #6366f1)
- **Beru** - Study Blocks (Cyan glow, #06b6d4)
- **Igris** - Gym Workouts (Cyan glow, #06b6d4)
- **Kaisel** - Programming Tasks (Purple glow, #a855f7)
- **Tusk** - Content Creation (Orange glow, #f97316)
- **Tank** - Sleep Tracking (Green glow, #10b981)

Each minion has unique entrance animations and personality messages.

### 3. **Character Progression**
- **Levels**: Based on cumulative XP earned
- **Ranks**: E-rank → D-rank → C-rank → etc.
- **Stats**: 6 core attributes affected by quest completion
- **Profile Page**: View character details, skills, and achievements

### 4. **Daily Quests & Habits**
- Core Quests: High-impact daily tasks (cannot skip without penalty)
- Flexible Habits: Recurring activities with variable frequency
- Diet Tracking: Log meals and nutritional information
- Sleep Log: Monitor sleep patterns and recovery
- Vitals: Track health metrics (heart rate, mood, energy)

### 5. **Visual Design**
- Cyan neon-glow aesthetic inspired by Solo Leveling
- Glassmorphic UI with backdrop blur effects
- Animated backgrounds featuring Jin-woo and Igris characters
- Responsive mobile-first design with max-width container

---

## Technical Architecture

### Stack
- **Frontend**: Next.js 16 (App Router), React 19.2, TypeScript
- **Styling**: Tailwind CSS 4, custom CSS animations
- **Animation**: Framer Motion 11
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with email/password
- **Deployment**: Vercel

### Project Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── page.tsx            # Main dashboard
│   ├── auth/
│   │   └── page.tsx        # Authentication page
│   └── globals.css         # Global styles & animations
├── components/
│   ├── task-alerts.tsx     # Shadow Alert notifications
│   ├── bottom-nav.tsx      # Navigation tabs
│   ├── quests-tab.tsx      # Daily quests display
│   ├── habits-tab.tsx      # Habit tracking
│   └── [other components]
├── lib/
│   ├── shadow-army.ts      # Minion definitions & logic
│   ├── types.ts            # TypeScript interfaces
│   └── supabase.ts         # Database client
└── public/
    ├── minion-*.png        # Shadow minion sprites
    ├── jinwoo-bg.jpg       # Background images
    └── igris-bg.jpg
```

---

## Recent Updates

### 1. Authentication System (NEW)
**Implementation**: Supabase Auth with email/password

**Features**:
- Sign Up: Create new account with email validation
- Sign In: Login with email and password
- Session Management: Automatic token refresh
- Logout: Clear session and redirect to auth page
- Protected Routes: Dashboard only accessible when authenticated

**File**: `/app/auth/page.tsx`
- Glassmorphic card design
- Form validation for email format and password strength
- Error handling with user feedback
- Responsive layout on all screen sizes

**Database Integration**:
- User accounts stored in Supabase `auth.users` table
- Automatic user creation on signup
- Session tokens managed by Supabase

### 2. Supabase Database Integration (NEW)
**Primary Table**: `game_state`

**Schema**:
```sql
create table public.game_state (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  state jsonb not null default '{}',
  updated_at timestamptz not null default now(),
  unique(user_id)
);

-- Row Level Security (RLS)
-- Users can only read/write their own game_state
```

**Features**:
- Per-user game state stored as JSON
- Supports full GameState object (profile, quests, habits, stats, etc.)
- Automatic timestamp tracking
- Row-Level Security ensures data privacy
- Cascade delete when user account is removed

**Operations**:
- **SELECT**: Users can read only their own game_state
- **INSERT**: Users can insert their initial game_state
- **UPDATE**: Users can update only their own game_state
- **DELETE**: Users can delete only their own game_state

### 3. "Solo Leveling" Font Styling (UPDATED)
**Implementation**: Custom CSS animation with cyan neon glow

**Class**: `.cyan-neon` in `/app/globals.css`

**Features**:
- Font: Orbitron (futuristic, angular)
- Animation: Pulsing text-shadow creating glowing effect
- Color Transition: #00e5ff to white (3-second cycle)
- Glow Layers: Multiple drop-shadows (#00d4ff, #0099cc)
- Effect: 3D neon sign appearance with breathing animation

**CSS Code**:
```css
@keyframes cyan-neon-glow {
  0%, 100% {
    text-shadow: 
      0 0 10px #00d4ff,
      0 0 20px #00d4ff,
      0 0 30px #00d4ff,
      0 0 40px #00d4ff,
      0 0 70px #0099cc,
      0 0 100px #0099cc;
    color: #00e5ff;
  }
  50% {
    text-shadow: 
      0 0 20px #00d4ff,
      0 0 30px #00d4ff,
      0 0 40px #00d4ff,
      0 0 60px #00d4ff,
      0 0 90px #0099cc,
      0 0 130px #0099cc;
    color: #ffffff;
  }
}

.cyan-neon {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.75rem;
  font-weight: 900;
  animation: cyan-neon-glow 3s ease-in-out infinite;
  color: #00e5ff;
}
```

### 4. Shadow Alert Close Button (FIXED)
**Previous Issue**: Close button was responsive but notification didn't dismiss

**Solution**: Proper state management and event handling

**Implementation** in `/components/task-alerts.tsx`:

```typescript
const handleClose = (minion: ShadowMinion) => {
  setDismissed((prev) => new Set([...prev, minion.assignedQuest]))
}

<motion.button
  onClick={(e) => {
    e.stopPropagation()
    e.preventDefault()
    onClose(minion)
  }}
  className="absolute -top-3 -right-3 p-1.5 rounded-full z-50 cursor-pointer"
  style={{ background: minion.glowColor }}
  whileTap={{ scale: 0.85 }}
  whileHover={{ scale: 1.15 }}
>
  <X size={18} className="text-black font-bold" strokeWidth={3} />
</motion.button>
```

**Features**:
- **Event Propagation**: `stopPropagation()` and `preventDefault()` prevent unintended behavior
- **State Management**: Adds minion to dismissed set when closed
- **Visual Feedback**: Hover and tap animations
- **Accessibility**: Proper cursor styling and large touch target
- **Z-index**: Set to 50 to ensure button is clickable above card content

---

## Authentication System

### Sign Up Flow
1. User navigates to auth page
2. Clicks "Sign Up" tab
3. Enters email and password
4. Validation checks:
   - Valid email format
   - Password meets strength requirements
5. Account created in Supabase
6. User automatically logged in
7. Redirected to dashboard

### Sign In Flow
1. User enters email and password
2. Supabase verifies credentials
3. Session token created
4. Redirected to dashboard
5. User data loaded from database

### Session Management
- Tokens refresh automatically
- Session persists across page reloads
- Logout clears session and cookies
- Protected routes redirect to auth page if unauthenticated

---

## Database Schema

### game_state Table
```
id (UUID)
├─ Primary key, auto-generated
├─ user_id (UUID) - Foreign key to auth.users
├─ state (JSONB) - Full game state object
│  ├─ profile
│  │  ├─ name: string
│  │  ├─ level: number
│  │  ├─ xp: number
│  │  ├─ rank: string
│  │  └─ stats: { str, con, int, wis, dis, chr }
│  ├─ dailyQuests: array of quests
│  ├─ habits: array of habits
│  ├─ diet: { meals, calories }
│  ├─ vitals: { heartRate, mood, energy }
│  ├─ sleepLog: array of sleep records
│  └─ skillTree: array of unlocked skills
├─ updated_at (TIMESTAMPTZ) - Last update timestamp
└─ RLS Policies - User isolation

Row Level Security:
- SELECT: auth.uid() = user_id
- INSERT: auth.uid() = user_id
- UPDATE: auth.uid() = user_id
- DELETE: auth.uid() = user_id
```

### Data Privacy
- Each user can only access their own game_state
- Enforced at database level via RLS policies
- No cross-user data leakage possible

---

## Shadow Alert System

### Architecture
**File**: `/lib/shadow-army.ts` - Minion definitions
**Component**: `/components/task-alerts.tsx` - Alert rendering

### Minion Roster

| Name | Quest | Glow Color | Entrance Animation | Personality |
|------|-------|-----------|-------------------|------------|
| Iron | Classes | #6366f1 (Purple) | rise_from_shadow | Stoic soldier |
| Beru | Study | #06b6d4 (Cyan) | crystallize | Aggressive entity |
| Igris | Gym | #06b6d4 (Cyan) | phase_through_wall | Noble warrior |
| Kaisel | Programming | #a855f7 (Purple) | descend_from_top | Ancient dragon |
| Tusk | Content | #f97316 (Orange) | unfold_from_darkness | Chaotic being |
| Tank | Sleep | #10b981 (Green) | roll_in | Gentle giant |

### Notification Features
- **Smart Summoning**: Only appears when assigned quest is incomplete
- **Up to 3 Minions**: Shows most urgent incomplete tasks
- **Staggered Entry**: 400ms delay between minion entrances
- **Animated Sparkles**: 5 cyan twinkling stars around each minion
- **Glassmorphic Card**: Semi-transparent dark background with neon border
- **Pulsing Glow**: Box-shadow animation matching minion color
- **Interactive GO Button**: Completes quest and awards XP
- **Close Button**: Dismisses notification without completing quest

### Entrance Animations
- **phase_through_wall**: Blur to clarity transition from right
- **crystallize**: Scale and rotate crystallization effect
- **rise_from_shadow**: Smooth upward emergence from bottom
- **descend_from_top**: Fall from above with scale animation
- **unfold_from_darkness**: Circular to rectangular transformation
- **roll_in**: Diagonal roll-in with rotation

---

## UI Components & Design

### Design System

**Color Palette**:
- Primary: #a855f7 (Purple) - Main accent
- Accent: #06b6d4 (Cyan) - Secondary highlights
- Background: #0f0715 (Dark purple-black)
- Text Primary: #ffffff (White)
- Text Secondary: #94a3b8 (Slate)
- Neon Cyan: #00d4ff to #00e5ff (Glow effects)

**Typography**:
- Display Font: Orbitron (headings, titles)
- Body Font: Geist (content, descriptions)
- Mono Font: Geist Mono (code, stats)

**Effects**:
- Glassmorphism: 30px backdrop blur with semi-transparent overlay
- Neon Glow: Text-shadow and drop-shadow effects
- Animations: Framer Motion for smooth transitions
- Responsive: Mobile-first design, max-width-md container

### Key Components

#### Header
- Cyan neon "SOLO LEVELING" title with glow animation
- "Shadow Monarch System" subtitle
- Current date and rank display
- Quick stats: Level, XP gained, Quests completed

#### Bottom Navigation
- 8 tabs: Status, Quests, Habits, Diet, Vitals, Skills, Streak, Review
- Sticky positioning
- Scrollable on mobile
- Active tab indicator animation

#### Shadow Alert Card
- Minion sprite (left side, 128px width)
- Alert content (right side)
- Minion name below sprite
- "SHADOW ALERT" label
- Quest name + XP reward
- GO button (completes quest)
- Close button (dismisses notification)

#### Quest Cards
- Glassmorphic design with cyan border
- Quest name and description
- XP reward and stat bonuses
- Completion checkbox
- Animated hover states

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm
- Supabase account (free tier available)
- Git

### Installation

1. **Clone Repository**
```bash
git clone https://github.com/C0des-by-SAGAR/solo-leveling-habit-tracker-app.git
cd solo-leveling-habit-tracker-app
```

2. **Install Dependencies**
```bash
npm install
# or
pnpm install
```

3. **Setup Environment Variables**
Create `.env.local` file:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Run Development Server**
```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Database Setup

1. Create Supabase project
2. Run SQL migrations:
   - Create `game_state` table
   - Enable Row Level Security
   - Create RLS policies
3. Get API keys from Supabase dashboard
4. Add keys to `.env.local`

---

## Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Deploy Solo Leveling app"
git push origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import GitHub repository
- Select `solo-leveling-habit-tracker-app`
- Add environment variables (Supabase keys)
- Deploy

3. **Verify Deployment**
- Check deployment status in Vercel dashboard
- Test authentication and database connectivity
- Monitor performance in Analytics

### Environment Variables for Production
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## File Structure Summary

```
solo-leveling-habit-tracker-app/
├── app/
│   ├── auth/page.tsx           # Authentication UI
│   ├── page.tsx                # Main dashboard
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles & animations
├── components/
│   ├── task-alerts.tsx         # Shadow Alert notifications
│   ├── bottom-nav.tsx          # Navigation tabs
│   ├── quests-tab.tsx          # Quests display
│   ├── habits-tab.tsx          # Habits tracking
│   └── [other UI components]
├── lib/
│   ├── shadow-army.ts          # Minion definitions
│   ├── types.ts                # TypeScript types
│   └── supabase.ts             # Database client
├── public/
│   ├── minion-*.png            # Minion sprites
│   └── *-bg.jpg                # Background images
├── .env.local                  # Environment variables
├── package.json                # Dependencies
└── README.md                   # Quick start guide
```

---

## Future Enhancements

- [ ] Multi-player leaderboard
- [ ] Achievement system with badges
- [ ] Seasonal challenges and events
- [ ] Advanced stat progression
- [ ] Mobile app (React Native)
- [ ] Social sharing features
- [ ] Dark/Light theme toggle
- [ ] Habit analytics and insights

---

## Support & Contributing

For issues, feature requests, or contributions:
- GitHub Issues: Report bugs and suggest features
- Pull Requests: Submit improvements
- Documentation: Help improve this guide

---

## License

This project is part of the Solo Leveling Habit Tracker ecosystem. Check LICENSE file for details.

---

**Last Updated**: February 2026
**Version**: 1.0.0 with Authentication & Supabase
