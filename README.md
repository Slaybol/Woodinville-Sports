# Woodinville Sports - Gridiron Connect

A communication platform for Woodinville High School Falcons Football, connecting coaches, parents, and team administrators.

## 🏈 Features

### Core Features
- **Dashboard**: Quick overview of upcoming events, alerts, and volunteer needs
- **Schedule**: View practices, games, meetings with details
- **Announcements**: Team updates with reactions and comments
- **Volunteer Signup**: Sign up for team activities
- **Documents**: Access forms, waivers, and team resources
- **Emergency Contacts**: Quick access to important contacts

### Enhanced Features
- **Reactions System**: Like, Heart, Thumbs Up, Celebrate, Pray reactions on announcements
- **Comments Section**: Expandable comments with real-time updates
- **Role-Based Access**: Coach, Team Parent, Parent permissions
- **Woodinville Branding**: Official WHS green and white color scheme

## Tech Stack

- **Web App**: Next.js 14, React, TailwindCSS, shadcn/ui
- **Mobile App**: Expo (React Native), expo-router
- **Backend**: Supabase (Auth, Database, Storage, Realtime)
- **Push Notifications**: Expo Notifications

## Project Structure

```
woodinville-connect/
├── apps/
│   ├── web/          # Next.js web application
│   └── mobile/       # Expo React Native app
├── packages/
│   └── shared/       # Shared types and utilities
└── supabase/
    ├── schema.sql    # Main database schema
    └── announcements_reactions_comments.sql # Reactions & comments
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier works)
- Expo Go app (for mobile testing)

### 1. Clone and Install

```bash
git clone https://github.com/Slaybol/Woodinville-Sports.git
cd woodinville-connect
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the contents of `supabase/schema.sql`
3. Run `supabase/announcements_reactions_comments.sql` for enhanced features
4. Copy your project URL and anon key from Settings > API

### 3. Configure Environment Variables

**Web App** (`apps/web/.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Mobile App** (`apps/mobile/.env.local`):
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the Apps

**Web App:**
```bash
npm run web
# Opens at http://localhost:3000
```

**Mobile App:**
```bash
npm run mobile
# Scan QR code with Expo Go app
```

## Database Schema

Key tables:
- `profiles` - User profiles linked to Supabase Auth
- `teams` - Team information
- `team_members` - User-team relationships with roles
- `events` - Practices, games, meetings
- `announcements` - Team communications
- `announcement_reactions` - Reactions on announcements
- `announcement_comments` - Comments on announcements
- `volunteer_slots` / `volunteer_signups` - Volunteer coordination
- `documents` - Team document library
- `emergency_contacts` - Important contacts
- `push_tokens` - Mobile push notification tokens

## Development

### Web App
```bash
cd apps/web
npm run dev
```

### Mobile App
```bash
cd apps/mobile
npx expo start
```

### Type Checking
```bash
npm run lint
```

## Deployment

### Web App
Deploy to Vercel, Netlify, or any Node.js hosting:
```bash
cd apps/web
npm run build
```

### Mobile App
Build with EAS:
```bash
cd apps/mobile
npx eas build
```

## License

MIT
