import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';
import { useQuizTimer } from '../hooks/useQuizTimer';
import { useNavigate } from 'react-router-dom';
import { Timer, LayoutGrid, CheckCircle2 } from 'lucide-react';

const QuizPage = () => {
  const { quizData, setQuizData } = useQuiz();
  const navigate = useNavigate();

  const handleFinish = () => {
    setQuizData(prev => ({ ...prev, isFinished: true }));
    navigate('/result');
  };

  // Panggil Timer Hook
  useQuizTimer(quizData, setQuizData, handleFinish);

  const handleAnswer = (selectedOption) => {
    const currentQ = quizData.questions[quizData.currentIndex];
    const isCorrect = selectedOption === currentQ.correctAnswer;

    const newAnswers = [...quizData.answers, { isCorrect }];
    const nextIndex = quizData.currentIndex + 1;

    if (nextIndex >= quizData.questions.length) {
      setQuizData(prev => ({ ...prev, answers: newAnswers, isFinished: true }));
      navigate('/result');
    } else {
      setQuizData(prev => ({ ...prev, currentIndex: nextIndex, answers: newAnswers }));
    }
  };

  const currentQuestion = quizData.questions[quizData.currentIndex];

  return (
    <div className="min-h-screen bg-secondary p-4 md:p-8 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
      <div className="col-span-4 md:col-start-2 md:col-span-6 lg:col-start-4 lg:col-span-6">
        
        {/* Header Info */}
        <div className="flex justify-between items-center mb-8 bg-thirty/30 p-4 rounded-2xl border border-primary/20">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Timer size={20} />
            <span className="font-lexend text-xl">
              {Math.floor(quizData.timeLeft / 60)}:{(quizData.timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
          <div className="flex items-center gap-2 text-ternary/80">
            <LayoutGrid size={18} />
            <span className="text-sm font-semibold">Soal {quizData.currentIndex + 1} / {quizData.questions.length}</span>
          </div>
        </div>

        {/* Question Card dengan Animasi */}
        <AnimatePresence mode="wait">
          <motion.div
            key={quizData.currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-thirty p-6 md:p-10 rounded-3xl shadow-2xl border border-primary"
          >
            <h2 
              className="text-2xl md:text-3xl font-lexend font-bold mb-8 leading-tight"
              dangerouslySetInnerHTML={{ __html: currentQuestion?.question }}
            />

            <div className="grid gap-4">
              {currentQuestion?.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left p-5 rounded-xl bg-secondary border border-primary/30 hover:bg-primary hover:text-white transition-all duration-200 flex justify-between items-center group shadow-md"
                >
                  <span className="font-medium" dangerouslySetInnerHTML={{ __html: option }} />
                  <CheckCircle2 className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizPage;