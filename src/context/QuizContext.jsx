import React, { createContext, useContext, useState, useEffect } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  // Ambil data user dari localstorage jika ada (Fitur Resume)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('quiz_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Ambil progress kuis dari localstorage (Fitur Resume)
  const [quizState, setQuizState] = useState(() => {
    const savedProgress = localStorage.getItem('quiz_progress');
    return savedProgress ? JSON.parse(savedProgress) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('quiz_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (quizState) {
      localStorage.setItem('quiz_progress', JSON.stringify(quizState));
    } else {
      localStorage.removeItem('quiz_progress');
    }
  }, [quizState]);

  const login = (name) => setUser({ name });
  const logout = () => {
    setUser(null);
    setQuizState(null);
    localStorage.clear();
  };

  return (
    <QuizContext.Provider value={{ user, login, logout, quizState, setQuizState }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);