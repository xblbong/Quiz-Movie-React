import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import { Play, RotateCcw, LogOut } from 'lucide-react';

const Home = () => {
  const { user, quizState, setQuizState, logout } = useQuiz();
  const navigate = useNavigate();

  const startNewQuiz = async () => {
    // Ambil soal dari API
    const res = await fetch('https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple');
    const data = await res.json();
    
    const formattedQuestions = data.results.map(q => ({
      question: q.question,
      correct: q.correct_answer,
      options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
    }));

    setQuizState({
      questions: formattedQuestions,
      currentIndex: 0,
      answers: [],
      timeLeft: 300 // 5 menit
    });
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl mb-2">Selamat Datang,</h2>
      <h1 className="text-5xl font-bold text-primary mb-8 font-lexend">{user?.name}!</h1>

      <div className="space-y-4 w-full max-w-xs">
        {quizState ? (
          <button 
            onClick={() => navigate('/quiz')}
            className="w-full flex items-center justify-center gap-2 bg-primary p-4 rounded-2xl font-bold"
          >
            <Play size={20} /> LANJUTKAN KUIS
          </button>
        ) : (
          <button 
            onClick={startNewQuiz}
            className="w-full flex items-center justify-center gap-2 bg-primary p-4 rounded-2xl font-bold"
          >
            <Play size={20} /> MULAI KUIS BARU
          </button>
        )}
        
        <button 
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-thirty border border-primary/50 p-4 rounded-2xl font-bold"
        >
          <LogOut size={20} /> KELUAR
        </button>
      </div>
    </div>
  );
};

export default Home;