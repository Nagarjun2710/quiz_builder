import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import QuizIcon from '@mui/icons-material/Quiz';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HistoryIcon from '@mui/icons-material/History';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import ScienceIcon from '@mui/icons-material/Science';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import StarsIcon from '@mui/icons-material/Stars';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

// Decorative background component
const DecorativeBackground = () => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      overflow: 'hidden',
      opacity: 0.1,
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        transform: 'rotate(-15deg)',
        animation: 'float 6s ease-in-out infinite',
      }}
    >
      <SchoolOutlinedIcon sx={{ fontSize: 100, color: '#3498DB' }} />
    </Box>
    <Box
      sx={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        transform: 'rotate(15deg)',
        animation: 'float 8s ease-in-out infinite',
      }}
    >
      <LightbulbIcon sx={{ fontSize: 80, color: '#E67E22' }} />
    </Box>
    <Box
      sx={{
        position: 'absolute',
        bottom: '15%',
        left: '15%',
        transform: 'rotate(10deg)',
        animation: 'float 7s ease-in-out infinite',
      }}
    >
      <StarsIcon sx={{ fontSize: 90, color: '#9B59B6' }} />
    </Box>
  </Box>
);

// Decorative card component
const DecorativeCard = ({ children, iconColor, buttonColor, hoverColor }) => (
  <Card 
    sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 12px 20px rgba(44, 62, 80, 0.3)',
      },
      transition: 'all 0.3s ease-in-out',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, ${iconColor}, transparent)`,
      },
    }}
  >
    {children}
  </Card>
);

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [publishedQuizCount, setPublishedQuizCount] = useState(0);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(userData);
    
    // Count published quizzes for students
    if (userData.role === 'student') {
      const allQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
      const publishedQuizzes = allQuizzes.filter(quiz => quiz.isPublished);
      setPublishedQuizCount(publishedQuizzes.length);
    }
  }, [navigate]);

  if (!user) return null;

  if (user.role === 'student') {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, position: 'relative' }}>
        <DecorativeBackground />
        
        <Box 
          sx={{ 
            mb: 6,
            textAlign: 'center',
            background: 'linear-gradient(45deg, #2C3E50 30%, #34495E 90%)',
            borderRadius: 3,
            p: 4,
            color: 'white',
            boxShadow: '0 8px 16px rgba(44, 62, 80, 0.3)',
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            },
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Welcome, {user.name}!
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Ready to test your knowledge? Browse available quizzes and start learning!
          </Typography>
          {publishedQuizCount > 0 && (
            <Alert 
              severity="info" 
              sx={{ 
                mt: 2, 
                width: 'fit-content', 
                margin: '20px auto 0', 
                backgroundColor: 'rgba(52, 152, 219, 0.2)', 
                border: '1px solid rgba(52, 152, 219, 0.5)',
                color: 'white'
              }}
            >
              {publishedQuizCount} {publishedQuizCount === 1 ? 'quiz is' : 'quizzes are'} available for you to take!
            </Alert>
          )}
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <DecorativeCard iconColor="#3498DB" buttonColor="#3498DB" hoverColor="#2980B9">
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <QuizIcon sx={{ fontSize: 50, mr: 2, color: '#3498DB' }} />
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    Available Quizzes
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Browse through a variety of quizzes created by your teachers. Test your knowledge and track your progress.
                </Typography>
                {publishedQuizCount > 0 && (
                  <Typography variant="body2" sx={{ mt: 2, color: '#3498DB', fontWeight: 'bold' }}>
                    {publishedQuizCount} published {publishedQuizCount === 1 ? 'quiz' : 'quizzes'} ready to take
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button 
                  fullWidth 
                  variant="contained" 
                  onClick={() => navigate('/quiz-list')}
                  sx={{ 
                    backgroundColor: '#3498DB',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#2980B9',
                    },
                  }}
                >
                  View Quizzes
                </Button>
              </CardActions>
            </DecorativeCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <DecorativeCard iconColor="#E67E22" buttonColor="#E67E22" hoverColor="#D35400">
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <HistoryIcon sx={{ fontSize: 50, mr: 2, color: '#E67E22' }} />
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    Quiz History
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Review your past quiz attempts, see your scores, and track your improvement over time.
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  fullWidth 
                  variant="contained" 
                  onClick={() => navigate('/profile')}
                  sx={{ 
                    backgroundColor: '#E67E22',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#D35400',
                    },
                  }}
                >
                  View History
                </Button>
              </CardActions>
            </DecorativeCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <DecorativeCard iconColor="#9B59B6" buttonColor="#9B59B6" hoverColor="#8E44AD">
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmojiEventsIcon sx={{ fontSize: 50, mr: 2, color: '#9B59B6' }} />
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    Your Progress
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Check your performance statistics, achievements, and areas for improvement.
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  fullWidth 
                  variant="contained" 
                  onClick={() => navigate('/profile')}
                  sx={{ 
                    backgroundColor: '#9B59B6',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#8E44AD',
                    },
                  }}
                >
                  View Progress
                </Button>
              </CardActions>
            </DecorativeCard>
          </Grid>
        </Grid>
      </Container>
    );
  }

  // Teacher view
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, position: 'relative' }}>
      <DecorativeBackground />
      
      <Box 
        sx={{ 
          mb: 6,
          textAlign: 'center',
          background: 'linear-gradient(45deg, #2C3E50 30%, #34495E 90%)',
          borderRadius: 3,
          p: 4,
          color: 'white',
          boxShadow: '0 8px 16px rgba(44, 62, 80, 0.3)',
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome, {user.name}!
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Create and manage quizzes for your students. Choose from different quiz types to engage your class.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {quizTypes.map((type) => (
          <Grid item xs={12} sm={6} md={3} key={type.id}>
            <DecorativeCard iconColor={type.buttonColor} buttonColor={type.buttonColor} hoverColor={type.hoverColor}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {type.icon}
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    {type.title}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  {type.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  fullWidth 
                  variant="contained" 
                  onClick={() => navigate('/create-quiz', { state: { quizType: type.id } })}
                  sx={{ 
                    backgroundColor: type.buttonColor,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: type.hoverColor,
                    },
                  }}
                >
                  Create Quiz
                </Button>
              </CardActions>
            </DecorativeCard>
          </Grid>
        ))}
      </Grid>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
        `}
      </style>
    </Container>
  );
}

const quizTypes = [
  {
    id: 'multiple-choice',
    title: 'Multiple Choice',
    description: 'Create quizzes with multiple choice questions. Perfect for testing knowledge and understanding.',
    icon: <QuizIcon sx={{ fontSize: 50, mr: 2, color: '#3498DB' }} />,
    buttonColor: '#3498DB',
    hoverColor: '#2980B9',
  },
  {
    id: 'true-false',
    title: 'True/False',
    description: 'Quick true/false questions to test basic understanding and concepts.',
    icon: <ScienceIcon sx={{ fontSize: 50, mr: 2, color: '#2ECC71' }} />,
    buttonColor: '#2ECC71',
    hoverColor: '#27AE60',
  },
  {
    id: 'short-answer',
    title: 'Short Answer',
    description: 'Open-ended questions that allow students to demonstrate their understanding in their own words.',
    icon: <PsychologyIcon sx={{ fontSize: 50, mr: 2, color: '#E67E22' }} />,
    buttonColor: '#E67E22',
    hoverColor: '#D35400',
  },
  {
    id: 'matching',
    title: 'Matching',
    description: 'Create matching exercises to test relationships between concepts and definitions.',
    icon: <AutoStoriesIcon sx={{ fontSize: 50, mr: 2, color: '#9B59B6' }} />,
    buttonColor: '#9B59B6',
    hoverColor: '#8E44AD',
  },
];

export default Home; 