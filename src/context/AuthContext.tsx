import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'ADMIN' | 'FORMATEUR' | 'ETUDIANT' | null;

interface UserProfile {
  name: string;
  email: string;
  picture: string;
  role: UserRole;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (token: string, profileData: any) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  const login = (token: string, profileData: any) => {
    // In a real Google Apps Script / Classroom backend, 
    // we would verify the token and fetch the user's actual role from a Google Sheet/Apps Script.
    // Defaulting to ETUDIANT for demo purposes.
    setUser({
      name: profileData.name || 'Utilisateur',
      email: profileData.email || 'email@example.com',
      picture: profileData.picture || '',
      role: 'ETUDIANT', 
    });
    localStorage.setItem('eduforge_auth_token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eduforge_auth_token');
  };

  const setRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, setRole }}>
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
