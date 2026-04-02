import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MonitorSmartphone, Users, FileText, Settings, ShieldCheck, UserCircle } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Assets', path: '/assets', icon: MonitorSmartphone },
    { name: 'Employees', path: '/employees', icon: Users },
    { name: 'Gate Passes', path: '/gate-passes', icon: FileText },
    { name: 'AMC & Vendors', path: '/vendors', icon: ShieldCheck },
    { name: 'My Profile & Assets', path: '/my-assets', icon: UserCircle },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-20">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
        <MonitorSmartphone className="h-8 w-8 text-orange-500 mr-2" />
        <span className="text-xl font-bold tracking-wide">
          <span className="text-orange-500">Karya</span><span className="text-white">Sanchay</span>
        </span>
      </div>
      <div className="px-4 py-6 flex-1 h-0 overflow-y-auto">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                  ? 'bg-slate-800 text-orange-400 border-l-4 border-orange-500' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-orange-400' : 'text-slate-500'}`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
        ITAM India Edition v1.0
      </div>
    </div>
  );
};

export default Sidebar;
