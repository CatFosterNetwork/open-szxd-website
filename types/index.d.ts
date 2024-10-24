import type { Avatar } from '#ui/types'

export type UserStatus = 'subscribed' | 'unsubscribed' | 'bounced'

export interface User {
  id: number
  name: string
  email: string
  avatar?: Avatar
  status: UserStatus
  location: string
}

export interface Schedule {
  id: number
  user: User
  time: string
  address: string
  status: 'unknown' | 'missing' | 'checked' | 'manual'
}

export interface Mail {
  id: number
  is_checked?: boolean
  from: User
  subject: string
  body: string
  date: string
  unread?: boolean
}

export interface Member {
  name: string
  username: string
  role: 'member' | 'owner'
  avatar: Avatar
}

export interface Notification {
  id: number
  unread?: boolean
  sender: User
  body: string
  date: string
}

export type Period = 'daily' | 'weekly' | 'monthly'

export interface Range {
  start: Date
  end: Date
}
