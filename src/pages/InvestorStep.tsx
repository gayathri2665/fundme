import React, { useState } from 'react';
import { Briefcase, DollarSign, TrendingUp } from 'lucide-react';

interface InvestorStepProps {
  onComplete: () => void;
}

export function InvestorStep({ onComplete }: InvestorStepProps) {
  const [investmentInterest, setInvestmentInterest] = useState<string[]>([]);
  const [portfolioSize, setPortfolioSize] = useState('');

  const handleInterestToggle = (interest: string) => {
    setInvestmentInterest(prev =>
      prev.includes(interest)
        ? prev.filter(item => item !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the investor data
    console.log({ investmentInterest, portfolioSize });
    onComplete();
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-lg p-8 animate-fade-in">
        <div className="flex items-center justify-center mb-8">
          <Briefcase className="w-8 h-8 text-primary-accent mr-3" />
          <h1 className="text-2xl font-bold text-text-primary">Investor Information</h1>
        </div>

        <h2 className="text-xl font-semibold text-text-primary mb-6 text-center">
          Tell us more about your investment profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-3">
              Investment Interests
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['Technology', 'Healthcare', 'Fintech', 'Consumer Goods'].map(interest => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-3 rounded-lg border-2 transition-all text-sm font-medium flex items-center justify-center gap-2 ${
                    investmentInterest.includes(interest)
                      ? 'border-primary-accent bg-highlight-button/50 text-secondary-accent'
                      : 'border-highlight-button text-text-secondary hover:border-primary-accent'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Portfolio Size
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={portfolioSize}
                onChange={(e) => setPortfolioSize(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border border-highlight-button rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent appearance-none"
              >
                <option value="" disabled>Select a range</option>
                <option value="<50k">&lt; $50,000</option>
                <option value="50k-250k">$50,000 - $250,000</option>
                <option value="250k-1m">$250,000 - $1,000,000</option>
                <option value=">1m">&gt; $1,000,000</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary-accent hover:bg-secondary-accent text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Continue to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
