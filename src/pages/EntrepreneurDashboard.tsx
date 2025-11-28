import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiUsers, FiBriefcase, FiPlus, FiStar, FiMoreVertical, FiChevronLeft } from "react-icons/fi";
import { motion } from "framer-motion";

export default function EntrepreneurDashboard() {
  const navigate = useNavigate();
  const teamMembers = useMemo(() => [
    {
      id: "t1",
      name: "Elena Petrova",
      role: "Lead Designer",
      avatar: "EP",
      email: "elena@example.com",
    },
    {
      id: "t2",
      name: "David Lee",
      role: "Backend Engineer",
      avatar: "DL",
      email: "david@example.com",
    },
    {
      id: "t3",
      name: "Sofia Gonzalez",
      role: "Marketing Lead",
      avatar: "SG",
      email: "sofia@example.com",
    },
  ], []);

  const collaborations = useMemo(() => [
    {
      id: "c1",
      partner: "Innovate Labs",
      type: "R&D Partner",
      since: "2024-08-01",
      note: "Co-developing next-gen AI models.",
    },
    {
      id: "c2",
      partner: "Synergy Ventures",
      type: "Go-to-Market",
      since: "2025-01-15",
      note: "Accelerating market penetration.",
    },
  ], []);

  const ventures = useMemo(() => [
    {
      id: "p1",
      name: "Venture: Nexus AI",
      summary: "AI-powered customer intelligence platform.",
      status: "Active",
      tech: ["Python", "FastAPI", "Postgres"],
      stars: 4.8,
    },
    {
      id: "p2",
      name: "Venture: Horizon",
      summary: "Collaborative platform for distributed teams.",
      status: "Pilot",
      tech: ["React", "Node", "Supabase"],
      stars: 4.5,
    },
  ], []);

  const roadmap = useMemo(() => [
    {
      quarter: "Q1 2026",
      title: "Smart Insights v2",
      description: "AI-powered analytics upgrade with faster predictions.",
    },
    {
      quarter: "March 2026",
      title: "Mobile App Beta Release",
      description: "Early access for selected teams and partners.",
    },
    {
      quarter: "April 2026",
      title: "AI Assistant Integration",
      description: "Conversational task management and smart suggestions.",
    },
    {
      quarter: "Mid 2026",
      title: "Collaboration Hub 2.0",
      description: "Advanced team roles, workflows, and file-sharing improvements.",
    },
    {
      quarter: "Late 2026",
      title: "Venture Performance Dashboard",
      description: "Real-time metrics, funding insights, and growth tracking.",
    },
  ], []);

  const [query, setQuery] = useState("");
  const [projectFilter, setProjectFilter] = useState("");

  const filteredVentures = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ventures.filter((v) => {
      if (projectFilter && v.status !== projectFilter) return false;
      if (!q) return true;
      return (
        v.name.toLowerCase().includes(q) ||
        v.summary.toLowerCase().includes(q) ||
        v.tech.join(" ").toLowerCase().includes(q)
      );
    });
  }, [ventures, query, projectFilter]);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b border-highlight-button">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
          <button 
            onClick={() => navigate(-1)} 
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-highlight-button"
          >
            <FiChevronLeft className="w-6 h-6 text-text-secondary" />
          </button>
          <div className="text-center w-full">
            <h1 className="text-3xl font-bold text-text-primary">Entrepreneur Dashboard</h1>
            <p className="text-sm text-text-secondary mt-1">
              Manage your team, ventures, and collaborations.
            </p>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-accent" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search ventures..."
                className="pl-10 pr-4 py-2 border border-highlight-button rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-accent"
              />
            </div>
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="py-2 px-3 border border-highlight-button rounded-lg bg-white text-text-secondary"
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pilot">Pilot</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg border border-highlight-button shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-text-primary">
                  <FiUsers className="text-primary-accent" /> Team Members
                </h2>
                <button className="px-4 py-2 bg-primary-accent hover:bg-secondary-accent text-white text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors">
                  <FiPlus size={16} /> Invite
                </button>
              </div>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between p-3 border border-highlight-button rounded-lg bg-background/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-highlight-button flex items-center justify-center font-bold text-secondary-accent">
                        {member.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-text-primary">{member.name}</div>
                        <div className="text-sm text-text-secondary">{member.role}</div>
                      </div>
                    </div>
                    <button className="p-2 text-text-secondary hover:text-text-primary">
                        <FiMoreVertical size={20} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-highlight-button shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-text-primary">
                <FiBriefcase className="text-primary-accent" /> Collaborations
              </h2>
              <div className="space-y-4">
                {collaborations.map((c) => (
                  <div key={c.id} className="p-4 border border-highlight-button rounded-lg bg-background/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-text-primary">{c.partner}</div>
                        <div className="text-xs text-text-secondary uppercase tracking-wider">
                          {c.type} • Since {new Date(c.since).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-text-secondary">{c.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg border border-highlight-button shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
                  <FiStar className="text-primary-accent" /> Ventures & Projects
                </h2>
                <span className="text-sm font-medium text-text-secondary bg-highlight-button/60 px-3 py-1 rounded-full">
                  {filteredVentures.length} projects
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredVentures.map((p) => (
                  <motion.div
                    key={p.id}
                    whileHover={{ transform: "translateY(-5px)", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                    transition={{ duration: 0.2 }}
                    className="p-4 border border-highlight-button rounded-lg bg-gradient-to-br from-white to-background/30"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-text-primary">{p.name}</div>
                        <div className="text-sm text-text-secondary mt-1">{p.summary}</div>
                      </div>
                      <div
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          p.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {p.status}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-xs text-text-secondary tracking-wide">
                        Tech: {p.tech.join(", ")}
                      </div>
                      <div className="flex items-center gap-1 text-sm font-bold text-secondary-accent">
                        <FiStar className="text-yellow-500" /> {p.stars}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Roadmap / Upcoming Launches */}
            <div className="bg-white p-6 rounded-lg border border-highlight-button shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-text-primary">
                <FiBriefcase className="text-primary-accent" /> Roadmap / Upcoming Launches
              </h2>
              <div className="space-y-4">
                {roadmap.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 border border-highlight-button rounded-lg bg-background/50"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-text-primary">{item.title}</h3>
                      <span className="text-sm text-text-secondary">{item.quarter}</span>
                    </div>
                    <p className="text-sm text-text-secondary">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}