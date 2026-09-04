import { createTheme } from '@mui/material/styles';

/**
 * Design tokens derived from the brand navy #141B4D.
 * Exported separately so components can reach for a shade directly
 * without going through the palette.
 */
export const navy = {
  900: '#0d1235',
  800: '#141b4d',
  700: '#1e2860',
  600: '#2a3470',
  500: '#3d4889',
  400: '#5a6398',
  300: '#8b92b8',
  200: '#b8bdd4',
  100: '#dfe2ed',
  50: '#eef0f6',
  25: '#f5f6fa',
} as const;

/** Light blue hairline separating the sidebar from the content. */
export const SIDEBAR_DIVIDER = '#d7e4f5';

export const accent = {
  redBg: '#fdecec',
  redFg: '#9a3033',
  blueBg: '#e5effa',
  blueFg: '#1f4d80',
  greenBg: '#e9f2ec',
  greenFg: '#2f5c3c',
  yellowBg: '#faf2dd',
  yellowFg: '#856200',
} as const;

export const fonts = {
  sans: '"Lexend", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
  mono: '"JetBrains Mono", "SF Mono", Consolas, "Courier New", monospace',
} as const;

export const SIDEBAR_WIDTH = 268;

export const theme = createTheme({
  palette: {
    primary: { main: navy[800], dark: navy[900], light: navy[600] },
    secondary: { main: navy[400] },
    background: { default: '#ffffff', paper: '#ffffff' },
    text: { primary: '#16192e', secondary: '#4a4f6b' },
    divider: '#e3e6f0',
  },

  shape: { borderRadius: 8 },

  typography: {
    fontFamily: fonts.sans,
    h2: {
      fontFamily: fonts.sans,
      fontSize: 'clamp(28px, 3.4vw, 38px)',
      lineHeight: 1.16,
      letterSpacing: '-0.028em',
      fontWeight: 600,
      color: navy[800],
    },
    h3: {
      fontFamily: fonts.sans,
      fontSize: 22,
      lineHeight: 1.3,
      letterSpacing: '-0.02em',
      fontWeight: 600,
      color: navy[800],
    },
    h4: {
      fontSize: 15.5,
      fontWeight: 600,
      letterSpacing: '-0.012em',
      color: navy[800],
    },
    body1: { fontSize: 15.5, lineHeight: 1.72, color: '#4a4f6b' },
    body2: { fontSize: 14, lineHeight: 1.68, color: '#4a4f6b' },
    button: { textTransform: 'none', fontWeight: 500 },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // Clears the sticky title bar when jumping to an anchor.
        html: { scrollBehavior: 'smooth', scrollPaddingTop: 88 },
        body: { WebkitFontSmoothing: 'antialiased' },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 6 } },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { border: '1px solid #e3e6f0', borderRadius: 8 },
      },
    },
  },
});
