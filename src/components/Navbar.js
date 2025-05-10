import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  Tooltip,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import NotificationsIcon from '@mui/icons-material/Notifications';

function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [recentAttempts, setRecentAttempts] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Only load notifications for teachers
    if (user && user.role === 'teacher') {
      // Check for recent quiz attempts
      checkRecentAttempts();
      
      // Set up interval to check for new attempts every minute
      const interval = setInterval(checkRecentAttempts, 60000);
      
      return () => clearInterval(interval);
    }
  }, []);

  const checkRecentAttempts = () => {
    try {
      // Get all quizzes created by this teacher
      const allQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
      const teacherQuizzes = allQuizzes.filter(quiz => quiz.createdBy === user.id);
      
      if (teacherQuizzes.length === 0) {
        setNotificationCount(0);
        setRecentAttempts([]);
        return;
      }
      
      // Get all quiz results
      const allResults = JSON.parse(localStorage.getItem('quizResults')) || [];
      
      // Find results for teacher's quizzes from the last 24 hours
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      
      const recentResults = allResults.filter(result => {
        return (
          teacherQuizzes.some(quiz => quiz.id === result.quizId) &&
          new Date(result.completedAt) > oneDayAgo
        );
      });
      
      // Sort by most recent first
      recentResults.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
      
      // Add quiz and student info to the results
      const resultsWithDetails = recentResults.map(result => {
        const quiz = teacherQuizzes.find(q => q.id === result.quizId);
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const student = users.find(u => u.id === result.userId);
        
        return {
          id: result.id,
          quizId: result.quizId,
          quizTitle: quiz ? quiz.title : 'Unknown Quiz',
          studentName: student ? student.name : 'Unknown Student',
          score: result.score,
          completedAt: result.completedAt,
          userId: result.userId,
        };
      });
      
      // Get already viewed notification IDs from localStorage
      const viewedNotifications = JSON.parse(localStorage.getItem(`viewed_notifications_${user.id}`)) || [];
      
      // Filter out already viewed notifications
      const unviewedResults = resultsWithDetails.filter(result => !viewedNotifications.includes(result.id));
      
      // Set recent attempts to show only unviewed notifications
      setRecentAttempts(unviewedResults);
      
      // Count unviewed notifications
      setNotificationCount(unviewedResults.length);
    } catch (error) {
      console.error('Error checking recent attempts:', error);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
    
    // Mark all notifications as viewed
    if (recentAttempts.length > 0) {
      const viewedNotifications = JSON.parse(localStorage.getItem(`viewed_notifications_${user.id}`)) || [];
      
      // Add all current notification IDs to the viewed list
      recentAttempts.forEach(attempt => {
        if (!viewedNotifications.includes(attempt.id)) {
          viewedNotifications.push(attempt.id);
        }
      });
      
      // Update localStorage with viewed notifications
      localStorage.setItem(`viewed_notifications_${user.id}`, JSON.stringify(viewedNotifications));
      
      // Reset notification count
      setNotificationCount(0);
    }
  };

  const handleViewAttempt = (attemptId) => {
    handleNotificationClose();
    navigate(`/student-result/${attemptId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'rgba(26, 26, 26, 0.9)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ 
            flexGrow: 1, 
            cursor: 'pointer',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #90caf9 30%, #f48fb1 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          onClick={() => navigate('/')}
        >
          QuizBuilder
        </Typography>
        {user ? (
          <>
            <Box sx={{ display: 'flex', gap: 2, mr: 2 }}>
              <Button
                color="inherit"
                onClick={() => navigate('/')}
                startIcon={<HomeIcon />}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Home
              </Button>
              {user.role === 'teacher' && (
                <>
                  <Button
                    color="inherit"
                    onClick={() => navigate('/create-quiz')}
                    startIcon={<AddIcon />}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Create Quiz
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => navigate('/dashboard')}
                    startIcon={<DashboardIcon />}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Dashboard
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => navigate('/import-export')}
                    startIcon={<ImportExportIcon />}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Import/Export
                  </Button>
                </>
              )}
              <Button
                color="inherit"
                onClick={() => navigate('/quiz-list')}
                startIcon={<ListIcon />}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Quiz List
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate('/profile')}
                startIcon={<PersonIcon />}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Profile
              </Button>
            </Box>
            
            {/* Notifications for teachers */}
            {user.role === 'teacher' && (
              <Tooltip title="Recent quiz attempts">
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={handleNotificationClick}
                  sx={{
                    mr: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  <Badge badgeContent={notificationCount} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}
            
            <Menu
              anchorEl={notificationAnchorEl}
              open={Boolean(notificationAnchorEl)}
              onClose={handleNotificationClose}
              PaperProps={{
                sx: {
                  width: 350,
                  maxHeight: 400,
                  overflowY: 'auto',
                  backgroundColor: 'rgba(26, 26, 26, 0.95)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                },
              }}
            >
              <Typography sx={{ px: 2, py: 1, fontWeight: 'bold', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                Recent Quiz Attempts
              </Typography>
              
              {recentAttempts.length > 0 ? (
                recentAttempts.map(attempt => (
                  <MenuItem 
                    key={attempt.id} 
                    onClick={() => handleViewAttempt(attempt.id)}
                    sx={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        {attempt.quizTitle}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                          {attempt.studentName}
                        </Typography>
                        <Chip 
                          label={`${attempt.score}/10`}
                          size="small"
                          sx={{ 
                            backgroundColor: attempt.score >= 7 ? 'rgba(46, 204, 113, 0.2)' : 
                                           attempt.score >= 4 ? 'rgba(241, 196, 15, 0.2)' : 
                                           'rgba(231, 76, 60, 0.2)',
                            color: attempt.score >= 7 ? '#2ecc71' : 
                                   attempt.score >= 4 ? '#f1c40f' : 
                                   '#e74c3c',
                            fontWeight: 'bold',
                          }}
                        />
                      </Box>
                      <Typography variant="caption" sx={{ opacity: 0.5, display: 'block', mt: 0.5 }}>
                        {new Date(attempt.completedAt).toLocaleString()}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled sx={{ opacity: 0.7 }}>
                  <Typography variant="body2">No new notifications</Typography>
                </MenuItem>
              )}
            </Menu>
            
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  backgroundColor: 'rgba(26, 26, 26, 0.95)',
                  backdropFilter: 'blur(10px)',
                },
              }}
            >
              <MenuItem 
                onClick={() => {
                  handleClose();
                  handleLogout();
                }}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button 
              color="inherit" 
              onClick={() => navigate('/login')}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Login
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/register')}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 