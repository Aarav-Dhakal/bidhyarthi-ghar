import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Facebook, Instagram, Twitter, GraduationCap, Mail, Phone, Moon, Sun, ShieldCheck, Users, Star, Coffee } from 'lucide-react';

const FrontPage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
      <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold"><GraduationCap size={20} /></div>
            <span className="font-bold text-2xl text-gray-900 dark:text-white">Bidhyarthi Ghar</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <button onClick={() => navigate('/login')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium">Accommodation</button>
            <button onClick={() => navigate('/login')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium">Services</button>
            <button onClick={() => navigate('/login')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium">Community</button>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => navigate('/login')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium">Log in</button>
            <button onClick={() => navigate('/login')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">Sign Up</button>
          </div>
        </div>
      </nav>

      <div className="relative bg-blue-600 dark:bg-blue-900 text-white overflow-hidden animate-fade-in-up">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80')] bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Your Second Home, Your Student Community</h1>
          <p className="text-lg md:text-xl mb-8 text-blue-100">Verified Housing, Roommate Matching, Local Services & Student Forums in Eastern Nepal.</p>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <select className="w-full pl-10 pr-4 py-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-700 dark:text-white outline-none">
                <option>Biratnagar</option><option>Itahari</option><option>Dharan</option>
              </select>
            </div>
            <button onClick={() => navigate('/login')} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 flex items-center justify-center gap-2"><Search size={20}/> Search</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 animate-slide-in-right">
        <div className="text-center mb-12"><h2 className="text-3xl font-bold dark:text-white">Everything a Student Needs</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center border dark:border-gray-700">
            <ShieldCheck size={40} className="mx-auto text-blue-600 mb-4" />
            <h3 className="font-bold text-xl dark:text-white mb-2">Verified Listings</h3>
            <p className="text-gray-500 dark:text-gray-400">Scam-free, admin-approved properties.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center border dark:border-gray-700">
            <Users size={40} className="mx-auto text-green-600 mb-4" />
            <h3 className="font-bold text-xl dark:text-white mb-2">Smart Match</h3>
            <p className="text-gray-500 dark:text-gray-400">Algorithm-based roommate matching.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center border dark:border-gray-700">
            <Coffee size={40} className="mx-auto text-orange-600 mb-4" />
            <h3 className="font-bold text-xl dark:text-white mb-2">Local Services</h3>
            <p className="text-gray-500 dark:text-gray-400">Find laundry, print shops, and cafes instantly.</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800/50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center dark:text-white mb-12">Trusted by Students</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
              <div className="flex text-yellow-400 mb-2"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
              <p className="italic text-gray-600 dark:text-gray-300 mb-4">"Found my current flatmate through the Smart Match. Saved me from a bad experience!"</p>
              <p className="font-bold dark:text-white">- Priya, BSc Computing (IIC)</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
              <div className="flex text-yellow-400 mb-2"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
              <p className="italic text-gray-600 dark:text-gray-300 mb-4">"The verified listings are a lifesaver. No more Facebook scams."</p>
              <p className="font-bold dark:text-white">- Rohan, BBA</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4"><GraduationCap size={20} className="text-blue-600"/><span className="font-bold text-xl dark:text-white">Bidhyarthi Ghar</span></div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">The ultimate student housing & community platform.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600"><Facebook size={20}/></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600"><Instagram size={20}/></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400"><Twitter size={20}/></a>
            </div>
          </div>
          <div>
            <h3 className="font-bold dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><button onClick={() => navigate('/login')} className="hover:text-blue-600">Find Rooms</button></li>
              <li><button onClick={() => navigate('/login')} className="hover:text-blue-600">Community Forum</button></li>
              <li><button onClick={() => navigate('/login')} className="hover:text-blue-600">Local Services</button></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold dark:text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li className="flex items-center gap-2"><Mail size={16}/> support@bidhyarthighar.com</li>
              <li className="flex items-center gap-2"><Phone size={16}/> +977 9800000000</li>
              <li className="flex items-center gap-2"><MapPin size={16}/> Itahari, Nepal</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default FrontPage;