import React from 'react';

interface InvestorStepProps {
  onComplete: () => void;
}

export function InvestorStep({ onComplete }: InvestorStepProps) {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-semibold text-text-primary mb-6 text-center">
          Investor Details
        </h2>
        <p className="text-text-secondary mb-6 text-center">
          Please provide some additional information to complete your investor profile.
        </p>
        {/* Add investor-specific form fields here */}
        <button
          onClick={onComplete}
          className="w-full bg-primary-accent hover:bg-secondary-accent text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Complete Profile
        </button>
      </div>
    </div>
  );
}