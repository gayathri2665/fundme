// import { supabase } from './supabase';

export interface Campaign {
  id: string;
  title: string;
  description: string;
  category: string;
  goal_amount: number;
  current_amount: number;
  image_url: string;
  status: string;
  end_date: string;
  creator_id: string;
}

export interface Update {
  id: string;
  campaign_id: string;
  title: string;
  content: string;
  created_at: string;
}

export interface Backer {
  id: string;
  campaign_id: string;
  backer_id: string;
  amount: number;
  message: string;
  created_at: string;
}

interface Backing {
  id: string;
  campaign_id: string;
  amount: number;
  created_at: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Eco-Friendly Fashion Line',
    description: 'A new line of sustainable clothing made from recycled materials.',
    category: 'fashion',
    goal_amount: 25000,
    current_amount: 18000,
    image_url: `${import.meta.env.BASE_URL}assets/Eco-Friendly-Fashion-Line.jpg`,
    status: 'active',
    end_date: '2025-12-31',
    creator_id: 'user123',
  },
  {
    id: '2',
    title: 'Gourmet Vegan Food Truck',
    description: 'Bringing delicious and innovative plant-based meals to the city.',
    category: 'food',
    goal_amount: 15000,
    current_amount: 16500,
    image_url: `${import.meta.env.BASE_URL}assets/Gourmet-Vegan-Food-Truck.jpg`,
    status: 'active',
    end_date: '2026-01-15',
    creator_id: 'user456',
  },
  {
    id: '3',
    title: 'Handcrafted Artisan Jewelry',
    description: 'Unique, handcrafted jewelry pieces made with ethically sourced materials.',
    category: 'fashion',
    goal_amount: 10000,
    current_amount: 3000,
    image_url: `${import.meta.env.BASE_URL}assets/Handcrafted-Artisan-Jewelry.jpg`,
    status: 'active',
    end_date: '2025-11-30',
    creator_id: 'user789',
  },
  {
    id: '4',
    title: 'AI-Powered Language Learning App',
    description: 'An innovative app that uses AI to create personalized language learning plans.',
    category: 'technology',
    goal_amount: 50000,
    current_amount: 42000,
    image_url: `${import.meta.env.BASE_URL}assets/AI-Powered-Language-Learning-App.jpg`,
    status: 'active',
    end_date: '2026-02-28',
    creator_id: 'user101',
  },
  {
    id: '5',
    title: 'Quantum Computing for Everyone',
    description: 'A project to make quantum computing accessible and understandable to the public.',
    category: 'technology',
    goal_amount: 100000,
    current_amount: 75000,
    image_url: `${import.meta.env.BASE_URL}assets/Quantum-Computing-for-Everyone.jpg`,
    status: 'active',
    end_date: '2026-03-31',
    creator_id: 'user112',
  },
];

export const fetchCampaigns = async (): Promise<Campaign[]> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCampaigns);
    }, 500);
  });
};

export const fetchCampaignById = async (id: string): Promise<Campaign | null> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCampaigns.find((c) => c.id === id) || null);
    }, 500);
  });
};

export const fetchCampaignUpdates = async (campaignId: string): Promise<Update[]> => {
  const { data, error } = await supabase.from('campaign_updates').select('*').eq('campaign_id', campaignId);
  if (error) {
    console.error('Error fetching campaign updates:', error);
    return [];
  }
  return data as Update[];
};

export const fetchCampaignBackers = async (campaignId: string): Promise<Backer[]> => {
  const { data, error } = await supabase.from('backers').select('*').eq('campaign_id', campaignId);
  if (error) {
    console.error('Error fetching campaign backers:', error);
    return [];
  }
  return data as Backer[];
};

export const createCampaign = async (campaignData: Omit<Campaign, 'id' | 'current_amount' | 'status'>): Promise<Campaign> => {
  const { data, error } = await supabase.from('campaigns').insert([campaignData]).single();
  if (error) {
    console.error('Error creating campaign:', error);
    throw error;
  }
  return data as Campaign;
};

export const fetchCampaignsByCreator = async (creatorId: string): Promise<Campaign[]> => {
  const { data, error } = await supabase.from('campaigns').select('*').eq('creator_id', creatorId);
  if (error) {
    console.error('Error fetching campaigns by creator:', error);
    return [];
  }
  return data as Campaign[];
};

export const fetchBackingsByBacker = async (backerId: string): Promise<Backing[]> => {
  const { data, error } = await supabase.from('backers').select('*').eq('backer_id', backerId);
  if (error) {
    console.error('Error fetching backings by backer:', error);
    return [];
  }
  return data as Backing[];
};
