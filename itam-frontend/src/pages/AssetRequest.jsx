import React, { useState } from 'react';
import { Package, Send, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AssetRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: 'Laptop',
    reason: '',
    urgency: 'Normal'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Asset request submitted successfully for " + formData.type);
    navigate('/my-assets');
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <button onClick={() => navigate('/my-assets')} className="flex items-center text-slate-500 hover:text-slate-800 mb-6 font-semibold transition-colors cursor-pointer">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to My Assets
      </button>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-rose-500"></div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center mb-6">
          <Package className="h-6 w-6 mr-3 text-orange-500" /> Request New Equipment
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Equipment Type</label>
            <select 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option>Laptop</option>
              <option>Mobile Phone</option>
              <option>Monitor</option>
              <option>Keyboard & Mouse</option>
              <option>Other Accessories</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Urgency</label>
            <div className="flex gap-4">
              {['Normal', 'High', 'Critical'].map(level => (
                <label key={level} className="flex-1 cursor-pointer relative">
                  <input type="radio" className="peer sr-only" name="urgency" value={level} checked={formData.urgency === level} onChange={() => setFormData({...formData, urgency: level})} />
                  <div className="w-full text-center py-3 rounded-xl border border-slate-200 bg-white font-semibold text-slate-600 peer-checked:bg-orange-50 peer-checked:border-orange-500 peer-checked:text-orange-700 transition-all">
                    {level}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Business Justification</label>
            <textarea 
              required
              rows="4" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Please explain why you need this equipment..."
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
            ></textarea>
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full cursor-pointer bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-4 font-bold flex justify-center items-center gap-2 shadow-lg shadow-slate-900/20 transition-all">
              <Send className="h-5 w-5" /> Submit Request for Approval
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetRequest;
