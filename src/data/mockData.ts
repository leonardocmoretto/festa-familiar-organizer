
import { Event, EventGuest, EventStatus, EventType, GuestStatus, User, UserRole } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Admin Usuario',
    email: 'admin@example.com',
    phone: '(11) 99999-9999',
    role: 'admin'
  },
  {
    id: '2',
    name: 'João Silva',
    email: 'joao@example.com',
    phone: '(11) 88888-8888',
    role: 'user'
  },
  {
    id: '3',
    name: 'Maria Oliveira',
    email: 'maria@example.com',
    phone: '(11) 77777-7777',
    role: 'user'
  },
  {
    id: '4',
    name: 'Pedro Santos',
    email: 'pedro@example.com',
    phone: '(11) 66666-6666',
    role: 'user'
  }
];

// Mock Events
export const events: Event[] = [
  {
    id: '1',
    title: 'Aniversário da Maria',
    dateTime: '2025-05-15T18:00:00',
    location: 'Casa da Maria',
    type: 'birthday',
    description: 'Festa de aniversário da Maria. Traga um presente!',
    creatorId: '2',
    hostId: '3',
    status: 'pending',
    createdAt: '2025-04-20T10:30:00'
  },
  {
    id: '2',
    title: 'Almoço de Domingo',
    dateTime: '2025-05-01T12:00:00',
    location: 'Casa do João',
    type: 'lunch',
    description: 'Almoço tradicional de domingo com a família.',
    creatorId: '2',
    hostId: '2',
    status: 'approved',
    createdAt: '2025-04-18T14:20:00'
  },
  {
    id: '3',
    title: 'Churrasco de Confraternização',
    dateTime: '2025-05-10T16:00:00',
    location: 'Apartamento do Pedro',
    type: 'barbecue',
    creatorId: '3',
    hostId: '4',
    status: 'approved',
    createdAt: '2025-04-15T09:10:00'
  },
  {
    id: '4',
    title: 'Jantar de Formatura',
    dateTime: '2025-06-20T20:00:00',
    location: 'Restaurante Central',
    type: 'dinner',
    description: 'Comemoração da formatura da Ana. Traje: Esporte fino.',
    creatorId: '4',
    hostId: '1',
    status: 'rejected',
    createdAt: '2025-04-10T16:45:00'
  }
];

// Mock Event Guests
export const eventGuests: EventGuest[] = [
  { id: '1', eventId: '1', userId: '1', status: 'confirmed' },
  { id: '2', eventId: '1', userId: '2', status: 'confirmed' },
  { id: '3', eventId: '1', userId: '4', status: 'pending' },
  { id: '4', eventId: '2', userId: '3', status: 'confirmed' },
  { id: '5', eventId: '2', userId: '4', status: 'declined' },
  { id: '6', eventId: '3', userId: '1', status: 'confirmed' },
  { id: '7', eventId: '3', userId: '2', status: 'confirmed' },
  { id: '8', eventId: '4', userId: '2', status: 'pending' },
  { id: '9', eventId: '4', userId: '3', status: 'confirmed' }
];

// Helper functions to work with mock data
export const getUserById = (userId: string): User | undefined => {
  return users.find(user => user.id === userId);
};

export const getEventById = (eventId: string): Event | undefined => {
  return events.find(event => event.id === eventId);
};

export const getEventsByHostId = (hostId: string): Event[] => {
  return events.filter(event => event.hostId === hostId);
};

export const getEventGuests = (eventId: string): EventGuest[] => {
  return eventGuests.filter(guest => guest.eventId === eventId);
};

export const formatEventType = (type: EventType): string => {
  const types = {
    birthday: 'Aniversário',
    lunch: 'Almoço',
    dinner: 'Jantar',
    barbecue: 'Churrasco'
  };
  return types[type];
};

export const formatEventStatus = (status: EventStatus): string => {
  const statuses = {
    pending: 'Pendente',
    approved: 'Aprovado',
    rejected: 'Rejeitado',
    canceled: 'Cancelado'
  };
  return statuses[status];
};

export const formatGuestStatus = (status: GuestStatus): string => {
  const statuses = {
    pending: 'Pendente',
    confirmed: 'Confirmado',
    declined: 'Recusado'
  };
  return statuses[status];
};

export const getStatusColor = (status: EventStatus): string => {
  const colors = {
    pending: 'bg-festa-peach',
    approved: 'bg-festa-green',
    rejected: 'bg-red-500',
    canceled: 'bg-gray-400'
  };
  return colors[status];
};

export const getEventTypeIcon = (type: EventType): string => {
  const icons = {
    birthday: '🎂',
    lunch: '🍽️',
    dinner: '🍷',
    barbecue: '🥩'
  };
  return icons[type];
};

// Current user simulation (for demo)
export const currentUser = users[0]; // Using admin as default
