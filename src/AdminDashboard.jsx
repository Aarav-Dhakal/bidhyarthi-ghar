import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, LogOut, CheckCircle, XCircle } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <ShieldCheck size={28} className="text-blue-500" />
          <span className="font-bold text-xl">Admin Panel</span>
        </div>
        <div className="mt-auto p-4 border-t border-gray-800">
          <button onClick={() => navigate('/')} className="flex items-center gap-3 text-red-400 hover:text-red-300 w-full p-2"><LogOut size={20} /> Logout</button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">System Overview</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Pending Verifications</h2>
          <p className="text-gray-500 dark:text-gray-400">All systems operational.</p>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;