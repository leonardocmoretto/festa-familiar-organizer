
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { EventForm } from "@/components/EventForm";
import { useEvents } from "@/context/EventContext";

const EditEventPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { events } = useEvents();
  const navigate = useNavigate();
  
  const event = events.find(e => e.id === eventId);
  
  if (!event) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1 container mx-auto py-8 px-4 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Evento não encontrado</h1>
          <p className="text-gray-600 mb-6">O evento que você está procurando não existe ou foi removido.</p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-festa-teal hover:bg-festa-teal/90 text-white"
          >
            Voltar para a Página Inicial
          </Button>
        </main>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="border-festa-mint text-festa-teal hover:bg-festa-mint hover:text-festa-teal"
          >
            ← Voltar
          </Button>
        </div>
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-festa-teal">Editar Evento</h1>
          <p className="text-gray-600">Atualize os detalhes do evento conforme necessário</p>
        </div>
        
        <EventForm editingEvent={event} />
      </main>
      
      <footer className="bg-white border-t border-festa-mint py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          Sistema de Gerenciamento de Eventos Familiares © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default EditEventPage;
