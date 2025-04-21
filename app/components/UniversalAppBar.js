'use client';

import React from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Button, Box
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

export default function UniversalAppBar({ darkMode, toggleTheme }) {
  return (
    <AppBar position="static" color="inherit" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Reflectly
        </Typography>
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
  );
}
