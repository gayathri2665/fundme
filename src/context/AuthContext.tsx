import React, { createContext, useEffect, useState } from 'react';



import { supabase } from '../lib/supabase';

interface User {
  id: string;
  email?: string;
  user_metadata: {
    [key: string]: unknown;
    role?: 'entrepreneur' | 'investor' | 'freelancer';
    fullName?: string;
  };
}
interface Profile {
  id: string;
  full_name?: string;
  role?: 'entrepreneur' | 'investor' | 'freelancer';
  // Add other profile fields if they exist in your 'profiles' table
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata: { role: string; fullName: string }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  fetchProfile: (userId: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Temporarily bypass getSession() for debugging
    setLoading(false);

    // Original getSession() and authListener code will be commented out
    /*
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error getting session:", error);
        }
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        }
      } catch (error) {
        console.error("Unexpected error in getSession:", error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
    */
  }, []);



  /*
  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching profile:', error);
    }
    setProfile(data);
  };
  */

  const signUp = async (email: string, password: string, metadata: { role: string; fullName: string }) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: metadata.role,
          full_name: metadata.fullName,
        }
      }
    });

    if (error) {
      throw error;
    }
    // The onAuthStateChange listener will handle setting the user and profile.
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
    // The onAuthStateChange listener will handle setting the user and profile.
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}


