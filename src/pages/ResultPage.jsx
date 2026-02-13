import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useQuizStore from '../store/useQuizStore';
import { 
  Trophy, CheckCircle2, XCircle, RotateCcw, Home, Target, Award, ChevronRight, ListChecks 
} from 'lucide-react';

const ResultPage = () => {
  const { quizState, resetQuiz } = useQuizStore();
  const navigate = useNavigate();

  if (!quizState || !quizState.isFinished) {
    return <Navigate to="/" />;
  }

  const correctAnswers = quizState.answers.filter(a => a.isCorrect).length;
  const totalQuestions = quizState.questions.length;
  const score = Math.round((correctAnswers / totalQuestions) * 100);

  const getPerformanceData = () => {
    if (score === 100) {
      return { 
        label: "WOW! Perfect!", 
        sub: "Great! Good job! You are a true film critic!", 
        color: "bg-primary", 
        lightColor: "bg-primary/10",
        textColor: "text-primary"
      };
    } 
    if (score >= 60) {
      return { 
        label: "Pretty good!", 
        sub: "Your movie knowledge is pretty good! Keep up the spirit!", 
        color: "bg-orange-500", 
        lightColor: "bg-orange-50",
        textColor: "text-orange-500"
      };
    } 
    return { 
      label: "Oh, no :(", 
      sub: "You have done a great job! Try again later!", 
      color: "bg-slate-700", 
      lightColor: "bg-slate-100",
      textColor: "text-slate-600"
    };
  };

  const performance = getPerformanceData();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-12 px-6 font-lexend">
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
          {/* Stats Section (Poin D: Total & Dikerjakan) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className={`${performance.lightColor} p-6 rounded-3xl border border-transparent flex flex-col items-center`}>
              <Target className={performance.textColor} size={20} />
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">Final Score</p>
              <p className={`text-4xl font-black ${performance.textColor}`}>{score}</p>
            </div>

            <div className="bg-green-50 p-6 rounded-3xl border border-transparent flex flex-col items-center">
              <CheckCircle2 className="text-green-600" size={20} />
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">Correct</p>
              <p className="text-4xl font-black text-green-600">{correctAnswers}</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-transparent flex flex-col items-center text-center">
              <ListChecks className="text-slate-400" size={20} />
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">Progress</p>
              {/* Menampilkan 10 / 10 Soal sesuai Poin D */}
              <p className="text-2xl font-black text-slate-700">
                {quizState.answers.length} / {totalQuestions}
              </p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Questions</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={() => { resetQuiz(); navigate('/'); }}
              className={`flex-1 flex items-center justify-center gap-3 ${performance.color} text-white p-5 rounded-2xl font-bold shadow-lg hover:opacity-90 transition-all`}
            >
              <RotateCcw size={20} /> Retry
            </button>
            <button
              onClick={() => { resetQuiz(); navigate('/'); }}
              className="flex-1 flex items-center justify-center gap-3 bg-white border-2 border-slate-200 text-slate-700 p-5 rounded-2xl font-bold hover:bg-slate-50 transition-all"
            >
              <Home size={20} /> Menu
            </button>
          </div>

          {/* DETAIL REVIEW JAWABAN (Keterangan Soal) */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <ListChecks className="text-primary" size={20} />
              <h3 className="font-black text-xl text-text-main">Review Answers</h3>
            </div>
            
            <div className="space-y-4">
              {quizState.answers.map((ans, idx) => (
                <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs font-bold text-primary mb-2 uppercase tracking-widest">Question {idx + 1}</p>
                  <h4 className="font-bold text-text-main mb-4 leading-relaxed" 
                      dangerouslySetInnerHTML={{ __html: ans.question }} />
                  
                  <div className="grid gap-2">
                    <div className={`p-3 rounded-xl text-sm flex items-center gap-2 ${ans.isCorrect ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-rose-100 text-rose-700 border border-rose-200'}`}>
                      {ans.isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                      <span>Your Answer: <strong dangerouslySetInnerHTML={{ __html: ans.selected }} /></span>
                    </div>
                    
                    {!ans.isCorrect && (
                      <div className="p-3 bg-green-50 text-green-700 border border-green-200 rounded-xl text-sm flex items-center gap-2">
                        <CheckCircle2 size={16} />
                        <span>Correct Answer: <strong dangerouslySetInnerHTML={{ __html: ans.correct }} /></span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultPage;