
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const { user, logout, isAdmin } = useAuth();

  return (
    <header className="w-full bg-white border-b border-festa-mint py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-bold text-festa-teal flex items-center">
            <span className="mr-2">🎉</span>
            Festa Familiar
          </Link>
        </div>

        <nav className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-festa-teal transition-colors">
            Início
          </Link>
          
          <Link to="/new-event" className="text-gray-700 hover:text-festa-teal transition-colors">
            Criar Evento
          </Link>
          
          {isAdmin && (
            <Link to="/admin" className="text-gray-700 hover:text-festa-teal transition-colors">
              Admin
            </Link>
          )}
          
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-festa-peach font-medium">
                {user.name}
              </span>
              <Button 
                onClick={logout}
                variant="outline" 
                size="sm"
                className="border-festa-peach hover:bg-festa-peach hover:text-white"
              >
                Sair
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm" className="bg-festa-teal hover:bg-festa-teal/90 text-white">
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
