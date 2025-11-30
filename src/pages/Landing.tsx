import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, ArrowRight, TrendingUp, Users, Zap, Shield, X, MessageSquare, Rocket, Share2, Briefcase, DollarSign } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-background to-highlight-button text-text-primary font-sans antialiased">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-highlight-button">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-7 h-7 text-primary-accent" />
                        <span className="text-xl font-bold text-text-primary">FundMeUp</span>
                      </div>            <div className="flex gap-4">
              <button
                onClick={() => navigate('/auth')}
                className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/auth')}
                className="px-6 py-2 bg-primary-accent hover:bg-secondary-accent text-white rounded-lg font-semibold transition-colors shadow-md"
              >
                Get Started
              </button>
            </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 text-text-primary leading-tight">
            Turn Your Ideas Into <span className="text-primary-accent">Reality</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            FundMeUp connects ambitious entrepreneurs with passionate investors ready to fuel innovation and growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/auth')}
              className="px-8 py-3 bg-primary-accent hover:bg-secondary-accent text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Join FundMeUp Today <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/campaigns')}
              className="px-8 py-3 border border-highlight-button text-text-secondary hover:bg-highlight-button rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
            >
              Explore Campaigns
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-highlight-button"
              onClick={() => setSelectedFeature(feature)}
            >
              <feature.icon className="w-8 h-8 text-primary-accent mb-4" />
              <h3 className="font-semibold text-lg text-text-primary mb-2">{feature.title}</h3>
              <p className="text-text-secondary text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {selectedFeature && (
          <div 
            className="fixed inset-0 z-50 bg-text-primary/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedFeature(null)}
          >
            <div 
              className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full mx-auto transform scale-100 opacity-100 transition-all duration-300 ease-out"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <selectedFeature.icon className="w-7 h-7 text-primary-accent" />
                  <h2 className="text-xl font-bold text-text-primary">{selectedFeature.title}</h2>
                </div>
                <button onClick={() => setSelectedFeature(null)} className="p-1 rounded-full text-text-secondary hover:bg-highlight-button hover:text-text-primary transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-text-secondary">{selectedFeature.desc}</p>
            </div>
          </div>
        )}

        <div className="text-center py-20 bg-background rounded-xl shadow-lg">
            <h2 className="text-3xl font-extrabold text-text-primary mb-4">Trusted by Innovators</h2>
            <p className="text-lg text-text-secondary mb-12 max-w-2xl mx-auto">
                Hear what our community is saying about their success on FundMeUp.
            </p>
            <div className="grid md:grid-cols-3 gap-8 px-8">
                {testimonials.map((testimonial, i) => (
                    <div key={i} className="bg-white p-8 rounded-xl shadow-sm text-left border border-highlight-button transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                        <MessageSquare className="w-8 h-8 text-primary-accent mb-4" />
                        <p className="text-text-secondary mb-4 italic">"{testimonial.quote}"</p>
                        <p className="font-semibold text-text-primary">{testimonial.name}</p>
                        <p className="text-sm text-text-secondary">{testimonial.role}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* FundMeUp by the Numbers Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl">FundMeUp by the Numbers</h2>
            <p className="mt-4 text-text-secondary text-lg">Our impact speaks for itself. Join a thriving community of success.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-md border border-highlight-button">
              <DollarSign className="w-12 h-12 text-primary-accent mx-auto mb-4" />
              <p className="text-4xl font-bold text-text-primary">$50M+</p>
              <p className="text-text-secondary mt-2">Raised for Campaigns</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border border-highlight-button">
              <Users className="w-12 h-12 text-secondary-accent mx-auto mb-4" />
              <p className="text-4xl font-bold text-text-primary">10,000+</p>
              <p className="text-text-secondary mt-2">Active Users</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border border-highlight-button">
              <Rocket className="w-12 h-12 text-decorative-dark-accent mx-auto mb-4" />
              <p className="text-4xl font-bold text-text-primary">500+</p>
              <p className="text-text-secondary mt-2">Successful Campaigns</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl">How FundMeUp Works</h2>
            <p className="mt-4 text-lg text-text-secondary">Connecting entrepreneurs, investors, and freelancers in a seamless ecosystem.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-highlight-button text-primary-accent mb-4">
                <Rocket className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">For Entrepreneurs</h3>
              <p className="text-text-secondary">Create compelling campaigns, attract investment, and build your dream team with expert freelancers.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-highlight-button text-primary-accent mb-4">
                <DollarSign className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">For Investors</h3>
              <p className="text-text-secondary">Discover high-potential startups, conduct due diligence, and diversify your portfolio with innovative ventures.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-highlight-button text-primary-accent mb-4">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">For Freelancers</h3>
              <p className="text-text-secondary">Showcase your skills, find exciting projects from funded startups, and grow your professional network.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Ecosystem Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl mb-4">Our Growing Ecosystem</h2>
          <p className="text-lg text-text-secondary mb-12">Partnerships that empower your journey and extend your reach.</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <img src="https://logowik.com/default/meta-logo-png-new.png" alt="Meta Logo" className="h-12 grayscale hover:grayscale-0 transition-all duration-300" />
            <img src="https://logowik.com/default/google-logo-png-3367.png" alt="Google Logo" className="h-12 grayscale hover:grayscale-0 transition-all duration-300" />
            <img src="https://logowik.com/default/microsoft-logo-png-new.png" alt="Microsoft Logo" className="h-12 grayscale hover:grayscale-0 transition-all duration-300" />
            <img src="https://logowik.com/default/amazon-logo-png-new.png" alt="Amazon Logo" className="h-12 grayscale hover:grayscale-0 transition-all duration-300" />
            <img src="https://logowik.com/default/apple-logo-png-new.png" alt="Apple Logo" className="h-12 grayscale hover:grayscale-0 transition-all duration-300" />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-highlight-button py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl leading-tight">
            Ready to Ignite Your Project?
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Join thousands of innovators, investors, and skilled professionals. Your next big opportunity awaits.
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="mt-10 inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-text-primary bg-white hover:bg-background transition-colors shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Get Started Today <ArrowRight className="ml-3 w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-text-secondary py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-7 h-7 text-primary-accent" />
              <span className="text-2xl font-bold text-text-primary">FundMeUp</span>
            </div>
            <p className="text-text-secondary">Fueling the next wave of innovation.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary-accent transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary-accent transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-primary-accent transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary-accent transition-colors">Campaigns</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary-accent transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-accent transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-highlight-button pt-8 text-center text-text-secondary">
          &copy; 2025 FundMeUp. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
