'use client'

import Link from 'next/link'
import { 
  Bell, 
  ChevronLeft,
  AlertTriangle,
  Clock,
  User,
  Heart,
  ThumbsUp,
  Smile,
  PartyPopper,
  MessageSquare,
  Send
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface Announcement {
  id: string
  title: string
  content: string
  author: string
  isUrgent: boolean
  createdAt: string
}

interface Comment {
  id: string
  content: string
  author: string
  createdAt: string
}

interface Reaction {
  type: 'like' | 'heart' | 'thumbs_up' | 'celebrate' | 'pray'
  count: number
  userReacted: boolean
}

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Practice Moved Indoors Today',
    content: 'Due to weather conditions, today\'s practice has been moved to the main gymnasium. Please report to the gym by 3:30 PM. Bring indoor shoes.',
    author: 'Coach Williams',
    isUrgent: true,
    createdAt: '2 hours ago',
  },
  {
    id: '2',
    title: 'JV Practice Ends 30 Minutes Early',
    content: 'JV practice will end at 5:00 PM today instead of 5:30 PM. Please arrange pickup accordingly.',
    author: 'Coach Martinez',
    isUrgent: false,
    createdAt: '3 hours ago',
  },
  {
    id: '3',
    title: 'White Socks Required for Saturday Game',
    content: 'Reminder: All players must wear white socks for the Saturday game against Northshore. This is a league requirement.',
    author: 'Coach Williams',
    isUrgent: false,
    createdAt: '5 hours ago',
  },
  {
    id: '4',
    title: 'Film Review Session Uploaded',
    content: 'The film review from last week\'s game has been uploaded to the Documents section. All varsity players should review before Thursday\'s practice.',
    author: 'Coach Williams',
    isUrgent: false,
    createdAt: '1 day ago',
  },
  {
    id: '5',
    title: 'Team Photo Day - November 20th',
    content: 'Team photos will be taken on November 20th after practice. Players should bring their game jerseys and ensure they are clean. Individual and team photos will be available for purchase.',
    author: 'Team Parent - Sarah Johnson',
    isUrgent: false,
    createdAt: '2 days ago',
  },
  {
    id: '6',
    title: 'Booster Club Meeting Next Tuesday',
    content: 'The monthly Booster Club meeting will be held next Tuesday at 7:00 PM in the school library. All parents are welcome to attend. We will be discussing fundraising for new equipment.',
    author: 'Booster Club',
    isUrgent: false,
    createdAt: '3 days ago',
  },
]

const mockReactions: Record<string, Reaction[]> = {
  '1': [
    { type: 'like', count: 8, userReacted: true },
    { type: 'heart', count: 3, userReacted: false },
    { type: 'thumbs_up', count: 5, userReacted: false },
  ],
  '2': [
    { type: 'like', count: 4, userReacted: false },
    { type: 'thumbs_up', count: 2, userReacted: true },
  ],
  '3': [
    { type: 'like', count: 12, userReacted: false },
    { type: 'heart', count: 1, userReacted: false },
  ],
}

const mockComments: Record<string, Comment[]> = {
  '1': [
    { id: '1', content: 'Thanks for the update! We\'ll be there on time.', author: 'Jennifer Smith', createdAt: '1 hour ago' },
    { id: '2', content: 'Do we need to bring anything else besides indoor shoes?', author: 'Mike Johnson', createdAt: '45 minutes ago' },
  ],
  '2': [
    { id: '3', content: 'Got it, thanks for letting us know!', author: 'Sarah Davis', createdAt: '2 hours ago' },
  ],
}

const reactionIcons = {
  like: ThumbsUp,
  heart: Heart,
  thumbs_up: ThumbsUp,
  celebrate: PartyPopper,
  pray: Smile,
}

function ReactionButtons({ reactions }: { announcementId: string; reactions: Reaction[] }) {
  const [currentReactions, setCurrentReactions] = useState(reactions)

  const handleReaction = (reactionType: string) => {
    // In a real app, this would call your API
    setCurrentReactions(prev => 
      prev.map(reaction => {
        if (reaction.type === reactionType) {
          return {
            ...reaction,
            count: reaction.userReacted ? reaction.count - 1 : reaction.count + 1,
            userReacted: !reaction.userReacted
          }
        }
        return reaction
      })
    )
  }

  return (
    <div className="flex items-center gap-2 mt-3">
      {currentReactions.map((reaction) => {
        const Icon = reactionIcons[reaction.type]
        return (
          <Button
            key={reaction.type}
            variant={reaction.userReacted ? "default" : "outline"}
            size="sm"
            onClick={() => handleReaction(reaction.type)}
            className="flex items-center gap-1 h-8"
          >
            <Icon size={14} />
            <span className="text-xs">{reaction.count}</span>
          </Button>
        )
      })}
    </div>
  )
}

function CommentSection({ comments }: { announcementId: string; comments: Comment[] }) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [currentComments, setCurrentComments] = useState(comments)

  const handleAddComment = () => {
    if (newComment.trim()) {
      // In a real app, this would call your API
      const comment: Comment = {
        id: Date.now().toString(),
        content: newComment,
        author: 'Current User',
        createdAt: 'Just now'
      }
      setCurrentComments(prev => [...prev, comment])
      setNewComment('')
    }
  }

  return (
    <div className="mt-3">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowComments(!showComments)}
        className="flex items-center gap-1 text-muted-foreground"
      >
        <MessageSquare size={14} />
        {currentComments.length} {currentComments.length === 1 ? 'Comment' : 'Comments'}
      </Button>

      {showComments && (
        <div className="mt-3 space-y-3">
          {/* Add comment */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
            />
            <Button size="sm" onClick={handleAddComment}>
              <Send size={14} />
            </Button>
          </div>

          {/* Comments list */}
          <div className="space-y-2">
            {currentComments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{comment.author}</span>
                  <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                </div>
                <p className="text-sm text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function AnnouncementsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="falcons-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 text-white/90 hover:text-white">
              <ChevronLeft size={20} />
              <span>Back</span>
            </Link>
            <h1 className="text-lg font-semibold ml-4 flex items-center gap-2 text-white">
              <Bell size={20} />
              Announcements
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
        {mockAnnouncements.map((announcement) => (
          <Card 
            key={announcement.id}
            className={`falcons-card ${announcement.isUrgent ? 'border-yellow-400 bg-yellow-50' : ''}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {announcement.isUrgent && (
                  <AlertTriangle className="text-yellow-600 mt-1 flex-shrink-0" size={20} />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {announcement.isUrgent && (
                      <Badge className="bg-yellow-500 text-white">Urgent</Badge>
                    )}
                  </div>
                  <h3 className={`font-semibold text-lg ${announcement.isUrgent ? 'text-yellow-800' : 'text-gray-900'}`}>
                    {announcement.title}
                  </h3>
                  <p className={`mt-2 ${announcement.isUrgent ? 'text-yellow-700' : 'text-gray-600'}`}>
                    {announcement.content}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {announcement.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {announcement.createdAt}
                    </span>
                  </div>
                  
                  {/* Reactions */}
                  <ReactionButtons 
                    announcementId={announcement.id} 
                    reactions={mockReactions[announcement.id] || []}
                  />
                  
                  {/* Comments */}
                  <CommentSection 
                    announcementId={announcement.id} 
                    comments={mockComments[announcement.id] || []}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  )
}
