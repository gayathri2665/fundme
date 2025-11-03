import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import { ArrowLeft } from 'lucide-react';
import { createCampaign } from '../lib/api';

export function CreateCampaign() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'technology',
    goal_amount: '',
    end_date: '',
    image_url: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (profile?.role !== 'entrepreneur') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary mb-4">Only entrepreneurs can create campaigns</p>
          <button
            onClick={() => navigate('/campaigns')}
            className="text-primary-accent hover:text-secondary-accent font-semibold"
          >
            Back to Campaigns
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.title || !formData.description || !formData.goal_amount || !formData.end_date) {
        throw new Error('Please fill in all required fields');
      }

      await createCampaign({
        creator_id: user?.id || 'mock-creator-id',
        title: formData.title,
        description: formData.description,
        category: formData.category,
        goal_amount: parseFloat(formData.goal_amount),
        image_url: formData.image_url || '',
        end_date: formData.end_date,
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

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

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-highlight-button">
          <h1 className="text-3xl font-bold text-text-primary mb-8">Create New Campaign</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Campaign Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-highlight-button rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
                placeholder="Your amazing idea"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-highlight-button rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent resize-none"
                placeholder="Describe your campaign in detail..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-highlight-button rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
                >
                  <option value="technology">Technology</option>
                  <option value="fashion">Fashion</option>
                  <option value="food">Food</option>
                  <option value="services">Services</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Funding Goal ($) *
                </label>
                <input
                  type="number"
                  name="goal_amount"
                  value={formData.goal_amount}
                  onChange={handleChange}
                  required
                  min="1000"
                  step="1000"
                  className="w-full px-4 py-2 border border-highlight-button rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
                  placeholder="50000"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Campaign End Date *
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-highlight-button rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Campaign Image URL
                </label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-highlight-button rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary-accent hover:bg-secondary-accent disabled:bg-primary-accent/50 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {loading ? 'Creating...' : 'Create Campaign'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/campaigns')}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-text-secondary font-semibold py-3 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
