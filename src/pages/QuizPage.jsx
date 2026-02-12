import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Navigate } from 'react-router-dom';
import useQuizStore from '../store/useQuizStore';
import { CheckCircle2, Clock, Timer, Award, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

const QuizPage = () => {
  const { quizState, setAnswer, tick, finishQuiz, goToQuestion } = useQuizStore();
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (!quizState || quizState.isFinished || quizState.isTimeUp) return;
    const timer = setInterval(() => tick(), 1000);
    return () => clearInterval(timer);
  }, [quizState?.isFinished, quizState?.isTimeUp, tick]);

  useEffect(() => {
    if (quizState?.isFinished) navigate('/result');
  }, [quizState?.isFinished, navigate]);

  if (!quizState) return <Navigate to="/" />;

  const currentQuestion = quizState.questions[quizState.currentIndex];
  const isLastQuestion = quizState.currentIndex === quizState.questions.length - 1;
  
  // Cek apakah soal sudah dijawab
  const hasAnsweredCurrent = quizState.answers[quizState.currentIndex] !== undefined;
  // Cek apakah semua soal sudah dijawab
  const hasAnsweredAll = quizState.answers.length === quizState.questions.length;

  const progress = ((quizState.currentIndex + 1) / quizState.questions.length) * 100;

  const handleAnswer = (option) => {
    // if (hasAnsweredCurrent) return; // Aturan: Tidak bisa ubah jawaban
    setAnswer(option);
    
    // Jika soal terakhir baru dijawab, munculkan modal
    if (isLastQuestion) {
      setShowConfirmModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4 md:p-8 font-lexend relative">
      
      {/* Modal Waktu Habis */}
      <AnimatePresence>
        {quizState.isTimeUp && !quizState.isFinished && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
              <Clock size={48} className="mx-auto mb-4 text-rose-500" />
              <h3 className="text-2xl font-bold mb-2">Waktu Habis!</h3>
              <p className="text-slate-600 mb-6">Waktu pengerjaan telah berakhir.</p>
              <button onClick={finishQuiz} className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg">Lihat Hasil</button>
            </motion.div>
          </motion.div>
        )}

        {/* Modal Konfirmasi Selesai */}
        {showConfirmModal && !quizState.isTimeUp && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
              <Award size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">Selesai!</h3>
              <p className="text-slate-600 mb-6">Semua soal telah dijawab. Yakin dengan jawabanmu?</p>
              <div className="flex flex-col gap-3">
                <button onClick={finishQuiz} className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/30">Ya, Selesaikan</button>
                <button onClick={() => setShowConfirmModal(false)} className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold">Cek Jawaban Lagi</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-2xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-text-main"><span className="text-primary">Cinema</span>Quiz</h1>
              <p className="text-sm text-text-muted mt-1 font-medium">Soal {quizState.currentIndex + 1} dari {quizState.questions.length}</p>
            </div>
            <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all ${quizState.timeLeft < 15 ? 'bg-rose-50 border-rose-200 text-primary animate-pulse' : 'bg-white border-slate-200 text-text-main'}`}>
              <Timer size={20} />
              <span className="font-bold text-2xl font-mono">
                {Math.floor(quizState.timeLeft / 60)}:{(quizState.timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-200 rounded-full mb-6 overflow-hidden">
            <motion.div animate={{ width: `${progress}%` }} className="h-full bg-primary" />
          </div>

          {/* Instructions */}
          <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-start gap-3">
              <ShieldCheck size={18} className="text-green-600 mt-0.5 shrink-0" />
              <p className="text-sm text-text-muted font-medium leading-relaxed">
                Jawaban yang sudah dipilih tidak bisa diubah.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={18} className="text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-text-muted font-medium leading-relaxed">
                Kuis akan otomatis selesai jika waktu habis.
              </p>
            </div>
          </div>
        </div>

        {/* Question Card Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={quizState.currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-10 mb-6"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-main mb-10 leading-snug"
                dangerouslySetInnerHTML={{ __html: currentQuestion?.question }} />

            <div className="grid gap-4">
              {currentQuestion?.options.map((option, index) => {
                const isSelected = quizState.answers[quizState.currentIndex]?.selected === option;
                return (
                  <button
                    key={index}
                    // disabled={hasAnsweredCurrent} // Disable jika sudah dijawab
                    onClick={() => handleAnswer(option)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex justify-between items-center group
                      ${isSelected ? 'border-primary bg-primary/5' : 'border-transparent bg-slate-50 hover:border-primary/30'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all
                        ${isSelected ? 'bg-primary text-white' : 'bg-white border text-slate-400 group-hover:text-primary'}`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className={`font-semibold text-base md:text-lg ${isSelected ? 'text-primary' : 'text-slate-700'}`}
                            dangerouslySetInnerHTML={{ __html: option }} />
                    </div>
                    {isSelected && <CheckCircle2 size={20} className="text-primary" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center w-full gap-4">
          <button
            onClick={() => goToQuestion(quizState.currentIndex - 1)}
            disabled={quizState.currentIndex === 0}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all
              ${quizState.currentIndex === 0 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white border-2 border-slate-200 text-text-main hover:bg-slate-50'}`}
          >
            <ChevronLeft size={20} /> Kembali
          </button>

          {hasAnsweredAll && isLastQuestion ? (
            <button
              onClick={() => setShowConfirmModal(true)}
              className="flex-[1.5] py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/30 hover:opacity-90 transition-all"
            >
              Selesaikan Kuis
            </button>
          ) : (
            <button
              onClick={() => goToQuestion(quizState.currentIndex + 1)}
              disabled={!hasAnsweredCurrent || isLastQuestion}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all
                ${(!hasAnsweredCurrent || isLastQuestion) ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-primary text-white shadow-lg shadow-primary/20'}`}
            >
              Selanjutnya <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;