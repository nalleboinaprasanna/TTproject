import React, { useContext } from 'react';
import { Laptop, Phone, ShieldCheck, Mail, MapPin, Building, Package, ExternalLink, Plus, RefreshCw } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyAssets = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fallback Mock assigned assets relative to the current logged in Context UI
  const assignedAssets = [
    { id: 1, type: 'Laptop', model: 'MacBook Pro M3 14"', serial: 'C02YW3G3LVDL', issuedOn: '2025-01-15', status: 'IN_USE' },
    { id: 2, type: 'Mobile', model: 'iPhone 15 Pro Enterprise', serial: 'DX3P9QY2KL', issuedOn: '2025-02-10', status: 'IN_USE' }
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto pb-10">
      
      {/* Header Profile Section */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-orange-400 to-rose-500"></div>
        <div className="relative pt-12 flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 w-full">
            <div className="h-32 w-32 rounded-3xl bg-white flex items-center justify-center text-slate-800 font-extrabold text-5xl border-4 border-white shadow-xl">
              {user?.fullName?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U'}
            </div>
            <div className="text-center md:text-left flex-1 mb-2">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{user?.fullName || 'Active User'}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3">
                <span className="inline-flex items-center text-sm font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
                  <ShieldCheck className="h-4 w-4 mr-1.5 text-orange-500" /> {user?.role?.replace('_', ' ') || 'EMPLOYEE'}
                </span>
                <span className="inline-flex items-center text-sm font-medium text-slate-500">
                  <MapPin className="h-4 w-4 mr-1.5 text-slate-400" /> {user?.location || 'Headquarters'}
                </span>
                <span className="inline-flex items-center text-sm font-medium text-slate-500">
                  <Mail className="h-4 w-4 mr-1.5 text-slate-400" /> {user?.email || 'user@karyasanchay.in'}
                </span>
              </div>
            </div>
            <button onClick={() => navigate('/request-asset')} className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-slate-900/20 transition-all flex items-center cursor-pointer flex-shrink-0 mt-4 md:mt-0 uppercase tracking-wider text-xs">
              <Plus className="h-4 w-4 mr-2" /> Request IT Hardware
            </button>
          </div>
        </div>
      </div>

      {/* Asset Cards Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-slate-800 flex items-center mb-6">
          <Package className="h-5 w-5 mr-2 text-orange-500" /> Currently Assigned to You
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assignedAssets.map(asset => (
            <div key={asset.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="bg-emerald-50 text-emerald-600 font-bold uppercase tracking-wider text-[10px] px-3 py-1 rounded-full border border-emerald-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span> {asset.status.replace('_', ' ')}
                </span>
              </div>
              
              <div className="flex items-start space-x-5 mb-6 opacity-90 group-hover:opacity-100 transition-opacity">
                <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-200 shadow-inner group-hover:border-orange-200 transition-colors">
                  {asset.type === 'Laptop' ? <Laptop className="h-8 w-8 text-slate-600 group-hover:text-orange-500 transition-colors" /> : <Phone className="h-8 w-8 text-slate-600 group-hover:text-orange-500 transition-colors" />}
                </div>
                <div className="pt-1">
                  <h3 className="text-lg font-bold text-slate-900">{asset.model}</h3>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mt-0.5">{asset.type} Hardware</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100 mb-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Asset Serial Tag</p>
                  <p className="text-sm font-mono font-semibold text-slate-800 mt-1">{asset.serial}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date Issued</p>
                  <p className="text-sm font-semibold text-slate-800 mt-1">{new Date(asset.issuedOn).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-t border-slate-100 pt-5">
                <button className="text-sm font-semibold text-slate-500 hover:text-slate-800 flex items-center cursor-pointer transition-colors bg-white hover:bg-slate-50 border border-transparent hover:border-slate-200 px-3 py-1.5 rounded-lg">
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" /> View Policy
                </button>
                <button onClick={() => alert("Initiating Gate Pass handover sequence...")} className="text-sm font-bold text-rose-500 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center shadow-sm">
                  <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Request Surrender
                </button>
              </div>
            </div>
          ))}

          {/* Empty Request Card slot */}
          <div onClick={() => navigate('/request-asset')} className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-100 hover:border-orange-400 transition-all min-h-[250px] group">
            <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 mb-4 group-hover:scale-110 transition-transform">
              <Plus className="h-6 w-6 text-slate-400 group-hover:text-orange-500" />
            </div>
            <h3 className="font-bold text-slate-700">Need more equipment?</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-[200px]">Submit an IT requisition ticket with your manager's approval.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAssets;
