'use client';

import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Grid, Paper, CssBaseline,
  useMediaQuery, Grow, List, ListItem, ListItemIcon, ListItemText, Button
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ApiIcon from '@mui/icons-material/Api';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { SelfImprovement, Favorite } from '@mui/icons-material';
import { SignedOut, SignedIn, SignInButton } from '@clerk/nextjs';
import { useTheme } from '@mui/material';

const ReflectlyLandingPage = () => {
  const theme = useTheme();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeSlideUp {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const features = [
    {
      icon: <UploadFileIcon />,
      title: 'Mood Journal',
      description: 'Track your emotions and reflections daily with simple prompts and expressive tools.',
    },
    {
      icon: <QuestionAnswerIcon />,
      title: 'AI-Powered Insights',
      description: 'Get personalized reflections and wellness suggestions from your entries using Reflectly AI.',
    },
    {
      icon: <ApiIcon />,
      title: 'Mindful Reminders',
      description: 'Daily nudges to pause, breathe, and reflect—helping you build emotional awareness over time.',
    },
  ];

  return (
    <>
      <CssBaseline />

      {/* Hero Section */}
      <Container sx={{ py: 5 }}>
        <Box
          sx={{
            mb: 5,
            px: 4,
            py: 15,
            borderRadius: 4,
            background: theme.palette.mode === 'dark'
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
            Your Mind&apos;s Favorite Place to Breathe
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

          {/* <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
            <SignedOut>
              <SignInButton mode="modal" redirectUrl="/dashboard">
                <Button variant="contained" size="large">Get Started</Button>
              </SignInButton>
            </SignedOut>
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Features
            </Button>
          </Box> */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
            <SignedOut>
              <SignInButton mode="modal" redirectUrl="/dashboard">
                <Button variant="contained" size="large">Get Started</Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Button
                variant="contained"
                size="large"
                onClick={() => window.location.href = '/dashboard'}
              >
                Dashboard
              </Button>
            </SignedIn>

            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
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
            background: theme.palette.mode === 'dark'
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
    </>
  );
};

export default ReflectlyLandingPage;
