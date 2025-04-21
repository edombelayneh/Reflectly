'use client'
import React, { useState, useEffect, useRef } from 'react';
import { 
  Container, AppBar, Toolbar, Typography, Button, Box, Grid, Paper, IconButton, CssBaseline,
  useMediaQuery, Grow, Zoom, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ApiIcon from '@mui/icons-material/Api';
import UploadIcon from '@mui/icons-material/Upload';
import ChatIcon from '@mui/icons-material/Chat';
import DoneIcon from '@mui/icons-material/Done';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { useRouter } from "next/navigation";
import { Favorite, SelfImprovement } from '@mui/icons-material';

const ReflectlyLandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const router = useRouter();

  useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const features = [
    { icon: <UploadFileIcon />, title: 'Mood Journal', description: 'Track your emotions and reflections daily with simple prompts and expressive tools.' },
    { icon: <QuestionAnswerIcon />, title: 'AI-Powered Insights', description: 'Get personalized reflections and wellness suggestions from your entries using Reflectly AI.' },
    { icon: <ApiIcon />, title: 'Mindful Reminders', description: 'Daily nudges to pause, breathe, and reflect—helping you build emotional awareness over time.' },
  ];

  const useCases = [
    {
      title: 'For Students',
      description: 'Stay balanced through classes and exams with Reflectly’s mindfulness support.',
      icon: SelfImprovement,
      benefits: [
        'Express thoughts freely with the journal bot',
        'Understand emotion patterns before stressful events'
      ]
    },
    {
      title: 'For Working Professionals',
      description: 'Keep your mental wellness in check while managing deadlines and responsibilities.',
      icon: Favorite,
      benefits: [
        'Get stress management tips personalized to your mood',
        'Quick daily check-ins during work breaks'
      ]
    },
  ];

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: darkMode ? '#9C27B0' : '#E6E6FA',
          },
          background: {
            default: darkMode ? '#121212' : '#FFFFFF',
            paper: darkMode ? '#1E1E1E' : '#F8F8FF',
          },
          text: {
            primary: darkMode ? '#FFFFFF' : '#4B0082',
          },
        },
        typography: {
          fontFamily: "'Playfair Display', serif",
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 30,
                textTransform: 'none',
                fontWeight: 600,
                padding: '10px 20px',
              },
              contained: {
                backgroundColor: darkMode ? '#9C27B0' : '#E6E6FA',
                color: darkMode ? '#FFFFFF' : '#4B0082',
              },
              outlined: {
                borderColor: darkMode ? '#9C27B0' : '#E6E6FA',
                color: darkMode ? '#FFFFFF' : '#4B0082',
              },
            },
          },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="inherit">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Reflectly</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" onClick={toggleTheme}>
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <SignedIn>
              <UserButton/>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outlined" sx={{ ml: 2 }}>Login</Button>
              </SignInButton>
            </SignedOut>
            
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Typography variant="h1" align="center" sx={{ mb: 3, color: 'primary.main' }}>
          Reflectly
        </Typography>
        <Typography variant="h5" align="center" paragraph>
          A warm and thoughtful space to reflect on your day, your emotions, and your growth.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          <SignInButton mode="modal">
            <Button variant="contained" size="large">Get Started</Button>
          </SignInButton>
          <Button variant="outlined" size="large">Explore Features</Button>
        </Box>
      </Container>

      <Container sx={{ py: 8 }}>
        <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                <Box sx={{ fontSize: 48 }}>{feature.icon}</Box>
                <Typography variant="h5" gutterBottom>{feature.title}</Typography>
                <Typography variant="body1">{feature.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ py: 8 }}>
        <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          Use Cases
        </Typography>
        <Grid container spacing={4}>
          {useCases.map((useCase, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <useCase.icon sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h5">{useCase.title}</Typography>
                </Box>
                <Typography variant="body1" paragraph>{useCase.description}</Typography>
                <List>
                  {useCase.benefits.map((benefit, idx) => (
                    <ListItem key={idx} dense>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={benefit} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* <Container sx={{ py: 8 }}>
        <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          Pricing
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {plans.map((plan, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper elevation={4} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>{plan.name}</Typography>
                <Typography variant="h4" color="primary" gutterBottom>{plan.price}</Typography>
                <Typography variant="body2" paragraph>{plan.description}</Typography>
                <List>
                  {plan.features.map((feature, idx) => (
                    <ListItem key={idx} dense>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
                {plan.name === 'Basic' ? (
                  <SignInButton mode="modal">
                    <Button variant="contained">Start Free</Button>
                  </SignInButton>
                ) : (
                  <Button variant="contained">Upgrade</Button>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container> */}

      <Box component="footer" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="body1">© 2024 Reflectly. All rights reserved.</Typography>
        <Typography variant="body2" color="text.secondary">
          Built with ❤️ by the Reflectly Team.
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default ReflectlyLandingPage;
