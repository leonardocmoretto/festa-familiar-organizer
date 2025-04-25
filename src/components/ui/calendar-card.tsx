
import React from "react";
import { format } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ptBR } from "date-fns/locale";
import { Event, EventStatus } from "@/types";
import { getUserById } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface CalendarCardProps {
  event: Event;
  onClick?: () => void;
}

const getStatusStyles = (status: EventStatus): string => {
  switch (status) {
    case "approved":
      return "bg-festa-green text-white";
    case "pending":
      return "bg-festa-peach text-black";
    case "rejected":
      return "bg-red-400 text-white";
    case "canceled":
      return "bg-gray-400 text-white";
    default:
      return "bg-gray-200";
  }
};

const getEventTypeEmoji = (type: string): string => {
  switch (type) {
    case "birthday":
      return "🎂";
    case "lunch":
      return "🍽️";
    case "dinner":
      return "🍷";
    case "barbecue":
      return "🥩";
    default:
      return "📅";
  }
};

export function CalendarCard({ event, onClick }: CalendarCardProps) {
  const eventDate = new Date(event.dateTime);
  const host = getUserById(event.hostId);
  const creator = getUserById(event.creatorId);

  return (
    <Card 
      className="w-full border border-festa-mint hover:border-festa-teal transition-colors cursor-pointer" 
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-1">
          <Badge className={cn(getStatusStyles(event.status))}>
            {event.status === 'approved' ? 'Aprovado' : 
             event.status === 'pending' ? 'Pendente' : 
             event.status === 'rejected' ? 'Rejeitado' : 'Cancelado'}
          </Badge>
          <span className="text-xl">{getEventTypeEmoji(event.type)}</span>
        </div>
        <CardTitle className="text-lg font-semibold text-festa-teal">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm pb-2">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Data:</span>
            <span>{format(eventDate, "dd/MM/yyyy", { locale: ptBR })}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Hora:</span>
            <span>{format(eventDate, "HH:mm", { locale: ptBR })}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Local:</span>
            <span className="text-right">{event.location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 text-xs text-gray-500 flex justify-between border-t">
        <span>Criado por: {creator?.name || 'Desconhecido'}</span>
        <span>Anfitrião: {host?.name || 'Desconhecido'}</span>
      </CardFooter>
    </Card>
  );
}
