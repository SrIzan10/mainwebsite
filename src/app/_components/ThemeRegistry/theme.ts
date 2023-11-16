import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Check if window is defined before accessing its properties
const prefersDarkMode = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null;

// Add event listener only if prefersDarkMode is defined
if (prefersDarkMode) {
  prefersDarkMode.addEventListener('change', () => {
    location.reload();
  });
}

const theme = createTheme({
  palette: {
    mode: prefersDarkMode && prefersDarkMode.matches ? 'dark' : 'light',
    background: {
      default: prefersDarkMode && prefersDarkMode.matches ? '#0d0d0d' : '#fafafa',
      paper: prefersDarkMode && prefersDarkMode.matches ? '#0d0d0d' : '#fafafa',
    },
    primary: {
      main: '#646cff',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
