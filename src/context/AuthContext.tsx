
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { currentUser, users } from '../data/mockData';
import { toast } from '../hooks/use-toast';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(currentUser);

  const login = async (email: string, password: string) => {
    // In a real app, this would validate against a backend
    const foundUser = users.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo, ${foundUser.name}!`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: "Credenciais inválidas.",
      });
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logout realizado",
      description: "Você saiu do sistema.",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
