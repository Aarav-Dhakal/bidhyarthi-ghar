import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Building, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('aryan@bg.com');
  const [password, setPassword] = useState('12345');
  const [activeRole, setActiveRole] = useState('student');
  const [error, setError] = useState('');

  const handleRoleSelect = (role) => {
    setActiveRole(role);
    setError('');
    if (role === 'student') setEmail('aryan@bg.com');
    if (role === 'owner') setEmail('owner@bg.com');
    if (role === 'admin') setEmail('admin@bg.com');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@bg.com') navigate('/admin');
    else if (email === 'owner@bg.com') navigate('/landlord');
    else if (email === 'aryan@bg.com') navigate('/dashboard');
    else setError('Invalid credentials.');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* ANIMATION CLASS APPLIED HERE */}
      <div className="animate-fade-in-up sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-6">
          <div onClick={() => navigate('/')} className="flex items-center justify-center gap-2 cursor-pointer">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg"><GraduationCap size={24} /></div>
            <span className="font-bold text-3xl text-gray-900 dark:text-white">Bidhyarthi Ghar</span>
          </div>
          <h2 className="mt-4 text-2xl font-extrabold text-gray-900 dark:text-white">Welcome Back</h2>
        </div>

        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-gray-100 dark:border-gray-700">
          <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-lg mb-6">
            <button type="button" onClick={() => handleRoleSelect('student')} className={`flex-1 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all ${activeRole === 'student' ? 'bg-white dark:bg-gray-800 shadow text-blue-600' : 'text-gray-500'}`}><GraduationCap size={16}/> Student</button>
            <button type="button" onClick={() => handleRoleSelect('owner')} className={`flex-1 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all ${activeRole === 'owner' ? 'bg-white dark:bg-gray-800 shadow text-blue-600' : 'text-gray-500'}`}><Building size={16}/> Landlord</button>
          </div>

          {error && <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2"><AlertCircle size={16} /> {error}</div>}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <button type="submit" className="w-full flex justify-center py-2.5 px-4 rounded-md shadow-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors">Sign In</button>
          </form>
          <button onClick={() => navigate('/')} className="mt-6 w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><ArrowLeft size={16} /> Back to Home</button>
        </div>
      </div>
    </div>
  );
};

export default Login;