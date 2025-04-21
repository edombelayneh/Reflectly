'use client'
import React from 'react';
import {
  Container, Typography, Box, Grid, Paper, CssBaseline,
  AppBar, Toolbar, IconButton, Button, useMediaQuery
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LightMode, DarkMode } from '@mui/icons-material';
import { SignedIn, SignedOut, SignInButton, UserButton, RedirectToSignIn } from '@clerk/nextjs';

const DashboardPage = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  React.useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

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

  const cards = [
    { title: 'Today\'s Reflection', content: 'No entry yet. Take a moment to reflect and write how you feel today.' },
    { title: 'Mood Overview', content: 'You\'ve been feeling great 4 days this week. Keep it up!' },
    { title: 'Reminder', content: 'Take 5 minutes for deep breathing at 4 PM today.' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SignedIn>
        <AppBar position="static" color="inherit">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Reflectly Dashboard</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={toggleTheme} color="inherit">
                {darkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="outlined" sx={{ ml: 2 }}>Login</Button>
                </SignInButton>
              </SignedOut>
            </Box>
          </Toolbar>
        </AppBar>

        <Container sx={{ py: 6 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, textAlign: 'center', color: 'primary.main' }}>
            Welcome Back 💫
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
            Let\'s check in with yourself.
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {cards.map((card, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Paper elevation={3}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{card.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{card.content}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ThemeProvider>
  );
};

export default DashboardPage;