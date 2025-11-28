import React from 'react';

const InvestorDashboard: React.FC = () => {
  const mockTransactions = [
    { id: 1, startup: "EcoGrow", amount: "$5,000", date: "Oct 22, 2025", status: "Completed" },
    { id: 2, startup: "TechNova", amount: "$2,500", date: "Oct 28, 2025", status: "Pending" },
    { id: 3, startup: "MediConnect", amount: "$10,000", date: "Nov 2, 2025", status: "Completed" },
  ];

  const demoPitches = [
    { id: 1, name: "GreenFuture", video: "https://www.youtube.com/embed/ysz5S6PUM-U" },
    { id: 2, name: "HealthSync", video: "https://www.youtube.com/embed/tgbNymZ7vqY" },
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm p-6 border-b border-highlight-button">
        <h1 className="text-3xl font-bold text-center text-text-primary">
          Welcome, Investor 👋
        </h1>
        <p className="text-center text-text-secondary mt-2">
          Explore 3D pitch rooms, view startup demos, and track your investments.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-10 space-y-12">
        {/* 3D Pitch Room */}
        <section className="bg-white rounded-lg border border-highlight-button shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-secondary-accent mb-4">🚀 3D Pitch Room</h2>
          <p className="text-text-secondary mb-4">
            Enter the immersive pitch room where founders present their ideas in real-time.
          </p>
          <div className="flex justify-center">
            <iframe
              src="https://www.spatial.io/embed/Meeting-Room-638e07856735020001e64a9a?share=5888498391600928287&autoplay=1&enableRtc=1"
              width="100%"
              height="500px"
              allow="camera; fullscreen; autoplay; display-capture; microphone; clipboard-write"
              className="rounded-xl border border-highlight-button"
              title="3D Pitch Room"
            ></iframe>
          </div>
        </section>

        {/* Transaction History */}
        <section className="bg-white rounded-lg border border-highlight-button shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-secondary-accent mb-4">💳 Transaction History</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-highlight-button/30 text-left">
                  <th className="p-3">Startup</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-highlight-button hover:bg-background/50 transition">
                    <td className="p-3 font-medium text-text-primary">{tx.startup}</td>
                    <td className="p-3 text-text-secondary">{tx.amount}</td>
                    <td className="p-3 text-text-secondary">{tx.date}</td>
                    <td
                      className={`p-3 font-semibold ${
                        tx.status === "Completed" ? "text-green-600" : "text-yellow-500"
                      }`}
                    >
                      {tx.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Demo Pitches */}
        <section className="bg-white rounded-lg border border-highlight-button shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-secondary-accent mb-4">🎥 Demo Pitches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {demoPitches.map((pitch) => (
              <div key={pitch.id} className="bg-background/50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-text-primary mb-2">{pitch.name}</h3>
                <iframe
                  width="100%"
                  height="250"
                  src={pitch.video}
                  title={pitch.name}
                  className="rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </section>

        {/* Logout */}
        <div className="text-center mt-8">
          <button className="bg-primary-accent text-white px-6 py-2 rounded-lg hover:bg-secondary-accent transition-colors">
            Logout
          </button>
        </div>
      </main>
    </div>
  );
};

export default InvestorDashboard;
