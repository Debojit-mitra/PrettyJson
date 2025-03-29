import { createTheme } from "@mui/material/styles";

// Create a theme instance for light mode
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3a86ff", // More vibrant blue
      light: "#63a4ff",
      dark: "#0059ff",
    },
    secondary: {
      main: "#ff006e", // Vibrant pink
      light: "#ff5c8d",
      dark: "#c50052",
    },
    success: {
      main: "#38b000", // Vibrant green
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#212529",
      secondary: "#495057",
      tertiary: "#fff",
    },
    divider: "rgba(0, 0, 0, 0.08)",
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.025em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.025em",
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.025em",
    },
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h5: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    h6: {
      fontWeight: 600,
      letterSpacing: "-0.005em",
    },
    subtitle1: {
      fontWeight: 500,
      letterSpacing: 0,
    },
    subtitle2: {
      fontWeight: 500,
      letterSpacing: 0,
    },
    body1: {
      letterSpacing: 0,
    },
    body2: {
      letterSpacing: 0,
    },
    button: {
      fontWeight: 600,
      letterSpacing: "0.01em",
    },
    fontFamilyMono:
      'JetBrains Mono, Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 600,
          boxShadow: "none",
          padding: "8px 16px",
          "&:hover": {
            boxShadow: "0 4px 8px -2px rgba(0, 0, 0, 0.1)",
          },
        },
        containedPrimary: {
          "&:hover": {
            boxShadow: "0 6px 12px -3px rgba(58, 134, 255, 0.3)",
          },
        },
        containedSecondary: {
          "&:hover": {
            boxShadow: "0 6px 12px -3px rgba(255, 0, 110, 0.3)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.06)",
        },
        elevation2: {
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          backgroundImage: "none",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: "none",
        },
        indicator: {
          height: 3,
          borderRadius: "3px 3px 0 0",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          padding: "12px 16px",
          minHeight: 56,
          transition: "all 0.2s",
          "&.Mui-selected": {
            fontWeight: 700,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            transition: "all 0.2s",
            "&:hover": {
              boxShadow: "0 4px 8px -2px rgba(0, 0, 0, 0.08)",
            },
            "&.Mui-focused": {
              boxShadow: "0 4px 8px -2px rgba(58, 134, 255, 0.2)",
            },
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          padding: 8,
        },
        track: {
          borderRadius: 12,
        },
        thumb: {
          boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
          overflow: "hidden",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "all 0.2s",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            transform: "translateY(-1px)",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 6,
          fontSize: "0.75rem",
        },
      },
    },
  },
  transitions: {
    duration: {
      shortest: 100,
      shorter: 150,
      short: 200,
      standard: 250,
      complex: 300,
      enteringScreen: 225,
      leavingScreen: 175,
    },
  },
});

// Create a theme instance for dark mode
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#82b1ff", // Vibrant blue
      light: "#adcbff",
      dark: "#5686ff",
    },
    secondary: {
      main: "#ff80ab", // Vibrant pink
      light: "#ffb2ca",
      dark: "#ff4081",
    },
    success: {
      main: "#5cff5c", // Vibrant green
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.8)",
      tertiary: "rgba(0, 0, 0, 0.87)",
    },
    divider: "rgba(255, 255, 255, 0.08)",
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.025em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.025em",
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.025em",
    },
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h5: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    h6: {
      fontWeight: 600,
      letterSpacing: "-0.005em",
    },
    subtitle1: {
      fontWeight: 500,
      letterSpacing: 0,
    },
    subtitle2: {
      fontWeight: 500,
      letterSpacing: 0,
    },
    body1: {
      letterSpacing: 0,
    },
    body2: {
      letterSpacing: 0,
    },
    button: {
      fontWeight: 600,
      letterSpacing: "0.01em",
    },
    fontFamilyMono:
      'JetBrains Mono, Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 600,
          boxShadow: "none",
          padding: "8px 16px",
          "&:hover": {
            boxShadow: "0 4px 8px -2px rgba(0, 0, 0, 0.2)",
          },
        },
        containedPrimary: {
          "&:hover": {
            boxShadow: "0 6px 12px -3px rgba(130, 177, 255, 0.4)",
          },
        },
        containedSecondary: {
          "&:hover": {
            boxShadow: "0 6px 12px -3px rgba(255, 128, 171, 0.4)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: "none",
        },
        elevation1: {
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
        },
        elevation2: {
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
          backgroundImage: "none",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: "none",
        },
        indicator: {
          height: 3,
          borderRadius: "3px 3px 0 0",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          padding: "12px 16px",
          minHeight: 56,
          transition: "all 0.2s",
          "&.Mui-selected": {
            fontWeight: 700,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            transition: "all 0.2s",
            "&:hover": {
              boxShadow: "0 4px 8px -2px rgba(0, 0, 0, 0.25)",
            },
            "&.Mui-focused": {
              boxShadow: "0 4px 8px -2px rgba(130, 177, 255, 0.3)",
            },
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          padding: 8,
        },
        track: {
          borderRadius: 12,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        },
        thumb: {
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "all 0.2s",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            transform: "translateY(-1px)",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 6,
          fontSize: "0.75rem",
          backgroundColor: "rgba(97, 97, 97, 0.92)",
        },
      },
    },
  },
  transitions: {
    duration: {
      shortest: 100,
      shorter: 150,
      short: 200,
      standard: 250,
      complex: 300,
      enteringScreen: 225,
      leavingScreen: 175,
    },
  },
});
