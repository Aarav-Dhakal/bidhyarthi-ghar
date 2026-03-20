import React, { useState } from 'react';
import { Search, MapPin, Tag, Plus, X, ShoppingCart, Store, Coffee, ExternalLink, CalendarDays } from 'lucide-react';

// INITIAL DATA
const initialItems = [
  { id: 1, title: "Engineering Physics Book", category: "Books", price: "Rs. 450", condition: "Good", location: "Itahari", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80" },
  { id: 2, title: "Induction Stove (Prestige)", category: "Household", price: "Rs. 1,500", condition: "Like New", location: "Biratnagar", image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&q=80" },
  { id: 3, title: "Study Table & Chair", category: "Furniture", price: "Rs. 2,500", condition: "Used", location: "Dharan", image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80" }
];

const hatiyaMarkets = [
  { id: 1, name: "Itahari Haat Bazar", day: "Wednesdays & Sundays", location: "Main Chowk, Itahari", desc: "Fresh vegetables, local spices, and cheap household plastic items." },
  { id: 2, name: "Biratnagar Gudri Market", day: "Open Daily (Morning)", location: "Gudri, Biratnagar", desc: "Wholesale fresh produce, local dairy, and meat." },
  { id: 3, name: "Sundar Dulari Haat", day: "Tuesdays", location: "Sundar Dulari Center", desc: "Local farming produce, clothing stalls, and street food." },
  { id: 4, name: "Bhanu Chowk Market", day: "Open Daily", location: "Dharan", desc: "Local fruits, imports, and thrifting clothing." }
];

const localPlaces = [
  { id: 1, name: "Kira Cafe & Roastery", type: "Cafe", location: "Itahari", mapQuery: "Kira+Cafe+Itahari", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&q=80" },
  { id: 2, name: "BBQ Biratnagar", type: "Restaurant", location: "Biratnagar", mapQuery: "BBQ+Biratnagar", img: "https://images.unsplash.com/photo-1544025162-8325a74a1cb2?w=500&q=80" },
  { id: 3, name: "Bagar Kot", type: "Hangout / Food", location: "Dharan", mapQuery: "Bagar+Kot+Dharan", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80" }
];

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState('items'); // items, hatiya, places
  
  // States for Student Items
  const [items, setItems] = useState(initialItems);
  const [showSellModal, setShowSellModal] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', price: '', category: 'Electronics', condition: 'Used', location: '' });

  // Handle Selling Item
  const handleSellSubmit = (e) => {
    e.preventDefault();
    const createdItem = {
      ...newItem,
      id: Date.now(),
      price: `Rs. ${newItem.price}`,
      // Random placeholder image based on category
      image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&q=80" 
    };
    setItems([createdItem, ...items]); // Add to top of list
    setShowSellModal(false);
    setNewItem({ title: '', price: '', category: 'Electronics', condition: 'Used', location: '' }); // Reset
  };

  return (
    <div className="space-y-6 relative">
      
      {/* Top Navigation Tabs & Sell Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar pb-2 sm:pb-0">
          <TabButton icon={<ShoppingCart size={18}/>} label="Student Items" active={activeTab==='items'} onClick={() => setActiveTab('items')} />
          <TabButton icon={<Store size={18}/>} label="Local Hatiya" active={activeTab==='hatiya'} onClick={() => setActiveTab('hatiya')} />
          <TabButton icon={<Coffee size={18}/>} label="Cafes & Food" active={activeTab==='places'} onClick={() => setActiveTab('places')} />
        </div>

        {activeTab === 'items' && (
          <button onClick={() => setShowSellModal(true)} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-sm whitespace-nowrap">
            <Plus size={20} /> Sell an Item
          </button>
        )}
      </div>

      {/* --- TAB 1: STUDENT ITEMS --- */}
      {activeTab === 'items' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
              <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">{item.title}</h3>
                </div>
                <p className="font-bold text-blue-600 dark:text-blue-400 text-lg mb-3">{item.price}</p>
                <div className="space-y-2 mb-4">
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded flex items-center gap-1 w-max"><Tag size={12}/> {item.category} ({item.condition})</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><MapPin size={12}/> {item.location}</span>
                </div>
                <button className="w-full border border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500 py-2 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition">Message Seller</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- TAB 2: LOCAL HATIYA (MARKETS) --- */}
      {activeTab === 'hatiya' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hatiyaMarkets.map(market => (
            <div key={market.id} className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-xl border border-orange-100 dark:border-orange-800/30 flex gap-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-800/50 rounded-full flex items-center justify-center flex-shrink-0">
                <Store size={24} className="text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{market.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <CalendarDays size={14} className="text-orange-500" /> <span className="font-semibold">{market.day}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <MapPin size={14} /> {market.location}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{market.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- TAB 3: CAFES & PLACES --- */}
      {activeTab === 'places' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {localPlaces.map(place => (
            <div key={place.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 group">
              <img src={place.img} alt={place.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-4 relative bg-white dark:bg-gray-800">
                <h3 className="font-bold text-gray-900 dark:text-white">{place.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{place.type} • {place.location}</p>
                <a href={`https://www.google.com/maps/search/?api=1&query=${place.mapQuery}`} target="_blank" rel="noopener noreferrer" className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center justify-center gap-2">
                  <ExternalLink size={16} /> Open Map
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- MODAL: SELL AN ITEM --- */}
      {showSellModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">List an Item for Sale</h3>
              <button onClick={() => setShowSellModal(false)} className="text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-full"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSellSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Item Title</label>
                <input required type="text" value={newItem.title} onChange={(e)=>setNewItem({...newItem, title: e.target.value})} placeholder="e.g. Symphony Cooler" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (Rs.)</label>
                  <input required type="number" value={newItem.price} onChange={(e)=>setNewItem({...newItem, price: e.target.value})} placeholder="2500" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Condition</label>
                  <select value={newItem.condition} onChange={(e)=>setNewItem({...newItem, condition: e.target.value})} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white outline-none">
                    <option>New</option><option>Like New</option><option>Used</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <select value={newItem.category} onChange={(e)=>setNewItem({...newItem, category: e.target.value})} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white outline-none">
                    <option>Books</option><option>Electronics</option><option>Furniture</option><option>Household</option><option>Food/Groceries</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                  <input required type="text" value={newItem.location} onChange={(e)=>setNewItem({...newItem, location: e.target.value})} placeholder="e.g. Dharan" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 mt-4">Post Listing</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

// Helper component for tabs
const TabButton = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium whitespace-nowrap transition-colors ${active ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
    {icon} {label}
  </button>
);

export default Marketplace;