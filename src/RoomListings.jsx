import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Map, BedDouble, Building, Home, CheckCircle2 } from 'lucide-react';

// Enhanced Database with Real-ish Hostels and Hotels
const mockProperties = [
  { id: 1, type: 'Flat', title: "2BHK Premium Flat", location: "Kanchanbari, Biratnagar", price: 12000, priceText: "Rs. 12,000/mo", rating: 4.8, amenities: ["Kitchen", "Parking", "Water"], image: "https://images.unsplash.com/photo-1502672260266-1c1de2d96674?w=800&q=80", isCommercial: false },
  { id: 2, type: 'Room', title: "Single Room for Student", location: "Near IIC College, Itahari", price: 4000, priceText: "Rs. 4,000/mo", rating: 4.5, amenities: ["Shared Bathroom", "Wi-Fi"], image: "https://images.unsplash.com/photo-1522771731470-53ff720dc08b?w=800&q=80", isCommercial: false },
  { id: 3, type: 'Hostel', title: "Everest Boys Hostel", location: "Tinkune, Dharan", price: 8500, priceText: "Rs. 8,500/mo", rating: 4.2, amenities: ["Food Included", "Laundry", "Wi-Fi"], isCommercial: true, mapQuery: "Everest+Boys+Hostel+Dharan", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80" },
  { id: 4, type: 'Hotel', title: "Hotel Harrison Palace", location: "Biratnagar", price: 3500, priceText: "Rs. 3,500/night", rating: 4.9, amenities: ["AC", "Breakfast", "Housekeeping"], isCommercial: true, mapQuery: "Hotel+Harrison+Palace+Biratnagar", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80" },
  { id: 5, type: 'Hostel', title: "Shanti Girls Hostel", location: "Sundar Dulari", price: 7000, priceText: "Rs. 7,000/mo", rating: 4.6, amenities: ["Food Included", "Security", "Study Room"], isCommercial: true, mapQuery: "Sundar+Dulari+Morang", image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80" },
  { id: 6, type: 'Hotel', title: "Hotel Soaltee Westend", location: "Itahari", price: 5500, priceText: "Rs. 5,500/night", rating: 4.8, amenities: ["Pool", "AC", "Restaurant"], isCommercial: true, mapQuery: "Soaltee+Westend+Itahari", image: "https://images.unsplash.com/photo-1551882547-ff40c0d5e9af?w=800&q=80" },
  { id: 7, type: 'Room', title: "Double Sharing Room", location: "Bhanu Chowk, Dharan", price: 3000, priceText: "Rs. 3,000/mo", rating: 4.1, amenities: ["Balcony", "Water"], image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80", isCommercial: false },
  { id: 8, type: 'Hostel', title: "Pioneer Student Hostel", location: "Biratnagar", price: 9000, priceText: "Rs. 9,000/mo", rating: 4.7, amenities: ["AC Rooms", "4 Meals", "Gym"], isCommercial: true, mapQuery: "Hostels+in+Biratnagar", image: "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=800&q=80" }
];

const RoomListings = () => {
  const [typeFilter, setTypeFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Apply Search, Type, and Price filters
  const filteredProperties = mockProperties.filter(p => {
    const matchType = typeFilter === 'All' || p.type === typeFilter;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchPrice = true;
    if (priceFilter === 'under5k') matchPrice = p.price < 5000;
    if (priceFilter === '5k-10k') matchPrice = p.price >= 5000 && p.price <= 10000;
    if (priceFilter === 'over10k') matchPrice = p.price > 10000;

    return matchType && matchSearch && matchPrice;
  });

  const getTypeColor = (type) => {
    switch(type) {
      case 'Flat': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200';
      case 'Room': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200';
      case 'Hostel': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200';
      case 'Hotel': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-4 gap-4 transition-colors">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input 
            type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search location or name..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-white focus:outline-none cursor-pointer">
          <option value="All">All Types</option>
          <option value="Room">Rooms</option>
          <option value="Flat">Flats</option>
          <option value="Hostel">Hostels</option>
          <option value="Hotel">Hotels</option>
        </select>

        <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-white focus:outline-none cursor-pointer">
          <option value="All">Any Price</option>
          <option value="under5k">Under Rs. 5,000</option>
          <option value="5k-10k">Rs. 5,000 - 10,000</option>
          <option value="over10k">Over Rs. 10,000</option>
        </select>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map(property => (
          <div key={property.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group flex flex-col">
            <div className="h-48 relative overflow-hidden">
              <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${getTypeColor(property.type)}`}>{property.type}</span>
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                <p className="font-bold text-gray-900 dark:text-white">{property.priceText}</p>
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">{property.title}</h3>
                <div className="flex items-center gap-1 text-sm bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 px-2 py-0.5 rounded">
                  <Star size={14} fill="currentColor" /><span className="font-bold">{property.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm mb-4">
                <MapPin size={16} /><span className="truncate">{property.location}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {property.amenities.map((amenity, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded flex items-center gap-1">
                    <CheckCircle2 size={12}/> {amenity}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                {property.isCommercial ? (
                  <a href={`https://www.google.com/maps/search/?api=1&query=${property.mapQuery}`} target="_blank" rel="noopener noreferrer" className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2">
                    <Map size={18} /> Google Maps
                  </a>
                ) : (
                  <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2">
                    <Building size={18} /> Contact Owner
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredProperties.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">No properties match your filters. Try adjusting your search.</div>
      )}
    </div>
  );
};

export default RoomListings;