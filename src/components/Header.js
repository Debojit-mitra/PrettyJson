import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Tooltip,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import GitHubIcon from "@mui/icons-material/GitHub";
import MenuIcon from "@mui/icons-material/Menu";
import WebIcon from "@mui/icons-material/Web";
import ThemeToggle from "./ThemeToggle";

const Header = ({ toggleTheme, themeMode }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        borderRadius: 0,
        backdropFilter: "blur(20px)",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.9)"
            : "rgba(30, 30, 30, 0.9)",
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        boxShadow: "none",
        transition: "all 0.3s",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
            height: { xs: 64, md: 70 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 36,
                height: 36,
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
            <Typography
              variant="h6"
              component="div"
              sx={{
                display: { xs: "flex" },
                fontWeight: 700,
                letterSpacing: "-0.01em",
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(90deg, #82b1ff, #ff80ab)"
                    : "linear-gradient(90deg, #3a86ff, #ff006e)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mr: { xs: 1, sm: 2 },
              }}
            >
              PrettyJson
            </Typography>
          </Box>

          {/* Desktop menu */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <ThemeToggle toggleTheme={toggleTheme} mode={themeMode} />
            <Tooltip title="View on GitHub">
              <IconButton
                color={themeMode === "light" ? "action.active" : "inherit"}
                aria-label="github"
                component="a"
                href="https://github.com/Debojit-mitra/PrettyJson"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  transition: "all 0.2s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    color: "primary.main",
                  },
                }}
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="View Portfolio">
              <IconButton
                color={themeMode === "light" ? "action.active" : "inherit"}
                aria-label="portfolio"
                component="a"
                href="https://debojit-mitra.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  transition: "all 0.2s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    color: "primary.main",
                  },
                }}
              >
                <WebIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Mobile menu */}
          <Box sx={{ display: { xs: "flex", sm: "none" }, gap: 1 }}>
            <ThemeToggle toggleTheme={toggleTheme} mode={themeMode} />
            <IconButton
              color={themeMode === "light" ? "action.active" : "inherit"}
              edge="end"
              onClick={handleMobileMenuOpen}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchorEl}
              open={Boolean(mobileMenuAnchorEl)}
              onClose={handleMobileMenuClose}
              PaperProps={{
                elevation: 3,
                sx: {
                  borderRadius: 2,
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
                  mt: 2.5,
                  minWidth: 180,
                  "& .MuiMenuItem-root": {
                    px: 2,
                    py: 1.5,
                    borderRadius: 1,
                    mx: 0.5,
                    mb: 0.5,
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem
                component="a"
                href="https://github.com/Debojit-mitra/PrettyJson"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleMobileMenuClose}
              >
                <GitHubIcon sx={{ mr: 1.5, fontSize: "1.25rem" }} /> View on
                GitHub
              </MenuItem>
              <MenuItem
                component="a"
                href="https://debojit-mitra.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleMobileMenuClose}
              >
                <WebIcon sx={{ mr: 1.5, fontSize: "1.25rem" }} /> My Portfolio
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
