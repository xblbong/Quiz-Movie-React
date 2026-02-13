import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useQuizStore from '../store/useQuizStore';
import {
  Play,
  LogOut,
  Loader2,
  Trophy,
  Clapperboard,
  History,
  User as UserIcon,
  ChevronRight,
  Award,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { fetchMovieQuestions } from '../api/quizService';
import { motion } from 'framer-motion';
import Footer from '../components/layouts/Footer';

const Home = () => {
  const { user, quizState, startQuiz, logout } = useQuizStore(); // ambil user dan quizState dari store
  const navigate = useNavigate(); // set navigate untuk navigasi halaman

  //  fungsi untuk mengambil soal kuis dengan React Query
  const { refetch, isFetching } = useQuery({
    queryKey: ['questions'],
    queryFn: fetchMovieQuestions,
    enabled: false,
  });

  // fungsi untuk memformat waktu terakhir bermain
  const formatLastPlayed = (timestamp) => {
    if (!timestamp) return "";
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  };

  // fungsi untuk memulai kuis baru
  const handleStart = async () => {
    try {
      const { data } = await refetch();
      if (data) {
        startQuiz(data);
        navigate('/quiz');
      }
    } catch (error) {
      alert("Sistem gagal mengambil data soal.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">

      {/* Container Utama */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-surface shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-3xl overflow-hidden flex flex-col md:flex-row border border-gray-200"
      >

        {/* Sisi Kiri: Profil & Statistik Singkat*/}
        <div className="w-full md:w-80 bg-primary p-8 text-white flex flex-col justify-between">
          <div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <UserIcon size={32} />
            </div>
            <p className="text-white/70 text-sm font-medium uppercase tracking-widest">Pemain</p>
            <h2 className="text-2xl font-bold mb-8 capitalize">
              {user?.name} 👋
            </h2>

            <div className="space-y-6">
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">Quiz Rules</p>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/10 rounded-lg">
                  <ShieldCheck size={18} className="text-white" />
                </div>
                <p className="text-xs text-white/80 leading-relaxed font-medium">
                  Select the correct answer for each movie trivia question.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Clock size={18} className="text-white" />
                </div>
                <p className="text-xs text-white/80 leading-relaxed font-medium">
                  The quiz will automatically end when the time runs out.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Award size={18} className="text-white" />
                </div>
                <p className="text-xs text-white/80 leading-relaxed font-medium">
                  Review your score and movie knowledge at the end.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="mt-12 flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-bold uppercase tracking-tighter"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Sisi Kanan: Menu Utama */}
        <div className="flex-1 p-8 md:p-12 bg-white">
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-text-main mb-2">
              <span className="text-primary">Cinema</span>Quiz
            </h1>
            <p className="text-text-muted">Hone your skills in the world of international and local cinema.</p>
          </div>

          <div className="grid gap-4">
            {/* Tombol Start/Lanjutkan */}
            {quizState && !quizState.isFinished ? (
              <button
                onClick={() => navigate('/quiz')}
                className="group flex items-center justify-between p-6 bg-white border-2 border-primary rounded-[2rem] transition-all hover:bg-primary/5 shadow-lg shadow-primary/5"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:rotate-12 transition-transform">
                    <History size={28} />
                  </div>
                  <div className="text-left">
                    <p className="font-black text-xl text-primary">Continue Quiz</p>
                    <div className="space-y-0.5">
                      {/*Menampilkan jumlah soal yang dikerjakan (Poin D) */}
                      <p className="text-xs text-text-main font-bold">
                        Progress: {quizState.answers.length} / {quizState.questions.length} Questions
                      </p>
                      <p className="text-[10px] text-text-muted capitalize tracking-wider font-medium">
                        Last played: {formatLastPlayed(quizState.lastActive)}
                      </p>
                    </div>
                  </div>
                </div>
                <ChevronRight className="text-primary opacity-40 group-hover:opacity-100" />
              </button>
            ) : (
              <button
                onClick={handleStart}
                disabled={isFetching}
                className="group flex items-center justify-between p-6 bg-primary rounded-2xl transition-all hover:shadow-xl hover:shadow-primary/20 disabled:opacity-70"
              >
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all">
                    {isFetching ? <Loader2 className="animate-spin" /> : <Play size={24} fill="currentColor" />}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-lg">Start a New Game</p>
                    <p className="text-xs text-white/60">Total 10 Random Questions</p>
                  </div>
                </div>
                <ChevronRight className="text-white/40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
            )}

            {/* Menu Tambahan (Disabled/Placeholder) */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center opacity-60">
                <Trophy size={20} className="mb-2 text-text-muted" />
                <p className="text-xs font-bold uppercase">Test your knowledge</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center opacity-60">
                <Clapperboard size={20} className="mb-2 text-text-muted" />
                <p className="text-xs font-bold uppercase">Category</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Home;