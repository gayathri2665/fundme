import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import { ArrowLeft, Heart, Share2 } from 'lucide-react';
import { Campaign, Update, Backer, fetchCampaignById, fetchCampaignUpdates, fetchCampaignBackers } from '../lib/api';

export function CampaignDetail() {
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [backers, setBackers] = useState<Backer[]>([]);
  const [loading, setLoading] = useState(true);
  const [backAmount, setBackAmount] = useState('');
  const [message, setMessage] = useState('');
  const [backingLoading, setBackingLoading] = useState(false);
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const [campaignRes, updatesRes, backersRes] = await Promise.all([
          fetchCampaignById(id as string),
          fetchCampaignUpdates(id as string),
          fetchCampaignBackers(id as string),
        ]);
  
        setCampaign(campaignRes);
        setUpdates(updatesRes || []);
        setBackers(backersRes || []);
      } catch (error) {
        console.error('Error fetching campaign:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCampaignData();
    }
  }, [id]);

  const handleBack = async () => {
    if (!user || !profile || profile.role !== 'investor') {
      alert('Only investors can back campaigns');
      return;
    }

    if (!backAmount || parseFloat(backAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setBackingLoading(true);
    try {
      // Mocking the backend call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      setBackAmount('');
      setMessage('');
      alert('Thank you for backing this campaign!');
      // No actual data update as this is a mock
    } catch (error) {
      console.error('Error backing campaign:', error);
      alert('Failed to back campaign');
    } finally {
      setBackingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-text-secondary">Campaign not found</p>
      </div>
    );
  }

  const progressPercentage = Math.min((campaign.current_amount / campaign.goal_amount) * 100, 100);
  const daysLeft = Math.ceil((new Date(campaign.end_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-highlight-button sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/campaigns')}
            className="flex items-center gap-2 text-primary-accent hover:text-secondary-accent font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Campaigns
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 border border-highlight-button">
          {campaign.image_url && (
            <img src={campaign.image_url} alt={campaign.title} className="w-full h-96 object-cover" />
          )}

          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-text-primary mb-2">{campaign.title}</h1>
                <span className="inline-block px-3 py-1 bg-highlight-button/50 text-secondary-accent rounded-full text-sm font-medium capitalize">
                  {campaign.category}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border border-highlight-button rounded-lg hover:bg-highlight-button/50 transition-colors">
                  <Heart className="w-6 h-6 text-secondary-accent" />
                </button>
                <button className="p-2 border border-highlight-button rounded-lg hover:bg-highlight-button/50 transition-colors">
                  <Share2 className="w-6 h-6 text-secondary-accent" />
                </button>
              </div>
            </div>

            <p className="text-text-secondary mb-8 text-lg">{campaign.description}</p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="mb-8">
                  <div className="flex justify-between items-baseline mb-3">
                    <div>
                      <p className="text-4xl font-bold text-text-primary">
                        ${campaign.current_amount.toLocaleString()}
                      </p>
                      <p className="text-text-secondary">
                        of ${campaign.goal_amount.toLocaleString()} goal
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-primary-accent">{Math.round(progressPercentage)}%</p>
                  </div>
                  <div className="w-full bg-highlight-button rounded-full h-3">
                    <div
                      className="bg-primary-accent h-3 rounded-full transition-all"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-background rounded-lg">
                  <div>
                    <p className="text-text-secondary text-sm mb-1">Backers</p>
                    <p className="text-2xl font-bold text-text-primary">{backers.length}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm mb-1">Days Left</p>
                    <p className="text-2xl font-bold text-text-primary">{Math.max(daysLeft, 0)}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm mb-1">Updates</p>
                    <p className="text-2xl font-bold text-text-primary">{updates.length}</p>
                  </div>
                </div>

                <div className="border-t border-highlight-button pt-8">
                  <h3 className="text-xl font-bold text-text-primary mb-6">Campaign Updates</h3>
                  {updates.length === 0 ? (
                    <p className="text-text-secondary">No updates yet</p>
                  ) : (
                    <div className="space-y-4">
                      {updates.map((update) => (
                        <div key={update.id} className="border-l-4 border-primary-accent pl-4 py-2">
                          <h4 className="font-semibold text-text-primary">{update.title}</h4>
                          <p className="text-text-secondary text-sm mt-1">{update.content}</p>
                          <p className="text-gray-400 text-xs mt-2">
                            {new Date(update.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-highlight-button pt-8 mt-8">
                  <h3 className="text-xl font-bold text-text-primary mb-6">Recent Backers</h3>
                  {backers.length === 0 ? (
                    <p className="text-text-secondary">No backers yet</p>
                  ) : (
                    <div className="space-y-3">
                      {backers.slice(0, 5).map((backer) => (
                        <div key={backer.id} className="p-3 bg-background rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-text-primary">
                                Backer backed ${backer.amount.toLocaleString()}
                              </p>
                              {backer.message && <p className="text-text-secondary text-sm mt-1">"{backer.message}"</p>}
                            </div>
                            <p className="text-gray-400 text-xs">
                              {new Date(backer.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="bg-highlight-button/50 border border-primary-accent/30 rounded-lg p-6 sticky top-24">
                  <h3 className="text-lg font-bold text-text-primary mb-4">Back This Campaign</h3>

                  {user && profile?.role === 'investor' ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">
                          Amount ($)
                        </label>
                        <input
                          type="number"
                          min="1"
                          step="100"
                          value={backAmount}
                          onChange={(e) => setBackAmount(e.target.value)}
                          className="w-full px-3 py-2 border border-highlight-button rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
                          placeholder="500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">
                          Optional Message
                        </label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full px-3 py-2 border border-highlight-button rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent resize-none"
                          rows={3}
                          placeholder="Why you believe in this campaign..."
                        />
                      </div>

                      <button
                        onClick={handleBack}
                        disabled={backingLoading}
                        className="w-full bg-primary-accent hover:bg-secondary-accent disabled:bg-primary-accent/50 text-white font-semibold py-2 rounded-lg transition-colors"
                      >
                        {backingLoading ? 'Processing...' : 'Back This Campaign'}
                      </button>
                    </div>
                  ) : user && profile?.role === 'entrepreneur' ? (
                    <p className="text-sm text-text-secondary">
                      Entrepreneurs cannot back campaigns. Switch to investor mode to back this campaign.
                    </p>
                  ) : (
                    <button
                      onClick={() => navigate('/auth')}
                      className="w-full bg-primary-accent hover:bg-secondary-accent text-white font-semibold py-2 rounded-lg transition-colors"
                    >
                      Sign In to Back
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
