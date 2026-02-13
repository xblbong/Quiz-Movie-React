import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuizStore from '../store/useQuizStore';
import { Clapperboard, PlayCircle, User, Ticket, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../components/layouts/Footer';

const LoginPage = () => {
  const [name, setName] = useState('');
  const setUser = useQuizStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setUser({ name });
      navigate('/');
    }
  };

  return (
    <div className="select-none min-h-screen flex items-center justify-center bg-background p-6 relative overflow-hidden">
      
      {/* Dekorasi Latar Belakang - Soft & Elegant */}
      <div className="absolute top-[-5%] left-[-5%] w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-[-5%] right-[-5%] w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-0" />

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        {/* Card Utama */}
        <div className="bg-surface p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-100 relative overflow-hidden">
          
          {/* Ikon Dekoratif Melayang */}
          <div className="absolute -right-6 -top-6 text-slate-50 rotate-12">
            <Ticket size={120} />
          </div>

          <div className="text-center mb-10 relative z-10">
            <motion.div 
              whileHover={{ rotate: -10 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-3xl mb-6 shadow-xl shadow-primary/20"
            >
              <Clapperboard size={40} className="text-white" />
            </motion.div>
            
            <h1 className="text-3xl font-black text-text-main tracking-tight mb-3 capitalize">
              Cinema<span className="text-primary">Quiz</span>
            </h1>
            <p className="text-text-muted text-sm font-medium leading-relaxed px-4">
              Test your knowledge of international and local cinema.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-3">
              <label className="text-sm font-bold capitalize text-text-muted ml-1 mb-1 block">
                Player Name
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                  <User size={20} />
                </div>
                <input 
                  type="text"
                  placeholder="Example: Steven Spielberg"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-1 border-red-700 text-text-main font-semibold placeholder:text-slate-300 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full  bg-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:bg-primary-light transition-all"
            >
              <span className="tracking-wide text-lg">Lets, Start the Quiz!</span>
              <ArrowRight size={20} />
            </motion.button>
          </form>
        </div>
        {/* Footer Credit */}
        <Footer />
      </motion.div>

    </div>
  );
};

export default LoginPage;