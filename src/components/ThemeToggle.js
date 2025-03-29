import { IconButton, Tooltip, useTheme as useMUITheme } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { motion } from "framer-motion";

const ThemeToggle = ({ toggleTheme, mode }) => {
  const theme = useMUITheme();

  return (
    <Tooltip
      title={mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <IconButton
        color={mode === "light" ? "action.active" : "inherit"}
        onClick={toggleTheme}
        aria-label="toggle theme"
        sx={{
          transition: "all 0.2s",
          "&:hover": {
            transform: "translateY(-2px)",
            color: "primary.main",
          },
        }}
      >
        {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
