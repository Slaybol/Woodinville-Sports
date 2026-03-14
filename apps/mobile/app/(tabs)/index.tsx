import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, ImageBackground } from 'react-native'
import { useState, useCallback } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false)
  const insets = useSafeAreaInsets()

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }, [])

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity>
            <Ionicons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Wildcats Football</Text>
          <View style={styles.headerLogo}>
            <Ionicons name="american-football" size={20} color="#fff" />
          </View>
        </View>

        {/* Hero Game Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroImagePlaceholder}>
            <Ionicons name="american-football" size={40} color="rgba(255,255,255,0.3)" />
          </View>
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Varsity Game</Text>
            <View style={styles.heroDetails}>
              <Text style={styles.heroDetailText}>Bus departs: 3:45 PM</Text>
              <Text style={styles.heroDetailText}>Kickoff: 7:00 PM</Text>
              <Text style={styles.heroDetailText}>Uniform: Blue Jerseys</Text>
            </View>
          </View>
        </View>

        {/* Coach's Update */}
        <View style={styles.coachUpdate}>
          <View style={styles.coachUpdateHeader}>
            <Ionicons name="chatbubble-ellipses" size={16} color="#1e3a5f" />
            <Text style={styles.coachUpdateLabel}>Coach's Update:</Text>
          </View>
          <Text style={styles.coachUpdateText}>"Reminder: Bring white socks tonight"</Text>
        </View>

        {/* Weather Alert */}
        <View style={styles.weatherAlert}>
          <Ionicons name="warning" size={18} color="#92400e" />
          <Text style={styles.weatherAlertText}>Weather Alert: Thunderstorms expected</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1e3a5f',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  headerLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCard: {
    backgroundColor: '#2a4a6f',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  heroImagePlaceholder: {
    height: 100,
    backgroundColor: '#1e3a5f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroOverlay: {
    padding: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  heroDetails: {
    gap: 4,
  },
  heroDetailText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  coachUpdate: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  coachUpdateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  coachUpdateLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e3a5f',
  },
  coachUpdateText: {
    fontSize: 14,
    color: '#374151',
    fontStyle: 'italic',
  },
  weatherAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    padding: 12,
  },
  weatherAlertText: {
    fontSize: 13,
    color: '#92400e',
    fontWeight: '500',
    flex: 1,
  },
})
