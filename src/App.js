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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/landlord" element={<LandlordDashboard />} />
      </Routes>
    </Router>
  );
}