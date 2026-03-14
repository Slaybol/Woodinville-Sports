import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const MONTH = 'April 2022'

// Calendar events by day
const calendarEvents: Record<number, { type: string; label: string; time?: string }[]> = {
  12: [{ type: 'practice', label: 'Practice', time: '4:00 PM' }],
  14: [{ type: 'game', label: 'JV Game', time: '5:00 PM' }],
  16: [{ type: 'dinner', label: 'Team Dinner', time: '6:00 PM' }],
}

const upcomingEvents = [
  { id: '1', type: 'game', title: 'Varsity Game', date: 'Fri, Apr 15', time: '7:00 PM', location: 'Riverview HS', hasMap: true },
  { id: '2', type: 'meeting', title: 'Parent Meeting', date: 'Mon, Apr 18', time: '6:30 PM', location: 'Cafeteria', hasMap: false },
]

const eventColors: Record<string, { bg: string; text: string }> = {
  practice: { bg: '#dcfce7', text: '#166534' },
  game: { bg: '#dbeafe', text: '#1e40af' },
  meeting: { bg: '#ede9fe', text: '#7c3aed' },
  dinner: { bg: '#ffedd5', text: '#c2410c' },
}

export default function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState<number | null>(15)

  // Generate calendar grid (simplified for April)
  const generateCalendarDays = () => {
    const days = []
    const startDay = 5 // April 2022 starts on Friday (index 5)
    
    // Empty cells before month starts
    for (let i = 0; i < startDay; i++) {
      days.push({ day: null, week: 0 })
    }
    
    // Days of the month
    for (let i = 1; i <= 30; i++) {
      days.push({ day: i, week: Math.floor((i + startDay - 1) / 7) })
    }
    
    return days
  }

  const calendarDays = generateCalendarDays()

  return (
    <ScrollView style={styles.container}>
      {/* Month Navigation */}
      <View style={styles.monthNav}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="#1e3a5f" />
        </TouchableOpacity>
        <Text style={styles.monthTitle}>{MONTH}</Text>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={24} color="#1e3a5f" />
        </TouchableOpacity>
      </View>

      {/* Calendar Grid */}
      <View style={styles.calendar}>
        {/* Day Headers */}
        <View style={styles.dayHeaders}>
          {DAYS.map((day) => (
            <Text key={day} style={styles.dayHeader}>{day}</Text>
          ))}
        </View>

        {/* Calendar Days */}
        <View style={styles.daysGrid}>
          {calendarDays.map((item, index) => {
            const events = item.day ? calendarEvents[item.day] : null
            const isSelected = item.day === selectedDay
            
            return (
              <TouchableOpacity
                key={index}
                style={[styles.dayCell, isSelected && styles.dayCellSelected]}
                onPress={() => item.day && setSelectedDay(item.day)}
                disabled={!item.day}
              >
                {item.day && (
                  <>
                    <Text style={[styles.dayNumber, isSelected && styles.dayNumberSelected]}>
                      {item.day}
                    </Text>
                    {events && events.map((event, i) => (
                      <View 
                        key={i} 
                        style={[
                          styles.eventDot,
                          { backgroundColor: eventColors[event.type]?.bg || '#e5e7eb' }
                        ]}
                      >
                        <Text style={[
                          styles.eventDotText,
                          { color: eventColors[event.type]?.text || '#374151' }
                        ]} numberOfLines={1}>
                          {event.label}
                        </Text>
                        {event.time && (
                          <Text style={[
                            styles.eventDotTime,
                            { color: eventColors[event.type]?.text || '#374151' }
                          ]}>
                            {event.time}
                          </Text>
                        )}
                      </View>
                    ))}
                  </>
                )}
              </TouchableOpacity>
            )
          })}
        </View>
      </View>

      {/* Upcoming Events */}
      <View style={styles.upcomingSection}>
        {upcomingEvents.map((event) => (
          <View key={event.id} style={styles.eventItem}>
            <View style={[styles.eventIcon, { backgroundColor: eventColors[event.type]?.bg || '#e5e7eb' }]}>
              <Ionicons 
                name={event.type === 'game' ? 'american-football' : 'calendar'} 
                size={16} 
                color={eventColors[event.type]?.text || '#374151'} 
              />
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventMeta}>
                {event.date}{'\n'}{event.time} at {event.location}
                {event.hasMap && <Text style={styles.mapLink}> (Map)</Text>}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e3a5f',
  },
  calendar: {
    paddingHorizontal: 8,
  },
  dayHeaders: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 8,
  },
  dayHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '600',
    color: '#6b7280',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    minHeight: 70,
    padding: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  dayCellSelected: {
    backgroundColor: '#eff6ff',
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 2,
  },
  dayNumberSelected: {
    color: '#1e40af',
    fontWeight: '700',
  },
  eventDot: {
    borderRadius: 4,
    padding: 2,
    marginTop: 2,
  },
  eventDotText: {
    fontSize: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
  eventDotTime: {
    fontSize: 7,
    textAlign: 'center',
  },
  upcomingSection: {
    padding: 16,
    gap: 12,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  eventIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e3a5f',
  },
  eventMeta: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
    lineHeight: 18,
  },
  mapLink: {
    color: '#2563eb',
    fontWeight: '500',
  },
})
