import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, LogOut, Plus, Users, MapPin, Eye, CheckCircle, XCircle } from 'lucide-react';

const LandlordDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors animate-fade-in-up">
      <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col z-10">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded flex items-center justify-center text-white"><Building size={20}/></div>
          <span className="font-bold text-xl dark:text-white">Owner Portal</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium"><Building size={20}/> My Properties</button>
          <button className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"><Users size={20}/> Tenant Requests <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">1</span></button>
        </nav>
        <div className="p-4 border-t dark:border-gray-700">
          <button onClick={() => navigate('/')} className="flex items-center gap-3 text-red-500 w-full p-2 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg"><LogOut size={20}/> Logout</button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold dark:text-white">Property Management</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage listings and view tenant applications.</p>
          </div>
          <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-indigo-700 transition"><Plus size={20} /> Add Listing</button>
        </div>

        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6">
          <h2 className="font-bold text-lg dark:text-white mb-4 flex items-center gap-2"><Users size={20} className="text-indigo-500"/> Tenant Screening (New Requests)</h2>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">A</div>
              <div>
                <p className="font-bold dark:text-white">Aryan Sharma <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded ml-2">ID Verified</span></p>
                <p className="text-sm text-gray-500">Requested: 2BHK Premium Flat • BBA Student</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:text-white" title="View Profile"><Eye size={20}/></button>
              <button className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700" title="Accept"><CheckCircle size={20}/></button>
              <button className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700" title="Reject"><XCircle size={20}/></button>
            </div>
          </div>
        </div>

        <h2 className="font-bold text-lg dark:text-white mb-4">My Active Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border dark:border-gray-700">
            <img src="https://images.unsplash.com/photo-1502672260266-1c1de2d96674?w=800&q=80" className="w-full h-48 object-cover" />
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg dark:text-white">2BHK Premium Flat</h3>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded font-bold">1 Request</span>
              </div>
              <p className="text-gray-500 text-sm flex items-center gap-1 mb-4"><MapPin size={16}/> Kanchanbari</p>
              <div className="grid grid-cols-2 gap-2 text-center text-sm mb-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded"><p className="font-bold dark:text-white">124</p><p className="text-gray-500">Views</p></div>
                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded"><p className="font-bold dark:text-white">Active</p><p className="text-gray-500">Status</p></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default LandlordDashboard;