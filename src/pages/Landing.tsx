import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, ArrowRight, TrendingUp, Users, Zap, Shield, X, MessageSquare, Rocket, Share2 } from 'lucide-react';

const features = [
  { 
    icon: Zap, 
    title: 'Fast & Easy', 
    desc: 'Launch your campaign in minutes with a simple, guided setup.' 
  },
  { 
    icon: Rocket, 
    title: 'Campaign Management', 
    desc: 'Manage your campaign milestones and updates all in one place.' 
  },
  { 
    icon: Users, 
    title: 'Global Network', 
    desc: 'Connect with investors and innovators from around the world.' 
  },
  { 
    icon: Share2, 
    title: 'Networking', 
    desc: 'Build relationships with mentors, advisors, and other founders.' 
  },
  { 
    icon: TrendingUp, 
    title: 'Real Growth', 
    desc: 'Track your campaign’s progress in real-time with analytics tools.' 
  },
  { 
    icon: Shield, 
    title: 'Secure', 
    desc: 'Your data is protected and encrypted for safe fundraising.' 
  },
];

const testimonials = [
  {
    name: "Aisha Khan",
    role: "Founder, Eco-Innovate",
    quote: "FundMeUp was a game-changer for us. We connected with investors who truly believe in our vision and secured the funding we needed in just six weeks."
  },
  {
    name: "David Chen",
    role: "Angel Investor",
    quote: "The quality of startups on this platform is outstanding. I've made three investments and have been impressed with the founders' dedication and progress."
  },
  {
    name: "Maria Rodriguez",
    role: "CEO, TechSphere",
    quote: "An incredible platform for both founders and investors. The process is transparent, efficient, and supportive from start to finish."
  }
];

export function Landing() {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-highlight-button">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-7 h-7 text-primary-accent" />
            <span className="text-xl font-bold">FundMeUp</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/investors')}
              className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              Investors
            </button>
            <button
              onClick={() => navigate('/auth')}
              className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/auth')}
              className="px-6 py-2 bg-primary-accent hover:bg-secondary-accent text-white rounded-lg font-semibold transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-text-primary">
            Turn Your Ideas Into Reality
          </h1>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            FundMeUp connects ambitious entrepreneurs with passionate investors ready to fuel innovation and growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/auth')}
              className="px-8 py-3 bg-primary-accent hover:bg-secondary-accent text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              Join FundMeUp Today <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/campaigns')}
              className="px-8 py-3 border border-highlight-button hover:bg-highlight-button rounded-lg font-semibold transition-colors"
            >
              Explore Campaigns
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="p-6 bg-white border border-highlight-button rounded-lg hover:border-secondary-accent transition-colors cursor-pointer"
              onClick={() => setSelectedFeature(feature)}
            >
              <feature.icon className="w-8 h-8 text-primary-accent mb-4" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-text-secondary text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {selectedFeature && (
          <div 
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setSelectedFeature(null)}
          >
            <div 
              className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <selectedFeature.icon className="w-7 h-7 text-primary-accent" />
                  <h2 className="text-xl font-bold text-text-primary">{selectedFeature.title}</h2>
                </div>
                <button onClick={() => setSelectedFeature(null)} className="p-1 rounded-full hover:bg-highlight-button">
                  <X className="w-5 h-5 text-text-secondary" />
                </button>
              </div>
              <p className="text-text-secondary">{selectedFeature.desc}</p>
            </div>
          </div>
        )}

        <div className="bg-highlight-button/50 border border-primary-accent/30 rounded-lg p-12 text-center mb-20">
          <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            Whether you're an entrepreneur with a groundbreaking idea or an investor looking for the next big opportunity, FundMeUp is your platform.
          </p>
        </div>

        {/* Testimonials Section */}
        <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Trusted by Innovators</h2>
            <p className="text-text-secondary mb-12 max-w-2xl mx-auto">
                Hear what our community is saying about their success on FundMeUp.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, i) => (
                    <div key={i} className="bg-white p-8 rounded-lg border border-highlight-button shadow-sm text-left">
                        <MessageSquare className="w-8 h-8 text-primary-accent mb-4" />
                        <p className="text-text-secondary mb-4">"{testimonial.quote}"</p>
                        <p className="font-semibold text-text-primary">{testimonial.name}</p>
                        <p className="text-sm text-text-secondary">{testimonial.role}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
