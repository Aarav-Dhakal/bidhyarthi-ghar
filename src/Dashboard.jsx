import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, ShoppingBag, MessageSquare, Users, LogOut, GraduationCap, 
  Bell, MapPin, Search, Plus, Send, Moon, Sun, Filter, Star, 
  CheckCircle2, Store, Coffee, ExternalLink, CalendarDays, X, 
  Tag, User, Building, Map, UserCircle, Briefcase, MessageCircle, Heart,
  Facebook, Instagram, Twitter
} from 'lucide-react';

// ==========================================
// MOCK DATABASE 
// ==========================================
const mockProperties = [
  { id: 1, type: 'Flat', title: "2BHK Premium Flat", location: "Kanchanbari, Biratnagar", price: "Rs. 12,000/mo", rating: 4.8, amenities: ["Kitchen", "Parking", "Water"], isCommercial: false, image: "https://images.unsplash.com/photo-1502672260266-1c1de2d96674?w=800&q=80" },
  { id: 2, type: 'Hostel', title: "Everest Boys Hostel", location: "Tinkune, Dharan", price: "Rs. 8,500/mo", rating: 4.2, amenities: ["Food Included", "Laundry", "Wi-Fi"], isCommercial: true, mapQuery: "Everest+Boys+Hostel+Dharan", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80" },
  { id: 3, type: 'Hotel', title: "Hotel Harrison Palace", location: "Biratnagar", price: "Rs. 3,500/night", rating: 4.9, amenities: ["AC", "Breakfast"], isCommercial: true, mapQuery: "Hotel+Harrison+Palace+Biratnagar", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80" },
  { id: 4, type: 'Room', title: "Cozy Single Room", location: "Traffic Chowk, Itahari", price: "Rs. 4,500/mo", rating: 4.5, amenities: ["Attached Bath", "Wi-Fi"], isCommercial: false, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80" }
];

const mockRoommates = [
  { id: 1, name: "Rohan Shrestha", course: "BSc Computing (IIC)", match: 92, budget: "Rs. 4k - 6k", habits: ["Non-Smoker", "Early Bird", "Vegetarian"], bio: "Looking for a quiet flatmate to share a 2BHK near IIC.", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80" },
  { id: 2, name: "Sita Tamang", course: "BBA", match: 85, budget: "Rs. 3k - 5k", habits: ["Night Owl", "Pet Friendly"], bio: "Need a female roommate for a PG in Biratnagar.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" }
];

const initialItems = [
  { id: 1, title: "Engineering Physics Book", category: "Books", price: "Rs. 450", condition: "Good", location: "Itahari", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80" },
  { id: 2, title: "Induction Stove (Prestige)", category: "Household", price: "Rs. 1,500", condition: "Like New", location: "Biratnagar", image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&q=80" }
];

const hatiyaMarkets = [
  { id: 1, name: "Itahari Haat Bazar", day: "Wednesdays & Sundays", location: "Main Chowk, Itahari", desc: "Fresh vegetables, local spices, and household items." },
  { id: 2, name: "Biratnagar Gudri", day: "Open Daily (Morning)", location: "Gudri, Biratnagar", desc: "Wholesale fresh produce and local dairy." }
];

const localPlaces = [
  { id: 1, name: "Kira Cafe & Roastery", type: "Cafe", location: "Itahari", mapQuery: "Kira+Cafe+Itahari", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&q=80" },
  { id: 2, name: "Bagar Kot", type: "Hangout / Food", location: "Dharan", mapQuery: "Bagar+Kot+Dharan", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80" }
];

const initialChats = [
  { id: 1, type: "Match", name: "Rohan Shrestha", unread: 2, messages: [{ id: 101, text: "Hey! Saw we have a 92% match. Are you still looking for a room?", sender: "them" }] },
  { id: 2, type: "Owner", name: "Landlord - Kanchanbari", unread: 0, messages: [{ id: 201, text: "The 2BHK is available next month. When can you visit?", sender: "them" }] }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('rooms');
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  
  // Modals & Sub-tabs
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [marketTab, setMarketTab] = useState('items');
  const [showSellModal, setShowSellModal] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', price: '', category: 'Books', condition: 'Used', location: '' });

  // THE MISSING STATE THAT CAUSED THE CRASH:
  const [items, setItems] = useState(initialItems);

  // Chat States
  const [chats, setChats] = useState(initialChats);
  const [activeChatId, setActiveChatId] = useState(initialChats[0].id);
  const [chatInput, setChatInput] = useState("");
  const [chatFilter, setChatFilter] = useState('All');
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

  // Actions
  const handleSellSubmit = (e) => {
    e.preventDefault();
    setItems([{ ...newItem, id: Date.now(), price: `Rs. ${newItem.price}`, image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&q=80" }, ...items]);
    setShowSellModal(false);
    setNewItem({ title: '', price: '', category: 'Books', condition: 'Used', location: '' });
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

  // ==========================================
  // TAB RENDERING ENGINE
  // ==========================================
  const renderContent = () => {
    switch (activeTab) {
      
      // 1. ACCOMMODATIONS
      case 'rooms':
        return (
          <div className="animate-slide-in-right space-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input type="text" placeholder="Search Biratnagar, Itahari..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <select className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white outline-none">
                <option>All Types</option><option>Room</option><option>Flat</option><option>Hostel</option><option>Hotel</option>
              </select>
              <select className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white outline-none">
                <option>Any Price</option><option>Under 5k</option><option>5k - 10k</option><option>Above 10k</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProperties.map(p => (
                <div key={p.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all group flex flex-col">
                  <div className="h-48 relative overflow-hidden">
                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <span className="absolute top-4 left-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">{p.type}</span>
                    <span className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-900/90 px-3 py-1 rounded-lg font-bold dark:text-white">{p.price}</span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg dark:text-white truncate">{p.title}</h3>
                      <span className="flex items-center gap-1 text-sm text-yellow-500"><Star size={14} fill="currentColor"/> {p.rating}</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1 mb-4"><MapPin size={16}/> {p.location}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.amenities.map(a => <span key={a} className="text-xs bg-gray-100 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded">{a}</span>)}
                    </div>
                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                      {p.isCommercial ? (
                        <a href={`https://www.google.com/maps/search/?api=1&query=${p.mapQuery}`} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors"><Map size={18}/> View Map</a>
                      ) : (
                        <button onClick={() => setActiveTab('messages')} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"><Building size={18}/> Contact Owner</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // 2. ROOMMATES
      case 'roommates':
        return (
          <div className="animate-slide-in-right space-y-6">
            <div className="bg-blue-600 dark:bg-blue-800 p-6 rounded-xl text-white shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold">Smart Match Active</h2>
                <p className="text-blue-100 mt-1">We found students matching your habits and budget.</p>
              </div>
              <button onClick={() => setShowProfileModal(true)} className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold shadow hover:bg-blue-50 transition-colors">Edit My Profile</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockRoommates.map(r => (
                <div key={r.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-shadow">
                  <div className="text-center">
                    <img src={r.image} className="w-24 h-24 rounded-full object-cover border-4 border-blue-50 dark:border-gray-700 mx-auto" />
                    <div className="mt-3 inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold shadow-sm">{r.match}% Match</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl dark:text-white">{r.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{r.course} • Budget: {r.budget}</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 italic">"{r.bio}"</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {r.habits.map(h => <span key={h} className="text-xs bg-gray-100 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-full flex items-center gap-1"><CheckCircle2 size={12} className="text-blue-500"/> {h}</span>)}
                    </div>
                    <button onClick={() => setActiveTab('messages')} className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">Connect</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // 3. MARKETPLACE
      case 'market':
        return (
          <div className="animate-slide-in-right space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {['items', 'hatiya', 'places'].map(tab => (
                  <button key={tab} onClick={() => setMarketTab(tab)} className={`px-4 py-2 rounded-lg font-medium capitalize flex items-center gap-2 transition-colors ${marketTab === tab ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                    {tab === 'items' ? <ShoppingBag size={18}/> : tab === 'hatiya' ? <Store size={18}/> : <Coffee size={18}/>} 
                    {tab === 'items' ? 'Student Items' : tab === 'hatiya' ? 'Local Hatiya' : 'Cafes & Places'}
                  </button>
                ))}
              </div>
              {marketTab === 'items' && (
                <button onClick={() => setShowSellModal(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-green-700 transition-colors"><Plus size={18}/> Sell Item</button>
              )}
            </div>

            {/* Sub-tab: Items */}
            {marketTab === 'items' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
                {items.map(i => (
                  <div key={i.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
                    <img src={i.image} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="font-bold dark:text-white truncate">{i.title}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-bold text-lg my-2">{i.price}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                        <span className="flex items-center gap-1"><Tag size={12}/> {i.category}</span>
                        <span className="flex items-center gap-1"><MapPin size={12}/> {i.location}</span>
                      </div>
                      <button onClick={() => setActiveTab('messages')} className="w-full border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">Message Seller</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Sub-tab: Hatiya */}
            {marketTab === 'hatiya' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
                {hatiyaMarkets.map(m => (
                  <div key={m.id} className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl border border-orange-100 dark:border-orange-800 flex gap-4">
                    <div className="w-12 h-12 bg-orange-200 dark:bg-orange-800 rounded-full flex items-center justify-center flex-shrink-0 text-orange-700 dark:text-orange-300"><Store size={24} /></div>
                    <div>
                      <h3 className="font-bold text-lg dark:text-white">{m.name}</h3>
                      <p className="text-sm text-orange-600 dark:text-orange-400 font-bold flex items-center gap-1 my-1"><CalendarDays size={14}/> {m.day}</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{m.desc}</p>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><MapPin size={12}/> {m.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Sub-tab: Places */}
            {marketTab === 'places' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
                {localPlaces.map(p => (
                  <div key={p.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 group">
                    <img src={p.img} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="p-4 relative bg-white dark:bg-gray-800">
                      <h3 className="font-bold dark:text-white">{p.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{p.type} • {p.location}</p>
                      <a href={`https://www.google.com/maps/search/?api=1&query=${p.mapQuery}`} target="_blank" rel="noreferrer" className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center gap-2 transition-colors"><ExternalLink size={16}/> Open Map</a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      // 4. LOCAL SERVICES (New)
      case 'services':
        return (
          <div className="animate-slide-in-right space-y-6">
            <h2 className="text-2xl font-bold dark:text-white">Local Essentials & Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"><Briefcase size={28}/></div>
                <h3 className="font-bold text-lg dark:text-white">Quick Laundry</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Rs. 50/kg • Free Pickup in Itahari</p>
                <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg w-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">View Details</button>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><Briefcase size={28}/></div>
                <h3 className="font-bold text-lg dark:text-white">Student Print Point</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Rs. 2/page • Near IIC College</p>
                <button className="text-green-600 border border-green-600 px-4 py-2 rounded-lg w-full hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">View Details</button>
              </div>
            </div>
          </div>
        );

      // 5. COMMUNITY FORUM (New)
      case 'forum':
        return (
          <div className="animate-slide-in-right space-y-6 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex gap-4 items-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">A</div>
              <input type="text" placeholder="Ask the student community..." className="flex-1 bg-gray-50 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"/>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors"><Send size={18}/> Post</button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">S</div>
                <div>
                  <h4 className="font-bold dark:text-white">Sita Tamang</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago • Looking for Roommate</p>
                </div>
              </div>
              <p className="dark:text-gray-200 mb-6 leading-relaxed">Hey everyone! I'm an IT student looking for a female flatmate to share a 2BHK in Dharan. My budget is around 5k. Anyone interested or have any leads?</p>
              <div className="flex gap-6 border-t border-gray-100 dark:border-gray-700 pt-4 text-gray-500 dark:text-gray-400">
                <button className="flex items-center gap-2 hover:text-red-500 transition-colors font-medium"><Heart size={18}/> 12 Likes</button>
                <button className="flex items-center gap-2 hover:text-blue-500 transition-colors font-medium"><MessageCircle size={18}/> 4 Comments</button>
              </div>
            </div>
          </div>
        );

      // 6. MESSAGES
      case 'messages':
        return (
          <div className="animate-fade-in-up bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex h-[600px] overflow-hidden">
            <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
                  {['All', 'Owner', 'Match', 'Seller'].map(f => (
                    <button key={f} onClick={() => setChatFilter(f)} className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors ${chatFilter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>{f}</button>
                  ))}
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"/>
                  <input type="text" placeholder="Search chats..." className="w-full pl-9 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg outline-none dark:text-white text-sm focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {chats.filter(c => chatFilter === 'All' || c.type === chatFilter).map(c => (
                  <div key={c.id} onClick={() => handleChatClick(c.id)} className={`p-4 border-b border-gray-100 dark:border-gray-700/50 cursor-pointer flex items-center gap-3 transition-colors ${activeChatId === c.id ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-600' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg"><User size={24}/></div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-bold dark:text-white text-sm truncate">{c.name}</h4>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{c.messages[c.messages.length - 1].text}</p>
                    </div>
                    {c.unread > 0 && <span className="bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">{c.unread}</span>}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
              <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold"><User size={20}/></div>
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
                    <div className={`p-3 rounded-2xl max-w-md text-sm shadow-sm ${m.sender === 'me' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white dark:bg-gray-800 dark:text-white border border-gray-100 dark:border-gray-700 rounded-tl-none'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                <input value={chatInput} onChange={e=>setChatInput(e.target.value)} placeholder="Type your message..." className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="submit" disabled={!chatInput.trim()} className="p-3 bg-blue-600 text-white rounded-full disabled:opacity-50 hover:bg-blue-700 transition-colors shadow-sm"><Send size={18} /></button>
              </form>
            </div>
          </div>
        );
        
      default: return null;
    }
  };

  const navItems = [
    { id: 'rooms', label: 'Accommodation', icon: Home },
    { id: 'roommates', label: 'Roommates', icon: Users },
    { id: 'market', label: 'Marketplace', icon: ShoppingBag },
    { id: 'services', label: 'Local Services', icon: Briefcase },
    { id: 'forum', label: 'Community Forum', icon: MessageCircle },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col z-20 shadow-sm transition-colors">
        {/* CLICKABLE LOGO ROUTING TO HOME */}
        <div onClick={() => navigate('/')} className="p-6 flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-blue-600 rounded shadow-lg flex items-center justify-center text-white"><GraduationCap size={20} /></div>
          <span className="font-bold text-xl text-gray-900 dark:text-white">Bidhyarthi Ghar</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-2 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${activeTab === item.id ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold shadow-sm translate-x-1' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                <Icon size={20} />{item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* TOP HEADER */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center z-10 shadow-sm transition-colors">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{navItems.find(i => i.id === activeTab)?.label}</h1>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-transform hover:rotate-12">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <Bell size={20} /><span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
            </button>
            <button onClick={() => setShowProfileModal(true)} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition-colors">
              <UserCircle size={18}/> Profile
            </button>
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
                <GraduationCap size={16} className="text-blue-600" />
                <span className="font-bold text-gray-900 dark:text-gray-200">Bidhyarthi Ghar</span> © 2026
              </div>
              
              <div className="flex gap-6 font-medium">
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Safety Center</a>
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms</a>
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Support</a>
              </div>

              {/* Clickable Social Media Links */}
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors"><Facebook size={18}/></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors"><Instagram size={18}/></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors"><Twitter size={18}/></a>
              </div>
            </div>
          </footer>
        </div>

        {/* =========================================
            MODALS (Edit Profile & Sell Item) 
        ========================================= */}
        {showProfileModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up">
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl dark:text-white">Edit Profile</h3>
                <button onClick={() => setShowProfileModal(false)} className="text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-full"><X size={20}/></button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Bio</label>
                  <textarea className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" rows="3" placeholder="I am a BBA student looking for..."></textarea>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Monthly Budget</label>
                  <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Under Rs. 3,000</option><option>Rs. 3,000 - 5,000</option><option>Rs. 5,000 - 8,000</option>
                  </select>
                </div>
                <button type="button" onClick={() => setShowProfileModal(false)} className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition-colors mt-4">Save Profile</button>
              </form>
            </div>
          </div>
        )}

        {showSellModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl dark:text-white">List an Item</h3>
                <button onClick={() => setShowSellModal(false)} className="text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-full"><X size={20}/></button>
              </div>
              <form onSubmit={handleSellSubmit} className="space-y-4">
                <input required type="text" placeholder="Item Title" value={newItem.title} onChange={e=>setNewItem({...newItem, title: e.target.value})} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"/>
                <input required type="number" placeholder="Price (Rs.)" value={newItem.price} onChange={e=>setNewItem({...newItem, price: e.target.value})} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"/>
                <div className="grid grid-cols-2 gap-4">
                  <select value={newItem.category} onChange={e=>setNewItem({...newItem, category: e.target.value})} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Books</option><option>Household</option><option>Electronics</option>
                  </select>
                  <input required type="text" placeholder="Location" value={newItem.location} onChange={e=>setNewItem({...newItem, location: e.target.value})} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition-colors mt-4">Post Listing</button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}