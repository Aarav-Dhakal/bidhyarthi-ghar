import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building, LogOut, Plus, Users, MapPin, Eye, CheckCircle, XCircle, 
  MessageSquare, Home, Moon, Sun, Bell, UserCircle, GraduationCap, 
  Facebook, Instagram, Twitter, Search, Send, X, LayoutDashboard, CheckCircle2,
  User
} from 'lucide-react';

// ==========================================
// MOCK DATABASE FOR LANDLORD
// ==========================================
const initialProperties = [
  { id: 1, title: "2BHK Premium Flat", location: "Kanchanbari, Biratnagar", type: "Flat", price: "12,000", status: "Active", views: 124, requests: 1, image: "https://images.unsplash.com/photo-1502672260266-1c1de2d96674?w=800&q=80" },
  { id: 2, title: "Single Room for Student", location: "Near IIC College, Itahari", type: "Room", price: "4,000", status: "Rented", views: 340, requests: 0, image: "https://images.unsplash.com/photo-1522771731470-53ff720dc08b?w=800&q=80" }
];

const initialRequests = [
  { id: 101, studentName: "Aryan Sharma", course: "BBA Student", propertyTitle: "2BHK Premium Flat", date: "Today, 10:30 AM", isVerified: true },
  { id: 102, studentName: "Sita Tamang", course: "BIT Student", propertyTitle: "Single Room for Student", date: "Yesterday", isVerified: true }
];

const initialChats = [
  { id: 1, type: "Tenant", name: "Aryan Sharma", unread: 1, messages: [{ id: 101, text: "Hello! Is the 2BHK still available?", sender: "them" }] },
  { id: 2, type: "Tenant", name: "Rahul Thapa", unread: 0, messages: [{ id: 201, text: "I have paid the rent for this month via eSewa.", sender: "them" }, { id: 202, text: "Received, thank you!", sender: "me" }] }
];

export default function LandlordDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  // Interactive States
  const [properties, setProperties] = useState(initialProperties);
  const [requests, setRequests] = useState(initialRequests);
  const [chats, setChats] = useState(initialChats);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProperty, setNewProperty] = useState({ title: '', type: 'Room', price: '', location: '', image: '' });

  // Chat States
  const [activeChatId, setActiveChatId] = useState(initialChats[0].id);
  const [chatInput, setChatInput] = useState("");
  const messagesEndRef = useRef(null);

  // Global Dark Mode Hook
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // ==========================================
  // ACTIONS
  // ==========================================
  const handleAddProperty = (e) => {
    e.preventDefault();
    const propertyToAdd = {
      id: Date.now(),
      title: newProperty.title,
      type: newProperty.type,
      price: newProperty.price,
      location: newProperty.location,
      status: "Active",
      views: 0,
      requests: 0,
      image: newProperty.image || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80" // Default fallback image
    };
    setProperties([propertyToAdd, ...properties]);
    setShowAddModal(false);
    setNewProperty({ title: '', type: 'Room', price: '', location: '', image: '' });
  };

  const handleApproveRequest = (id) => {
    setRequests(requests.filter(req => req.id !== id));
    alert("Tenant Approved! They will be notified to sign the digital contract.");
  };

  const handleRejectRequest = (id) => {
    setRequests(requests.filter(req => req.id !== id));
  };

  const handleChatClick = (id) => {
    setActiveChatId(id);
    setChats(chats.map(c => c.id === id ? { ...c, unread: 0 } : c));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChats(chats.map(c => c.id === activeChatId ? { ...c, messages: [...c.messages, { id: Date.now(), text: chatInput, sender: "me" }] } : c));
    setChatInput("");
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const activeChat = chats.find(c => c.id === activeChatId);
  const totalUnread = chats.reduce((acc, chat) => acc + chat.unread, 0);

  // ==========================================
  // TAB RENDERING ENGINE
  // ==========================================
  const renderContent = () => {
    switch (activeTab) {
      
      // 1. OVERVIEW DASHBOARD
      case 'overview':
        return (
          <div className="animate-slide-in-right space-y-6">
            <div className="bg-indigo-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
              <h1 className="text-3xl font-bold mb-2">Welcome to your Portal! 🏢</h1>
              <p className="text-indigo-100 max-w-lg">Manage your properties, review tenant applications, and chat with students all in one place.</p>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div onClick={() => setActiveTab('properties')} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md transition">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4"><Building size={24}/></div>
                <h3 className="font-bold text-2xl dark:text-white">{properties.length}</h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Total Properties</p>
              </div>
              <div onClick={() => setActiveTab('requests')} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md transition">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4"><Users size={24}/></div>
                <h3 className="font-bold text-2xl dark:text-white">{requests.length}</h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Pending Requests</p>
              </div>
              <div onClick={() => setActiveTab('messages')} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md transition relative">
                {totalUnread > 0 && <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{totalUnread} New</span>}
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4"><MessageSquare size={24}/></div>
                <h3 className="font-bold text-2xl dark:text-white">{totalUnread}</h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Unread Messages</p>
              </div>
            </div>

            {/* Recent Requests Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-lg dark:text-white flex items-center gap-2"><Users size={20} className="text-indigo-500"/> Recent Tenant Requests</h2>
                <button onClick={() => setActiveTab('requests')} className="text-indigo-600 hover:underline text-sm font-medium">View All</button>
              </div>
              
              {requests.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No pending requests at the moment.</p>
              ) : (
                <div className="space-y-4">
                  {requests.slice(0, 2).map(req => (
                    <div key={req.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700 gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400">{req.studentName.charAt(0)}</div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            {req.studentName} {req.isVerified && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded flex items-center gap-1"><CheckCircle2 size={12}/> Verified</span>}
                          </p>
                          <p className="text-sm text-gray-500">{req.course} • Requested: <span className="font-medium text-gray-700 dark:text-gray-300">{req.propertyTitle}</span></p>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button onClick={() => handleApproveRequest(req.id)} className="flex-1 sm:flex-none p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex justify-center items-center" title="Approve"><CheckCircle size={20}/></button>
                        <button onClick={() => handleRejectRequest(req.id)} className="flex-1 sm:flex-none p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex justify-center items-center" title="Reject"><XCircle size={20}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      // 2. MY PROPERTIES
      case 'properties':
        return (
          <div className="animate-slide-in-right space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Properties</h2>
              <button onClick={() => setShowAddModal(true)} className="w-full sm:w-auto bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition shadow-sm">
                <Plus size={20} /> Add New Listing
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.length === 0 ? (
                <div className="col-span-full text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                  <Building size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-bold dark:text-white">No Properties Listed</h3>
                  <p className="text-gray-500 mt-2">Click "Add New Listing" to get started.</p>
                </div>
              ) : (
                properties.map(p => (
                  <div key={p.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition group flex flex-col">
                    <div className="h-48 relative overflow-hidden">
                      <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" alt="Property" />
                      <span className="absolute top-4 left-4 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-bold">{p.type}</span>
                      <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white ${p.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'}`}>{p.status}</span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg dark:text-white truncate">{p.title}</h3>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1 mb-4"><MapPin size={16}/> {p.location}</p>
                      
                      <div className="grid grid-cols-2 gap-3 text-center text-sm mb-4">
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg border border-gray-100 dark:border-gray-600">
                          <p className="font-bold text-gray-900 dark:text-white text-lg">Rs. {p.price}</p>
                          <p className="text-gray-500 text-xs">Monthly</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg border border-gray-100 dark:border-gray-600">
                          <p className="font-bold text-gray-900 dark:text-white text-lg">{p.views}</p>
                          <p className="text-gray-500 text-xs">Views</p>
                        </div>
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                        <span className="text-sm font-medium text-orange-600 dark:text-orange-400">{p.requests} Pending Requests</span>
                        <button className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline text-sm flex items-center gap-1"><Eye size={16}/> Edit</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      // 3. TENANT REQUESTS
      case 'requests':
        return (
          <div className="animate-slide-in-right space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Tenant Screening</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              {requests.length === 0 ? (
                <div className="text-center py-12">
                  <Users size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-bold dark:text-white">No Pending Requests</h3>
                  <p className="text-gray-500 mt-2">All caught up! You have reviewed all tenant applications.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {requests.map(req => (
                    <div key={req.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700 gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400 text-lg">{req.studentName.charAt(0)}</div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-lg">
                            {req.studentName} {req.isVerified && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded flex items-center gap-1"><CheckCircle2 size={12}/> ID Verified</span>}
                          </p>
                          <p className="text-sm text-gray-500 mb-1">{req.course}</p>
                          <p className="text-sm">Interested in: <span className="font-medium text-gray-700 dark:text-gray-300">{req.propertyTitle}</span></p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                        <button className="flex-1 sm:flex-none p-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-white flex justify-center items-center gap-2 transition" title="View Profile">
                          <Eye size={18}/> <span className="sm:hidden">View Profile</span>
                        </button>
                        <button onClick={() => handleApproveRequest(req.id)} className="flex-1 sm:flex-none p-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex justify-center items-center gap-2" title="Approve">
                          <CheckCircle size={18}/> <span className="sm:hidden">Approve</span>
                        </button>
                        <button onClick={() => handleRejectRequest(req.id)} className="flex-1 sm:flex-none p-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex justify-center items-center gap-2" title="Reject">
                          <XCircle size={18}/> <span className="sm:hidden">Reject</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      // 4. MESSAGES (CHAT)
      case 'messages':
        return (
          <div className="animate-fade-in-up bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex h-[600px] overflow-hidden">
            {/* Sidebar */}
            <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="font-bold text-gray-900 dark:text-white mb-4">Inbox</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"/>
                  <input type="text" placeholder="Search chats..." className="w-full pl-9 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg outline-none dark:text-white text-sm focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {chats.map(c => (
                  <div key={c.id} onClick={() => handleChatClick(c.id)} className={`p-4 border-b border-gray-100 dark:border-gray-700/50 cursor-pointer flex items-center gap-3 transition-colors ${activeChatId === c.id ? 'bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-l-indigo-600' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg"><User size={24}/></div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-bold dark:text-white text-sm truncate">{c.name}</h4>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{c.messages[c.messages.length - 1].text}</p>
                    </div>
                    {c.unread > 0 && <span className="bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">{c.unread}</span>}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
              <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold"><User size={20}/></div>
                  <div>
                    <span className="font-bold dark:text-white block">{activeChat?.name}</span>
                    <span className="text-xs text-green-500 font-medium">Online</span>
                  </div>
                </div>
                <span className="text-xs bg-gray-100 dark:bg-gray-700 dark:text-gray-300 px-3 py-1 rounded-full font-medium">{activeChat?.type}</span>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {activeChat?.messages.map(m => (
                  <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-2xl max-w-md text-sm shadow-sm ${m.sender === 'me' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white dark:bg-gray-800 dark:text-white border border-gray-100 dark:border-gray-700 rounded-tl-none'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                <input value={chatInput} onChange={e=>setChatInput(e.target.value)} placeholder="Type your message..." className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" />
                <button type="submit" disabled={!chatInput.trim()} className="p-3 bg-indigo-600 text-white rounded-full disabled:opacity-50 hover:bg-indigo-700 transition-colors shadow-sm"><Send size={18} /></button>
              </form>
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-300 flex flex-col z-20 shadow-xl border-r border-gray-200 dark:border-gray-800">
        <div onClick={() => navigate('/')} className="p-6 flex items-center gap-3 cursor-pointer border-b border-gray-100 dark:border-gray-800 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-indigo-600 rounded shadow-lg flex items-center justify-center text-white"><Building size={18} /></div>
          <span className="font-bold text-xl text-gray-900 dark:text-white">Owner Portal</span>
        </div>
        
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Management</p>
          {[
            { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'properties', label: 'My Properties', icon: Building },
            { id: 'requests', label: 'Tenant Requests', icon: Users, badge: requests.length },
            { id: 'messages', label: 'Messages', icon: MessageSquare, badge: totalUnread }
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${activeTab === item.id ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold shadow-sm' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
              <div className="flex items-center gap-3"><item.icon size={20} />{item.label}</div>
              {item.badge > 0 && <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${activeTab === item.id ? 'bg-indigo-600 text-white' : 'bg-red-500 text-white'}`}>{item.badge}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* TOP HEADER */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center z-10 shadow-sm transition-colors">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight capitalize">
            {activeTab === 'overview' ? 'Overview' : activeTab === 'properties' ? 'My Listings' : activeTab === 'requests' ? 'Screening' : 'Inbox'}
          </h1>
          
          <div className="flex items-center gap-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-transform hover:rotate-12">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <Bell size={20} /><span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
            </button>
            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>
            <button onClick={() => navigate('/login')} className="flex items-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg transition-colors font-medium">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </header>
        
        {/* DYNAMIC TAB CONTENT AREA */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          <div className="p-4 md:p-8 flex-1">
            {renderContent()}
          </div>
          
          {/* CONSISTENT DASHBOARD FOOTER WITH SOCIALS */}
          <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6 mt-auto transition-colors">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <GraduationCap size={16} className="text-indigo-600" />
                <span className="font-bold text-gray-900 dark:text-gray-200">Bidhyarthi Ghar for Landlords</span> © 2026
              </div>
              
              <div className="flex gap-6 font-medium">
                <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Listing Guidelines</a>
                <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms</a>
                <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Support</a>
              </div>

              {/* Clickable Social Media Links */}
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600 transition-colors"><Facebook size={18}/></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors"><Instagram size={18}/></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-400 transition-colors"><Twitter size={18}/></a>
              </div>
            </div>
          </footer>
        </div>

        {/* =========================================
            ADD PROPERTY MODAL 
        ========================================= */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-2xl dark:text-white flex items-center gap-2"><Building size={24} className="text-indigo-600"/> Add New Listing</h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-full transition-colors"><X size={24}/></button>
              </div>
              
              <form onSubmit={handleAddProperty} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Listing Title</label>
                  <input required type="text" placeholder="e.g. Spacious 2BHK in Traffic Chowk" value={newProperty.title} onChange={e=>setNewProperty({...newProperty, title: e.target.value})} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"/>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Property Type</label>
                    <select value={newProperty.type} onChange={e=>setNewProperty({...newProperty, type: e.target.value})} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500">
                      <option>Room</option><option>Flat</option><option>Hostel</option><option>PG</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Monthly Rent (Rs.)</label>
                    <input required type="number" placeholder="e.g. 5000" value={newProperty.price} onChange={e=>setNewProperty({...newProperty, price: e.target.value})} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"/>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Location</label>
                  <input required type="text" placeholder="e.g. Kanchanbari, Biratnagar" value={newProperty.location} onChange={e=>setNewProperty({...newProperty, location: e.target.value})} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"/>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Image URL (Optional)</label>
                  <input type="url" placeholder="Paste an image link..." value={newProperty.image} onChange={e=>setNewProperty({...newProperty, image: e.target.value})} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"/>
                  <p className="text-xs text-gray-500 mt-1">Leave blank to use a default property image.</p>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 mt-6">
                  <button type="submit" className="w-full bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors shadow-md">
                    Publish Listing
                  </button>
                  <button type="button" onClick={() => setShowAddModal(false)} className="w-full mt-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-3.5 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}