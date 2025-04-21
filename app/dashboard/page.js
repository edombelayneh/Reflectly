'use client';

import React from 'react';
import {
  Container, Typography, Box, Grid, Paper, CssBaseline,
  AppBar, Toolbar, IconButton, Button, useMediaQuery, Fab, Menu, MenuItem
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LightMode, DarkMode, Add as AddIcon } from '@mui/icons-material';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material';

const DashboardPage = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const router = useRouter();
  const theme = useTheme();

  const [journalEntry, setJournalEntry] = React.useState('');
  const [moodStats, setMoodStats] = React.useState('');
  const [goalStatus, setGoalStatus] = React.useState('');
  const [affirmation, setAffirmation] = React.useState('');
  const [reminder, setReminder] = React.useState('');

  React.useEffect(() => {
    setDarkMode(prefersDarkMode);

    // Load real data
    const storedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    if (storedEntries.length) {
      setJournalEntry(storedEntries[0].text);
    }

    const storedMood = JSON.parse(localStorage.getItem('moodData'));
    if (storedMood?.energy) {
      setMoodStats(`You've had ${storedMood.energy} energy lately. Stay mindful!`);
    }

    const storedGoal = localStorage.getItem('gratitudeGoalDays');
    if (storedGoal) {
      setGoalStatus(`You're ${storedGoal} days into your gratitude habit.`);
    }

    setAffirmation("You are growing, even if it's not obvious yet.");
    setReminder("Take 5 minutes to breathe this afternoon.");
  }, [prefersDarkMode]);


  

  const cards = [
    {
      title: "Today’s Reflection",
      content: journalEntry || "No entry yet. Take a moment to reflect and write how you feel today."
    },
    {
      title: "Mood Overview",
      content: moodStats || "Check in to see your mood trends."
    },
    {
      title: "Reminder",
      content: reminder
    },
    {
      title: "Recent Entries",
      content: journalEntry ? `Your last journal entry: "${journalEntry}"` : "No journal entries yet."
    },
    {
      title: "Daily Affirmation",
      content: affirmation
    },
    {
      title: "Goal Tracker",
      content: goalStatus || "No goal progress yet. Set one to get started!"
    }
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelect = (option) => {
    handleClose();
    if (option === 'journal') router.push('/journal');
    else if (option === 'checkIn') router.push('/moodCheckIn');
    else if (option === 'care') router.push('/selfcare');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
  
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, textAlign: 'center', color: 'primary.main' }}>
          Welcome Back 💫
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
          Let's check in with yourself.
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

      <Fab
        sx={{
          position: 'fixed',
          top: 150,
          right: 30,
          zIndex: 999,
          backgroundColor: darkMode ? '#FAE1DD' : '#FCD5CE',
          color: darkMode ? '#1A1A1A' : '#6D6875',
          '&:hover': {
            backgroundColor: darkMode ? '#f5c6bc' : '#F8C9C2'
          }
        }}
        aria-label="add"
        onClick={handleClick}
      >
        <AddIcon />
      </Fab>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => handleSelect("journal")}>✍️ New Journal Entry</MenuItem>
        <MenuItem onClick={() => handleSelect("checkIn")}>🧘 Mood Check-In</MenuItem>
        <MenuItem onClick={() => handleSelect("care")}>🎯 Self-Care</MenuItem>
      </Menu>
    </ThemeProvider>
  );
};

export default DashboardPage;
