import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus, Filter, MapPin, Mail, Briefcase, UserCircle, Loader2 } from 'lucide-react';

const Employees = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://karyasanchay.onrender.com/api/v1/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(u => 
    u.fullName?.toLowerCase().includes(search.toLowerCase()) || 
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.role?.toLowerCase().includes(search.toLowerCase()) ||
    u.locationName?.toLowerCase().includes(search.toLowerCase())
  );

  // Group by location dynamically
  const groupedUsers = filteredUsers.reduce((acc, user) => {
    const loc = user.locationName || 'Headquarters';
    if (!acc[loc]) acc[loc] = [];
    acc[loc].push(user);
    return acc;
  }, {});

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Employee Directory</h1>
          <p className="text-sm text-slate-500 mt-1">Manage personnel and branch assignments across all locations.</p>
        </div>
        <button onClick={() => alert("Onboard Employee feature coming up next!")} className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-slate-900/20 transition-all flex items-center cursor-pointer">
          <Plus className="h-4 w-4 mr-2" /> Onboard Employee
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
        <div className="p-5 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-96">
            <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
            <input 
              type="text" 
              placeholder="Search by name, email, role, or branch..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-sm font-medium placeholder:font-normal"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="flex items-center text-sm font-semibold text-slate-700 bg-white border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors shadow-sm cursor-pointer">
            <Filter className="h-4 w-4 mr-2 text-slate-400" /> Filter Roles
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-32 text-slate-400">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : Object.keys(groupedUsers).length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 py-20 flex flex-col items-center justify-center">
          <UserCircle className="h-16 w-16 text-slate-200 mb-4" />
          <p className="font-semibold text-slate-600 text-lg">No employees found</p>
          <p className="text-sm text-slate-500 mt-1">Adjust your search query or onboard a new employee.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {Object.entries(groupedUsers).map(([location, locationUsers]) => (
            <div key={location} className="animate-fade-in bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500"></div>
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 mt-2">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <MapPin className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">{location} Branch</h2>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">Regional Office</p>
                  </div>
                </div>
                <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-full border border-slate-200">
                  {locationUsers.length} Employee{locationUsers.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {locationUsers.map(user => (
                  <div key={user.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 hover:shadow-md hover:border-orange-300 transition-all group flex flex-col h-full cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-300 group-hover:bg-orange-500 transition-colors"></div>
                    
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center space-x-4 pl-2">
                        <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center text-slate-700 font-extrabold text-xl border-2 border-slate-200 shadow-sm group-hover:border-orange-200 transition-colors">
                          {user.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors text-lg">{user.fullName}</h3>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-500 mt-1 shadow-sm">
                            {user.role.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mt-2 flex-grow pl-2">
                      <div className="flex items-center text-sm font-medium text-slate-600">
                        <Mail className="h-4 w-4 mr-3 text-slate-400 group-hover:text-orange-400 transition-colors" />
                        <span className="truncate" title={user.email}>{user.email}</span>
                      </div>
                      <div className="flex items-center text-sm font-medium text-slate-600">
                        <Briefcase className="h-4 w-4 mr-3 text-slate-400 group-hover:text-orange-400 transition-colors" />
                        <span>Emp ID: #{String(user.id).padStart(4, '0')}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-slate-200/60 flex justify-between items-center pl-2">
                      <span className="text-xs font-semibold text-slate-400 group-hover:text-orange-500 transition-colors flex items-center">
                        View Assigned Assets <span className="ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all">→</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Employees;
