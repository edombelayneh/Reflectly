'use client';

import React, { useState } from 'react';
import {
  Box, Container, Typography, TextField, Button,
  Slider, Radio, RadioGroup, FormControlLabel, FormLabel,
  IconButton, useTheme
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

export default function MoodCheckInPage() {
  const [feeling, setFeeling] = useState('');
  const [time, setTime] = useState(15);
  const [energy, setEnergy] = useState('medium');
  const router = useRouter();
  const theme = useTheme();

  const handleSubmit = () => {
    localStorage.setItem('moodData', JSON.stringify({ feeling, time, energy }));
    router.push('/moodboard');
  };

  return (
    <Container sx={{ py: 6 }}>
      {/* Back Button */}
      <IconButton onClick={() => router.back()} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>

      <Typography variant="h4" gutterBottom>
        Mood Check-In
      </Typography>

      <Box sx={{ my: 3 }}>
        <Typography variant="h6">How are you feeling today?</Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="I'm feeling anxious but hopeful..."
          value={feeling}
          onChange={(e) => setFeeling(e.target.value)}
          sx={{ mt: 1 }}
        />
      </Box>

      <Box sx={{ my: 3 }}>
        <Typography variant="h6">How much time do you have? (in minutes)</Typography>
        <Slider
          value={time}
          min={5}
          max={60}
          step={5}
          valueLabelDisplay="auto"
          onChange={(e, val) => setTime(val)}
        />
      </Box>

      <Box sx={{ my: 3 }}>
        <FormLabel component="legend">What’s your energy level?</FormLabel>
        <RadioGroup
          row
          value={energy}
          onChange={(e) => setEnergy(e.target.value)}
        >
          <FormControlLabel value="low" control={<Radio />} label="Low" />
          <FormControlLabel value="medium" control={<Radio />} label="Medium" />
          <FormControlLabel value="high" control={<Radio />} label="High" />
        </RadioGroup>
      </Box>

      <Button
        variant="contained"
        disabled={!feeling}
        onClick={handleSubmit}
        sx={{ borderRadius: 4, mt: 3 }}
      >
        Continue
      </Button>
    </Container>
  );
}
