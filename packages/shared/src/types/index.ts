export type UserRole = 'coach' | 'team_parent' | 'parent'

export interface User {
  id: string
  email: string
  full_name: string
  role: UserRole
  phone?: string
  created_at: string
  updated_at: string
}

export interface Team {
  id: string
  name: string
  sport: string
  season: string
  school_name: string
  created_at: string
}

export interface Event {
  id: string
  team_id: string
  title: string
  event_type: 'practice' | 'game' | 'meeting' | 'dinner' | 'travel' | 'fundraiser' | 'other'
  start_time: string
  end_time?: string
  location: string
  address?: string
  notes?: string
  transportation?: string
  uniform?: string
  is_canceled: boolean
  created_at: string
  updated_at: string
}

export interface Announcement {
  id: string
  team_id: string
  author_id: string
  title: string
  content: string
  is_urgent: boolean
  created_at: string
  updated_at: string
}

export interface VolunteerSlot {
  id: string
  team_id: string
  title: string
  description?: string
  event_date: string
  start_time: string
  end_time?: string
  location?: string
  slots_needed: number
  slots_filled: number
  created_at: string
}

export interface VolunteerSignup {
  id: string
  slot_id: string
  user_id: string
  created_at: string
}

export interface Document {
  id: string
  team_id: string
  title: string
  description?: string
  file_url: string
  file_type: string
  category: 'schedule' | 'form' | 'waiver' | 'booster' | 'fundraising' | 'guide' | 'other'
  uploaded_by: string
  created_at: string
}

export interface Player {
  id: string
  team_id: string
  name: string
  grade?: string
  position?: string
  jersey_number?: string
  parent_ids: string[]
  created_at: string
}

export interface EmergencyContact {
  id: string
  team_id: string
  role: 'coach' | 'team_parent' | 'athletic_office' | 'trainer'
  name: string
  phone: string
  email?: string
}
