
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Event, EventGuest, EventStatus, EventType, GuestStatus } from '../types';
import { events as initialEvents, eventGuests as initialEventGuests } from '../data/mockData';
import { toast } from '../hooks/use-toast';

interface EventContextType {
  events: Event[];
  eventGuests: EventGuest[];
  addEvent: (event: Omit<Event, 'id' | 'createdAt'>) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  updateEventStatus: (id: string, status: EventStatus) => void;
  deleteEvent: (id: string) => void;
  addGuest: (eventId: string, userId: string) => void;
  updateGuestStatus: (id: string, status: GuestStatus) => void;
  removeGuest: (id: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [eventGuests, setEventGuests] = useState<EventGuest[]>(initialEventGuests);

  const addEvent = (eventData: Omit<Event, 'id' | 'createdAt'>) => {
    const newEvent: Event = {
      ...eventData,
      id: `${events.length + 1}`,
      createdAt: new Date().toISOString(),
    };

    setEvents([...events, newEvent]);
    
    toast({
      title: "Evento criado",
      description: "O evento foi criado com sucesso.",
    });

    return newEvent;
  };

  const updateEvent = (id: string, updates: Partial<Event>) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, ...updates } : event
    ));

    toast({
      title: "Evento atualizado",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  const updateEventStatus = (id: string, status: EventStatus) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, status } : event
    ));

    const statusMessages = {
      approved: "Evento aprovado com sucesso.",
      rejected: "Evento rejeitado.",
      canceled: "Evento cancelado.",
      pending: "Evento marcado como pendente."
    };

    toast({
      title: "Status atualizado",
      description: statusMessages[status],
    });
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
    setEventGuests(eventGuests.filter(guest => guest.eventId !== id));
    
    toast({
      title: "Evento removido",
      description: "O evento foi removido permanentemente.",
    });
  };

  const addGuest = (eventId: string, userId: string) => {
    const newGuest: EventGuest = {
      id: `${eventGuests.length + 1}`,
      eventId,
      userId,
      status: 'pending'
    };

    setEventGuests([...eventGuests, newGuest]);

    toast({
      title: "Convidado adicionado",
      description: "O convidado foi adicionado ao evento.",
    });
  };

  const updateGuestStatus = (id: string, status: GuestStatus) => {
    setEventGuests(eventGuests.map(guest => 
      guest.id === id ? { ...guest, status } : guest
    ));

    toast({
      title: "Status do convidado atualizado",
      description: `O status do convidado foi alterado para ${status}.`,
    });
  };

  const removeGuest = (id: string) => {
    setEventGuests(eventGuests.filter(guest => guest.id !== id));
    
    toast({
      title: "Convidado removido",
      description: "O convidado foi removido do evento.",
    });
  };

  return (
    <EventContext.Provider value={{
      events,
      eventGuests,
      addEvent,
      updateEvent,
      updateEventStatus,
      deleteEvent,
      addGuest,
      updateGuestStatus,
      removeGuest
    }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}
