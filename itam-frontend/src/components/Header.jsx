import React, { useState, useContext } from 'react';
import { Bell, Search, UserCircle, LogOut, Settings } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  if (!user) return null;

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
  };

  return (
    <header className="h-16 bg-white shadow-sm flex justify-between items-center px-6 z-10 border-b border-slate-200 relative">
      <div className="flex items-center bg-slate-100 rounded-full px-4 py-2 w-96 border border-slate-200 focus-within:border-orange-500 transition-all">
        <Search className="h-4 w-4 text-slate-400 mr-2" />
        <input 
          type="text" 
          placeholder="Search by Asset Tag..." 
          className="bg-transparent border-none outline-none w-full text-sm text-slate-700"
        />
      </div>
      
      <div className="flex items-center space-x-6 relative">
        <button onClick={() => alert("No new notifications")} className="relative p-2 text-slate-400 hover:text-orange-500 transition-colors cursor-pointer">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div onClick={() => setProfileOpen(!profileOpen)} className="flex items-center cursor-pointer border-l border-slate-200 pl-6 hover:opacity-80 transition-opacity">
          <div className="text-right mr-3">
            <p className="text-sm font-semibold text-slate-700 leading-none">{user.fullName}</p>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wide">{user.role}</p>
          </div>
          <UserCircle className="h-9 w-9 text-slate-400" />
        </div>

        {profileOpen && (
          <div className="absolute top-14 right-0 w-48 bg-white border border-slate-200 shadow-lg rounded-xl overflow-hidden z-50 animate-fade-in">
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
              <p className="text-sm text-slate-800 font-semibold truncate">{user.email}</p>
            </div>
            <button onClick={() => {setProfileOpen(false); alert("Opening Settings...");}} className="w-full text-left px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 flex items-center cursor-pointer font-medium"><Settings className="h-4 w-4 mr-2"/> Preferences</button>
            <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-medium flex items-center cursor-pointer border-t border-slate-100 transition-colors"><LogOut className="h-4 w-4 mr-2"/> Secure Log Out</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
