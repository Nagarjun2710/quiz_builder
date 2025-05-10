import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function QuizResults() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizResult, setQuizResult] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(userData);

    // Get all results
    const results = JSON.parse(localStorage.getItem('quizResults')) || [];
    
    // Find the most recent result for this quiz for the current user
    const userResults = results
      .filter(result => result.quizId === parseInt(id) || result.quizId === id)
      .filter(result => result.userId === userData.id)
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
    
    if (userResults.length > 0) {
      const result = userResults[0];
      setQuizResult(result);
      
      // Get the original quiz
      const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
      const foundQuiz = quizzes.find(q => q.id === parseInt(id) || q.id === id);
      
      if (foundQuiz) {
        setQuiz(foundQuiz);
      } else {
        console.error('Quiz not found');
      }
    } else {
      console.error('Result not found');
    }
    
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!quizResult || !quiz) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">Result or quiz not found.</Alert>
        <Button
          variant="contained"
          onClick={() => navigate('/quiz-list')}
          sx={{ mt: 2 }}
        >
          Back to Quiz List
        </Button>
      </Container>
    );
  }

  // Calculate percentage
  const scorePercentage = Math.round((quizResult.score / 10) * 100);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
          color: 'white',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Results: {quiz.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Completed on {new Date(quizResult.completedAt).toLocaleString()}
          </Typography>
        </Box>

        <Box 
          sx={{ 
            textAlign: 'center', 
            p: 4, 
            mb: 4, 
            backgroundColor: scorePercentage >= 70 ? 'rgba(46, 204, 113, 0.2)' : scorePercentage >= 40 ? 'rgba(230, 126, 34, 0.2)' : 'rgba(231, 76, 60, 0.2)',
            borderRadius: 2,
            border: `2px solid ${scorePercentage >= 70 ? 'rgba(46, 204, 113, 0.6)' : scorePercentage >= 40 ? 'rgba(230, 126, 34, 0.6)' : 'rgba(231, 76, 60, 0.6)'}`,
          }}
        >
          <Typography variant="h3" component="div" sx={{ color: scorePercentage >= 70 ? '#2ecc71' : scorePercentage >= 40 ? '#e67e22' : '#e74c3c' }}>
            {quizResult.score}/10
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            {scorePercentage}%
          </Typography>
          <Typography variant="body1">
            {scorePercentage >= 70 
              ? 'Great job! You\'ve mastered this quiz.' 
              : scorePercentage >= 40 
                ? 'Good effort! Keep studying to improve.'
                : 'Keep practicing. You\'ll get better!'}
          </Typography>
        </Box>

        <Divider sx={{ mb: 4, backgroundColor: 'rgba(255,255,255,0.2)' }} />
        
        <Typography variant="h5" gutterBottom>
          Question Summary
        </Typography>

        <List>
          {quiz.questions.map((question, index) => {
            const userAnswer = quizResult.answers[index];
            let isCorrect = false;
            let correctAnswerText = '';
            let userAnswerText = '';
            
            if (question.type === 'multiple-choice') {
              isCorrect = parseInt(userAnswer) === question.correctAnswer;
              correctAnswerText = question.options[question.correctAnswer];
              userAnswerText = userAnswer !== '' ? question.options[parseInt(userAnswer)] : 'No answer';
            } else if (question.type === 'true-false') {
              isCorrect = userAnswer === question.correctAnswer.toString();
              correctAnswerText = question.correctAnswer ? 'True' : 'False';
              userAnswerText = userAnswer !== '' ? userAnswer : 'No answer';
            }
            // Add other question types as needed
            
            return (
              <ListItem 
                key={index}
                sx={{ 
                  mb: 2, 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 1,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {index + 1}. {question.question}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ListItemText 
                        primary="Your Answer" 
                        secondary={
                          <Typography variant="body2" sx={{ color: isCorrect ? '#2ecc71' : '#e74c3c' }}>
                            {userAnswerText}
                          </Typography>
                        } 
                      />
                      {isCorrect ? (
                        <CheckCircleOutlineIcon sx={{ color: '#2ecc71', ml: 1 }} />
                      ) : (
                        <HighlightOffIcon sx={{ color: '#e74c3c', ml: 1 }} />
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <ListItemText 
                      primary="Correct Answer" 
                      secondary={
                        <Typography variant="body2" sx={{ color: '#2ecc71' }}>
                          {correctAnswerText}
                        </Typography>
                      } 
                    />
                  </Grid>
                </Grid>
              </ListItem>
            );
          })}
        </List>
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/quiz-list')}
            sx={{ 
              color: 'white', 
              borderColor: 'white',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.8)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            Back to Quiz List
          </Button>
          <Button 
            variant="contained" 
            onClick={() => navigate(`/take-quiz/${id}`)}
            sx={{ 
              backgroundColor: '#3498DB',
              color: 'white',
              '&:hover': {
                backgroundColor: '#2980B9',
              },
            }}
          >
            Retry Quiz
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default QuizResults; 