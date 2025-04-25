
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { EventForm } from "@/components/EventForm";

const NewEventPage = () => {
  const navigate = useNavigate();
  
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
          <h1 className="text-2xl font-bold text-festa-teal">Criar Novo Evento</h1>
          <p className="text-gray-600">Preencha os detalhes para criar um novo evento familiar</p>
        </div>
        
        <EventForm />
      </main>
      
      <footer className="bg-white border-t border-festa-mint py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          Sistema de Gerenciamento de Eventos Familiares © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default NewEventPage;
