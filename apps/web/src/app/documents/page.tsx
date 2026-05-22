'use client'

import Link from 'next/link'
import { useState } from 'react'
import { 
  FileText, 
  ChevronLeft,
  Download,
  ExternalLink,
  Search,
  Folder
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type DocumentCategory = 'schedule' | 'form' | 'waiver' | 'booster' | 'fundraising' | 'guide'

interface Document {
  id: string
  title: string
  description?: string
  category: DocumentCategory
  fileType: string
  fileSize: string
  uploadedAt: string
  url: string
}

const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Season Schedule 2024',
    description: 'Complete schedule for the 2024 football season',
    category: 'schedule',
    fileType: 'PDF',
    fileSize: '245 KB',
    uploadedAt: 'Nov 1, 2024',
    url: '#',
  },
  {
    id: '2',
    title: 'Physical Form',
    description: 'Required physical examination form for all players',
    category: 'form',
    fileType: 'PDF',
    fileSize: '128 KB',
    uploadedAt: 'Aug 15, 2024',
    url: '#',
  },
  {
    id: '3',
    title: 'Liability Waiver',
    description: 'Parent/guardian liability waiver - must be signed',
    category: 'waiver',
    fileType: 'PDF',
    fileSize: '89 KB',
    uploadedAt: 'Aug 15, 2024',
    url: '#',
  },
  {
    id: '4',
    title: 'Travel Permission Form',
    description: 'Required for all away games',
    category: 'waiver',
    fileType: 'PDF',
    fileSize: '112 KB',
    uploadedAt: 'Sep 1, 2024',
    url: '#',
  },
  {
    id: '5',
    title: 'Booster Club Information',
    description: 'Information about joining and supporting the Booster Club',
    category: 'booster',
    fileType: 'PDF',
    fileSize: '1.2 MB',
    uploadedAt: 'Aug 20, 2024',
    url: '#',
  },
  {
    id: '6',
    title: 'Fundraising Packet',
    description: 'Current fundraising opportunities and order forms',
    category: 'fundraising',
    fileType: 'PDF',
    fileSize: '3.4 MB',
    uploadedAt: 'Oct 15, 2024',
    url: '#',
  },
  {
    id: '7',
    title: 'Parent Guide 2024',
    description: 'Complete guide for football parents - expectations, schedules, contacts',
    category: 'guide',
    fileType: 'PDF',
    fileSize: '2.1 MB',
    uploadedAt: 'Aug 1, 2024',
    url: '#',
  },
  {
    id: '8',
    title: 'Game Day Film - vs Northshore',
    description: 'Film review from the Northshore game',
    category: 'guide',
    fileType: 'MP4',
    fileSize: '156 MB',
    uploadedAt: 'Nov 10, 2024',
    url: '#',
  },
]

const categoryLabels: Record<DocumentCategory, string> = {
  schedule: 'Schedule',
  form: 'Forms',
  waiver: 'Waivers',
  booster: 'Booster Club',
  fundraising: 'Fundraising',
  guide: 'Guides & Resources',
}

const categoryColors: Record<DocumentCategory, string> = {
  schedule: 'bg-blue-100 text-blue-800',
  form: 'bg-green-100 text-green-800',
  waiver: 'bg-red-100 text-red-800',
  booster: 'bg-purple-100 text-purple-800',
  fundraising: 'bg-orange-100 text-orange-800',
  guide: 'bg-gray-100 text-gray-800',
}

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | 'all'>('all')

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = Object.keys(categoryLabels) as DocumentCategory[]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80">
              <ChevronLeft size={20} />
              <span>Back</span>
            </Link>
            <h1 className="text-lg font-semibold ml-4 flex items-center gap-2">
              <FileText size={20} />
              Documents
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Folder size={16} className="text-muted-foreground flex-shrink-0" />
            <Button
              size="sm"
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                size="sm"
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
              >
                {categoryLabels[category]}
              </Button>
            ))}
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={categoryColors[doc.category]}>
                        {categoryLabels[doc.category]}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {doc.fileType}
                      </span>
                    </div>
                    <h3 className="font-medium truncate">{doc.title}</h3>
                    {doc.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {doc.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-muted-foreground">
                        {doc.fileSize} • {doc.uploadedAt}
                      </span>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <ExternalLink size={16} />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Download size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <FileText size={48} className="mx-auto mb-4 opacity-50" />
              <p>No documents found</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
