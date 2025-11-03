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
    title: 'Quantum Computing for Everyone',
    description: 'Democratizing access to quantum computing power for researchers and developers.',
    category: 'technology',
    goal_amount: 100000,
    current_amount: 75000,
    image_url: 'https://images.unsplash.com/photo-1627914436034-e40df5f09623?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: 'active',
    end_date: '2025-12-31',
    creator_id: 'user123',
  },
  {
    id: '2',
    title: 'Eco-Friendly Fashion Line',
    description: 'Sustainable and stylish clothing made from recycled materials.',
    category: 'fashion',
    goal_amount: 50000,
    current_amount: 30000,
    image_url: 'https://images.unsplash.com/photo-1510906594845-5644e7894676?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: 'active',
    end_date: '2025-11-20',
    creator_id: 'user124',
  },
  {
    id: '3',
    title: 'Gourmet Vegan Food Truck',
    description: 'Bringing delicious plant-based cuisine to the streets.',
    category: 'food',
    goal_amount: 25000,
    current_amount: 28000,
    image_url: 'https://images.unsplash.com/photo-1541523321-df13b1940984?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: 'active',
    end_date: '2025-12-15',
    creator_id: 'user125',
  },
  {
    id: '4',
    title: 'AI-Powered Language Learning App',
    description: 'Personalized language lessons with AI feedback and practice.',
    category: 'technology',
    goal_amount: 75000,
    current_amount: 60000,
    image_url: 'https://images.unsplash.com/photo-1555775456-78e727e4e130?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: 'active',
    end_date: '2026-01-10',
    creator_id: 'user126',
  },
  {
    id: '5',
    title: 'Handcrafted Artisan Jewelry',
    description: 'Unique, handmade jewelry pieces inspired by nature.',
    category: 'fashion',
    goal_amount: 15000,
    current_amount: 10000,
    image_url: 'https://plus.unsplash.com/premium_photo-1678565869434-096ad81792d7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: 'active',
    end_date: '2025-11-25',
    creator_id: 'user127',
  },
];

const mockUpdates: Update[] = [
  {
    id: 'update1',
    campaign_id: '1',
    title: 'Project Update: Quantum Progress!',
    content: 'We\'ve made significant strides in our quantum algorithm development.',
    created_at: '2025-10-20T10:00:00Z',
  },
  {
    id: 'update2',
    campaign_id: '1',
    title: 'New Partnership Announced',
    content: 'Excited to announce our collaboration with leading tech firm X.',
    created_at: '2025-10-25T14:30:00Z',
  },
  {
    id: 'update3',
    campaign_id: '2',
    title: 'Fabric Sourcing Complete',
    content: 'All eco-friendly fabrics have been sourced and are ready for production.',
    created_at: '2025-10-15T09:00:00Z',
  },
];

const mockBackers: Backer[] = [
  {
    id: 'backer1',
    campaign_id: '1',
    backer_id: 'investor1',
    amount: 1000,
    message: 'Excited about the future of quantum!',
    created_at: '2025-10-18T11:00:00Z',
  },
  {
    id: 'backer2',
    campaign_id: '1',
    backer_id: 'investor2',
    amount: 500,
    message: '',
    created_at: '2025-10-22T16:00:00Z',
  },
  {
    id: 'backer3',
    campaign_id: '2',
    backer_id: 'investor3',
    amount: 200,
    message: 'Love sustainable fashion!',
    created_at: '2025-10-16T10:00:00Z',
  },
];

const mockBackings: Backing[] = [
  {
    id: 'backing1',
    campaign_id: '1',
    amount: 1000,
    created_at: '2025-10-18T11:00:00Z',
  },
  {
    id: 'backing2',
    campaign_id: '2',
    amount: 500,
    created_at: '2025-10-22T16:00:00Z',
  },
];

export const fetchCampaigns = async (): Promise<Campaign[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCampaigns);
    }, 500); // Simulate network delay
  });
};

export const fetchCampaignById = async (id: string): Promise<Campaign | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const campaign = mockCampaigns.find((c) => c.id === id);
      resolve(campaign || null);
    }, 500);
  });
};

export const fetchCampaignUpdates = async (campaignId: string): Promise<Update[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updates = mockUpdates.filter((u) => u.campaign_id === campaignId);
      resolve(updates);
    }, 500);
  });
};

export const fetchCampaignBackers = async (campaignId: string): Promise<Backer[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const backers = mockBackers.filter((b) => b.campaign_id === campaignId);
      resolve(backers);
    }, 500);
  });
};

export const createCampaign = async (campaignData: Omit<Campaign, 'id' | 'current_amount' | 'status'>): Promise<Campaign> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newCampaign: Campaign = {
        ...campaignData,
        id: `mock-campaign-${Math.random().toString(36).substr(2, 9)}`,
        current_amount: 0,
        status: 'active',
      };
      mockCampaigns.push(newCampaign); // Add to mock data for subsequent fetches
      resolve(newCampaign);
    }, 500);
  });
};

export const fetchCampaignsByCreator = async (creatorId: string): Promise<Campaign[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const campaigns = mockCampaigns.filter((c) => c.creator_id === creatorId);
      resolve(campaigns);
    }, 500);
  });
};

export const fetchBackingsByBacker = async (backerId: string): Promise<Backing[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const backings = mockBackings.filter((b) => b.backer_id === backerId);
      resolve(backings);
    }, 500);
  });
};
