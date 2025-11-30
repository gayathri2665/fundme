import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';


import { Campaigns } from './pages/Campaigns';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import Investor from './pages/Investor';
import Entrepreneur from './pages/Entrepreneur';
import Freelancer from './pages/Freelancer';
import { Landing } from './pages/Landing';
import Chatbot from './components/Chatbot';
import FreelancerProfileForm from './pages/FreelancerProfileForm';

function AppRoutes() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/signup" element={<Auth />} />
      <Route path="/signin" element={<Auth />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/investor" element={<Investor />} />
      <Route path="/entrepreneur" element={<Entrepreneur />} />
      <Route path="/freelancer" element={<Freelancer />} />
      <Route path="/freelancer-profile-form" element={<FreelancerProfileForm />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function AppContent() {
  return (
    <>
      <AppRoutes />
      <Chatbot />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
