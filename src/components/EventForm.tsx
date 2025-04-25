
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useEvents } from "@/context/EventContext";
import { EventStatus, EventType } from "@/types";
import { users } from "@/data/mockData";

interface EventFormProps {
  editingEvent?: {
    id: string;
    title: string;
    dateTime: string;
    location: string;
    type: EventType;
    description?: string;
    creatorId: string;
    hostId: string;
    status: EventStatus;
  };
}

export function EventForm({ editingEvent }: EventFormProps) {
  const { user } = useAuth();
  const { addEvent, updateEvent } = useEvents();
  const navigate = useNavigate();

  const [title, setTitle] = useState(editingEvent?.title || "");
  const [date, setDate] = useState(editingEvent ? new Date(editingEvent.dateTime).toISOString().split("T")[0] : "");
  const [time, setTime] = useState(editingEvent ? new Date(editingEvent.dateTime).toISOString().split("T")[1].substring(0, 5) : "");
  const [location, setLocation] = useState(editingEvent?.location || "");
  const [type, setType] = useState<EventType>(editingEvent?.type || "birthday");
  const [description, setDescription] = useState(editingEvent?.description || "");
  const [hostId, setHostId] = useState(editingEvent?.hostId || user?.id || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    const formattedDateTime = `${date}T${time}:00`;
    
    if (editingEvent) {
      updateEvent(editingEvent.id, {
        title,
        dateTime: formattedDateTime,
        location,
        type,
        description,
        hostId,
      });
    } else {
      // For new events
      addEvent({
        title,
        dateTime: formattedDateTime,
        location,
        type,
        description,
        creatorId: user.id,
        hostId,
        // If creator is host, auto-approve, otherwise pending
        status: user.id === hostId ? 'approved' : 'pending',
      });
    }
    
    navigate('/');
  };

  return (
    <Card className="w-full max-w-3xl mx-auto border-festa-mint">
      <CardHeader className="bg-festa-mint bg-opacity-20">
        <CardTitle className="text-xl text-festa-teal">
          {editingEvent ? "Editar Evento" : "Criar Novo Evento"}
        </CardTitle>
        <CardDescription>
          {editingEvent 
            ? "Atualize os detalhes do evento conforme necessário"
            : "Preencha os detalhes para criar um novo evento familiar"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título do Evento</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Aniversário da Maria"
              required
              className="border-festa-mint focus:border-festa-teal"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="border-festa-mint focus:border-festa-teal"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Hora</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="border-festa-mint focus:border-festa-teal"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Local</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex: Casa da Maria, Rua das Flores, 123"
              required
              className="border-festa-mint focus:border-festa-teal"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo do Evento</Label>
              <Select value={type} onValueChange={(val: EventType) => setType(val)}>
                <SelectTrigger 
                  id="type" 
                  className="border-festa-mint focus:border-festa-teal"
                >
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="birthday">Aniversário 🎂</SelectItem>
                  <SelectItem value="lunch">Almoço 🍽️</SelectItem>
                  <SelectItem value="dinner">Jantar 🍷</SelectItem>
                  <SelectItem value="barbecue">Churrasco 🥩</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="host">Anfitrião</Label>
              <Select value={hostId} onValueChange={setHostId}>
                <SelectTrigger 
                  id="host"
                  className="border-festa-mint focus:border-festa-teal"
                >
                  <SelectValue placeholder="Selecione o anfitrião" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalhes adicionais sobre o evento..."
              className="min-h-[100px] border-festa-mint focus:border-festa-teal"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="border-festa-peach text-festa-teal hover:bg-festa-peach hover:text-white"
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit}
          className="bg-festa-teal hover:bg-festa-teal/90 text-white"
        >
          {editingEvent ? "Atualizar Evento" : "Criar Evento"}
        </Button>
      </CardFooter>
    </Card>
  );
}
