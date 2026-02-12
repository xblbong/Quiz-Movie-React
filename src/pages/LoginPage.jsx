import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film } from 'lucide-react';

const LoginPage = () => {
  const [name, setName] = useState('');
  const { login } = useQuiz();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      login(name);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
      {/* Grid 4 kolom untuk mobile */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-thirty p-8 rounded-3xl shadow-2xl border border-primary"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-primary rounded-2xl mb-4">
            <Film size={40} className="text-ternary" />
          </div>
          <h1 className="text-3xl font-bold text-ternary tracking-tight">CineQuiz</h1>
          <p className="text-ternary/60 text-sm">Masukan nama untuk mulai kuis</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="w-full bg-secondary border border-primary/30 p-4 rounded-xl text-ternary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-primary hover:bg-red-700 text-ternary font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95"
          >
            MULAI SEKARANG
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;