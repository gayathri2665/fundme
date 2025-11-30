import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import { Search, Plus, TrendingUp, Clock } from 'lucide-react';
import { fetchCampaigns as fetchMockCampaigns, Campaign } from '../lib/api';



export function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const data = await fetchMockCampaigns();
        setCampaigns(data || []);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCampaigns();
  }, []);



  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || campaign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'technology', 'fashion', 'food', 'services', 'other'];
  const progressPercentage = (campaign: Campaign) => Math.min((campaign.current_amount / campaign.goal_amount) * 100, 100);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 bg-white border-b border-highlight-button shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-text-primary">Active Campaigns</h1>
          {user && profile?.role === 'entrepreneur' && (
            <button
              onClick={() => navigate('/campaigns/create')}
              className="flex items-center gap-2 px-4 py-2 bg-primary-accent hover:bg-secondary-accent text-white rounded-lg font-semibold transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Campaign
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-highlight-button rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                  selectedCategory === cat
                    ? 'bg-primary-accent text-white'
                    : 'bg-white border border-highlight-button text-text-secondary hover:border-primary-accent'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-text-secondary">Loading campaigns...</p>
          </div>
        ) : filteredCampaigns.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary">No campaigns found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                onClick={() => navigate(`/campaigns/${campaign.id}`)}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden border border-highlight-button hover:border-secondary-accent"
              >
                {campaign.image_url && (
                  <img
                    src={campaign.image_url}
                    alt={campaign.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-text-primary flex-1">{campaign.title}</h3>
                    <span className="text-xs px-2 py-1 bg-highlight-button/50 text-secondary-accent rounded capitalize font-medium">
                      {campaign.category}
                    </span>
                  </div>

                  <p className="text-sm text-text-secondary mb-4 line-clamp-2">{campaign.description}</p>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-text-primary">
                        ${campaign.current_amount.toLocaleString()}
                      </span>
                      <span className="text-text-secondary">
                        of ${campaign.goal_amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-highlight-button rounded-full h-2">
                      <div
                        className="bg-primary-accent h-2 rounded-full transition-all"
                        style={{ width: `${progressPercentage(campaign)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-text-secondary">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {Math.round(progressPercentage(campaign))}% funded
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {Math.ceil((new Date(campaign.end_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
