import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateQuiz from './pages/CreateQuiz';
import QuizList from './pages/QuizList';
import TakeQuiz from './pages/TakeQuiz';
import QuizResults from './pages/QuizResults';
import Profile from './pages/Profile';
import EditQuiz from './pages/EditQuiz';
import Dashboard from './pages/Dashboard';
import ImportExport from './pages/ImportExport';
import StudentResult from './pages/StudentResult';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
        },
      },
    },
  },
});

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

function TeacherRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role !== 'teacher') {
    return <Navigate to="/" />;
  }
  return children;
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Fix any existing short answer quizzes in localStorage
    try {
      const allQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
      let needsUpdate = false;
      
      const fixedQuizzes = allQuizzes.map(quiz => {
        // For short answer quiz type
        if (quiz.category === 'short-answer') {
          let quizNeedsUpdate = false;
          const fixedQuestions = quiz.questions.map(question => {
            if (question.type === 'short-answer' && question.options && question.options.length > 0) {
              quizNeedsUpdate = true;
              return { ...question, options: [] };
            }
            return question;
          });
          
          if (quizNeedsUpdate) {
            needsUpdate = true;
            return { ...quiz, questions: fixedQuestions };
          }
        }
        return quiz;
      });
      
      if (needsUpdate) {
        localStorage.setItem('quizzes', JSON.stringify(fixedQuizzes));
        console.log('Fixed existing short answer quizzes in localStorage');
      }
    } catch (error) {
      console.error('Error fixing quizzes:', error);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ 
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/create-quiz"
              element={
                <TeacherRoute>
                  <CreateQuiz />
                </TeacherRoute>
              }
            />
            <Route
              path="/quiz-list"
              element={
                <ProtectedRoute>
                  <QuizList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/take-quiz/:id"
              element={
                <ProtectedRoute>
                  <TakeQuiz />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz-results/:id"
              element={
                <ProtectedRoute>
                  <QuizResults />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-quiz/:id"
              element={
                <TeacherRoute>
                  <EditQuiz />
                </TeacherRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <TeacherRoute>
                  <Dashboard />
                </TeacherRoute>
              }
            />
            <Route
              path="/import-export"
              element={
                <TeacherRoute>
                  <ImportExport />
                </TeacherRoute>
              }
            />
            <Route
              path="/student-result/:id"
              element={
                <TeacherRoute>
                  <StudentResult />
                </TeacherRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
