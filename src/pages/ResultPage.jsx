import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useQuizStore from '../store/useQuizStore';
import { Trophy, CheckCircle2, XCircle, RotateCcw, Home, Target, Award, ChevronRight } from 'lucide-react';

const ResultPage = () => {
  const { quizState, resetQuiz } = useQuizStore();
  const navigate = useNavigate();

  if (!quizState || !quizState.isFinished) {
    return <Navigate to="/" />;
  }

  const correctAnswers = quizState.answers.filter(a => a.isCorrect).length;
  const totalQuestions = quizState.questions.length;
  const score = Math.round((correctAnswers / totalQuestions) * 100);

//  Menentukan performa berdasarkan skor
  const getPerformanceData = () => {
    if (score === 100) {
      return { 
        label: "WAWW! PERFECT!", 
        sub: "Great! Kerja bagus! Kamu benar-benar Kritikus Film Sejati!", 
        color: "bg-primary", // Warna Merah Utama
        lightColor: "bg-primary/10",
        textColor: "text-primary"
      };
    } 
    if (score >= 60) {
      return { 
        label: "Cukup Baik!", 
        sub: "Pengetahuan film kamu oke juga! Semangat tonton lebih banyak film lagi ya!", 
        color: "bg-orange-500", // Merah yang sedikit lebih muda
        lightColor: "bg-orange-50",
        textColor: "text-orange-500"
      };
    } 
    return { 
      label: "Wah, sayang sekali :(", 
      sub: "Kamu sudah berusaha hebat! Ayo tonton lebih banyak film lagi dan coba lagi nanti!", 
      color: "bg-slate-700", // Warna netral gelap agar tetap elegan
      lightColor: "bg-slate-100",
      textColor: "text-slate-600"
    };
  };

  const performance = getPerformanceData();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 font-lexend">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-surface rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden"
      >
        {/* Header */}
        <div className={`${performance.color} p-10 text-center relative text-white`}>
          <Award className="absolute -right-10 -top-10 text-white/10 w-48 h-48 rotate-12" />
          
          <div className="relative z-10 inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-full mb-4 border border-white/30">
            <Trophy size={40} />
          </div>
          
          <h1 className="text-4xl font-black mb-2">{performance.label}</h1>
          <p className="opacity-90 font-medium">{performance.sub}</p>
        </div>

        <div className="p-8 md:p-12">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className={`${performance.lightColor} p-6 rounded-3xl border border-transparent flex flex-col items-center`}>
              <Target className={performance.textColor} size={20} />
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">Skor</p>
              <p className={`text-4xl font-black ${performance.textColor}`}>{score}</p>
            </div>

            <div className="bg-green-50 p-6 rounded-3xl border border-transparent flex flex-col items-center">
              <CheckCircle2 className="text-green-600" size={20} />
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">Benar</p>
              <p className="text-4xl font-black text-green-600">{correctAnswers}</p>
            </div>

            <div className="bg-red-50 p-6 rounded-3xl border border-transparent flex flex-col items-center">
              <XCircle className="text-red-700" size={20} />
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">Salah</p>
              <p className="text-4xl font-black text-red-700">{totalQuestions - correctAnswers}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => { resetQuiz(); navigate('/'); }}
              className={`flex-1 flex items-center justify-center gap-3 ${performance.color} text-white p-5 rounded-2xl font-bold shadow-lg hover:opacity-90 transition-all`}
            >
              <RotateCcw size={20} /> Coba Lagi
            </button>
            
            <button
              onClick={() => { resetQuiz(); navigate('/'); }}
              className="flex-1 flex items-center justify-center gap-3 bg-white border-2 border-slate-200 text-slate-700 p-5 rounded-2xl font-bold hover:bg-slate-50 transition-all"
            >
              <Home size={20} /> Menu Utama
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultPage;