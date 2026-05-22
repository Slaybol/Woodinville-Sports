'use client'

import Link from 'next/link'
import { 
  Phone, 
  ChevronLeft,
  Mail,
  User,
  AlertCircle
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface EmergencyContact {
  id: string
  role: string
  name: string
  phone: string
  email?: string
}

const mockContacts: EmergencyContact[] = [
  {
    id: '1',
    role: 'Head Coach',
    name: 'Coach Mike Williams',
    phone: '(425) 555-0101',
    email: 'mwilliams@school.edu',
  },
  {
    id: '2',
    role: 'Assistant Coach',
    name: 'Coach David Martinez',
    phone: '(425) 555-0102',
    email: 'dmartinez@school.edu',
  },
  {
    id: '3',
    role: 'Team Parent Coordinator',
    name: 'Sarah Johnson',
    phone: '(425) 555-0201',
    email: 'sjohnson@email.com',
  },
  {
    id: '4',
    role: 'Athletic Director',
    name: 'Jennifer Adams',
    phone: '(425) 555-0301',
    email: 'jadams@school.edu',
  },
  {
    id: '5',
    role: 'Athletic Trainer',
    name: 'Dr. Robert Chen',
    phone: '(425) 555-0401',
    email: 'rchen@school.edu',
  },
  {
    id: '6',
    role: 'School Main Office',
    name: 'Woodinville High School',
    phone: '(425) 555-0001',
  },
]

export default function EmergencyPage() {
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
              <Phone size={20} />
              Emergency Contacts
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Emergency Notice */}
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
              <div>
                <p className="font-semibold text-red-800">In case of emergency</p>
                <p className="text-red-700 text-sm">
                  For life-threatening emergencies, always call 911 first. 
                  Use these contacts for team-related urgent matters.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact List */}
        <div className="space-y-4">
          {mockContacts.map((contact) => (
            <Card key={contact.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{contact.role}</p>
                      <p className="font-semibold">{contact.name}</p>
                      <div className="flex flex-col gap-1 mt-2">
                        <a 
                          href={`tel:${contact.phone}`}
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                          <Phone size={14} />
                          {contact.phone}
                        </a>
                        {contact.email && (
                          <a 
                            href={`mailto:${contact.email}`}
                            className="text-sm text-primary hover:underline flex items-center gap-1"
                          >
                            <Mail size={14} />
                            {contact.email}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <a href={`tel:${contact.phone}`}>
                    <Button size="sm">
                      <Phone size={16} className="mr-1" />
                      Call
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
