// lib/theme.js
import { createTheme } from '@mui/material/styles';

export const getTheme = (darkMode) =>
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
              root: { borderRadius: 10, padding: '20px' },
            },
          },
          MuiToolbar: {
            styleOverrides: {
              root: {
                minHeight: 48,
                '@media (min-width:600px)': {
                  minHeight: 48,
                },
              },
            },
          },
        },
      });