import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus, Filter, Monitor, Laptop, Server, Smartphone, Loader2 } from 'lucide-react';

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchAssets = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/assets');
      setAssets(response.data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const getStatusBadge = (status) => {
    const styles = {
      AVAILABLE: 'bg-slate-100 text-slate-700 border-slate-200',
      IN_USE: 'bg-green-50 text-green-700 border-green-200',
      PENDING_HANDOVER: 'bg-orange-50 text-orange-700 border-orange-200',
      RETIRED: 'bg-red-50 text-red-700 border-red-200',
      MAINTENANCE: 'bg-blue-50 text-blue-700 border-blue-200'
    };
    const style = styles[status] || styles.AVAILABLE;
    return <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-lg border ${style}`}>{status.replace('_', ' ')}</span>;
  };

  const getCategoryIcon = (categoryName) => {
    if (!categoryName) return <Monitor className="h-5 w-5 text-slate-400" />;
    const name = categoryName.toLowerCase();
    if (name.includes('laptop')) return <Laptop className="h-5 w-5 text-indigo-500" />;
    if (name.includes('server')) return <Server className="h-5 w-5 text-emerald-500" />;
    if (name.includes('mobile')) return <Smartphone className="h-5 w-5 text-orange-500" />;
    return <Monitor className="h-5 w-5 text-slate-400" />;
  };

  const filteredAssets = assets.filter(a => 
    a.assetTag?.toLowerCase().includes(search.toLowerCase()) || 
    a.brand?.toLowerCase().includes(search.toLowerCase()) ||
    a.model?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Enterprise Asset Directory</h1>
          <p className="text-sm text-slate-500 mt-1">Manage, search, and track all IT hardware across your organization.</p>
        </div>
        <button onClick={() => alert("Add Asset feature coming up next!")} className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-slate-900/20 transition-all flex items-center cursor-pointer">
          <Plus className="h-4 w-4 mr-2" /> Add New Asset
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-96">
            <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
            <input 
              type="text" 
              placeholder="Search by tag, brand, or model..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-sm font-medium placeholder:font-normal"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="flex items-center text-sm font-semibold text-slate-700 bg-white border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors shadow-sm cursor-pointer">
            <Filter className="h-4 w-4 mr-2 text-slate-400" /> Advanced Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-32 text-slate-400">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-xs uppercase tracking-widest text-slate-500">
                  <th className="p-5 font-bold">Asset Overview</th>
                  <th className="p-5 font-bold">Category</th>
                  <th className="p-5 font-bold">Serial / Identifier</th>
                  <th className="p-5 font-bold">Current WDV (₹)</th>
                  <th className="p-5 font-bold">Operational Status</th>
                  <th className="p-5 font-bold text-right rounded-tr-2xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAssets.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-12 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center">
                        <Monitor className="h-12 w-12 text-slate-200 mb-4" />
                        <p className="font-semibold text-slate-600">No assets found</p>
                        <p className="text-sm mt-1">Adjust your search query or add a new asset.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAssets.map(asset => (
                    <tr key={asset.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="p-5">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                            {getCategoryIcon(asset.category?.name)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{asset.assetTag}</p>
                            <p className="text-xs font-medium text-slate-500 mt-0.5">{asset.brand} {asset.model}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 text-sm font-semibold text-slate-700">{asset.category?.name || 'Uncategorized'}</td>
                      <td className="p-5"><span className="px-2.5 py-1 bg-slate-100 text-slate-600 font-mono text-xs font-semibold rounded-md border border-slate-200">{asset.serialNumber || 'N/A'}</span></td>
                      <td className="p-5 text-sm font-bold text-slate-800">₹{asset.currentWdvValue ? asset.currentWdvValue.toLocaleString('en-IN') : asset.purchaseCost?.toLocaleString('en-IN')}</td>
                      <td className="p-5">{getStatusBadge(asset.status)}</td>
                      <td className="p-5 text-right">
                        <button className="text-sm font-bold text-blue-600 hover:text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer px-3 py-1.5 hover:bg-blue-50 rounded-lg">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assets;
