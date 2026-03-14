'use client'

import { useState } from 'react'
import { 
  Calendar, 
  Bell, 
  Users, 
  FileText, 
  Clock, 
  MapPin, 
  Bus,
  AlertTriangle,
  ChevronRight,
  Menu,
  X,
  Home,
  Phone,
  LogOut,
  User,
  Settings
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/auth-context'
import Link from 'next/link'

const mockNextEvent = {
  title: 'KingCo Championship Game',
  opponent: 'vs Bothell Cougars',
  date: 'Friday, Nov 15',
  busDeparts: '3:45 PM',
  kickoff: '7:00 PM',
  location: 'Pop Keeney Stadium',
  uniform: 'White jerseys (White Out!), blue pants',
}

const mockUrgentAlert = {
  active: true,
  message: 'Falcons practice moved to main stadium today due to field conditions. Report by 3:30 PM.',
  time: '2 hours ago',
}

const mockAnnouncements = [
  {
    id: '1',
    title: 'Falcons Practice Schedule Update',
    content: 'Due to field conditions, today\'s Varsity practice has been moved to the main stadium. Please report to the field by 3:30 PM. Bring both practice jerseys.',
    author: 'Coach Williams',
    isUrgent: true,
    createdAt: '2 hours ago',
  },
  {
    id: '2',
    title: 'C-Team Film Review Tonight',
    content: 'C-Team film review will be held at 6:00 PM in the team meeting room. All players are expected to attend. We\'ll be reviewing last week\'s game footage.',
    author: 'Coach Martinez',
    isUrgent: false,
    createdAt: '3 hours ago',
  },
  {
    id: '3',
    title: 'KingCo Championship Game - White Out!',
    content: 'Reminder: For Friday\'s KingCo Championship game, we\'re doing a WHITE OUT theme! All players should wear white jerseys. Fans encouraged to wear white too!',
    author: 'Coach Williams',
    isUrgent: false,
    createdAt: '5 hours ago',
  },
  {
    id: '4',
    title: 'Academic Achievement Recognition',
    content: 'Congratulations to our Falcons for maintaining Academic State Champion status! Keep up the great work in the classroom. Academic progress reports due Thursday.',
    author: 'Academic Coordinator',
    isUrgent: false,
    createdAt: '1 day ago',
  },
  {
    id: '5',
    title: 'Falcon Gridiron Club Meeting',
    content: 'Monthly Falcon Gridiron Club meeting this Tuesday at 7:00 PM in the school library. We\'ll be discussing playoff logistics and end-of-season banquet planning.',
    author: 'Falcon Gridiron Club',
    isUrgent: false,
    createdAt: '2 days ago',
  },
  {
    id: '6',
    title: 'Volunteer Signups for Playoffs',
    content: 'We need volunteers for playoff game operations! Sign up for chain crew, concessions, and ticket sales. Your support helps our program succeed!',
    author: 'Volunteer Coordinator',
    isUrgent: false,
    createdAt: '3 days ago',
  },
]

const mockVolunteerNeeds = [
  { id: 1, title: 'Chain Crew - Varsity Game', date: 'Nov 15', slots: 2 },
  { id: 2, title: 'Concession Stand - Championship', date: 'Nov 15', slots: 4 },
  { id: 3, title: 'Ticket Sales - Game Day', date: 'Nov 15', slots: 3 },
]

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, profile, loading, signOut } = useAuth()

  // Generate navigation items based on user role
  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Calendar, label: 'Schedule', href: '/schedule' },
    { icon: Bell, label: 'Announcements', href: '/announcements' },
    { icon: Users, label: 'Volunteers', href: '/volunteers' },
    { icon: FileText, label: 'Documents', href: '/documents' },
    { icon: Phone, label: 'Emergency', href: '/emergency' },
    // Temporarily show admin for all users for testing
    { icon: Settings, label: 'Admin', href: '/admin' },
  ]

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">W</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect to auth if not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">W</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Woodinville Sports</h1>
            <p className="text-gray-600">Falcons Football • Gridiron Connect</p>
          </div>
          
          <Card className="falcons-card">
            <CardContent className="p-6 text-center">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Welcome to Gridiron Connect</h2>
              <p className="text-gray-600 mb-6">Please sign in to access the Woodinville Falcons Football communication platform.</p>
              
              <Link href="/auth">
                <Button className="w-full falcons-button">
                  Sign In
                </Button>
              </Link>
              
              <div className="mt-4">
                <Link href="/auth" className="text-green-600 hover:text-green-800 text-sm">
                  Don't have an account? Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="falcons-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">W</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Woodinville High School</h1>
                <p className="text-xs text-green-100">Falcons Football • Gridiron Connect</p>
              </div>
            </div>
            
            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-white/90 text-sm">
                <User size={16} />
                <span>{profile?.full_name || user?.email}</span>
                {profile?.role && (
                  <Badge variant="outline" className="text-white border-white/50">
                    {profile.role.replace('_', ' ')}
                  </Badge>
                )}
                {profile?.teams && profile.teams.length > 0 && (
                  <Badge variant="outline" className="text-white border-white/50">
                    {profile.teams[0].name}
                  </Badge>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="text-white/90 hover:text-white hover:bg-white/10"
              >
                <LogOut size={16} />
                <span className="hidden md:inline ml-2">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Falcons Achievements Banner */}
        <Card className="falcons-achievement border-2">
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Woodinville High School Falcons Football</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-green-700">2019 4A ACADEMIC STATE CHAMPIONS</div>
                  <div className="text-sm text-gray-600">Football</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">3-PEAT KINGCO 4A CHAMPIONS</div>
                  <div className="text-sm text-gray-600">2016 • 2017 • 2018</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-700">3-PEAT 4A STATE SEMI-FINALISTS</div>
                  <div className="text-sm text-gray-600">2017 • 2018 • 2019</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                2017 4A STATE FINALIST • Home of the Falcons • Brought to you by the Falcon Gridiron Club
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Urgent Alert */}
        {mockUrgentAlert.active && (
          <Card className="border-yellow-400 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-yellow-600 mt-0.5 flex-shrink-0" size={20} />
                <div className="flex-1">
                  <p className="font-semibold text-yellow-800">Urgent Alert</p>
                  <p className="text-yellow-700">{mockUrgentAlert.message}</p>
                  <p className="text-xs text-yellow-600 mt-1">{mockUrgentAlert.time}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Event Card */}
        <Card className="falcons-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-gray-900">Next Event</CardTitle>
              <Badge className="bg-green-600 text-white">Game Day</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{mockNextEvent.title}</h3>
              <p className="text-gray-600">{mockNextEvent.opponent}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={16} className="text-muted-foreground" />
                <span>{mockNextEvent.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-muted-foreground" />
                <span>Kickoff {mockNextEvent.kickoff}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Bus size={16} className="text-muted-foreground" />
                <span>Bus departs {mockNextEvent.busDeparts}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="text-muted-foreground" />
                <span>{mockNextEvent.location}</span>
              </div>
            </div>

            <div className="bg-secondary/50 rounded-lg p-3">
              <p className="text-sm font-medium">Uniform: {mockNextEvent.uniform}</p>
            </div>

            <Button className="w-full" variant="outline">
              View Full Schedule
              <ChevronRight size={16} className="ml-2" />
            </Button>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Announcements */}
          <Card className="falcons-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Bell size={18} />
                  Announcements
                </CardTitle>
                <a href="/announcements" className="text-sm text-green-600 hover:text-green-800 font-medium">
                  View all
                </a>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockAnnouncements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="flex items-start justify-between py-2 border-b border-gray-200 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{announcement.title}</p>
                      <p className="text-xs text-gray-500">{announcement.createdAt}</p>
                    </div>
                    {announcement.isUrgent && <Badge className="bg-yellow-500 text-white">Urgent</Badge>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Volunteer Needs */}
          <Card className="falcons-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Users size={18} />
                  Volunteer Needs
                </CardTitle>
                <a href="/volunteers" className="text-sm text-green-600 hover:text-green-800 font-medium">
                  View all
                </a>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockVolunteerNeeds.map((need) => (
                  <div key={need.id} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{need.title}</p>
                      <p className="text-xs text-gray-500">{need.date}</p>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {need.slots} slots
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Quick Access</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <a
                href="/schedule"
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <Calendar size={24} className="text-primary" />
                <span className="text-sm font-medium">Schedule</span>
              </a>
              <a
                href="/documents"
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <FileText size={24} className="text-primary" />
                <span className="text-sm font-medium">Documents</span>
              </a>
              <a
                href="/volunteers"
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <Users size={24} className="text-primary" />
                <span className="text-sm font-medium">Volunteer</span>
              </a>
              <a
                href="/emergency"
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <Phone size={24} className="text-primary" />
                <span className="text-sm font-medium">Emergency</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Gridiron Connect • Woodinville Falcons Football
          </p>
        </div>
      </footer>
    </div>
  )
}
