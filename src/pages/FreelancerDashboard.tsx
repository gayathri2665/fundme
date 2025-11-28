import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ChevronLeft, Briefcase, Star } from 'lucide-react';

const FreelancerDashboard = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const skills = ["React", "Node.js", "UI/UX Design", "Solidity", "Project Management"];

  const featuredProjects = [
    {
      id: 1,
      title: "Build a Decentralized Polling App",
      company: "EcoVote",
      tags: ["Blockchain", "React", "Web3"],
      budget: "$5,000"
    },
    {
      id: 2,
      title: "UI/UX Redesign for HealthTech App",
      company: "WellFit",
      tags: ["UI/UX", "Figma", "Mobile"],
      budget: "$3,500"
    },
    {
      id: 3,
      title: "Develop a Backend for a FinTech Platform",
      company: "PayFlow",
      tags: ["Node.js", "PostgreSQL", "API"],
      budget: "$8,000"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm p-6 border-b border-highlight-button relative">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute left-6 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-highlight-button"
        >
          <ChevronLeft className="w-6 h-6 text-text-secondary" />
        </button>
        <div className="text-center">
            <h1 className="text-3xl font-bold text-text-primary">
            Freelancer Dashboard
            </h1>
            <p className="text-center text-text-secondary mt-2">
            Your next big opportunity is just a click away.
            </p>
        </div>
        <button
            onClick={handleLogout}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-primary-accent text-white px-5 py-2 rounded-lg hover:bg-secondary-accent transition duration-300 shadow-sm"
        >
            Sign Out
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Your Skills */}
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg border border-highlight-button shadow-sm">
                    <h2 className="text-xl font-semibold flex items-center gap-2 text-text-primary mb-4">
                        <Star className="text-primary-accent" /> Your Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-highlight-button/50 text-secondary-accent rounded-full text-sm font-medium">
                                {skill}
                            </span>
                        ))}
                    </div>
                    <button className="mt-4 w-full text-center px-4 py-2 border border-highlight-button hover:bg-highlight-button text-text-primary font-semibold rounded-lg transition-colors">
                        Edit Skills
                    </button>
                </div>
            </div>

            {/* Right Column: Featured Projects */}
            <div className="lg:col-span-2">
                <div className="bg-white p-6 rounded-lg border border-highlight-button shadow-sm">
                    <h2 className="text-xl font-semibold flex items-center gap-2 text-text-primary mb-4">
                        <Briefcase className="text-primary-accent" /> Featured Projects
                    </h2>
                    <div className="space-y-4">
                        {featuredProjects.map(project => (
                            <div key={project.id} className="p-4 border border-highlight-button rounded-lg hover:border-primary-accent transition-all">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-text-primary">{project.title}</h3>
                                        <p className="text-sm text-text-secondary">by {project.company}</p>
                                    </div>
                                    <span className="text-lg font-bold text-secondary-accent">{project.budget}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-2 py-0.5 bg-background text-text-secondary rounded-md text-xs font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default FreelancerDashboard;