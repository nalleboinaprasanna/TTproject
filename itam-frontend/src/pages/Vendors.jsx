import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus, Filter, Building2, Phone, Mail, FileText, FileSignature, AlertCircle, CheckCircle2, Factory } from 'lucide-react';

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchVendors = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/vendors');
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching real vendors API:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const getFallbackVendors = () => [
    {
      id: 1,
      name: 'Dell India Pvt Ltd',
      contactPerson: 'Sanjay Gupta',
      email: 'enterprise.support@dell.co.in',
      phone: '+91 98765 43210',
      gstNumber: '29ABCDE1234F1Z5',
      status: 'ACTIVE',
      amc: { contractNumber: 'DEL-AMC-2025-01', endDate: '2026-03-31', cost: 125000, isExpiringSoon: false }
    },
    {
      id: 2,
      name: 'Cisco Systems India',
      contactPerson: 'Arpita Sharma',
      email: 'asharma@cisco.com',
      phone: '+91 87654 32109',
      gstNumber: '27AABCU9603R1ZM',
      status: 'ACTIVE',
      amc: { contractNumber: 'CIS-NET-0045X', endDate: '2026-04-15', cost: 450000, isExpiringSoon: true } // Expiring in < 30 days
    },
    {
      id: 3,
      name: 'Lenovo Enterprise',
      contactPerson: 'Vikram Singh',
      email: 'corp-sales@lenovo.in',
      phone: '+91 76543 21098',
      gstNumber: '06AACCL3158A1Z3',
      status: 'INACTIVE',
      amc: null
    }
  ];

  const filteredVendors = vendors.filter(v => 
    v.name?.toLowerCase().includes(search.toLowerCase()) || 
    v.gstNumber?.toLowerCase().includes(search.toLowerCase()) ||
    v.contactPerson?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Vendors & AMC Tracking</h1>
          <p className="text-sm text-slate-500 mt-1">Manage OEM partnerships, monitor AMC renewals, and track GST compliance.</p>
        </div>
        <button onClick={() => alert("Vendor Registration Module Opening...")} className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-slate-900/20 transition-all flex items-center cursor-pointer">
          <Plus className="h-4 w-4 mr-2" /> Add New Vendor
        </button>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Active Partners</p>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-1">{vendors.filter(v => v.status === 'ACTIVE').length}</h3>
          </div>
          <div className="h-14 w-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500 border border-indigo-100"><Factory className="h-7 w-7" /></div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Active AMC Contracts</p>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-1">{vendors.filter(v => v.amc != null).length}</h3>
          </div>
          <div className="h-14 w-14 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 border border-emerald-100"><FileSignature className="h-7 w-7" /></div>
        </div>

        <div className="bg-orange-50 p-5 rounded-2xl border border-orange-200 shadow-sm shadow-orange-500/10 flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-orange-500"></div>
          <div>
            <p className="text-sm font-bold text-orange-600 uppercase tracking-widest">Expiring Soon</p>
            <div className="flex items-baseline space-x-2 mt-1">
              <h3 className="text-3xl font-extrabold text-slate-800">{vendors.filter(v => v.amc?.isExpiringSoon).length}</h3>
              <span className="text-sm font-semibold text-orange-600">contracts &lt; 30 days</span>
            </div>
          </div>
          <div className="h-14 w-14 bg-white rounded-xl flex items-center justify-center text-orange-500 border border-orange-200 shadow-sm"><AlertCircle className="h-7 w-7" /></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-96">
            <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
            <input 
              type="text" 
              placeholder="Search by vendor name, GST No, or contact..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-sm font-medium placeholder:font-normal"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="flex items-center text-sm font-semibold text-slate-700 bg-white border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors shadow-sm cursor-pointer">
            <Filter className="h-4 w-4 mr-2 text-slate-400" /> Filter Compliance
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs uppercase tracking-widest text-slate-500">
                <th className="p-5 font-bold">Vendor Details</th>
                <th className="p-5 font-bold">Primary Contact</th>
                <th className="p-5 font-bold">GSTIN (Compliance)</th>
                <th className="p-5 font-bold w-1/4">AMC Status</th>
                <th className="p-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVendors.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-slate-500">
                    <Building2 className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                    <p className="font-semibold text-slate-600">No vendors found matching your search.</p>
                  </td>
                </tr>
              ) : (
                filteredVendors.map(vendor => (
                  <tr key={vendor.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="p-5">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 border border-slate-200 shadow-inner">
                          <Building2 className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{vendor.name}</p>
                          <span className={`inline-flex px-2 py-0.5 mt-1 rounded text-[10px] uppercase font-bold tracking-wider border ${vendor.status === 'ACTIVE' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-300'}`}>
                            {vendor.status}
                          </span>
                        </div>
                      </div>
                    </td>
                    
                    <td className="p-5">
                      <p className="text-sm font-bold text-slate-700">{vendor.contactPerson}</p>
                      <div className="flex items-center text-xs text-slate-500 mt-1 font-medium space-x-3">
                        <span className="flex items-center"><Mail className="h-3 w-3 mr-1" /> {vendor.email}</span>
                      </div>
                    </td>
                    
                    <td className="p-5">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-emerald-500 mr-2" />
                        <span className="text-sm font-mono font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded border border-slate-200">{vendor.gstNumber}</span>
                      </div>
                    </td>
                    
                    <td className="p-5">
                      {vendor.amc ? (
                        <div className={`p-3 rounded-xl border ${vendor.amc.isExpiringSoon ? 'bg-orange-50 border-orange-200 shadow-sm shadow-orange-500/10' : 'bg-slate-50 border-slate-200'}`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{vendor.amc.contractNumber}</span>
                            {vendor.amc.isExpiringSoon ? (
                              <span className="flex items-center text-[10px] font-bold text-orange-600 uppercase bg-orange-100 px-2 py-0.5 rounded-full"><AlertCircle className="h-3 w-3 mr-1" /> Expiring</span>
                            ) : (
                              <span className="flex items-center text-[10px] font-bold text-emerald-600 uppercase bg-emerald-100 px-2 py-0.5 rounded-full"><CheckCircle2 className="h-3 w-3 mr-1" /> Valid</span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
                            <span>Valid till: <span className="text-slate-700 font-bold">{new Date(vendor.amc.endDate).toLocaleDateString()}</span></span>
                            <span>₹{vendor.amc.cost.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs font-semibold text-slate-400 italic">No Active Contract</span>
                      )}
                    </td>
                    
                    <td className="p-5 text-right">
                      <button className="text-sm font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer px-4 py-2 rounded-lg shadow-sm">
                        Manage
                      </button>
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
};

export default Vendors;
