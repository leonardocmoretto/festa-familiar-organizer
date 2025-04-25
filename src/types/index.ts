
export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
}

export type EventType = 'birthday' | 'lunch' | 'dinner' | 'barbecue';

export type EventStatus = 'pending' | 'approved' | 'rejected' | 'canceled';

export interface Event {
  id: string;
  title: string;
  dateTime: string;
  location: string;
  type: EventType;
  description?: string;
  creatorId: string;
  hostId: string;
  status: EventStatus;
  createdAt: string;
}

export type GuestStatus = 'pending' | 'confirmed' | 'declined';

export interface EventGuest {
  id: string;
  eventId: string;
  userId: string;
  status: GuestStatus;
}
