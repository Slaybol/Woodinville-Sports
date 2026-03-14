'use client'

import { useState } from 'react'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Bus,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type EventType = 'practice' | 'game' | 'meeting' | 'dinner' | 'travel' | 'fundraiser'

interface ScheduleEvent {
  id: string
  title: string
  type: EventType
  date: string
  startTime: string
  endTime?: string
  location: string
  address?: string
  notes?: string
  transportation?: string
  uniform?: string
  isCanceled?: boolean
}

const mockEvents: ScheduleEvent[] = [
  {
    id: '1',
    title: 'Varsity Practice',
    type: 'practice',
    date: '2024-11-13',
    startTime: '3:30 PM',
    endTime: '5:30 PM',
    location: 'Main Field',
    notes: 'Full pads required',
  },
  {
    id: '2',
    title: 'Team Dinner',
    type: 'dinner',
    date: '2024-11-14',
    startTime: '6:00 PM',
    endTime: '8:00 PM',
    location: 'School Cafeteria',
    notes: 'Hosted by Johnson family',
  },
  {
    id: '3',
    title: 'Varsity Game vs Eastside Eagles',
    type: 'game',
    date: '2024-11-15',
    startTime: '7:00 PM',
    location: 'Eastside Stadium',
    address: '1234 Eagle Way, Eastside WA',
    transportation: 'Bus departs at 3:45 PM from main parking lot',
    uniform: 'Blue jerseys, white pants',
  },
  {
    id: '4',
    title: 'Film Review Session',
    type: 'meeting',
    date: '2024-11-16',
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    location: 'Team Room',
  },
  {
    id: '5',
    title: 'JV Practice',
    type: 'practice',
    date: '2024-11-18',
    startTime: '3:30 PM',
    endTime: '5:00 PM',
    location: 'Practice Field B',
    isCanceled: true,
  },
]

const eventTypeColors: Record<EventType, string> = {
  practice: 'bg-green-100 text-green-800',
  game: 'bg-blue-100 text-blue-800',
  meeting: 'bg-purple-100 text-purple-800',
  dinner: 'bg-orange-100 text-orange-800',
  travel: 'bg-gray-100 text-gray-800',
  fundraiser: 'bg-pink-100 text-pink-800',
}

const eventTypeLabels: Record<EventType, string> = {
  practice: 'Practice',
  game: 'Game',
  meeting: 'Meeting',
  dinner: 'Team Dinner',
  travel: 'Travel',
  fundraiser: 'Fundraiser',
}

export default function SchedulePage() {
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null)
  const [filter, setFilter] = useState<EventType | 'all'>('all')

  const filteredEvents = filter === 'all' 
    ? mockEvents 
    : mockEvents.filter(e => e.type === filter)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    })
  }

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
            <h1 className="text-lg font-semibold ml-4">Schedule</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filter Bar */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          <Filter size={16} className="text-muted-foreground flex-shrink-0" />
          <Button
            size="sm"
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          {(Object.keys(eventTypeLabels) as EventType[]).map((type) => (
            <Button
              key={type}
              size="sm"
              variant={filter === type ? 'default' : 'outline'}
              onClick={() => setFilter(type)}
            >
              {eventTypeLabels[type]}
            </Button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Event List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredEvents.map((event) => (
              <Card 
                key={event.id}
                className={`cursor-pointer transition-shadow hover:shadow-md ${
                  selectedEvent?.id === event.id ? 'ring-2 ring-primary' : ''
                } ${event.isCanceled ? 'opacity-60' : ''}`}
                onClick={() => setSelectedEvent(event)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={eventTypeColors[event.type]}>
                          {eventTypeLabels[event.type]}
                        </Badge>
                        {event.isCanceled && (
                          <Badge variant="destructive">Canceled</Badge>
                        )}
                      </div>
                      <h3 className={`font-semibold ${event.isCanceled ? 'line-through' : ''}`}>
                        {event.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(event.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {event.startTime}
                          {event.endTime && ` - ${event.endTime}`}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {event.location}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-muted-foreground flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Event Detail Panel */}
          <div className="lg:col-span-1">
            {selectedEvent ? (
              <Card className="sticky top-24">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={eventTypeColors[selectedEvent.type]}>
                      {eventTypeLabels[selectedEvent.type]}
                    </Badge>
                    {selectedEvent.isCanceled && (
                      <Badge variant="destructive">Canceled</Badge>
                    )}
                  </div>
                  <CardTitle>{selectedEvent.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Calendar size={18} className="text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(selectedEvent.date)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock size={18} className="text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Time</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedEvent.startTime}
                          {selectedEvent.endTime && ` - ${selectedEvent.endTime}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedEvent.location}
                        </p>
                        {selectedEvent.address && (
                          <p className="text-sm text-muted-foreground">
                            {selectedEvent.address}
                          </p>
                        )}
                      </div>
                    </div>

                    {selectedEvent.transportation && (
                      <div className="flex items-start gap-3">
                        <Bus size={18} className="text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Transportation</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedEvent.transportation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {selectedEvent.uniform && (
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <p className="text-sm font-medium">
                        Uniform: {selectedEvent.uniform}
                      </p>
                    </div>
                  )}

                  {selectedEvent.notes && (
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium mb-1">Notes</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedEvent.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Select an event to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
