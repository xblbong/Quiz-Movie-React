import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useQuizStore = create(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        set({ user: null, quizState: null });
        localStorage.removeItem('quiz-storage');
      },

      quizState: null,

      startQuiz: (questions) => set({
        quizState: {
          questions,
          currentIndex: 0,
          answers: [],
          timeLeft: 180,
          isFinished: false,
          isTimeUp: false, 
          lastActive: Date.now(),
        }
      }),

      setAnswer: (selectedOption) => {
        const state = get().quizState;
        if (!state || state.isFinished || state.isTimeUp) return;

        //Cek apakah soal ini sudah dijawab sebelumnya
        // const alreadyAnswered = state.answers[state.currentIndex] !== undefined;
        // if (alreadyAnswered) return;

        const currentQ = state.questions[state.currentIndex];
        const isCorrect = selectedOption === currentQ.correctAnswer;

        const newAnswers = [...state.answers];
        newAnswers[state.currentIndex] = {  // menyimpan jawaban pada indeks sesuai soal
          question: currentQ.question,
          selected: selectedOption,
          correct: currentQ.correctAnswer,
          isCorrect
        };

        const isLastQuestion = state.currentIndex === state.questions.length - 1;

        if (isLastQuestion) {
          set({ quizState: { ...state, answers: newAnswers } });
        } else {
          set({
            quizState: {
              ...state,
              answers: newAnswers,
              currentIndex: state.currentIndex + 1,
              lastActive: Date.now(),
            }
          });
        }
      },

      tick: () => {
        const state = get().quizState;
        if (!state || state.isFinished || state.isTimeUp) return;

        if (state.timeLeft <= 0) {
          set({ quizState: { ...state, isTimeUp: true } });
          return;
        }
        set({ quizState: { ...state, timeLeft: state.timeLeft - 1 } });
      },

      finishQuiz: () => {
        const state = get().quizState;
        if (state) {
          set({ quizState: { ...state, isFinished: true } });
        }
      },

      resetQuiz: () => set({ quizState: null }),

      goToQuestion: (index) => {
        const state = get().quizState;
        // cek index tidak keluar dari batas soal
        if (state && index >= 0 && index < state.questions.length) {
          set({ quizState: { ...state, currentIndex: index } });
        }
      },
    }),
    {
      name: 'quiz-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useQuizStore;