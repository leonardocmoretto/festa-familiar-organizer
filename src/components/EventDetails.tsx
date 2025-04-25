
import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Event, User } from "@/types";
import { getUserById } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { useEvents } from "@/context/EventContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface EventDetailsProps {
  event: Event;
}

export function EventDetails({ event }: EventDetailsProps) {
  const { user, isAdmin } = useAuth();
  const { updateEventStatus, deleteEvent } = useEvents();
  const navigate = useNavigate();
  
  const eventDate = new Date(event.dateTime);
  const hostUser = getUserById(event.hostId) as User;
  const creatorUser = getUserById(event.creatorId) as User;
  
  const isHost = user?.id === event.hostId;
  const isCreator = user?.id === event.creatorId;
  const canApprove = isHost && event.status === 'pending';
  const canEdit = isAdmin || isCreator || isHost;
  const canDelete = isAdmin || isCreator || (isHost && event.status !== 'approved');
  
  const handleApprove = () => {
    updateEventStatus(event.id, 'approved');
    toast({
      title: "Evento aprovado",
      description: "O evento foi aprovado com sucesso.",
    });
  };
  
  const handleReject = () => {
    updateEventStatus(event.id, 'rejected');
    toast({
      title: "Evento rejeitado",
      description: "O evento foi rejeitado.",
    });
  };
  
  const handleCancel = () => {
    updateEventStatus(event.id, 'canceled');
    toast({
      title: "Evento cancelado",
      description: "O evento foi cancelado com sucesso.",
    });
  };
  
  const handleDelete = () => {
    deleteEvent(event.id);
    navigate('/');
    toast({
      title: "Evento removido",
      description: "O evento foi removido permanentemente.",
    });
  };
  
  const handleEdit = () => {
    navigate(`/edit-event/${event.id}`);
  };
  
  const getStatusBadge = () => {
    switch (event.status) {
      case 'approved':
        return <Badge className="bg-festa-green text-white">Aprovado</Badge>;
      case 'pending':
        return <Badge className="bg-festa-peach text-black">Pendente</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500 text-white">Rejeitado</Badge>;
      case 'canceled':
        return <Badge className="bg-gray-500 text-white">Cancelado</Badge>;
    }
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto border-festa-mint">
      <CardHeader className="pb-2 bg-festa-mint bg-opacity-20">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-festa-teal">{event.title}</CardTitle>
          {getStatusBadge()}
        </div>
        <CardDescription>
          {event.type === 'birthday' ? '🎂 Aniversário' : 
           event.type === 'lunch' ? '🍽️ Almoço' : 
           event.type === 'dinner' ? '🍷 Jantar' : '🥩 Churrasco'}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Data</p>
            <p className="font-medium">{format(eventDate, "PPP", { locale: ptBR })}</p>
          </div>
          <div>
            <p className="text-gray-500">Hora</p>
            <p className="font-medium">{format(eventDate, "HH:mm", { locale: ptBR })}</p>
          </div>
          <div>
            <p className="text-gray-500">Local</p>
            <p className="font-medium">{event.location}</p>
          </div>
          <div>
            <p className="text-gray-500">Anfitrião</p>
            <p className="font-medium">{hostUser?.name}</p>
          </div>
        </div>
        
        <Separator className="bg-festa-mint" />
        
        {event.description && (
          <div>
            <h3 className="font-medium mb-1 text-festa-teal">Descrição</h3>
            <p className="text-sm text-gray-700">{event.description}</p>
          </div>
        )}
        
        <div>
          <h3 className="font-medium mb-1 text-festa-teal">Detalhes Adicionais</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p><span className="text-gray-500">Criado por:</span> {creatorUser?.name}</p>
            <p>
              <span className="text-gray-500">Criado em:</span> {format(new Date(event.createdAt), "Pp", { locale: ptBR })}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 justify-end border-t pt-4">
        {canApprove && (
          <>
            <Button 
              onClick={handleReject} 
              variant="outline"
              className="border-red-400 hover:bg-red-400 hover:text-white"
            >
              Rejeitar
            </Button>
            <Button 
              onClick={handleApprove}
              className="bg-festa-green hover:bg-festa-green/90 text-white"
            >
              Aprovar
            </Button>
          </>
        )}
        
        {event.status === 'approved' && (isCreator || isAdmin) && (
          <Button 
            onClick={handleCancel}
            variant="outline" 
            className="border-gray-400 hover:bg-gray-400 hover:text-white"
          >
            Cancelar Evento
          </Button>
        )}
        
        {canEdit && (
          <Button 
            onClick={handleEdit}
            className="bg-festa-peach hover:bg-festa-peach/90 text-black"
          >
            Editar
          </Button>
        )}
        
        {canDelete && (
          <Button 
            onClick={handleDelete}
            variant="destructive"
          >
            Excluir
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
