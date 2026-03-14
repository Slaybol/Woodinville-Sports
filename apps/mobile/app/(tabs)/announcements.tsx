import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, Image } from 'react-native'
import { useState, useCallback } from 'react'
import { Ionicons } from '@expo/vector-icons'

interface Message {
  id: string
  author: string
  avatar?: string
  content: string
  time: string
  reactions: { type: 'heart' | 'thumbsup'; count: number }[]
}

const mockMessages: Message[] = [
  {
    id: '1',
    author: 'Coach Miller',
    content: '"Practice moved indoors today."',
    time: '2h',
    reactions: [{ type: 'heart', count: 1 }],
  },
  {
    id: '2',
    author: 'Coach Miller',
    content: '"Players need white socks tonight."',
    time: '1d',
    reactions: [{ type: 'thumbsup', count: 9 }],
  },
]

export default function AnnouncementsScreen() {
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState<'team' | 'direct'>('team')

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }, [])

  return (
    <View style={styles.container}>
      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'team' && styles.tabActive]}
          onPress={() => setActiveTab('team')}
        >
          <Text style={[styles.tabText, activeTab === 'team' && styles.tabTextActive]}>
            Team Announcements
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.messageList}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {mockMessages.map((message) => (
          <View key={message.id} style={styles.messageCard}>
            <View style={styles.messageHeader}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={20} color="#6b7280" />
              </View>
              <View style={styles.messageInfo}>
                <Text style={styles.authorName}>{message.author}:</Text>
                <Text style={styles.messageTime}>{message.time}</Text>
              </View>
            </View>
            
            <Text style={styles.messageContent}>{message.content}</Text>
            
            {message.reactions.length > 0 && (
              <View style={styles.reactions}>
                {message.reactions.map((reaction, index) => (
                  <View key={index} style={styles.reactionBadge}>
                    <Ionicons 
                      name={reaction.type === 'heart' ? 'heart' : 'thumbs-up'} 
                      size={14} 
                      color={reaction.type === 'heart' ? '#ef4444' : '#3b82f6'} 
                    />
                    <Text style={styles.reactionCount}>{reaction.count}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Compose Button */}
      <TouchableOpacity style={styles.composeButton}>
        <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabContainer: {
    backgroundColor: '#1e3a5f',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  tab: {
    backgroundColor: '#2a4a6f',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#3b5998',
  },
  tabText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  tabTextActive: {
    fontWeight: '600',
  },
  messageList: {
    flex: 1,
    padding: 16,
  },
  messageCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  messageInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e3a5f',
  },
  messageTime: {
    fontSize: 13,
    color: '#6b7280',
  },
  messageContent: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  reactions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  reactionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  reactionCount: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  composeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1e3a5f',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})
