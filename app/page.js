'use client'
import React, { useState, useEffect, useRef } from 'react';
import { 
  Container, AppBar, Toolbar, Typography, Button, Box, Grid, Paper, IconButton, CssBaseline,
  useMediaQuery, Grow, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ApiIcon from '@mui/icons-material/Api';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { useRouter } from "next/navigation";
import { Favorite, SelfImprovement } from '@mui/icons-material';

const ReflectlyLandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const router = useRouter();

  useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeSlideUp {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const features = [
    { icon: <UploadFileIcon />, title: 'Mood Journal', description: 'Track your emotions and reflections daily with simple prompts and expressive tools.' },
    { icon: <QuestionAnswerIcon />, title: 'AI-Powered Insights', description: 'Get personalized reflections and wellness suggestions from your entries using Reflectly AI.' },
    { icon: <ApiIcon />, title: 'Mindful Reminders', description: 'Daily nudges to pause, breathe, and reflect—helping you build emotional awareness over time.' },
  ];

  const theme = React.useMemo(() =>
    createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
        primary: { main: '#FCD5CE' },
        secondary: { main: '#FAE1DD' },
        background: {
          default: darkMode ? '#1A1A1A' : '#FFF8F6',
          paper: darkMode ? '#2A2A2A' : '#FFFFFF',
        },
        text: {
          primary: darkMode ? '#E6E6E6' : '#6D6875',
          secondary: darkMode ? '#B0B0B0' : '#9C9A9E',
        },
      },
      typography: {
        fontFamily: 'Lato, sans-serif',
        h1: { fontFamily: 'Nunito, sans-serif' },
        h2: { fontFamily: 'Nunito, sans-serif' },
        h3: { fontFamily: 'Nunito, sans-serif' },
        h4: { fontFamily: 'Nunito, sans-serif' },
        h5: { fontFamily: 'Nunito, sans-serif' },
        h6: { fontFamily: 'Nunito, sans-serif' },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 30,
              textTransform: 'none',
              fontWeight: 600,
              padding: '10px 20px',
              boxShadow: 'none',
            },
            contained: {
              backgroundColor: '#FCD5CE',
              color: '#6D6875',
              '&:hover': { backgroundColor: '#F8C9C2' },
            },
            outlined: {
              borderColor: '#FCD5CE',
              color: '#6D6875',
              '&:hover': {
                borderColor: '#F8C9C2',
                backgroundColor: darkMode ? '#2A2A2A' : '#FFF1ED',
              },
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: { borderRadius: 20, padding: '20px' },
          },
        },
      },
    }), [darkMode]);

  const FeatureCard = ({ feature, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={1000 + index * 500}>
        <Paper
          elevation={isHovered ? 8 : 1}
          sx={{
            p: 3,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            transition: 'all 0.3s ease-in-out',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            '&:hover': {
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2c2c2c' : '#f0f0ff',
            }
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Box sx={{ fontSize: 48, mb: 2 }}>{feature.icon}</Box>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            {feature.title}
          </Typography>
          <Typography variant="body1">{feature.description}</Typography>
        </Paper>
      </Grow>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="inherit">
        {/* <Toolbar sx={{ justifyContent: 'space-between' }}> */}
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 20 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Reflectly</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" onClick={toggleTheme}>
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal" redirectUrl="/dashboard">
                <Button variant="outlined" sx={{ ml: 1 }}>Login</Button>
              </SignInButton>
            </SignedOut>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section with Gradient */}
      <Container sx={{ py: 5 }}>
      <Box
      sx={{
        mb: 5,
        px: 4,
        py: 15,
        borderRadius: 4,
        background: darkMode
          ? 'linear-gradient(135deg, #202020, #2a2a2a)'
          : 'linear-gradient(135deg, #FFF1F0, #FFE6E1)',
      }}

      >
       
          <Typography variant="h1" align="center" sx={{ mb: 3, color: 'primary.main' }}>
            Reflectly
          </Typography>

          <Typography
            variant="h5"
            align="center"
            paragraph
            sx={{ animation: 'fadeSlideUp 1.5s ease-in-out' }}
          >
            A warm and thoughtful space to reflect on your day, your emotions, and your growth.
          </Typography>

          <Typography align="center" sx={{ mt: 2, fontSize: 18, color: 'text.secondary' }}>
            Reflectly helps you:
          </Typography>

          <List sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mt: 2 }}>
            <ListItem sx={{ width: 'auto' }}>
              <ListItemIcon><SelfImprovement color="primary" /></ListItemIcon>
              <ListItemText primary="Build mindfulness daily" />
            </ListItem>
            <ListItem sx={{ width: 'auto' }}>
              <ListItemIcon><Favorite color="primary" /></ListItemIcon>
              <ListItemText primary="Track emotional wellness" />
            </ListItem>
            <ListItem sx={{ width: 'auto' }}>
              <ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Celebrate small wins" />
            </ListItem>
          </List>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
            <SignInButton mode="modal" redirectUrl="/dashboard">
              <Button variant="contained" size="large">Get Started</Button>
            </SignInButton>
            <Button variant="outlined" size="large" onClick={() => {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Explore Features
            </Button>
          </Box>
        
      </Box>
      </Container>

      {/* Features Section */}
      <Container sx={{ py: 5 }}>
        <Box
          id="features"
          sx={{
            mb: 5,
            px: 4,
            py: 15,
            borderRadius: 4,
            background: darkMode
              ? 'linear-gradient(135deg, #202020, #2a2a2a)'
              : 'linear-gradient(135deg, #FFF1F0, #FFE6E1)',
          }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: 2, fontWeight: 800, color: 'primary.main' }}
          >
            Features
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            sx={{ mb: 6, color: 'text.secondary' }}
          >
            Your toolkit for daily reflection and emotional clarity.
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {features.map((feature, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={index}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Grow in={true} timeout={1000 + index * 300}>
                  <Paper
                    elevation={3}
                    sx={{
                      width: 250,
                      height: 250,
                      p: 3,
                      borderRadius: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        backgroundColor: darkMode ? '#333' : '#FFF7F7',
                      },
                    }}
                  >
                    <Box sx={{ fontSize: 40, mb: 1 }}>{feature.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Paper>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="body1">© 2025 Reflectly. All rights reserved.</Typography>
        <Typography variant="body2" color="text.secondary">
          Built with ❤️ by the Reflectly Team.
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default ReflectlyLandingPage;

