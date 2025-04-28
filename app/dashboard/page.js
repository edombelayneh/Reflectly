'use client';

import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Box, Grid, Paper, CssBaseline,
  Fab, Menu, MenuItem, useMediaQuery, IconButton
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Add as AddIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material';
import axios from 'axios';

const DashboardPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const router = useRouter();
  const theme = useTheme();

  const [journalEntry, setJournalEntry] = useState('');
  const [moodStats, setMoodStats] = useState('');
  const [goalStatus, setGoalStatus] = useState('');
  const [affirmation, setAffirmation] = useState('Loading affirmation...');
  const [reminder, setReminder] = useState('');

  useEffect(() => {
    setDarkMode(prefersDarkMode);

    // Load stored local data
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

    setReminder("Take 5 minutes to breathe this afternoon."); // Static reminder

    // Fetch new AI affirmation
    fetchAffirmation();
  }, [prefersDarkMode]);

  const fetchAffirmation = async () => {
    try {
      const response = await axios.post('/api/ask', {
        userInput: `Give me a fresh motivational affirmation in one short sentence. Respond in strict JSON format like { "quote": "Your affirmation here." }`
      });

      let aiAffirmation = '';
      try {
        const parsed = JSON.parse(response.data.aiResponse);
        aiAffirmation = parsed.quote || "You are doing better than you think.";
      } catch (err) {
        console.error('Failed to parse AI affirmation response:', response.data.aiResponse);
        aiAffirmation = "You are doing better than you think.";
      }

      setAffirmation(aiAffirmation);
    } catch (error) {
      console.error('Failed to fetch new affirmation:', error.message);
      setAffirmation("You are growing, even if it's not obvious yet."); // fallback
    }
  };

  const toggleTheme = () => setDarkMode(!darkMode);

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
      content: (
        <Box>
          <Typography variant="body2" color="text.secondary">{affirmation}</Typography>
          <IconButton onClick={fetchAffirmation} size="small" sx={{ mt: 1 }}>
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Box>
      )
    },
    {
      title: "Goal Tracker",
      content: goalStatus || "No goal progress yet. Set one to get started!"
    }
  ];

  const [anchorEl, setAnchorEl] = useState(null);
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
              <Paper elevation={3} sx={{ p: 2, minHeight: 150, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{card.title}</Typography>
                {typeof card.content === 'string' ? (
                  <Typography variant="body2" color="text.secondary">{card.content}</Typography>
                ) : (
                  card.content
                )}
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


