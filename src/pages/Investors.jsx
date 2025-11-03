import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, BarChart2, ShieldCheck, Users, Rocket, Lightbulb, ArrowRight, X } from 'lucide-react';

const highlights = [
  {
    icon: Briefcase,
    title: 'Verified Startup Listings',
    desc: 'Access a curated list of high-potential startups, thoroughly vetted by our expert team.',
  },
  {
    icon: BarChart2,
    title: 'ROI Tracking Dashboard',
    desc: 'Monitor your investment performance and track returns with our intuitive dashboard.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Fund Transfer Integration',
    desc: 'Invest with confidence through our secure and encrypted payment gateway.',
  },
  {
    icon: Users,
    title: 'Networking with Entrepreneurs',
    desc: 'Connect directly with founders and stay informed about their progress.',
  },
];

const pitches = [
    { title: 'GreenTech Innovators', description: 'Revolutionizing renewable energy solutions for a sustainable future.', summary: 'A brief summary of the GreenTech pitch, highlighting market opportunity and ROI potential.' },
    { title: 'AI-Powered Healthcare', description: 'AI-driven diagnostics to improve patient outcomes.', summary: 'A summary for AI-Powered Healthcare, focusing on the innovative tech and its impact.' },
    { title: 'FinTech for All', description: 'Democratizing financial services for underserved populations.', summary: 'FinTech for All summary: democratizing finance with strong growth prospects.' },
    { title: 'Quantum Computing Solutions', description: 'Next-generation computing power for complex problem-solving.', summary: 'Quantum Computing summary: a look at the future of high-power computation.' },
    { title: 'AgriTech Advancements', description: 'Smart farming solutions to increase crop yield and sustainability.', summary: 'AgriTech summary: smart, sustainable farming for higher yields.' },
    { title: 'EdTech Revolution', description: 'Personalized learning platforms for the digital age.', summary: 'EdTech summary: personalized learning for a new generation of students.' },
    { title: 'Space Exploration Tech', description: 'Affordable satellite technology for commercial use.', summary: 'Space Exploration summary: making commercial satellite tech accessible.' },
    { title: 'Bio-Synthetic Materials', description: 'Creating sustainable materials to reduce plastic waste.', summary: 'Bio-Synthetic summary: eco-friendly materials to combat plastic pollution.' },
    { title: 'Cybersecurity Shield', description: 'Advanced threat detection and prevention systems.', summary: 'Cybersecurity summary: protecting digital assets with advanced threat detection.' },
    { title: 'Logistics & Supply Chain AI', description: 'Optimizing global supply chains with artificial intelligence.', summary: 'Logistics AI summary: using AI to streamline global supply chains.' },
];

const partners = [
    { name: 'Innovate Hub', logo: '🚀' },
    { name: 'Tech Accelerate', logo: '⚡️' },
    { name: 'Venture Labs', logo: '💡' },
    { name: 'Startup Grind', logo: '⚙️' },
    { name: 'Future Founders', logo: '🌟' },
];

export function Investors() {
  const navigate = useNavigate();
  const [showPitches, setShowPitches] = useState(false);
  const [selectedPitch, setSelectedPitch] = useState(null);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-text-primary">
          Invest in the Future of Innovation <Rocket className="inline-block w-12 h-12" />
        </h1>
        <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
          Discover verified startups and passionate founders ready to revolutionize industries.
          Track your ROI, connect directly, and make smarter investments with FundMeUp.
        </p>
      </div>

      {/* Key Highlights Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-4 gap-6">
          {highlights.map((highlight, i) => (
            <div key={i} className="p-6 bg-white border border-highlight-button rounded-lg hover:border-secondary-accent transition-colors">
              <highlight.icon className="w-8 h-8 text-primary-accent mb-4" />
              <h3 className="font-semibold mb-2">{highlight.title}</h3>
              <p className="text-text-secondary text-sm">{highlight.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pitch Demo Section */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <button
            onClick={() => setShowPitches(!showPitches)}
            className="px-12 py-4 bg-secondary-accent hover:bg-primary-accent text-white rounded-lg font-semibold text-lg transition-colors"
          >
            {showPitches ? 'Hide Pitch Demos' : 'Pitch Demo'}
          </button>

          {showPitches && (
            <div className="mt-12 text-left">
              <div className="space-y-4">
                {pitches.map((pitch, i) => (
                  <div key={i} className="p-4 border border-highlight-button rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{pitch.title}</h4>
                        <p className="text-text-secondary text-sm">{pitch.description}</p>
                      </div>
                      <button
                        onClick={() => setSelectedPitch(selectedPitch?.title === pitch.title ? null : pitch)}
                        className="px-4 py-2 border border-highlight-button hover:bg-highlight-button rounded-lg font-semibold text-sm transition-colors flex-shrink-0"
                      >
                        {selectedPitch?.title === pitch.title ? 'Hide' : 'Summarize Pitch'}
                      </button>
                    </div>
                    {selectedPitch?.title === pitch.title && (
                      <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-highlight-button">
                        <p className="text-text-secondary text-sm">{pitch.summary}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/startups')}
            className="px-8 py-3 bg-primary-accent hover:bg-secondary-accent text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            View Startups <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/demo-call')}
            className="px-8 py-3 border border-highlight-button hover:bg-highlight-button rounded-lg font-semibold transition-colors"
          >
            Schedule a Demo Call
          </button>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted by Innovators</h2>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 mb-12">
            {partners.map((partner, i) => (
              <div key={i} className="flex items-center gap-3 text-text-secondary font-semibold">
                <span className="text-2xl">{partner.logo}</span>
                <span>{partner.name}</span>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg border border-highlight-button">
              <p className="text-2xl font-bold text-primary-accent">$10M+</p>
              <p className="text-text-secondary">raised through FundMeUp-backed startups.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-highlight-button">
              <p className="text-2xl font-bold text-primary-accent">98%</p>
              <p className="text-text-secondary">investor satisfaction rate.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
