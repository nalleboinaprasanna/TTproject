import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const successMessage = location.state?.message || '';

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const res = await axios.post('https://karyasanchay.onrender.com/api/v1/auth/login', { email, password });
      login(res.data);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-orange-500 to-red-600 opacity-90 rounded-b-[100px] shadow-lg shadow-orange-500/20"></div>
      
      <div className="z-10 bg-white p-10 rounded-2xl shadow-xl shadow-slate-200/50 w-full max-w-md animate-fade-in border border-slate-100">
        <div className="flex justify-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full shadow-inner">
            <ShieldCheck className="h-12 w-12 text-orange-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-2 tracking-tight">Karyasanchay ITAM</h2>
        <p className="text-center text-slate-500 mb-6 text-sm">Sign in safely to manage enterprise assets.</p>
        
        {successMessage && <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm mb-4 text-center border border-green-100 font-medium">{successMessage}</div>}
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 text-center border border-red-100 font-medium">{error}</div>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Work Email</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-slate-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@itam.in"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-slate-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-slate-900/20 transition-all cursor-pointer flex justify-center items-center mt-2 disabled:opacity-70">
            {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Secure Login"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-slate-500">
          Don't have an account? <Link to="/signup" className="text-orange-600 font-semibold hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
