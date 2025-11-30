import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, DollarSign, TrendingUp, Filter, Search, ChevronRight, PieChart } from 'lucide-react';

const featuredCampaigns = [
  { name: 'Quantum Computing for Everyone', category: 'Deep Tech', raised: 250000, goal: 1000000, summary: 'Making quantum computing accessible to developers and researchers worldwide.' },
  { name: 'Handcrafted Artisan Jewelry', category: 'E-commerce', raised: 45000, goal: 60000, summary: 'Unique, handmade jewelry from sustainable materials, supporting local artisans.' },
  { name: 'Smart Home Hub for Seniors', category: 'IoT', raised: 120000, goal: 200000, summary: 'An intuitive smart home system designed to help seniors live independently and safely.' },
];

const portfolio = [
  { name: 'Eco-Friendly Fashion Line', invested: 25000, status: 'Active' },
  { name: 'Gourmet Vegan Food Truck', invested: 15000, status: 'Exited' },
];

export function Investor() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans antialiased">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-text-primary">Investor Dashboard</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/campaigns')}
              className="px-6 py-2 bg-primary-accent hover:bg-secondary-accent text-white rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-md"
            >
              <Search className="w-5 h-5" />
              Discover Campaigns
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats Section */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-md border border-highlight-button">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-text-secondary text-sm">Total Invested</p>
                <p className="text-3xl font-bold text-text-primary mt-1">$40,000</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary-accent" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-highlight-button">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-text-secondary text-sm">Portfolio Size</p>
                <p className="text-3xl font-bold text-text-primary mt-1">2</p>
              </div>
              <Briefcase className="w-8 h-8 text-secondary-accent" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-highlight-button">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-text-secondary text-sm">Potential ROI</p>
                <p className="text-3xl font-bold text-text-primary mt-1">+15.2%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary-accent" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-highlight-button">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-text-secondary text-sm">Diversification</p>
                <p className="text-3xl font-bold text-text-primary mt-1">4 Sectors</p>
              </div>
              <PieChart className="w-8 h-8 text-secondary-accent" />
            </div>
          </div>
        </section>

        {/* Featured Campaigns Section */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-text-primary">Featured Campaigns</h2>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-highlight-button text-text-secondary hover:bg-highlight-button rounded-lg font-semibold text-sm">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredCampaigns.map((campaign, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md border border-highlight-button hover:shadow-lg transition-shadow">
                <p className="text-xs text-secondary-accent font-semibold mb-2">{campaign.category.toUpperCase()}</p>
                <h3 className="font-bold text-lg text-text-primary mb-2">{campaign.name}</h3>
                <p className="text-sm text-text-secondary mb-4">{campaign.summary}</p>
                <div className="mb-4">
                  <div className="w-full bg-highlight-button rounded-full h-2.5">
                    <div className="bg-primary-accent h-2.5 rounded-full" style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-text-secondary mt-1">
                    <span>${campaign.raised.toLocaleString()}</span>
                    <span>${campaign.goal.toLocaleString()}</span>
                  </div>
                </div>
                <button className="w-full text-right text-primary-accent font-semibold hover:underline">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </section>
        
        {/* Interactive Pitch Room */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text-primary mb-4">Interactive Pitch Room</h2>
          <div className="w-full rounded-lg shadow-lg border border-gray-700 overflow-hidden">
            <iframe
              src="https://www.spatial.io/embed/Meeting-Room-638e07856735020001e64a9a?share=5888498391600928287&autoplay=1&enableRtc=1"
              width="100%"
              height="720px"
              allow="camera; fullscreen; autoplay; display-capture; microphone; clipboard-write"
              className="border-0"
            ></iframe>
          </div>
        </section>

        {/* YouTube Video Showcases */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text-primary mb-4">Campaign Video Pitches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-video w-full rounded-lg shadow-md border border-highlight-button overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/watch?v=7KKVb0_IdD4&list=RD7KKVb0_IdD4&start_radio=1${i}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`YouTube video player ${i}`}
                ></iframe>
              </div>
            ))}
          </div>
        </section>

        {/* My Portfolio Section */}
        <section>
          <h2 className="text-xl font-bold text-text-primary mb-4">My Portfolio</h2>
          <div className="bg-white rounded-xl shadow-md border border-highlight-button overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-highlight-button bg-background">
                  <th className="p-4 font-semibold">Campaign Name</th>
                  <th className="p-4 font-semibold">Amount Invested</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((investment, i) => (
                  <tr key={i} className="border-b border-highlight-button last:border-0 hover:bg-background/50">
                    <td className="p-4 text-text-primary font-medium">{investment.name}</td>
                    <td className="p-4 text-text-secondary">${investment.invested.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        investment.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {investment.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-2 rounded-md text-text-secondary hover:bg-highlight-button">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Investor;