import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, LogOut, CheckCircle, XCircle, Users, Home, 
  AlertTriangle, Building, Moon, Sun, Search, Filter, 
  GraduationCap, FileText, Activity, MoreVertical, CheckSquare
} from 'lucide-react';

// ==========================================
// MOCK DATABASE FOR ADMIN
// ==========================================
const initialPendingUsers = [
  { id: 1, name: "Sita Tamang", role: "Student", college: "IIC College", doc: "ID_Card_Front.pdf", date: "Oct 24, 2026" },
  { id: 2, name: "Rahul Sharma", role: "Student", college: "Purbanchal Uni", doc: "Admission_Receipt.jpg", date: "Oct 24, 2026" },
  { id: 3, name: "Bikash Thapa", role: "Landlord", location: "Itahari", doc: "Citizenship_Front.pdf", date: "Oct 23, 2026" }
];

const initialPendingProperties = [
  { id: 101, title: "New 2BHK Flat", owner: "Ram Shrestha", type: "Flat", price: "12,000", location: "Itahari", docs: "Lalpurja_Copy.pdf" },
  { id: 102, title: "Everest Boys Hostel", owner: "Kiran Rai", type: "Hostel", price: "8,500", location: "Dharan", docs: "Business_Reg.pdf" }
];

const reportedIssues = [
  { id: 1, type: "Fake Listing", reportedBy: "Student A", target: "Room in Traffic Chowk", reason: "Images are downloaded from Google.", status: "Pending Review" },
  { id: 2, type: "Harassment", reportedBy: "Student B", target: "User: JohnDoe", reason: "Sending inappropriate messages.", status: "Pending Review" }
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  
  // Interactive States for "Full Control"
  const [pendingUsers, setPendingUsers] = useState(initialPendingUsers);
  const [pendingProperties, setPendingProperties] = useState(initialPendingProperties);
  const [stats, setStats] = useState({
    verifiedStudents: 1248,
    activeProperties: 342,
    resolvedReports: 156
  });

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

  // Admin Actions (Approvals & Rejections)
  const handleApproveUser = (id) => {
    setPendingUsers(pendingUsers.filter(user => user.id !== id));
    setStats(prev => ({ ...prev, verifiedStudents: prev.verifiedStudents + 1 }));
  };

  const handleRejectUser = (id) => {
    setPendingUsers(pendingUsers.filter(user => user.id !== id));
  };

  const handleApproveProperty = (id) => {
    setPendingProperties(pendingProperties.filter(prop => prop.id !== id));
    setStats(prev => ({ ...prev, activeProperties: prev.activeProperties + 1 }));
  };

  const handleRejectProperty = (id) => {
    setPendingProperties(pendingProperties.filter(prop => prop.id !== id));
  };

  // ==========================================
  // TAB RENDERING ENGINE
  // ==========================================
  const renderContent = () => {
    switch (activeTab) {
      
      // 1. OVERVIEW (System Health)
      case 'overview':
        return (
          <div className="animate-slide-in-right space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">System Overview</h2>
            
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Users size={24}/></div>
                  <span className="text-green-500 text-sm font-bold">+12% this week</span>
                </div>
                <h3 className="text-gray-500 dark:text-gray-400 font-medium">Verified Students</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.verifiedStudents.toLocaleString()}</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg"><Building size={24}/></div>
                  <span className="text-green-500 text-sm font-bold">+5% this week</span>
                </div>
                <h3 className="text-gray-500 dark:text-gray-400 font-medium">Active Properties</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.activeProperties}</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-lg"><CheckSquare size={24}/></div>
                  <span className="text-orange-500 text-sm font-bold">Needs Action</span>
                </div>
                <h3 className="text-gray-500 dark:text-gray-400 font-medium">Pending Verifications</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{pendingUsers.length + pendingProperties.length}</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-red-100 text-red-600 rounded-lg"><AlertTriangle size={24}/></div>
                </div>
                <h3 className="text-gray-500 dark:text-gray-400 font-medium">Active Reports</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{reportedIssues.length}</p>
              </div>
            </div>

            {/* Quick Actions / Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                  <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2"><Activity size={18} className="text-blue-500"/> Priority Verifications</h2>
                  <button onClick={() => setActiveTab('users')} className="text-sm text-blue-600 hover:underline">View All</button>
                </div>
                <div className="p-0">
                  {pendingUsers.length === 0 ? (
                    <p className="p-6 text-center text-gray-500 dark:text-gray-400">All caught up! No pending users.</p>
                  ) : (
                    pendingUsers.slice(0, 3).map(user => (
                      <div key={user.id} className="p-4 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">{user.name} <span className="text-xs font-normal text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded ml-2">{user.role}</span></p>
                          <p className="text-sm text-gray-500">{user.college || user.location}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleApproveUser(user.id)} className="p-2 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"><CheckCircle size={18}/></button>
                          <button onClick={() => handleRejectUser(user.id)} className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"><XCircle size={18}/></button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                  <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2"><Building size={18} className="text-indigo-500"/> Pending Properties</h2>
                  <button onClick={() => setActiveTab('properties')} className="text-sm text-blue-600 hover:underline">View All</button>
                </div>
                <div className="p-0">
                  {pendingProperties.length === 0 ? (
                    <p className="p-6 text-center text-gray-500 dark:text-gray-400">All properties approved.</p>
                  ) : (
                    pendingProperties.map(prop => (
                      <div key={prop.id} className="p-4 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">{prop.title}</p>
                          <p className="text-sm text-gray-500">Owner: {prop.owner} • {prop.location}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleApproveProperty(prop.id)} className="p-2 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"><CheckCircle size={18}/></button>
                          <button onClick={() => handleRejectProperty(prop.id)} className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"><XCircle size={18}/></button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      // 2. USER VERIFICATIONS
      case 'users':
        return (
          <div className="animate-slide-in-right space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Verifications</h2>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input type="text" placeholder="Search users..." className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-100 dark:border-gray-700">
                      <th className="p-4 font-medium">User Name</th>
                      <th className="p-4 font-medium">Role Type</th>
                      <th className="p-4 font-medium">Organization / Location</th>
                      <th className="p-4 font-medium">Verification Document</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {pendingUsers.length === 0 ? (
                      <tr><td colSpan="5" className="p-8 text-center text-gray-500 dark:text-gray-400">No users waiting for verification.</td></tr>
                    ) : (
                      pendingUsers.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">{user.name.charAt(0)}</div>
                              <div>
                                <p className="font-bold text-gray-900 dark:text-white text-sm">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.date}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-gray-700 dark:text-gray-300"><span className={`px-2 py-1 rounded text-xs font-medium ${user.role === 'Student' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20'}`}>{user.role}</span></td>
                          <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{user.college || user.location}</td>
                          <td className="p-4"><a href="#" className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 font-medium"><FileText size={14}/> {user.doc}</a></td>
                          <td className="p-4 flex justify-end gap-2">
                            <button onClick={() => handleApproveUser(user.id)} className="px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition-colors">Approve</button>
                            <button onClick={() => handleRejectUser(user.id)} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-red-600 dark:text-red-400 text-sm font-medium rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Reject</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      // 3. PROPERTY APPROVALS
      case 'properties':
        return (
          <div className="animate-slide-in-right space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Property Listings Moderation</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-100 dark:border-gray-700">
                      <th className="p-4 font-medium">Property Details</th>
                      <th className="p-4 font-medium">Landlord</th>
                      <th className="p-4 font-medium">Location & Price</th>
                      <th className="p-4 font-medium">Documents</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {pendingProperties.length === 0 ? (
                      <tr><td colSpan="5" className="p-8 text-center text-gray-500 dark:text-gray-400">No properties waiting for approval.</td></tr>
                    ) : (
                      pendingProperties.map(prop => (
                        <tr key={prop.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                          <td className="p-4">
                            <p className="font-bold text-gray-900 dark:text-white text-sm">{prop.title}</p>
                            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded mt-1 inline-block">{prop.type}</span>
                          </td>
                          <td className="p-4 text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2"><div className="w-6 h-6 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">{prop.owner.charAt(0)}</div> {prop.owner}</td>
                          <td className="p-4">
                            <p className="text-sm text-gray-900 dark:text-white font-medium">Rs. {prop.price}/mo</p>
                            <p className="text-xs text-gray-500">{prop.location}</p>
                          </td>
                          <td className="p-4"><a href="#" className="flex items-center gap-1 text-sm text-blue-600 hover:underline"><FileText size={14}/> {prop.docs}</a></td>
                          <td className="p-4 flex justify-end gap-2">
                            <button onClick={() => handleApproveProperty(prop.id)} className="p-2 bg-green-50 dark:bg-green-900/20 text-green-600 rounded hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors" title="Approve"><CheckCircle size={18}/></button>
                            <button onClick={() => handleRejectProperty(prop.id)} className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors" title="Reject"><XCircle size={18}/></button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><MoreVertical size={18}/></button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      // 4. REPORTS (Flagged Content)
      case 'reports':
        return (
          <div className="animate-slide-in-right space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">User Reports & Moderation</h2>
            <div className="grid grid-cols-1 gap-4">
              {reportedIssues.map(report => (
                <div key={report.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-l-4 border-l-red-500 border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded">{report.type}</span>
                      <span className="text-xs text-gray-500">Reported by: {report.reportedBy}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Target: {report.target}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Reason: "{report.reason}"</p>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors">Take Action</button>
                    <button className="flex-1 md:flex-none px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Dismiss</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      default: return null;
    }
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'users', label: 'User Verification', icon: Users, badge: pendingUsers.length },
    { id: 'properties', label: 'Property Approvals', icon: Building, badge: pendingProperties.length },
    { id: 'reports', label: 'Reports & Moderation', icon: AlertTriangle, badge: reportedIssues.length },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans animate-fade-in-up">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 dark:bg-gray-950 text-gray-300 flex flex-col z-20 shadow-xl border-r border-gray-800">
        <div onClick={() => navigate('/')} className="p-6 flex items-center gap-3 cursor-pointer hover:text-white transition-colors border-b border-gray-800">
          <ShieldCheck size={28} className="text-blue-500" />
          <span className="font-bold text-xl text-white tracking-tight">Admin Portal</span>
        </div>
        
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          <p className="px-3 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Management</p>
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${activeTab === item.id ? 'bg-blue-600 text-white font-medium shadow-md' : 'hover:bg-gray-800 hover:text-white'}`}>
                <div className="flex items-center gap-3"><Icon size={20} />{item.label}</div>
                {item.badge > 0 && (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${activeTab === item.id ? 'bg-white text-blue-600' : 'bg-gray-700 text-gray-300'}`}>{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* TOP HEADER */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center z-10 shadow-sm transition-colors">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight hidden sm:block">Control Center</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-transform hover:rotate-12">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>
            <div className="flex items-center gap-3 mr-2">
               <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">SA</div>
               <div className="hidden sm:block">
                 <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">Super Admin</p>
                 <p className="text-xs text-gray-500">System Owner</p>
               </div>
            </div>
            <button onClick={() => navigate('/login')} className="flex items-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg transition-colors font-medium">
              <LogOut size={18} /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>
        
        {/* DYNAMIC TAB CONTENT AREA */}
        <div className="flex-1 overflow-y-auto flex flex-col bg-gray-50 dark:bg-gray-900">
          <div className="p-4 md:p-8 flex-1">
            {renderContent()}
          </div>
          
          {/* CONSISTENT DASHBOARD FOOTER */}
          <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6 mt-auto transition-colors">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-blue-500" />
                <span className="font-bold text-gray-900 dark:text-gray-200">Bidhyarthi Ghar Admin System</span> © 2026
              </div>
              <div className="flex gap-6 font-medium">
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Server Status</a>
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Audit Logs</a>
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Support Portal</a>
              </div>
            </div>
          </footer>
        </div>

      </main>
    </div>
  );
}