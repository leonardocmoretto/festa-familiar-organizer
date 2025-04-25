
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { EventList } from "@/components/EventList";
import { useAuth } from "@/context/AuthContext";
import { useEvents } from "@/context/EventContext";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user, isAdmin } = useAuth();
  const { events } = useEvents();
  const navigate = useNavigate();

  // Filter events for quick stats
  const pendingEvents = events.filter(e => e.status === 'pending');
  const hostEvents = events.filter(e => e.hostId === user?.id);
  const pendingApproval = events.filter(
    e => e.hostId === user?.id && e.status === 'pending' && e.creatorId !== user?.id
  );
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-festa-teal">Gerenciador de Eventos Familiares</h1>
            <p className="text-gray-600 mt-1">Organize e gerencie seus eventos familiares de forma simples</p>
          </div>
          
          <Button 
            onClick={() => navigate('/new-event')}
            className="mt-4 md:mt-0 bg-festa-teal hover:bg-festa-teal/90 text-white"
          >
            Criar Novo Evento
          </Button>
        </div>
        
        {user && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-festa-mint">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-festa-teal">Eventos Pendentes</CardTitle>
                <CardDescription>Aguardando aprovação</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-festa-peach">{pendingEvents.length}</p>
              </CardContent>
            </Card>
            
            <Card className="border-festa-mint">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-festa-teal">Meus Eventos como Anfitrião</CardTitle>
                <CardDescription>Eventos na sua casa</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-festa-green">{hostEvents.length}</p>
              </CardContent>
            </Card>
            
            <Card className="border-festa-mint">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-festa-teal">Aprovações Pendentes</CardTitle>
                <CardDescription>Eventos aguardando sua aprovação</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-festa-peach">{pendingApproval.length}</p>
                {pendingApproval.length > 0 && (
                  <Button
                    onClick={() => navigate(`/event/${pendingApproval[0].id}`)}
                    variant="link"
                    className="p-0 h-auto text-festa-teal"
                  >
                    Ver primeiro pendente
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        )}
        
        <h2 className="text-xl font-semibold text-festa-teal mb-4">Próximos Eventos</h2>
        <EventList />
      </main>
      
      <footer className="bg-white border-t border-festa-mint py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          Sistema de Gerenciamento de Eventos Familiares © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Index;
