'use client';

import { useState, useEffect, useMemo } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { getTheme } from '@/lib/theme';
import UniversalAppBar from './components/UniversalAppBar';

export default function ThemeWrapper({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  const theme = useMemo(() => getTheme(darkMode), [darkMode]);
  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UniversalAppBar darkMode={darkMode} toggleTheme={toggleTheme} />
      <Box sx={{ px: 2, py: 4 }}>{children}</Box>
    </ThemeProvider>
  );
}
