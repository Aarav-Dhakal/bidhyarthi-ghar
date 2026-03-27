import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FrontPage from './FrontPage';
import Login from './Login';
import Dashboard from './Dashboard';
import AdminDashboard from './AdminDashboard';
import LandlordDashboard from './LandlordDashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<Login />} />
        
        {/* The Three Role-Based Dashboards */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Student */}
        <Route path="/landlord" element={<LandlordDashboard />} /> {/* Owner */}
        <Route path="/admin" element={<AdminDashboard />} /> {/* Admin */}
      </Routes>
    </Router>
  );
}