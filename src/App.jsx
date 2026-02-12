import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useQuizStore from './store/useQuizStore';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';

const queryClient = new QueryClient();

const PrivateRoute = ({ children }) => {
  const user = useQuizStore((state) => state.user);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/quiz" element={<PrivateRoute><QuizPage /></PrivateRoute>} />
          <Route path="/result" element={<PrivateRoute><ResultPage /></PrivateRoute>} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;