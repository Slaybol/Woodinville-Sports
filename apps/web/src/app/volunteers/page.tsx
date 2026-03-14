'use client'

import { useState } from 'react'
import { 
  Users, 
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  User
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface VolunteerSlot {
  id: string
  title: string
  description: string
  date: string
  startTime: string
  endTime: string
  location: string
  slotsNeeded: number
  slotsFilled: number
  volunteers: string[]
}

const mockVolunteerSlots: VolunteerSlot[] = [
  {
    id: '1',
    title: 'Concession Stand Help',
    description: 'Help run the concession stand during the varsity game. Training provided.',
    date: 'Friday, Nov 15',
    startTime: '5:30 PM',
    endTime: '9:00 PM',
    location: 'Home Stadium Concessions',
    slotsNeeded: 4,
    slotsFilled: 1,
    volunteers: ['Maria Garcia'],
  },
  {
    id: '2',
    title: 'Team Dinner Setup',
    description: 'Help set up and serve the pre-game team dinner.',
    date: 'Thursday, Nov 14',
    startTime: '5:00 PM',
    endTime: '7:00 PM',
    location: 'School Cafeteria',
    slotsNeeded: 3,
    slotsFilled: 1,
    volunteers: ['Tom Wilson'],
  },
  {
    id: '3',
    title: 'Senior Night Support',
    description: 'Help coordinate Senior Night activities including banner setup and flower distribution.',
    date: 'Friday, Nov 22',
    startTime: '5:00 PM',
    endTime: '7:00 PM',
    location: 'Home Stadium',
    slotsNeeded: 6,
    slotsFilled: 3,
    volunteers: ['Sarah Johnson', 'Mike Chen', 'Lisa Park'],
  },
  {
    id: '4',
    title: 'Away Game Carpool Driver',
    description: 'Drive players to the away game at Eastside. Must have valid license and insurance.',
    date: 'Friday, Nov 15',
    startTime: '3:00 PM',
    endTime: '10:00 PM',
    location: 'School Parking Lot',
    slotsNeeded: 2,
    slotsFilled: 2,
    volunteers: ['David Brown', 'Jennifer Lee'],
  },
  {
    id: '5',
    title: 'Equipment Manager Assistant',
    description: 'Help the equipment manager prepare gear for the upcoming game.',
    date: 'Thursday, Nov 14',
    startTime: '3:30 PM',
    endTime: '5:00 PM',
    location: 'Equipment Room',
    slotsNeeded: 2,
    slotsFilled: 0,
    volunteers: [],
  },
]

export default function VolunteersPage() {
  const [signedUpSlots, setSignedUpSlots] = useState<string[]>([])

  const handleSignUp = (slotId: string) => {
    if (signedUpSlots.includes(slotId)) {
      setSignedUpSlots(signedUpSlots.filter(id => id !== slotId))
    } else {
      setSignedUpSlots([...signedUpSlots, slotId])
    }
  }

  const isFull = (slot: VolunteerSlot) => slot.slotsFilled >= slot.slotsNeeded

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <a href="/" className="flex items-center gap-2 hover:opacity-80">
              <ChevronLeft size={20} />
              <span>Back</span>
            </a>
            <h1 className="text-lg font-semibold ml-4 flex items-center gap-2">
              <Users size={20} />
              Volunteer Opportunities
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Summary */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open volunteer spots</p>
                <p className="text-2xl font-bold">
                  {mockVolunteerSlots.reduce((acc, slot) => acc + (slot.slotsNeeded - slot.slotsFilled), 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Your signups</p>
                <p className="text-2xl font-bold">{signedUpSlots.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Volunteer Slots */}
        <div className="space-y-4">
          {mockVolunteerSlots.map((slot) => {
            const full = isFull(slot)
            const isSignedUp = signedUpSlots.includes(slot.id)
            const spotsLeft = slot.slotsNeeded - slot.slotsFilled

            return (
              <Card key={slot.id} className={full ? 'opacity-75' : ''}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{slot.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {slot.description}
                      </p>
                    </div>
                    {full ? (
                      <Badge variant="secondary">Full</Badge>
                    ) : (
                      <Badge variant="success">{spotsLeft} spots left</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-muted-foreground" />
                      <span>{slot.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-muted-foreground" />
                      <span>{slot.startTime} - {slot.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <MapPin size={16} className="text-muted-foreground" />
                      <span>{slot.location}</span>
                    </div>
                  </div>

                  {slot.volunteers.length > 0 && (
                    <div className="border-t pt-3">
                      <p className="text-sm font-medium mb-2">Signed up:</p>
                      <div className="flex flex-wrap gap-2">
                        {slot.volunteers.map((volunteer) => (
                          <span
                            key={volunteer}
                            className="inline-flex items-center gap-1 text-sm bg-secondary px-2 py-1 rounded"
                          >
                            <User size={12} />
                            {volunteer}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    {isSignedUp ? (
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => handleSignUp(slot.id)}
                      >
                        <CheckCircle size={16} className="mr-2 text-green-600" />
                        Signed Up - Click to Cancel
                      </Button>
                    ) : (
                      <Button 
                        className="w-full" 
                        disabled={full}
                        onClick={() => handleSignUp(slot.id)}
                      >
                        {full ? 'No Spots Available' : 'Sign Up'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
