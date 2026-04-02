import React, { useState } from 'react';
import { Save, Percent, Bell, Shield, Mail, Server, Laptop, Smartphone, Check, Loader2, IndianRupee } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('wdv');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [wdvRates, setWdvRates] = useState({
    computers: 40,
    servers: 40,
    mobiles: 15,
    furniture: 10,
    networking: 15
  });

  const [notifications, setNotifications] = useState({
    amcExpiry: true,
    gatePass: true,
    depreciationRun: true,
    weeklyReport: false,
    otpHandover: true
  });

  const handleSave = () => {
    setIsSaving(true);
    setSaved(false);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">System Configuration</h1>
          <p className="text-sm text-slate-500 mt-1">Manage IT Act compliance, automated engines, and notifications.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-slate-900/20 transition-all flex items-center cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : saved ? <Check className="h-4 w-4 mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          {isSaving ? 'Saving Policy...' : saved ? 'Policy Updated' : 'Save Changes'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-2">
          <button onClick={() => setActiveTab('wdv')} className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${activeTab === 'wdv' ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}>
            <Percent className={`h-4 w-4 mr-3 ${activeTab === 'wdv' ? 'text-white' : 'text-slate-400'}`} />
            WDV Depreciation (IT Act)
          </button>
          <button onClick={() => setActiveTab('notifications')} className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${activeTab === 'notifications' ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}>
            <Bell className={`h-4 w-4 mr-3 ${activeTab === 'notifications' ? 'text-white' : 'text-slate-400'}`} />
            Alerts & Notifications
          </button>
          <button onClick={() => setActiveTab('roles')} className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${activeTab === 'roles' ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}>
            <Shield className={`h-4 w-4 mr-3 ${activeTab === 'roles' ? 'text-white' : 'text-slate-400'}`} />
            Access Controls (RBAC)
          </button>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[500px]">
          
          {/* WDV TAB */}
          {activeTab === 'wdv' && (
            <div className="p-8 animate-fade-in space-y-8">
              <div>
                <h2 className="text-xl font-bold text-slate-800 flex items-center">
                  <IndianRupee className="h-5 w-5 mr-2 text-orange-500" />
                  Indian IT Act Depreciation Rates
                </h2>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed max-w-2xl">
                  Configure the Written Down Value (WDV) limits. The Spring Boot `@Scheduled` automated engine will apply these precise percentile deductions across all assigned assets on March 31st of every financial year.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-5 border border-slate-100 bg-slate-50/50 rounded-2xl flex items-center justify-between hover:border-orange-200 transition-colors">
                  <div className="flex items-center space-x-5">
                    <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                      <Laptop className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">Computers & Laptops</h3>
                      <p className="text-xs text-slate-500 font-medium">Block of Assets (Part A)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input 
                      type="range" min="10" max="100" step="5"
                      value={wdvRates.computers}
                      onChange={(e) => setWdvRates({...wdvRates, computers: parseInt(e.target.value)})}
                      className="w-40 appearance-none bg-slate-200 h-2 rounded-full cursor-pointer accent-orange-500"
                    />
                    <span className="w-16 text-right text-xl font-bold text-slate-800">{wdvRates.computers}%</span>
                  </div>
                </div>

                <div className="p-5 border border-slate-100 bg-slate-50/50 rounded-2xl flex items-center justify-between hover:border-orange-200 transition-colors">
                  <div className="flex items-center space-x-5">
                    <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                      <Server className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">Servers & Networking</h3>
                      <p className="text-xs text-slate-500 font-medium">Enterprise Data Center Equipment</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input 
                      type="range" min="10" max="100" step="5"
                      value={wdvRates.servers}
                      onChange={(e) => setWdvRates({...wdvRates, servers: parseInt(e.target.value)})}
                      className="w-40 appearance-none bg-slate-200 h-2 rounded-full cursor-pointer accent-orange-500"
                    />
                    <span className="w-16 text-right text-xl font-bold text-slate-800">{wdvRates.servers}%</span>
                  </div>
                </div>

                <div className="p-5 border border-slate-100 bg-slate-50/50 rounded-2xl flex items-center justify-between hover:border-orange-200 transition-colors">
                  <div className="flex items-center space-x-5">
                    <div className="h-12 w-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center shadow-sm">
                      <Smartphone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">Mobile Devices</h3>
                      <p className="text-xs text-slate-500 font-medium">General Plant & Machinery</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input 
                      type="range" min="10" max="100" step="5"
                      value={wdvRates.mobiles}
                      onChange={(e) => setWdvRates({...wdvRates, mobiles: parseInt(e.target.value)})}
                      className="w-40 appearance-none bg-slate-200 h-2 rounded-full cursor-pointer accent-orange-500"
                    />
                    <span className="w-16 text-right text-xl font-bold text-slate-800">{wdvRates.mobiles}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="p-8 animate-fade-in">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-800">Automated Enterprise Alerts</h2>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  Configure SMTP, Email, and SMS webhook triggers for background schedulers and operational Gate Passes.
                </p>
              </div>
              
              <div className="space-y-4">
                <div onClick={() => setNotifications({...notifications, amcExpiry: !notifications.amcExpiry})} className="flex items-center justify-between p-5 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-5">
                    <div className="p-3 bg-red-50 text-red-500 rounded-xl"><Mail className="h-6 w-6" /></div>
                    <div>
                      <h3 className="font-bold text-slate-800">Vendor AMC Expiry</h3>
                      <p className="text-xs text-slate-500 font-medium mt-1">Send priority email 30 days before contract expiry</p>
                    </div>
                  </div>
                  <button className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${notifications.amcExpiry ? 'bg-orange-500' : 'bg-slate-300'}`}>
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${notifications.amcExpiry ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                
                <div onClick={() => setNotifications({...notifications, otpHandover: !notifications.otpHandover})} className="flex items-center justify-between p-5 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-5">
                    <div className="p-3 bg-green-50 text-green-500 rounded-xl"><Smartphone className="h-6 w-6" /></div>
                    <div>
                      <h3 className="font-bold text-slate-800">Secure OTP Handover</h3>
                      <p className="text-xs text-slate-500 font-medium mt-1">Send automated SMS with OTP during asset assignment</p>
                    </div>
                  </div>
                  <button className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${notifications.otpHandover ? 'bg-orange-500' : 'bg-slate-300'}`}>
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${notifications.otpHandover ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ROLES TAB */}
          {activeTab === 'roles' && (
            <div className="p-8 animate-fade-in flex flex-col items-center justify-center p-16">
              <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 border-4 border-slate-50">
                <Shield className="h-10 w-10 text-orange-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Access Control & Security</h2>
              <p className="text-sm text-slate-500 mt-2 text-center max-w-sm mb-10">
                Permissions are secured symmetrically with your Java Spring Security JWT Authorization architecture.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl">
                <div className="p-5 border-2 border-orange-500 rounded-xl bg-orange-50 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-orange-500 text-white text-[9px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">Active</div>
                  <div className="font-bold text-slate-800 text-sm mt-3">SUPER ADMIN</div>
                  <div className="text-xs text-slate-500 mt-2 font-medium">Bypass security filters. Complete database read & write access.</div>
                </div>
                <div className="p-5 border border-slate-200 rounded-xl bg-white text-center hover:shadow-md transition-shadow">
                  <div className="font-bold text-slate-800 text-sm mt-3">IT MANAGER</div>
                  <div className="text-xs text-slate-500 mt-2 font-medium">Manage locations, hardware allocations, and gate passes.</div>
                </div>
                <div className="p-5 border border-slate-200 rounded-xl bg-white text-center hover:shadow-md transition-shadow">
                  <div className="font-bold text-slate-800 text-sm mt-3">EMPLOYEE</div>
                  <div className="text-xs text-slate-500 mt-2 font-medium">View assigned hardware profile and confirm OTP returns.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
