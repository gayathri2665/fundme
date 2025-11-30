import React, { createContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email?: string;
  fullName?: string;
  role?: 'entrepreneur' | 'investor' | 'freelancer';
}

interface Profile {
  id: string;
  fullName?: string;
  role?: 'entrepreneur' | 'investor' | 'freelancer';
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata: { role: string; fullName: string }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      // Ensure profile is explicitly structured
      setProfile({
        id: parsedUser.id,
        fullName: parsedUser.fullName,
        role: parsedUser.role,
      });
      setUser(parsedUser); // User can be the raw parsed data
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, metadata: { role: string; fullName: string }) => {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, ...metadata }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const userData = await response.json();
    setUser(userData);
    // Ensure profile is explicitly structured
    setProfile({
      id: userData.id,
      fullName: userData.fullName,
      role: userData.role,
    });
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const signIn = async (email: string, password: string) => {
    const response = await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const userData = await response.json();
    setUser(userData);
    // Ensure profile is explicitly structured
    setProfile({
      id: userData.id,
      fullName: userData.fullName,
      role: userData.role,
    });
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const signOut = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}


