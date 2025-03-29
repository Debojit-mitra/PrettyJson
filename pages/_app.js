// src/pages/_app.js
import { useState, useEffect } from "react";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { ThemeProvider as MUIThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "../styles/theme";
import Layout from "../src/components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true);

    // Initialize theme based on user's preference
    const savedTheme = localStorage.getItem("theme") || "light";
    setCurrentTheme(savedTheme === "dark" ? darkTheme : lightTheme);

    // Listen for theme changes
    const handleStorageChange = () => {
      const theme = localStorage.getItem("theme") || "light";
      setCurrentTheme(theme === "dark" ? darkTheme : lightTheme);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = currentTheme.palette.mode === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setCurrentTheme(newTheme === "dark" ? darkTheme : lightTheme);
  };

  if (!mounted) {
    // Prevents theme flash on initial load
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <MUIThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Head>
          <title>PrettyJson</title>
          <meta
            name="description"
            content="A simple, professional JSON viewer"
          />
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Layout toggleTheme={toggleTheme} themeMode={currentTheme.palette.mode}>
          <Component {...pageProps} />
        </Layout>
      </MUIThemeProvider>
    </ThemeProvider>
  );
}

export default MyApp;
