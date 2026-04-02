import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Monitor, Server, AlertTriangle, Users, ExternalLink, X, Navigation } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass, borderClass }) => (
  <div className={`bg-white rounded-xl p-6 shadow-sm border-b-4 ${borderClass} flex items-center justify-between hover:-translate-y-1 transition-transform cursor-pointer`}>
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
    </div>
    <div className={`p-3 rounded-full ${colorClass}`}>
      <Icon className="h-6 w-6" />
    </div>
  </div>
);

const Dashboard = () => {
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  const fetchAssets = () => {
    axios.get('https://karyasanchay.onrender.com/api/v1/assets')
      .then(res => { setAssets(res.data); setLoading(false); })
      .catch(err => { setLoading(false); });
  };

  const fetchUsers = () => {
    axios.get('https://karyasanchay.onrender.com/api/v1/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchAssets();
    fetchUsers();
  }, []);

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    if(!selectedAssetId || !selectedUserId) return;
    
    axios.post(`https://karyasanchay.onrender.com/api/v1/assets/${selectedAssetId}/assign/initiate/${selectedUserId}`)
      .then(res => {
        setActionMessage(res.data.message);
        fetchAssets(); 
        setTimeout(() => {
          setIsModalOpen(false);
          setActionMessage('');
          setSelectedAssetId('');
          setSelectedUserId('');
        }, 3000);
      })
      .catch(err => alert("Failed to assign asset."));
  };

  const handleReturnAsset = (assetId) => {
    if(window.confirm("Are you sure you want to process the return for this asset?")) {
      axios.post(`https://karyasanchay.onrender.com/api/v1/assets/${assetId}/return`)
        .then(() => fetchAssets())
        .catch(() => alert("Return failed"));
    }
  };

  const total = assets.length;
  const inUse = assets.filter(a => a.status === 'IN_USE' || a.status === 'PENDING_HANDOVER').length;
  const available = assets.filter(a => a.status === 'AVAILABLE').length;
  const availableAssetsList = assets.filter(a => a.status === 'AVAILABLE');

  return (
    <div className="animate-fade-in relative min-h-full pb-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">System Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Live functional End-to-End backend syncing.</p>
        </div>
        <button 
          onClick={() => { fetchUsers(); setIsModalOpen(true); }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm flex items-center shadow-lg shadow-orange-500/30 transition-all cursor-pointer">
          <Monitor className="h-4 w-4 mr-2" />
          Assign New Asset
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex justify-center items-center backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-lg font-bold text-slate-800">Assign Asset Securely</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="h-5 w-5" /></button>
            </div>
            
            {actionMessage ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg font-medium text-sm border border-green-200">
                ✅ {actionMessage}
              </div>
            ) : (
              <form onSubmit={handleAssignSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Select Available Asset</label>
                  <select required value={selectedAssetId} onChange={e => setSelectedAssetId(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500">
                    <option value="">-- Select Asset --</option>
                    {availableAssetsList.map(a => <option key={a.id} value={a.id}>{a.assetTag} - {a.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Assign to Employee</label>
                  <select required value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500">
                    <option value="">-- Select Employee --</option>
                    {users.map(u => <option key={u.id} value={u.id}>{u.fullName} - {u.locationName}</option>)}
                  </select>
                </div>
                <button type="submit" className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg px-4 py-2 mt-2 transition-colors cursor-pointer flex justify-center items-center">
                  <Navigation className="h-4 w-4 mr-2" /> Initiate Handover (Send OTP)
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Assets" value={total} icon={Server} colorClass="bg-blue-100 text-blue-600" borderClass="border-blue-500" />
        <StatCard title="Assigned to Users" value={inUse} icon={Users} colorClass="bg-green-100 text-green-600" borderClass="border-green-500" />
        <StatCard title="Available in Stock" value={available} icon={AlertTriangle} colorClass="bg-orange-100 text-orange-600" borderClass="border-orange-500" />
        <StatCard title="Active Gate Passes" value="0" icon={ExternalLink} colorClass="bg-purple-100 text-purple-600" borderClass="border-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Live Database Inventory</h2>
          <div className="overflow-x-auto" style={{minHeight: "250px"}}>
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Asset Tag</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {assets.map(asset => (
                <tr key={asset.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800">{asset.assetTag}</td>
                  <td className="px-4 py-3">{asset.assignedUserName || <span className="text-slate-400 italic">-</span>}</td>
                  <td className="px-4 py-3">{asset.locationName}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${asset.status === 'IN_USE' ? 'bg-green-100 text-green-700 border-green-200' : asset.status === 'PENDING_HANDOVER' ? 'bg-orange-100 text-orange-700 border-orange-200' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                      {asset.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {(asset.status === 'IN_USE' || asset.status === 'PENDING_HANDOVER') && (
                      <button onClick={() => handleReturnAsset(asset.id)} className="text-xs bg-slate-800 text-white px-2 py-1.5 rounded hover:bg-slate-700 cursor-pointer transition-colors font-medium shadow w-24">Process Return</button>
                    )}
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Expiring AMCs</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border border-red-100 bg-red-50 rounded-lg">
              <div>
                <p className="text-sm font-semibold text-red-800">Lamington Tech Solutions</p>
                <p className="text-xs text-red-600 mt-0.5">Server Racks AMC</p>
              </div>
              <span className="text-xs font-bold text-red-700 bg-red-200 px-2 py-1 rounded">3 Days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
