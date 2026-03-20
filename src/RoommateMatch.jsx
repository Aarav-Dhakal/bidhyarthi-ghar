import React, { useState } from 'react';
import { User, MapPin, BookOpen, X, MessageCircle, SlidersHorizontal } from 'lucide-react';

const mockMatches = [
  { id: 1, name: "Rohan Shrestha", course: "BSc Computing @ IIC", matchScore: 95, locationPref: "Kanchanbari", habits: ["Night Owl", "Non-Smoker"], bio: "Looking for a roommate to share a 2BHK.", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Aarav Thapa", course: "BBA @ IIC", matchScore: 88, locationPref: "Itahari Chowk", habits: ["Early Bird", "Gym Goer"], bio: "Studying BBA. Looking for a chill flatmate.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }
];

const RoommateMatch = () => {
  const [matches, setMatches] = useState(mockMatches);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center transition-colors">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Roommate Matches</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Based on your lifestyle and preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((profile) => (
          <div key={profile.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col transition-colors">
            <div className="relative h-64">
              <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-bold text-white">{profile.name}</h3>
                <p className="text-gray-300 text-sm flex items-center gap-1 mt-1"><BookOpen size={14} /> {profile.course}</p>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex items-center gap-2">
                <MapPin size={16} className="text-gray-400" /> <span className="font-medium">{profile.locationPref}</span>
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.habits.map((habit, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md font-medium">
                    {habit}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-6 line-clamp-2">"{profile.bio}"</p>
              
              <div className="mt-auto flex justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button onClick={() => setMatches(matches.filter(m => m.id !== profile.id))} className="flex-1 flex justify-center gap-2 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <X size={18} /> Skip
                </button>
                <button className="flex-1 flex justify-center gap-2 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm">
                  <MessageCircle size={18} /> Connect
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RoommateMatch;