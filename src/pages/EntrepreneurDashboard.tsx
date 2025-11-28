import React, { useMemo, useState } from "react";

import { motion } from "framer-motion";
import { FiSearch, FiUsers, FiGithub, FiStar } from "react-icons/fi";

export default function EntrepreneurDashboard() {
  const founders = [
    {
      id: "f1",
      name: "Asha Rao",
      role: "Co-founder & CEO",
      avatar: "AR",
      achievements: [
        "Raised ₹50L seed round",
        "Featured in Startup50 2024",
        "Scaled MRR 5x in 12 months",
      ],
    },
    {
      id: "f2",
      name: "Manish Verma",
      role: "CTO",
      avatar: "MV",
      achievements: [
        "Architected microservices platform",
        "Open-sourced internal infra tooling",
      ],
    },
  ];

  const collaborations = [
    {
      id: "c1",
      partner: "GreenLabs",
      type: "Research",
      since: "2024-08-01",
      note: "Joint R&D on sustainable packaging",
    },
    {
      id: "c2",
      partner: "Alpha Marketing",
      type: "Go-to-market",
      since: "2025-01-15",
      note: "Co-marketing campaigns and growth ops",
    },
  ];

  const ventures = useMemo(() => [
    {
      id: "p1",
      name: "Venture: SupplyAI",
      summary: "AI supply-demand forecasting for SMEs",
      status: "Active",
      tech: ["Python", "FastAPI", "Postgres"],
      stars: 42,
    },
    {
      id: "p2",
      name: "Venture: StudioSpace",
      summary: "Collab platform for creative teams",
      status: "Pilot",
      tech: ["React", "Node", "Supabase"],
      stars: 18,
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
    <div className="min-h-screen bg-rose-50 text-stone-800">
      <header className="bg-white border-b border-rose-100 shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-stone-800">Welcome, Entrepreneur</h1>
            <p className="text-sm text-stone-600 mt-1">
              Dashboard — founders, collaborations, ventures & code spaces
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search venture, tech or summary..."
                className="pl-10 pr-4 py-2 border border-rose-200 rounded-md bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </div>
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="py-2 px-3 border border-rose-200 rounded-md bg-white text-stone-700"
            >
              <option value="">All statuses</option>
              <option value="Active">Active</option>
              <option value="Pilot">Pilot</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-sm">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-stone-800">
                Founders' Achievements <FiStar className="text-rose-400" />
              </h2>
              <div className="space-y-4">
                {founders.map((f) => (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-3 border border-rose-100 rounded-lg bg-rose-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center font-semibold text-rose-700">
                        {f.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-stone-800">{f.name}</div>
                        <div className="text-sm text-stone-600">{f.role}</div>
                      </div>
                    </div>
                    <ul className="mt-3 ml-2 list-disc list-inside text-sm text-stone-700">
                      {f.achievements.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-sm">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-stone-800">
                <FiUsers className="text-rose-400" /> Collaborations
              </h2>
              <div className="space-y-3">
                {collaborations.map((c) => (
                  <div key={c.id} className="p-3 border border-rose-100 rounded-lg bg-rose-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-stone-800">{c.partner}</div>
                        <div className="text-xs text-stone-500">
                          {c.type} • since {new Date(c.since).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-sm text-stone-600">{c.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right columns */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-stone-800 flex items-center gap-1">
                  Ventures — Projects <FiGithub className="text-rose-400" />
                </h2>
                <div className="text-sm text-stone-500">{filteredVentures.length} projects</div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredVentures.map((p) => (
                  <motion.div
                    key={p.id}
                    whileHover={{ translateY: -6 }}
                    className="p-4 border border-rose-100 rounded-lg bg-gradient-to-br from-white to-rose-50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-stone-800">{p.name}</div>
                        <div className="text-sm text-stone-600 mt-1">{p.summary}</div>
                        <div className="mt-3 text-xs text-stone-500">
                          Tech: {p.tech.join(", ")}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`px-2 py-1 rounded-md text-xs font-medium ${
                            p.status === "Active"
                              ? "bg-rose-100 text-rose-700"
                              : "bg-rose-50 text-rose-500"
                          }`}
                        >
                          {p.status}
                        </div>
                        <div className="mt-2 text-xs text-stone-500 flex items-center gap-1">
                          <FiStar className="text-rose-400" /> {p.stars}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="px-3 py-1 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded-md">
                        Open
                      </button>
                      <button className="px-3 py-1 border border-rose-200 text-stone-700 rounded-md text-sm">
                        Invite
                      </button>
                      <button className="px-3 py-1 border border-rose-200 text-stone-700 rounded-md text-sm">
                        Export
                      </button>
                    </div>
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
