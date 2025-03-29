import { Box, Container, Typography, Avatar } from "@mui/material";
import Header from "./Header";
import { motion } from "framer-motion";

const Layout = ({ children, toggleTheme, themeMode }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <Header toggleTheme={toggleTheme} themeMode={themeMode} />
      <Container
        component={motion.main}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        maxWidth="xl"
        sx={{
          flexGrow: 1,
          py: { xs: 2, md: 4 },
        }}
      >
        {children}
      </Container>
      <Box
        component="footer"
        sx={{
          py: { xs: 2, md: 3 },
          px: { xs: 1, md: 2 },
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(30, 30, 30, 0.8)"
              : "rgba(250, 250, 250, 0.8)",
          backdropFilter: "blur(10px)",
          borderTop: 1,
          borderColor: "divider",
          textAlign: "center",
          fontSize: { xs: "0.75rem", md: "0.875rem" },
          color: "text.secondary",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.5,
          }}
        >
          {/* Container for logo and PrettyJson text in horizontal layout */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* Logo Image on the left side */}
            <Box
              sx={{
                width: 30,
                height: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: 1,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 30,
                  height: 30,
                  display: { xs: "flex" },
                  boxShadow: (theme) =>
                    theme.palette.mode === "light"
                      ? "0 4px 12px rgba(58, 134, 255, 0.2)"
                      : "0 4px 12px rgba(0, 0, 0, 0.4)",
                  transition: "all 0.2s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: (theme) =>
                      theme.palette.mode === "light"
                        ? "0 6px 16px rgba(58, 134, 255, 0.3)"
                        : "0 6px 16px rgba(0, 0, 0, 0.5)",
                  },
                }}
              >
                <img
                  src="https://i.ibb.co/zHLZNST4/icon.webp"
                  alt="PrettyJson Logo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Avatar>
            </Box>

            {/* PrettyJson text */}
            <Typography
              variant="h6"
              sx={{
                fontSize: "1rem",
                fontWeight: 700,
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(90deg, #82b1ff, #ff80ab)"
                    : "linear-gradient(90deg, #3a86ff, #ff006e)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.01em",
              }}
            >
              PrettyJson
            </Typography>
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontWeight: 500,
              opacity: 0.8,
            }}
          >
            Made with ❤️ by Debojit • &copy; {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
