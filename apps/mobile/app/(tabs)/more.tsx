import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

type IconName = 'people-outline' | 'document-text-outline' | 'call-outline' | 'settings-outline'

interface MenuItem {
  id: string
  title: string
  icon: IconName
}

const menuItems: MenuItem[] = [
  { id: 'roster', title: 'Player Roster', icon: 'people-outline' },
  { id: 'documents', title: 'Documents', icon: 'document-text-outline' },
  { id: 'emergency', title: 'Emergency Contacts', icon: 'call-outline' },
  { id: 'settings', title: 'Settings', icon: 'settings-outline' },
]

export default function MoreScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.list}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name={item.icon} size={22} color="#1e3a5f" />
              <Text style={styles.menuItemTitle}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e3a5f',
  },
})
