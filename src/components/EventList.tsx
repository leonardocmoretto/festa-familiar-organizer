
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalendarCard } from "@/components/ui/calendar-card";
import { Event, EventStatus, EventType } from "@/types";
import { useEvents } from "@/context/EventContext";

interface EventListProps {
  showFilters?: boolean;
}

export function EventList({ showFilters = true }: EventListProps) {
  const { events } = useEvents();
  const navigate = useNavigate();
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // Apply filters
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || event.type === typeFilter;
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  // Sort events by date (most recent first)
  const sortedEvents = [...filteredEvents].sort((a, b) => 
    new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
  );
  
  return (
    <div className="w-full space-y-6">
      {showFilters && (
        <div className="space-y-4 bg-white p-4 rounded-lg border border-festa-mint">
          <div>
            <Label htmlFor="search" className="text-festa-teal">Pesquisar Eventos</Label>
            <Input
              id="search"
              placeholder="Digite título ou local..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-festa-mint mt-1 focus:border-festa-teal"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type-filter" className="text-festa-teal">Tipo de Evento</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger id="type-filter" className="border-festa-mint mt-1">
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="birthday">Aniversário 🎂</SelectItem>
                  <SelectItem value="lunch">Almoço 🍽️</SelectItem>
                  <SelectItem value="dinner">Jantar 🍷</SelectItem>
                  <SelectItem value="barbecue">Churrasco 🥩</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="status-filter" className="text-festa-teal">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status-filter" className="border-festa-mint mt-1">
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                  <SelectItem value="approved">Aprovados</SelectItem>
                  <SelectItem value="rejected">Rejeitados</SelectItem>
                  <SelectItem value="canceled">Cancelados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
      
      {sortedEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedEvents.map(event => (
            <CalendarCard 
              key={event.id} 
              event={event} 
              onClick={() => navigate(`/event/${event.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-white rounded-lg border border-festa-mint">
          <h3 className="text-lg font-medium text-gray-600">Nenhum evento encontrado</h3>
          <p className="text-gray-500 mt-1">Tente ajustar os filtros ou criar um novo evento.</p>
          <Button 
            className="mt-4 bg-festa-teal hover:bg-festa-teal/90 text-white"
            onClick={() => navigate('/new-event')}
          >
            Criar Evento
          </Button>
        </div>
      )}
    </div>
  );
}
