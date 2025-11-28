import React from "react";
import { useNavigate } from "react-router-dom";

const FreelancerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-text-primary font-inter flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-highlight-button shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-secondary-accent tracking-wide">
            FundMeUp
          </h1>
          <button
            onClick={() => navigate("/")}
            className="bg-primary-accent text-white px-5 py-2 rounded-lg hover:bg-secondary-accent transition duration-300 shadow-sm"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-3 text-text-primary">
          Co-Build the Future Together
        </h2>
        <p className="text-text-secondary mb-8 text-base md:text-lg max-w-xl">
          Founders share projects. Freelancers join hands to make it real.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/cobuild")}
            className="bg-primary-accent hover:bg-secondary-accent text-white font-medium py-3 px-8 rounded-xl transition-all shadow-md w-56"
          >
            Co-Build Space
          </button>
          <button
            onClick={() => navigate("/freelancer-profile")}
            className="bg-primary-accent hover:bg-secondary-accent text-white font-medium py-3 px-8 rounded-xl transition-all shadow-md w-56"
          >
            Upload Portfolio
          </button>
        </div>
      </main>

      {/* Footer (optional aesthetic touch) */}
      <footer className="text-center py-4 text-text-secondary text-sm">
        © {new Date().getFullYear()} FundMeUp — Empowering Freelancers & Founders
      </footer>
    </div>
  );
};

export default FreelancerDashboard;
