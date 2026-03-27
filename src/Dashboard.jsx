import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, ShoppingBag, MessageSquare, Users, LogOut, GraduationCap, 
  Building, Map, CreditCard, Shirt, Printer, ShieldCheck, FileText, Send, ArrowLeft
} from 'lucide-react';

// Import your split components (Ensure these paths match your setup)
import RoomListings from './RoomListings';
import RoommateMatch from './RoommateMatch';
import Marketplace from './Marketplace';
import Messages from './Messages';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [selectedProperty, setSelectedProperty] = useState(null); // Used for the Request Page

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handlePropertyRequest = (property) => {
    setSelectedProperty(property);
    setActiveTab('request-property');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="animate-slide-in-right space-y-6">
            <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h1 className="text-3xl font-bold mb-2">Welcome back, Aryan! 👋</h1>
                <p className="text-blue-100 max-w-lg">Your student hub is ready. Check out new roommate matches or browse local Hatiya deals.</p>
              </div>
            </div>
            {/* Quick Stats/Widgets can go here */}
          </div>
        );
      case 'rooms':
        return <RoomListings onRequestContact={handlePropertyRequest} />;
      case 'roommates':
        return <RoommateMatch />;
      case 'market':
        return <Marketplace />;
      case 'messages':
        return <Messages />;
      
      // ==========================================
      // NEW: PROPERTY REQUEST PAGE
      // ==========================================
      case 'request-property':
        return (
          <div className="animate-slide-in-right max-w-3xl mx-auto space-y-6">
            <button onClick={() => setActiveTab('rooms')} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
              <ArrowLeft size={18} /> Back to Listings
            </button>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Request Viewing</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">You are requesting to view: <strong className="text-gray-900 dark:text-white">{selectedProperty?.title || 'Selected Property'}</strong></p>
              
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">When would you like to visit?</label>
                  <input type="date" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message to Owner (Optional)</label>
                  <textarea rows="4" placeholder="Hi, I am an IIC student looking to rent..." className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => { alert('Request Sent! The owner will be notified.'); setActiveTab('rooms'); }} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition flex justify-center items-center gap-2">
                  <FileText size={18}/> Send Formal Request
                </button>
                <button onClick={() => setActiveTab('messages')} className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition flex justify-center items-center gap-2">
                  <MessageSquare size={18}/> Chat Instead
                </button>
              </div>
            </div>
          </div>
        );

      // ==========================================
      // NEW: MY PLACE & RENT
      // ==========================================
      case 'accommodation':
        return (
          <div className="animate-slide-in-right space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Current Accommodation</h2>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-6">
              <img src="https://images.unsplash.com/photo-1522771731470-53ff720dc08b?w=400&q=80" alt="My Room" className="w-full md:w-48 h-48 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Kanchanbari Student Flat</h3>
                <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1"><Map size={16}/> Kanchanbari, Biratnagar</p>
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg border border-green-100 dark:border-green-800 flex items-center gap-2">
                  <ShieldCheck size={20} /> Verified Tenant Contract Active until Nov 2026
                </div>
              </div>
            </div>
          </div>
        );
      case 'rent':
        return (
          <div className="animate-slide-in-right space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Rent Payments</h2>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center py-12">
              <CreditCard size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Next Payment: Rs. 6,000</h3>
              <p className="text-gray-500 mb-6">Due on 1st of Next Month</p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">Pay via eSewa / Khalti</button>
            </div>
          </div>
        );

      // ==========================================
      // NEW: LOCAL SERVICES
      // ==========================================
      case 'laundry':
        return (
          <div className="animate-slide-in-right space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Local Laundry Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg dark:text-white">Wash & Fold Hub</h3>
                <p className="text-sm text-gray-500 mb-4">Rs. 50/kg • Free Pickup near IIC</p>
                <a href="https://maps.google.com" target="_blank" className="text-blue-600 font-medium hover:underline flex items-center gap-1"><Map size={16}/> View on Map</a>
              </div>
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg dark:text-white">Quick Clean Drycleaners</h3>
                <p className="text-sm text-gray-500 mb-4">Rs. 60/kg • 24hr Delivery</p>
                <a href="https://maps.google.com" target="_blank" className="text-blue-600 font-medium hover:underline flex items-center gap-1"><Map size={16}/> View on Map</a>
              </div>
            </div>
          </div>
        );
      case 'print':
        return (
          <div className="animate-slide-in-right space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Print & Copy Shops</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg dark:text-white">Student Copy Center</h3>
                <p className="text-sm text-gray-500 mb-4">Rs. 2/page • Binding Services Available</p>
                <a href="https://maps.google.com" target="_blank" className="text-blue-600 font-medium hover:underline flex items-center gap-1"><Map size={16}/> View on Map</a>
              </div>
            </div>
          </div>
        );

      default: return null;
    }
  };

  // UPDATED SIDEBAR HIERARCHY
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans">
      <aside className="w-64 bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-300 flex flex-col z-20 shadow-xl border-r border-gray-200 dark:border-gray-800">
        <div onClick={() => navigate('/')} className="p-6 flex items-center gap-3 cursor-pointer border-b border-gray-100 dark:border-gray-800">
          <GraduationCap size={28} className="text-blue-600" />
          <span className="font-bold text-xl text-gray-900 dark:text-white">BG App</span>
        </div>
        
        <nav className="flex-1 px-3 py-6 space-y-6 overflow-y-auto">
          {/* Main Menu */}
          <div>
            <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Platform</p>
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'rooms', label: 'Room Listings', icon: Building },
              { id: 'roommates', label: 'Roommate Match', icon: Users },
              { id: 'market', label: 'Marketplace', icon: ShoppingBag },
              { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 4 }
            ].map(item => (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${activeTab === item.id ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                <div className="flex items-center gap-3"><item.icon size={20} />{item.label}</div>
                {item.badge && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-500 text-white">{item.badge}</span>}
              </button>
            ))}
          </div>

          {/* My Place Section */}
          <div>
            <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">My Place</p>
            {[
              { id: 'accommodation', label: 'My Accommodation', icon: ShieldCheck },
              { id: 'rent', label: 'Pay Rent', icon: CreditCard }
            ].map(item => (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === item.id ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                <item.icon size={20} />{item.label}
              </button>
            ))}
          </div>

          {/* Local Services Section */}
          <div>
            <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Local Services</p>
            {[
              { id: 'laundry', label: 'Laundry', icon: Shirt },
              { id: 'print', label: 'Print Shops', icon: Printer }
            ].map(item => (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === item.id ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                <item.icon size={20} />{item.label}
              </button>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-y-auto flex flex-col">
          <div className="p-4 md:p-8 flex-1">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}