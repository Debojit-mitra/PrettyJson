// src/pages/index.js - Modified to improve error handling
import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  useTheme,
  Container,
  Grid,
  Chip,
} from "@mui/material";
import JSONInput from "../src/components/JsonInput";
import JSONViewer from "../src/components/JsonViewer";
import CodeIcon from "@mui/icons-material/Code";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InfoIcon from "@mui/icons-material/Info";
import FeaturesCard from "../src/components/FeaturesCard";
import { motion } from "framer-motion";

export default function Home() {
  const theme = useTheme();
  const [jsonData, setJsonData] = useState(null);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleJSONChange = (data) => {
    setJsonData(data);
    // Optionally switch to the output tab when valid JSON is entered
    if (data && !error) {
      setTabValue(1);
    }
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ pb: 4 }}>
      {/* Hero Section */}
      <Container maxWidth="lg" component="section">
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
            py: { xs: 2, md: 4 },
          }}
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Typography
            variant="h4"
            component="h1"
            fontWeight={700}
            sx={{
              mb: 1,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(45deg, #82b1ff 30%, #ff80ab 90%)"
                  : "linear-gradient(45deg, #3a86ff 30%, #ff006e 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
            }}
          >
            Beautiful JSON Formatting Tool
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
              maxWidth: "800px",
              mx: "auto",
              mb: 2,
              opacity: 0.8,
            }}
          >
            Easily view, format, and analyze your JSON data with a modern,
            intuitive interface. Perfect for developers, data analysts, and
            anyone working with JSON.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Chip
              label="Format"
              color="primary"
              size="small"
              sx={{ fontWeight: 600 }}
            />
            <Chip
              label="Validate"
              size="small"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.tertiary,
                backgroundColor: "#5a67d8",
              }}
            />
            <Chip
              label="Analyze"
              color="secondary"
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Box>
        </Box>
      </Container>

      {/* Removed the top-level error alert */}

      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        sx={{
          maxWidth: "lg",
          mx: "auto",
          px: { xs: 2, sm: 0 },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            mb: 4,
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(145deg, rgba(35,35,39,1) 0%, rgba(32,32,36,1) 100%)"
                : "linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(250,250,252,1) 100%)",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 8px 32px rgba(0, 0, 0, 0.3)"
                : "0 8px 32px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              sx={{
                "& .MuiTabs-indicator": {
                  height: 3,
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                },
              }}
            >
              <Tab
                icon={<CodeIcon />}
                label="Input"
                iconPosition="start"
                sx={{
                  py: 2.5,
                  fontWeight: tabValue === 0 ? 700 : 500,
                  transition: "all 0.3s",
                  fontSize: "1rem",
                }}
              />
              <Tab
                icon={<VisibilityIcon />}
                label="Output"
                iconPosition="start"
                disabled={!jsonData}
                sx={{
                  py: 2.5,
                  fontWeight: tabValue === 1 ? 700 : 500,
                  transition: "all 0.3s",
                  fontSize: "1rem",
                }}
              />
            </Tabs>
          </Box>

          <Box role="tabpanel" hidden={tabValue !== 0} sx={{ p: 0 }}>
            {tabValue === 0 && (
              <JSONInput
                onJSONChange={handleJSONChange}
                onError={handleError}
              />
            )}
          </Box>

          <Box role="tabpanel" hidden={tabValue !== 1} sx={{ p: 0 }}>
            {tabValue === 1 && jsonData && <JSONViewer jsonData={jsonData} />}
          </Box>
        </Paper>
      </Box>

      {/* Features Section */}
      <Container
        maxWidth="lg"
        component={motion.section}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        sx={{
          mt: 8,
          pb: 4,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h5"
            component="h2"
            fontWeight={700}
            sx={{ mb: 1 }}
          >
            <InfoIcon
              sx={{
                mr: 0.5,
                mb: 0.2,
                fontSize: "1.5rem",
                verticalAlign: "text-bottom",
                color: "primary.main",
              }}
            />
            Why Use PrettyJson?
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: "700px",
              mx: "auto",
              mb: 4,
              opacity: 0.8,
            }}
          >
            Our modern JSON formatter makes working with data simple and
            enjoyable.
          </Typography>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <FeaturesCard
              title="Beautiful Visualization"
              description="Interactive tree view and syntax highlighting for easy JSON navigation."
              icon="visualization"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeaturesCard
              title="Advanced Formatting"
              description="Customize indentation and export your formatted JSON with one click."
              icon="format"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeaturesCard
              title="Error Detection"
              description="Immediate feedback with clear error messages and position indicators."
              icon="error"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
