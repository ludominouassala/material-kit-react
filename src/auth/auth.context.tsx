import type { ReactNode } from 'react';

import {useState, useContext, createContext } from 'react';

import { login as loginService } from './auth.service';

interface AuthContextData {
  token: string | null;
  isAuthenticated: boolean;
  signIn: (email: string, senha: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );
  const isAuthenticated = !!token;
  
  async function signIn(email: string, senha: string) {
    const { token: authToken } = await loginService({ email, senha });
    localStorage.setItem('token', authToken);
    setToken(authToken);
  }

  function signOut() {
    localStorage.removeItem('token');
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, isAuthenticated ,signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}