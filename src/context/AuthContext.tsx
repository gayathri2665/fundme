import React, { createContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
}

interface Profile {
  id: string;
  email: string;
  full_name: string;
  bio: string;
  avatar_url: string;
  role: 'entrepreneur' | 'investor' | 'freelancer';
  location: string;
  website: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would check for a stored token here
    // For this simple local auth, we'll just set loading to false
    setLoading(false);
  }, []);

  const fetchProfile = async (email: string) => {
    // Mock profile data based on the logged-in user's email
    const mockProfile: Profile = {
      id: 'mock-user-id-' + email,
      email: email,
      full_name: 'Test User',
      bio: 'This is a test user.',
      avatar_url: '',
      role: 'entrepreneur',
      location: 'Test City',
      website: 'https://example.com',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setProfile(mockProfile);
  };

  const signUp = async (email: string, password: string) => {
    const response = await fetch('http://localhost:3001/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to sign up');
    }

    // After successful signup, log them in or just set user state
    const mockUser: User = { id: 'mock-user-id-' + email, email };
    setUser(mockUser);
    await fetchProfile(email); // Fetch a mock profile for the new user
  };

  const signIn = async (email: string, password: string) => {
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to sign in');
    }

    const mockUser: User = { id: 'mock-user-id-' + email, email };
    setUser(mockUser);
    await fetchProfile(email);
  };

  const signOut = () => {
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}


