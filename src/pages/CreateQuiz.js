import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Alert,
  Fade,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import QuizIcon from '@mui/icons-material/Quiz';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ShortTextIcon from '@mui/icons-material/ShortText';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ScienceIcon from '@mui/icons-material/Science';
import PsychologyIcon from '@mui/icons-material/Psychology';

// Decorative background component
const DecorativeBackground = ({ quizType }) => {
  // Different colors and icons based on quiz type
  const getIconStyle = () => {
    switch (quizType) {
      case 'multiple-choice':
        return { 
          primary: <QuizIcon sx={{ fontSize: 100, color: '#3498DB', opacity: 0.2 }} />,
          secondary: <LightbulbIcon sx={{ fontSize: 80, color: '#2980B9', opacity: 0.2 }} />,
          tertiary: <SchoolIcon sx={{ fontSize: 90, color: '#1ABC9C', opacity: 0.2 }} />
        };
      case 'true-false':
        return { 
          primary: <CheckCircleOutlineIcon sx={{ fontSize: 100, color: '#2ECC71', opacity: 0.2 }} />,
          secondary: <ScienceIcon sx={{ fontSize: 80, color: '#27AE60', opacity: 0.2 }} />,
          tertiary: <SchoolIcon sx={{ fontSize: 90, color: '#F1C40F', opacity: 0.2 }} />
        };
      case 'short-answer':
        return { 
          primary: <ShortTextIcon sx={{ fontSize: 100, color: '#E67E22', opacity: 0.2 }} />,
          secondary: <PsychologyIcon sx={{ fontSize: 80, color: '#D35400', opacity: 0.2 }} />,
          tertiary: <SchoolIcon sx={{ fontSize: 90, color: '#3498DB', opacity: 0.2 }} />
        };
      case 'matching':
        return { 
          primary: <CompareArrowsIcon sx={{ fontSize: 100, color: '#9B59B6', opacity: 0.2 }} />,
          secondary: <DragIndicatorIcon sx={{ fontSize: 80, color: '#8E44AD', opacity: 0.2 }} />,
          tertiary: <SchoolIcon sx={{ fontSize: 90, color: '#E74C3C', opacity: 0.2 }} />
        };
      default:
        return { 
          primary: <QuizIcon sx={{ fontSize: 100, color: '#3498DB', opacity: 0.2 }} />,
          secondary: <LightbulbIcon sx={{ fontSize: 80, color: '#2980B9', opacity: 0.2 }} />,
          tertiary: <SchoolIcon sx={{ fontSize: 90, color: '#1ABC9C', opacity: 0.2 }} />
        };
    }
  };

  const icons = getIconStyle();

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        overflow: 'hidden',
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
        {icons.primary}
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
        {icons.secondary}
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
        {icons.tertiary}
      </Box>
    </Box>
  );
};

// Decorative section component
const DecorativeSection = ({ children, title, icon, quizType }) => {
  // Get more distinctive backgrounds and styles based on quiz type
  const getSectionStyle = () => {
    switch (quizType) {
      case 'multiple-choice':
        return {
          background: 'linear-gradient(135deg, #1a5276 0%, #3498DB 100%)',
          borderLeft: '8px solid #3498DB',
          icon: <QuizIcon sx={{ fontSize: 30, color: 'white' }} />
        };
      case 'true-false':
        return {
          background: 'linear-gradient(135deg, #196f3d 0%, #2ECC71 100%)',
          borderLeft: '8px solid #2ECC71',
          icon: <CheckCircleOutlineIcon sx={{ fontSize: 30, color: 'white' }} />
        };
      case 'short-answer':
        return {
          background: 'linear-gradient(135deg, #9c640c 0%, #E67E22 100%)',
          borderLeft: '8px solid #E67E22',
          icon: <ShortTextIcon sx={{ fontSize: 30, color: 'white' }} />
        };
      case 'matching':
        return {
          background: 'linear-gradient(135deg, #614685 0%, #9B59B6 100%)',
          borderLeft: '8px solid #9B59B6',
          icon: <CompareArrowsIcon sx={{ fontSize: 30, color: 'white' }} />
        };
      default:
        return {
          background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
          borderLeft: '8px solid #3498DB',
          icon: <QuizIcon sx={{ fontSize: 30, color: 'white' }} />
        };
    }
  };

  const style = getSectionStyle();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 3,
        background: style.background,
        borderLeft: style.borderLeft,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '4px',
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
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {style.icon}
        <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
          {title}
        </Typography>
      </Box>
      {children}
    </Paper>
  );
};

function CreateQuiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    category: 'multiple-choice',
    timeLimit: 10,
    questions: [
      {
        question: '',
        type: 'multiple-choice',
        options: ['', '', '', ''],
        correctAnswer: 0,
        matchingPairs: [],
      },
    ],
  });

  // Set default category based on navigation state if available
  useEffect(() => {
    if (location.state && location.state.quizType) {
      const quizType = location.state.quizType;
      
      // Create appropriate initial question structure based on quiz type
      let initialQuestion = { question: '', type: quizType };
      
      if (quizType === 'multiple-choice') {
        initialQuestion.options = ['', '', '', ''];
        initialQuestion.correctAnswer = 0;
        initialQuestion.matchingPairs = [];
      } else if (quizType === 'true-false') {
        initialQuestion.options = [];
        initialQuestion.correctAnswer = 'true';
        initialQuestion.matchingPairs = [];
      } else if (quizType === 'short-answer') {
        initialQuestion.options = [];
        initialQuestion.correctAnswer = '';
        initialQuestion.matchingPairs = [];
      } else if (quizType === 'matching') {
        initialQuestion.options = [];
        initialQuestion.matchingPairs = [{ left: '', right: '' }];
        initialQuestion.correctAnswer = 0;
      }
      
      // Update all the quiz data
      setQuizData(prev => ({
        ...prev,
        category: quizType,
        questions: [initialQuestion]
      }));
      
      console.log(`Quiz type initialized to: ${quizType}`);
    }
  }, [location]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  const handleQuizChange = (e) => {
    const { name, value } = e.target;
    
    // If category is changed, update all question types
    if (name === 'category') {
      setQuizData((prev) => {
        const updatedQuestions = prev.questions.map(q => {
          let updatedQuestion = {
            ...q,
            type: value
          };
          
          // Add default properties based on question type
          if (value === 'multiple-choice') {
            updatedQuestion.options = q.options?.length ? q.options : ['', '', '', ''];
            updatedQuestion.correctAnswer = 0;
          } else if (value === 'true-false') {
            updatedQuestion.options = [];
            updatedQuestion.correctAnswer = 'true';
          } else if (value === 'short-answer') {
            updatedQuestion.options = [];
            updatedQuestion.correctAnswer = '';
          } else if (value === 'matching') {
            updatedQuestion.options = [];
            updatedQuestion.matchingPairs = q.matchingPairs?.length 
              ? q.matchingPairs 
              : [{ left: '', right: '' }];
          }
          
          return updatedQuestion;
        });
        
        return {
          ...prev,
          [name]: value,
          questions: updatedQuestions
        };
      });
    } else {
      setQuizData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleQuestionChange = (index, field, value) => {
    setQuizData((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[index] = {
        ...newQuestions[index],
        [field]: value,
      };
      return {
        ...prev,
        questions: newQuestions,
      };
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setQuizData((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex].options[optionIndex] = value;
      return {
        ...prev,
        questions: newQuestions,
      };
    });
  };
  
  const handleMatchingPairChange = (questionIndex, pairIndex, field, value) => {
    setQuizData((prev) => {
      const newQuestions = [...prev.questions];
      if (!newQuestions[questionIndex].matchingPairs) {
        newQuestions[questionIndex].matchingPairs = [{ left: '', right: '' }];
      }
      newQuestions[questionIndex].matchingPairs[pairIndex][field] = value;
      return {
        ...prev,
        questions: newQuestions,
      };
    });
  };

  const addMatchingPair = (questionIndex) => {
    setQuizData((prev) => {
      const newQuestions = [...prev.questions];
      if (!newQuestions[questionIndex].matchingPairs) {
        newQuestions[questionIndex].matchingPairs = [];
      }
      newQuestions[questionIndex].matchingPairs.push({ left: '', right: '' });
      return {
        ...prev,
        questions: newQuestions,
      };
    });
  };

  const removeMatchingPair = (questionIndex, pairIndex) => {
    setQuizData((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex].matchingPairs = 
        newQuestions[questionIndex].matchingPairs.filter((_, i) => i !== pairIndex);
      return {
        ...prev,
        questions: newQuestions,
      };
    });
  };

  const addQuestion = () => {
    const newQuestion = {
      question: '',
      type: quizData.category,
      options: quizData.category === 'multiple-choice' ? ['', '', '', ''] : [],
      correctAnswer: quizData.category === 'true-false' ? 'true' : 
                    quizData.category === 'short-answer' ? '' : 0,
      matchingPairs: quizData.category === 'matching' ? [{ left: '', right: '' }] : [],
    };

    setQuizData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  const removeQuestion = (index) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields are filled
    if (!quizData.title || !quizData.description || !quizData.category) {
      alert('Please fill in all quiz details');
      return;
    }

    // Validate all questions and options are filled based on question type
    const isIncomplete = quizData.questions.some((q) => {
      if (!q.question) return true;
      
      if (q.type === 'multiple-choice') {
        return q.options.some(opt => !opt);
      } else if (q.type === 'matching') {
        return !q.matchingPairs || q.matchingPairs.some(pair => !pair.left || !pair.right);
      } else if (q.type === 'short-answer') {
        return !q.correctAnswer;
      }
      
      return false;
    });

    if (isIncomplete) {
      alert('Please fill in all questions and options');
      return;
    }

    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      alert('Please log in to create a quiz');
      navigate('/login');
      return;
    }

    const newQuiz = {
      ...quizData,
      id: Date.now(),
      createdBy: userData.id,
      createdAt: new Date().toISOString(),
      isPublished: false,
    };

    const existingQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    localStorage.setItem('quizzes', JSON.stringify([...existingQuizzes, newQuiz]));

    navigate('/quiz-list');
  };
  
  // Get quiz type specific details
  const getQuizTypeInfo = () => {
    switch (quizData.category) {
      case 'multiple-choice':
        return {
          title: 'Multiple Choice Quiz',
          description: 'Design your quiz with multiple choice questions',
          color: '#3498DB',
          icon: <QuizIcon sx={{ fontSize: 30, color: '#3498DB' }} />
        };
      case 'true-false':
        return {
          title: 'True/False Quiz',
          description: 'Create a quiz with true or false questions',
          color: '#2ECC71',
          icon: <CheckCircleOutlineIcon sx={{ fontSize: 30, color: '#2ECC71' }} />
        };
      case 'short-answer':
        return {
          title: 'Short Answer Quiz',
          description: 'Make a quiz with questions that require written answers',
          color: '#E67E22',
          icon: <ShortTextIcon sx={{ fontSize: 30, color: '#E67E22' }} />
        };
      case 'matching':
        return {
          title: 'Matching Quiz',
          description: 'Create a quiz where students match related items',
          color: '#9B59B6',
          icon: <CompareArrowsIcon sx={{ fontSize: 30, color: '#9B59B6' }} />
        };
      default:
        return {
          title: 'Create New Quiz',
          description: 'Design your quiz with multiple choice questions',
          color: '#3498DB',
          icon: <QuizIcon sx={{ fontSize: 30, color: '#3498DB' }} />
        };
    }
  };

  const quizTypeInfo = getQuizTypeInfo();
  
  // Function to render appropriate question input based on question type
  const renderQuestionOptions = (question, questionIndex) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <Box>
            {question.options.map((option, optionIndex) => (
              <Box key={optionIndex} sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label={`Option ${optionIndex + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                      '&.Mui-focused fieldset': { borderColor: 'white' },
                    },
                    '& .MuiInputLabel-root': { color: 'white' },
                    '& .MuiInputBase-input': { color: 'white' },
                  }}
                />
              </Box>
            ))}
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel sx={{ color: 'white' }}>Correct Answer</InputLabel>
              <Select
                value={question.correctAnswer}
                onChange={(e) => handleQuestionChange(questionIndex, 'correctAnswer', e.target.value)}
                sx={{
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                }}
              >
                {question.options.map((_, index) => (
                  <MenuItem key={index} value={index}>
                    Option {index + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );

      case 'true-false':
        return (
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend" sx={{ color: 'white' }}>Correct Answer</FormLabel>
            <RadioGroup
              value={question.correctAnswer}
              onChange={(e) => handleQuestionChange(questionIndex, 'correctAnswer', e.target.value)}
              row
            >
              <FormControlLabel
                value="true"
                control={<Radio sx={{ color: 'white' }} />}
                label="True"
                sx={{ color: 'white' }}
              />
              <FormControlLabel
                value="false"
                control={<Radio sx={{ color: 'white' }} />}
                label="False"
                sx={{ color: 'white' }}
              />
            </RadioGroup>
          </FormControl>
        );

      case 'short-answer':
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="white" sx={{ mb: 2, opacity: 0.7 }}>
              Enter the key terms or exact answer students should provide. The system will use this to check if the student's answer contains these terms.
            </Typography>
            <TextField
              fullWidth
              label="Expected Keywords/Answer"
              value={question.correctAnswer || ''}
              onChange={(e) => handleQuestionChange(questionIndex, 'correctAnswer', e.target.value)}
              required
              helperText="Enter the most important keywords or the exact answer you expect"
              sx={{
                mt: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                  '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                },
                '& .MuiInputLabel-root': { color: 'white' },
                '& .MuiInputBase-input': { color: 'white' },
                '& .MuiFormHelperText-root': { color: 'rgba(255, 255, 255, 0.7)' },
              }}
            />
            <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'rgba(255, 255, 255, 0.7)' }}>
              Note: For more complex answers, you'll need to manually review student responses later.
            </Typography>
          </Box>
        );

      case 'matching':
        return (
          <Box>
            {(question.matchingPairs || []).map((pair, pairIndex) => (
              <Box key={pairIndex} sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                  fullWidth
                  label={`Left Item ${pairIndex + 1}`}
                  value={pair.left}
                  onChange={(e) => handleMatchingPairChange(questionIndex, pairIndex, 'left', e.target.value)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                      '&.Mui-focused fieldset': { borderColor: 'white' },
                    },
                    '& .MuiInputLabel-root': { color: 'white' },
                    '& .MuiInputBase-input': { color: 'white' },
                  }}
                />
                <DragIndicatorIcon sx={{ color: 'white' }} />
                <TextField
                  fullWidth
                  label={`Right Item ${pairIndex + 1}`}
                  value={pair.right}
                  onChange={(e) => handleMatchingPairChange(questionIndex, pairIndex, 'right', e.target.value)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                      '&.Mui-focused fieldset': { borderColor: 'white' },
                    },
                    '& .MuiInputLabel-root': { color: 'white' },
                    '& .MuiInputBase-input': { color: 'white' },
                  }}
                />
                {(question.matchingPairs || []).length > 1 && (
                  <IconButton
                    onClick={() => removeMatchingPair(questionIndex, pairIndex)}
                    sx={{ color: '#E74C3C' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => addMatchingPair(questionIndex)}
              sx={{
                mt: 2,
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.8)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Add Matching Pair
            </Button>
          </Box>
        );

      default:
        return null;
    }
  };

  // Add this function to the CreateQuiz component to get header background based on quiz type
  const getHeaderBackground = () => {
    switch (quizData.category) {
      case 'multiple-choice':
        return 'linear-gradient(45deg, #1a5276 30%, #3498DB 90%)';
      case 'true-false':
        return 'linear-gradient(45deg, #196f3d 30%, #2ECC71 90%)';
      case 'short-answer':
        return 'linear-gradient(45deg, #9c640c 30%, #E67E22 90%)';
      case 'matching':
        return 'linear-gradient(45deg, #614685 30%, #9B59B6 90%)';
      default:
        return 'linear-gradient(45deg, #2C3E50 30%, #34495E 90%)';
    }
  };

  // Add these functions to the CreateQuiz component for button colors based on quiz type
  const getButtonColor = () => {
    switch (quizData.category) {
      case 'multiple-choice':
        return '#3498DB';
      case 'true-false':
        return '#2ECC71';
      case 'short-answer':
        return '#E67E22';
      case 'matching':
        return '#9B59B6';
      default:
        return '#2ECC71';
    }
  };

  const getButtonHoverColor = () => {
    switch (quizData.category) {
      case 'multiple-choice':
        return '#2980B9';
      case 'true-false':
        return '#27AE60';
      case 'short-answer':
        return '#D35400';
      case 'matching':
        return '#8E44AD';
      default:
        return '#27AE60';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, position: 'relative' }}>
      <DecorativeBackground quizType={quizData.category} />
      
      <Box 
        sx={{ 
          mb: 4,
          textAlign: 'center',
          background: getHeaderBackground(),
          borderRadius: 3,
          p: 4,
          color: 'white',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
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
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          {quizTypeInfo.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          {quizTypeInfo.description}
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <DecorativeSection 
          title="Quiz Details" 
          icon={quizTypeInfo.icon}
          quizType={quizData.category}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Quiz Title"
                name="title"
                value={quizData.title}
                onChange={handleQuizChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: 'white' },
                  },
                  '& .MuiInputLabel-root': { color: 'white' },
                  '& .MuiInputBase-input': { color: 'white' },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={quizData.description}
                onChange={handleQuizChange}
                multiline
                rows={3}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: 'white' },
                  },
                  '& .MuiInputLabel-root': { color: 'white' },
                  '& .MuiInputBase-input': { color: 'white' },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: 'white' }}>Quiz Type</InputLabel>
                <Select
                  name="category"
                  value={quizData.category}
                  onChange={handleQuizChange}
                  required
                  sx={{
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                  }}
                >
                  <MenuItem value="multiple-choice">Multiple Choice</MenuItem>
                  <MenuItem value="true-false">True/False</MenuItem>
                  <MenuItem value="short-answer">Short Answer</MenuItem>
                  <MenuItem value="matching">Matching</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Time Limit (minutes)"
                name="timeLimit"
                type="number"
                value={quizData.timeLimit}
                onChange={handleQuizChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: 'white' },
                  },
                  '& .MuiInputLabel-root': { color: 'white' },
                  '& .MuiInputBase-input': { color: 'white' },
                }}
              />
            </Grid>
          </Grid>
        </DecorativeSection>

        {quizData.questions.map((question, questionIndex) => (
          <DecorativeSection 
            key={questionIndex}
            title={`Question ${questionIndex + 1}`}
            icon={<SchoolIcon sx={{ fontSize: 30, color: 'white' }} />}
            quizType={quizData.category}
          >
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Question"
                value={question.question}
                onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: 'white' },
                  },
                  '& .MuiInputLabel-root': { color: 'white' },
                  '& .MuiInputBase-input': { color: 'white' },
                }}
              />
            </Box>

            {renderQuestionOptions(question, questionIndex)}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              {quizData.questions.length > 1 && (
                <IconButton
                  onClick={() => removeQuestion(questionIndex)}
                  sx={{ 
                    color: '#E74C3C',
                    '&:hover': { backgroundColor: 'rgba(231, 76, 60, 0.1)' }
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          </DecorativeSection>
        ))}

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={addQuestion}
            sx={{ 
              color: 'white',
              borderColor: 'white',
              '&:hover': { 
                borderColor: 'rgba(255, 255, 255, 0.8)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Add Question
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{ 
              backgroundColor: getButtonColor(),
              '&:hover': { backgroundColor: getButtonHoverColor() }
            }}
          >
            Save Quiz
          </Button>
        </Box>
      </form>

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

export default CreateQuiz; 