
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventList } from "@/components/EventList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEvents } from "@/context/EventContext";

const AdminPage = () => {
  const { user, isAdmin } = useAuth();
  const { events } = useEvents();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Redirect if not admin
  if (!user || !isAdmin) {
    return <Navigate to="/" />;
  }
  
  // Calculate statistics
  const totalEvents = events.length;
  const pendingEvents = events.filter(e => e.status === 'pending').length;
  const approvedEvents = events.filter(e => e.status === 'approved').length;
  const rejectedEvents = events.filter(e => e.status === 'rejected').length;
  const canceledEvents = events.filter(e => e.status === 'canceled').length;
  
  const upcomingEvents = events.filter(
    e => new Date(e.dateTime) > new Date() && e.status === 'approved'
  ).length;
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-festa-teal mb-2">Painel Administrativo</h1>
        <p className="text-gray-600 mb-8">Gerencie todos os eventos do sistema</p>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-festa-mint bg-opacity-20 border border-festa-mint">
            <TabsTrigger value="overview" className="data-[state=active]:bg-festa-teal data-[state=active]:text-white">
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-festa-teal data-[state=active]:text-white">
              Todos os Eventos
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-festa-teal data-[state=active]:text-white">
              Pendentes
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-festa-mint">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-festa-teal">Total de Eventos</CardTitle>
                  <CardDescription>Todos os eventos cadastrados</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{totalEvents}</p>
                </CardContent>
              </Card>
              
              <Card className="border-festa-mint">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-festa-teal">Eventos Pendentes</CardTitle>
                  <CardDescription>Aguardando aprovação</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-festa-peach">{pendingEvents}</p>
                </CardContent>
              </Card>
              
              <Card className="border-festa-mint">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-festa-teal">Eventos Futuros</CardTitle>
                  <CardDescription>Aprovados e ainda não ocorridos</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-festa-green">{upcomingEvents}</p>
                </CardContent>
              </Card>
              
              <Card className="border-festa-mint">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-festa-teal">Eventos Aprovados</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-festa-green">{approvedEvents}</p>
                </CardContent>
              </Card>
              
              <Card className="border-festa-mint">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-festa-teal">Eventos Rejeitados</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-red-500">{rejectedEvents}</p>
                </CardContent>
              </Card>
              
              <Card className="border-festa-mint">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-festa-teal">Eventos Cancelados</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-gray-500">{canceledEvents}</p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="border-festa-mint">
              <CardHeader>
                <CardTitle className="text-festa-teal">Eventos Recentes</CardTitle>
                <CardDescription>Últimos eventos cadastrados no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <EventList showFilters={false} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="events">
            <Card className="border-festa-mint">
              <CardHeader>
                <CardTitle className="text-festa-teal">Todos os Eventos</CardTitle>
                <CardDescription>Lista completa de eventos no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <EventList showFilters={true} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending">
            <Card className="border-festa-mint">
              <CardHeader>
                <CardTitle className="text-festa-teal">Eventos Pendentes</CardTitle>
                <CardDescription>Eventos aguardando aprovação</CardDescription>
              </CardHeader>
              <CardContent>
                {events.filter(e => e.status === 'pending').length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {events.filter(e => e.status === 'pending').map(event => (
                      <Card key={event.id} className="border-festa-peach">
                        <CardHeader>
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <CardDescription>
                            {new Date(event.dateTime).toLocaleDateString('pt-BR')} - {event.location}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>{event.description || "Sem descrição disponível."}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-8 text-gray-500">
                    Não há eventos pendentes de aprovação no momento.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-white border-t border-festa-mint py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          Sistema de Gerenciamento de Eventos Familiares © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default AdminPage;
