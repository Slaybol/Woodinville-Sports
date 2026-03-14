import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native'
import { useState, useCallback } from 'react'
import { Ionicons } from '@expo/vector-icons'

interface VolunteerTask {
  id: string
  title: string
  date: string
  slotsLeft: number
}

const mockTasks: VolunteerTask[] = [
  { id: '1', title: 'Concession Stand', date: 'Fri, Apr 15', slotsLeft: 2 },
  { id: '2', title: 'Team Dinner', date: 'Sat, Apr 23', slotsLeft: 1 },
  { id: '3', title: 'Senior Night Help', date: 'Fri, May 6', slotsLeft: 3 },
]

export default function VolunteersScreen() {
  const [refreshing, setRefreshing] = useState(false)
  const [signedUpTasks, setSignedUpTasks] = useState<string[]>([])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }, [])

  const handleSignUp = (taskId: string) => {
    if (signedUpTasks.includes(taskId)) {
      setSignedUpTasks(signedUpTasks.filter(id => id !== taskId))
    } else {
      setSignedUpTasks([...signedUpTasks, taskId])
    }
  }

  return (
    <View style={styles.container}>
      {/* Header Icon */}
      <View style={styles.headerIcon}>
        <Ionicons name="hand-left" size={24} color="#c2410c" />
      </View>

      <ScrollView 
        style={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Section Title */}
        <Text style={styles.sectionTitle}>Upcoming Tasks</Text>

        {/* Task List */}
        {mockTasks.map((task) => {
          const isSignedUp = signedUpTasks.includes(task.id)
          
          return (
            <View key={task.id} style={styles.taskRow}>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskMeta}>
                  {task.date}{'\n'}{task.slotsLeft} Slot{task.slotsLeft !== 1 ? 's' : ''} Left
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.signUpButton, isSignedUp && styles.signUpButtonActive]}
                onPress={() => handleSignUp(task.id)}
              >
                <Text style={[styles.signUpButtonText, isSignedUp && styles.signUpButtonTextActive]}>
                  {isSignedUp ? 'Signed Up' : 'Sign Up'}
                </Text>
              </TouchableOpacity>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerIcon: {
    position: 'absolute',
    top: 8,
    right: 16,
    zIndex: 1,
  },
  list: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e3a5f',
    marginBottom: 16,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e3a5f',
    marginBottom: 4,
  },
  taskMeta: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
  },
  signUpButton: {
    backgroundColor: '#c2410c',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  signUpButtonActive: {
    backgroundColor: '#dcfce7',
    borderWidth: 1,
    borderColor: '#16a34a',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  signUpButtonTextActive: {
    color: '#16a34a',
  },
})
