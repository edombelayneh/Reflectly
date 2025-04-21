'use client';

import React, { useState } from 'react';
import {
  Box, Container, Typography, TextField, Button, Grid,
  useMediaQuery, useTheme, Paper
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

export default function JournalPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const router = useRouter();

  const handleAddEntry = () => {
    if (newEntry.trim()) {
      const entry = {
        text: newEntry,
        date: new Date().toLocaleString(),
      };
      setEntries([entry, ...entries]);
      setNewEntry('');
    }
  };

  return (
    <Container sx={{ py: 6 }}>
      <SignedIn>
        {/* Back Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              fontFamily: theme.typography.fontFamily,
              borderRadius: 30,
              bgcolor: theme.palette.primary.main,
              color: theme.palette.text.primary,
              '&:hover': {
                bgcolor: '#F8C9C2',
              }
            }}
          >
            Back
          </Button>
        </Box>

        {/* Journal Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: theme.palette.text.primary,
            fontFamily: theme.typography.fontFamily,
            textAlign: 'center'
          }}
        >
          Reflectly Journal
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            mb: 4,
            color: theme.palette.text.secondary,
            textAlign: 'center',
            fontFamily: theme.typography.fontFamily
          }}
        >
          A soft, safe space to reflect and grow 🌸
        </Typography>

        {/* Entry Form */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 5,
            bgcolor: theme.palette.background.paper,
            borderRadius: theme.components.MuiPaper?.styleOverrides?.root?.borderRadius,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ mb: 1.5, fontWeight: 600, fontFamily: theme.typography.fontFamily }}
          >
            How are you feeling today?
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={isMobile ? 4 : 6}
            variant="outlined"
            placeholder="Write your thoughts here..."
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            sx={{
              bgcolor: theme.palette.background.default,
              borderRadius: 2,
              fontFamily: theme.typography.fontFamily,
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
              }
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleAddEntry}
              startIcon={<AddCircleOutlineIcon />}
              sx={{
                borderRadius: theme.components.MuiButton?.styleOverrides?.root?.borderRadius,
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                fontFamily: theme.typography.fontFamily,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.text.primary,
                '&:hover': {
                  bgcolor: '#F8C9C2',
                }
              }}
            >
              Save Entry
            </Button>
          </Box>
        </Paper>

        {/* Entries Section */}
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: 600,
            color: theme.palette.text.primary,
            fontFamily: theme.typography.fontFamily
          }}
        >
          Your Entries 💭
        </Typography>

        {entries.length === 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontFamily: theme.typography.fontFamily, textAlign: 'center', mt: 2 }}
          >
            No entries yet — your thoughts are safe here when you're ready.
          </Typography>
        )}

        <Grid container spacing={3}>
          {entries.map((entry, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 2.5,
                  borderRadius: theme.components.MuiPaper?.styleOverrides?.root?.borderRadius,
                  height: '100%',
                  bgcolor: theme.palette.background.paper,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  gutterBottom
                  sx={{ fontFamily: theme.typography.fontFamily }}
                >
                  {entry.date}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    whiteSpace: 'pre-line',
                    fontWeight: 400,
                    fontFamily: theme.typography.fontFamily,
                    color: theme.palette.text.primary
                  }}
                >
                  {entry.text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </SignedIn>

      {/* Signed Out Message */}
      <SignedOut>
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <Typography variant="h6" gutterBottom sx={{ fontFamily: theme.typography.fontFamily }}>
            Please sign in to access your journal
          </Typography>
          <SignInButton mode="modal">
            <Button
              variant="contained"
              sx={{
                mt: 1,
                borderRadius: theme.components.MuiButton?.styleOverrides?.root?.borderRadius,
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                fontFamily: theme.typography.fontFamily,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.text.primary,
                '&:hover': {
                  bgcolor: '#F8C9C2',
                }
              }}
            >
              Sign In
            </Button>
          </SignInButton>
        </Box>
      </SignedOut>
    </Container>
  );
}

