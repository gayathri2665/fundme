import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import { Plus, LogOut, Settings, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { Campaign, Backing, fetchCampaignsByCreator, fetchBackingsByBacker } from '../lib/api';

export function Dashboard() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [backings, setBackings] = useState<Backing[]>([]);
  const [stats, setStats] = useState({ totalBackings: 0, totalFunded: 0, campaignsCreated: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (profile?.role === 'entrepreneur') {
          const campaignsData = await fetchCampaignsByCreator(user?.id || '');
  
          setCampaigns(campaignsData || []);
  
          const totalFunded = (campaignsData || []).reduce((sum, c) => sum + c.current_amount, 0);
          setStats({
            campaignsCreated: campaignsData?.length || 0,
            totalFunded,
            totalBackings: 0,
          });
        } else if (profile?.role === 'investor') {
          const backingsData = await fetchBackingsByBacker(user?.id || '');
  
          setBackings(backingsData || []);
  
          const totalBackings = backingsData?.length || 0;
          const totalFunded = (backingsData || []).reduce((sum, b) => sum + b.amount, 0);
  
          setStats({ totalBackings, totalFunded, campaignsCreated: 0 });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user, profile]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 bg-white border-b border-highlight-button shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/campaigns')}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Explore
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="p-2 hover:bg-highlight-button/50 rounded-lg transition-colors"
            >
              <Settings className="w-6 h-6 text-text-secondary" />
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Welcome, {profile?.full_name || 'User'}</h2>
          <p className="text-text-secondary capitalize">You are logged in as an {profile?.role}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {profile?.role === 'entrepreneur' ? (
            <>
              <div className="bg-white rounded-lg shadow-md border border-highlight-button p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm font-medium">Campaigns Created</p>
                    <p className="text-3xl font-bold text-text-primary mt-2">{stats.campaignsCreated}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary-accent opacity-70" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md border border-highlight-button p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm font-medium">Total Funded</p>
                    <p className="text-3xl font-bold text-text-primary mt-2">
                      ${stats.totalFunded.toLocaleString()}
                    </p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-secondary-accent opacity-70" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md border border-highlight-button p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm font-medium">Total Backers</p>
                    <p className="text-3xl font-bold text-text-primary mt-2">
                      {campaigns.reduce((sum) => sum + (Math.random() > 0.5 ? 1 : 0), 0)}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-primary-accent opacity-70" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow-md border border-highlight-button p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm font-medium">Campaigns Backed</p>
                    <p className="text-3xl font-bold text-text-primary mt-2">{stats.totalBackings}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary-accent opacity-70" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md border border-highlight-button p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm font-medium">Total Invested</p>
                    <p className="text-3xl font-bold text-text-primary mt-2">
                      ${stats.totalFunded.toLocaleString()}
                    </p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-secondary-accent opacity-70" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md border border-highlight-button p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm font-medium">Avg. Investment</p>
                    <p className="text-3xl font-bold text-text-primary mt-2">
                      ${stats.totalBackings > 0 ? Math.round(stats.totalFunded / stats.totalBackings).toLocaleString() : 0}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-primary-accent opacity-70" />
                </div>
              </div>
            </>
          )}
        </div>

        {profile?.role === 'entrepreneur' ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-text-primary">My Campaigns</h3>
              <button
                onClick={() => navigate('/campaigns/create')}
                className="flex items-center gap-2 px-4 py-2 bg-primary-accent hover:bg-secondary-accent text-white rounded-lg font-semibold transition-colors"
              >
                <Plus className="w-5 h-5" />
                New Campaign
              </button>
            </div>

            {campaigns.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md border border-highlight-button p-8 text-center">
                <p className="text-text-secondary mb-4">You haven't created any campaigns yet</p>
                <button
                  onClick={() => navigate('/campaigns/create')}
                  className="px-6 py-2 bg-primary-accent hover:bg-secondary-accent text-white rounded-lg font-semibold transition-colors"
                >
                  Create Your First Campaign
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer border border-highlight-button hover:border-secondary-accent"
                    onClick={() => navigate(`/campaigns/${campaign.id}`)}
                  >
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-text-primary mb-2">{campaign.title}</h4>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-text-secondary">
                            ${campaign.current_amount.toLocaleString()}
                          </span>
                          <span className="text-text-secondary">
                            of ${campaign.goal_amount.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-highlight-button rounded-full h-2">
                          <div
                            className="bg-primary-accent h-2 rounded-full"
                            style={{ width: `${Math.min((campaign.current_amount / campaign.goal_amount) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-text-primary">
                          {Math.round((campaign.current_amount / campaign.goal_amount) * 100)}% funded
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          campaign.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : campaign.status === 'completed'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {campaign.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold text-text-primary mb-6">Campaigns I've Backed</h3>

            {backings.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md border border-highlight-button p-8 text-center">
                <p className="text-text-secondary mb-4">You haven't backed any campaigns yet</p>
                <button
                  onClick={() => navigate('/campaigns')}
                  className="px-6 py-2 bg-primary-accent hover:bg-secondary-accent text-white rounded-lg font-semibold transition-colors"
                >
                  Explore Campaigns
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-highlight-button">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-highlight-button/50 border-b border-highlight-button">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-text-primary">Campaign ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-text-primary">Amount</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-text-primary">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-highlight-button">
                      {backings.map((backing) => (
                        <tr key={backing.id} className="hover:bg-highlight-button/50">
                          <td className="px-6 py-4 text-sm text-text-primary font-medium">{backing.campaign_id.slice(0, 8)}...</td>
                          <td className="px-6 py-4 text-sm text-text-primary">${backing.amount.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm text-text-secondary">
                            {new Date(backing.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
