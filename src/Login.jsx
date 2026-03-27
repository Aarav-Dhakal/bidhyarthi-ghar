import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Building, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('aryan@bg.com');
  const [password, setPassword] = useState('12345');
  const [activeRole, setActiveRole] = useState('student');
  const [error, setError] = useState('');

  // Keep Dark Mode active if it was set on the Front Page
  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleRoleSelect = (role) => {
    setActiveRole(role);
    setError('');
    setPassword('12345'); // Auto-fill password for the prototype
    
    // Auto-fill the correct email based on the clicked role tab
    if (role === 'student') setEmail('aryan@bg.com');
    if (role === 'owner') setEmail('owner@bg.com');
    if (role === 'admin') setEmail('admin@bg.com');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    // Routing Logic based on credentials
    if (email === 'admin@bg.com' && password === '12345') {
      navigate('/admin');
    } else if (email === 'owner@bg.com' && password === '12345') {
      navigate('/landlord');
    } else if (email === 'aryan@bg.com' && password === '12345') {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Use 12345 for the prototype.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300">
      
      {/* Floating Animation Wrapper */}
      <div className="animate-fade-in-up sm:mx-auto sm:w-full sm:max-w-md">
        
        {/* Clickable Header */}
        <div className="text-center mb-6">
          <div onClick={() => navigate('/')} className="flex items-center justify-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
              <GraduationCap size={24} />
            </div>
            <span className="font-bold text-3xl text-gray-900 dark:text-white">Bidhyarthi Ghar</span>
          </div>
          <h2 className="mt-4 text-2xl font-extrabold text-gray-900 dark:text-white">Sign in to your account</h2>
        </div>

        {/* Login Box */}
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-gray-100 dark:border-gray-700">
          
          {/* Role Selection Tabs */}
          <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-lg mb-6">
            <button type="button" onClick={() => handleRoleSelect('student')} className={`flex-1 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all ${activeRole === 'student' ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
              <GraduationCap size={16}/> Student
            </button>
            <button type="button" onClick={() => handleRoleSelect('owner')} className={`flex-1 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all ${activeRole === 'owner' ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
              <Building size={16}/> Landlord
            </button>
            <button type="button" onClick={() => handleRoleSelect('admin')} className={`flex-1 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all ${activeRole === 'admin' ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
              <ShieldCheck size={16}/> Admin
            </button>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="mb-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm flex items-center gap-2 animate-fade-in-up">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email address</label>
              <input 
                required 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-colors" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <input 
                required 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-colors" 
              />
            </div>
            
            <button type="submit" className="w-full flex justify-center py-3 px-4 rounded-lg shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors">
              Sign In
            </button>
          </form>
          
          <button onClick={() => navigate('/')} className="mt-6 w-full flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;