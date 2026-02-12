import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { Film, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [name, setName] = useState('');
  const { setUser } = useQuiz();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (name) {
      setUser({ name });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-thirty p-8 rounded-[2rem] border-2 border-primary shadow-[0_20px_50px_rgba(140,16,7,0.3)]"
      >
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-primary rounded-2xl mb-4 shadow-lg">
            <Film size={48} className="text-ternary" />
          </div>
          <h1 className="text-4xl font-lexend font-bold text-ternary mb-2">CineQuiz</h1>
          <p className="text-ternary/60">Uji pengetahuan filmmu sekarang!</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            type="text"
            placeholder="Masukkan nama kamu..."
            className="w-full p-4 rounded-xl bg-secondary border border-primary/40 text-ternary focus:ring-2 focus:ring-primary outline-none transition-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button 
            type="submit"
            className="w-full bg-primary py-4 rounded-xl font-lexend font-bold text-ternary flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-lg"
          >
            <PlayCircle size={20} /> MASUK KE KUIS
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;