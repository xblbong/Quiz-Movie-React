import { useEffect } from 'react';

export const useQuizTimer = (quizData, setQuizData, onFinish) => {
  useEffect(() => {
    if (quizData.isFinished || quizData.questions.length === 0) return;

    if (quizData.timeLeft <= 0) {
      onFinish();
      return;
    }

    const timer = setInterval(() => {
      setQuizData(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
    }, 1000);

    return () => clearInterval(timer);
  }, [quizData.timeLeft, quizData.isFinished]);
};