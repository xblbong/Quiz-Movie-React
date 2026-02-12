import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QuizProvider, useQuiz } from './context/QuizContext';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import QuizPage from './pages/QuizPage'; // Import dari jawaban saya sebelumnya
import ResultPage from './pages/ResultPage'; // Import dari jawaban saya sebelumnya

const PrivateRoute = ({ children }) => {
  const { user } = useQuiz();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <QuizProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/quiz" element={<PrivateRoute><QuizPage /></PrivateRoute>} />
          <Route path="/result" element={<PrivateRoute><ResultPage /></PrivateRoute>} />
        </Routes>
      </Router>
    </QuizProvider>
  );
}

export default App;