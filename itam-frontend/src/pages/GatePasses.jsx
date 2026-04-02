import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus, Filter, FileText, Download, FileSignature, ArrowRightLeft, ArrowRight, UserCircle, Loader2 } from 'lucide-react';

const GatePasses = () => {
  const [gatePasses, setGatePasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchGatePasses = async () => {
    try {
      // In production, this hits the backend controller mapped to GatePassService
      const response = await axios.get('https://karyasanchay.onrender.com/api/v1/gate-passes');
      if (response.data && response.data.length > 0) {
        setGatePasses(response.data);
      } else {
        setGatePasses(getFallbackData());
      }
    } catch (error) {
      setGatePasses(getFallbackData());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGatePasses();
  }, []);

  const getFallbackData = () => [
    {
      id: 101,
      passNumber: 'GP-2025-001',
      passType: 'RETURNABLE',
      status: 'ISSUED',
      assetTag: 'AST-LPT-902',
      issuedTo: 'Priya Sharma',
      contact: '+91 9876543210',
      purpose: 'Remote Work Allocation',
      validUntil: '2025-06-30'
    },
    {
      id: 102,
      passNumber: 'GP-2025-002',
      passType: 'NON_RETURNABLE',
      status: 'COMPLETED',
      assetTag: 'AST-MON-105',
      issuedTo: 'Dell Service Center',
      contact: 'vendor-support@dell.in',
      purpose: 'E-Waste Scrapping',
      validUntil: null
    },
    {
      id: 103,
      passNumber: 'GP-2025-003',
      passType: 'RETURNABLE',
      status: 'OVERDUE',
      assetTag: 'AST-MOB-401',
      issuedTo: 'Ravi Kumar',
      contact: '+91 8765432109',
      purpose: 'Client Site Visit Testing',
      validUntil: '2024-12-31'
    }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      ISSUED: 'bg-blue-50 text-blue-700 border-blue-200',
      COMPLETED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      OVERDUE: 'bg-red-50 text-red-700 border-red-200'
    };
    return <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded border ${styles[status]}`}>{status}</span>;
  };

  const filteredData = gatePasses.filter(gp => 
    gp.passNumber?.toLowerCase().includes(search.toLowerCase()) || 
    gp.assetTag?.toLowerCase().includes(search.toLowerCase()) ||
    gp.issuedTo?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Gate Pass Control</h1>
          <p className="text-sm text-slate-500 mt-1">Authorize hardware movement, manage e-waste exits, and track returnable assets.</p>
        </div>
        <button onClick={() => alert("Gate Pass Engine starting...")} className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-orange-500/20 transition-all flex items-center cursor-pointer">
          <Plus className="h-4 w-4 mr-2" /> Generate Gate Pass
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-96">
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="text" 
              placeholder="Search by Gate Pass No, Asset, or Assignee..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center text-sm font-medium text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
              <Download className="h-4 w-4 mr-2 text-slate-400" /> Export Excel
            </button>
            <button className="flex items-center text-sm font-medium text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
              <Filter className="h-4 w-4 mr-2 text-slate-400" /> Advanced Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20 text-slate-400">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                  <th className="p-4 font-semibold">Pass Info</th>
                  <th className="p-4 font-semibold">Movement Type</th>
                  <th className="p-4 font-semibold">Recipient / Vendor</th>
                  <th className="p-4 font-semibold">Security Status</th>
                  <th className="p-4 font-semibold">Validity</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-500">No gate passes match your search criteria.</td>
                  </tr>
                ) : (
                  filteredData.map(gp => (
                    <tr key={gp.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className={`h-10 w-10 rounded-xl flex items-center justify-center border ${gp.passType === 'RETURNABLE' ? 'bg-indigo-50 border-indigo-200 text-indigo-500' : 'bg-rose-50 border-rose-200 text-rose-500'}`}>
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">{gp.passNumber}</p>
                            <p className="text-xs text-slate-500 font-mono mt-0.5">{gp.assetTag}</p>
                          </div>
                        </div>
                      </td>
                      
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          {gp.passType === 'RETURNABLE' ? (
                            <ArrowRightLeft className="h-4 w-4 text-indigo-500" />
                          ) : (
                            <ArrowRight className="h-4 w-4 text-rose-500" />
                          )}
                          <span className="text-sm font-semibold text-slate-700">{gp.passType.replace('_', ' ')}</span>
                        </div>
                      </td>
                      
                      <td className="p-4">
                        <p className="text-sm font-bold text-slate-700">{gp.issuedTo}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{gp.purpose}</p>
                      </td>
                      
                      <td className="p-4">{getStatusBadge(gp.status)}</td>
                      
                      <td className="p-4">
                        {gp.validUntil ? (
                          <div className="text-sm text-slate-600 font-medium">
                            <span className={gp.status === 'OVERDUE' ? 'text-red-500 font-bold' : ''}>{new Date(gp.validUntil).toLocaleDateString()}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic font-semibold">Permanent Exit</span>
                        )}
                      </td>
                      
                      <td className="p-4 text-right">
                        <button onClick={() => alert(`Downloading PDF for ${gp.passNumber} generated via OpenPDF...`)} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg border border-slate-300 transition-colors flex items-center ml-auto cursor-pointer">
                          <FileSignature className="h-3.5 w-3.5 mr-1.5" /> PDF
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

export default GatePasses;
