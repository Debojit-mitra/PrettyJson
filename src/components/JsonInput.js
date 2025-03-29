// This modified version of JsonInput.js centralizes error display
import { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
  Tooltip,
  useTheme,
  Card,
  CardContent,
  Collapse,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import DeleteIcon from "@mui/icons-material/Delete";
import SampleIcon from "@mui/icons-material/AutoAwesome";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { validateJSON } from "../utils/jsonUtils";
import { styled } from "@mui/material/styles";

// Custom styled code editor
const CodeEditor = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    fontFamily: theme.typography?.fontFamilyMono,
    fontWeight: 400,
    fontSize: "0.9rem",
    lineHeight: 1.5,
    transition: "all 0.3s",
    "&:hover": {
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    },
    "&.Mui-focused": {
      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.06)",
  },
  "& .MuiInputBase-multiline": {
    padding: theme.spacing(2),
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  padding: "10px 18px",
  transition: "all 0.2s",
  textTransform: "none",
  fontWeight: 600,
  "&:hover": {
    transform: "translateY(-2px)",
  },
}));

const JSONInput = ({ onJSONChange, onError }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const [showTip, setShowTip] = useState(false);
  const theme = useTheme();

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (error) {
      setError(null);
      onError(null);
    }
  };

  const handleSubmit = () => {
    try {
      if (!inputValue.trim()) {
        const errorMessage = "Please enter some JSON data";
        setError(errorMessage);
        onError(errorMessage);
        return;
      }

      const result = validateJSON(inputValue);
      if (result.valid) {
        onJSONChange(result.parsed);
        // keeping the input value here instead of clearing it
        setError(null);
        onError(null);
      } else {
        setError(result.error);
        onError(result.error);
      }
    } catch (err) {
      const errorMessage = "Invalid JSON: " + err.message;
      setError(errorMessage);
      onError(errorMessage);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        setInputValue(content);

        // Validate the JSON immediately after loading
        const result = validateJSON(content);
        if (result.valid) {
          onJSONChange(result.parsed);
          setError(null);
          onError(null);
        } else {
          setError(result.error);
          onError(result.error);
        }
      } catch (error) {
        const errorMessage = "Error reading file: " + error.message;
        setError(errorMessage);
        onError(errorMessage);
      }
    };
    reader.readAsText(file);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputValue(text);

      // Optionally validate on paste
      const result = validateJSON(text);
      if (result.valid) {
        onJSONChange(result.parsed);
        setError(null);
        onError(null);
      }
    } catch (err) {
      const errorMessage = "Failed to paste from clipboard";
      setError(errorMessage);
      onError(errorMessage);
    }
  };

  const handleClear = () => {
    setInputValue("");
    setError(null);
    onError(null);
  };

  const loadSampleJSON = async () => {
    try {
      const response = await fetch("/api/sample");
      const data = await response.json();
      const formatted = JSON.stringify(data, null, 2);
      setInputValue(formatted);
      onJSONChange(data);
      setError(null);
      onError(null);
    } catch (err) {
      const errorMessage = "Failed to load sample JSON";
      setError(errorMessage);
      onError(errorMessage);
    }
  };

  const toggleTip = () => {
    setShowTip(!showTip);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="600"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <PlayArrowIcon sx={{ color: "primary.main", fontSize: "1.2rem" }} />
          JSON Editor
        </Typography>
        <Tooltip title="Show tips">
          <IconButton onClick={toggleTip} size="small">
            <HelpOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Collapse in={showTip}>
        <Card
          variant="outlined"
          sx={{
            mb: 2,
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(130, 177, 255, 0.05)"
                : "rgba(58, 134, 255, 0.05)",
            borderColor:
              theme.palette.mode === "dark"
                ? "rgba(130, 177, 255, 0.2)"
                : "rgba(58, 134, 255, 0.2)",
          }}
        >
          <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Tip:</strong> Enter or paste your JSON data here. You can
              use the Load Sample button to see an example. The editor will
              auto-format your JSON when valid.
            </Typography>
          </CardContent>
        </Card>
      </Collapse>

      {/* Show error alert only inside the JSON input section */}
      {error && (
        <Alert
          severity="error"
          variant="filled"
          sx={{
            mb: 2,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(211, 47, 47, 0.2)",
            "& .MuiAlert-icon": {
              opacity: 1,
            },
          }}
        >
          {error}
        </Alert>
      )}

      <CodeEditor
        fullWidth
        multiline
        rows={10}
        variant="outlined"
        placeholder="Enter or paste your JSON here..."
        value={inputValue}
        onChange={handleChange}
        error={!!error}
        InputProps={{
          endAdornment: inputValue && (
            <InputAdornment position="end">
              <Tooltip title="Clear">
                <IconButton
                  onClick={handleClear}
                  edge="end"
                  sx={{
                    transition: "all 0.2s",
                    "&:hover": {
                      color: "error.main",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: error ? "error.main" : "divider",
              borderWidth: error ? 2 : 1,
            },
          },
        }}
      />

      <Box
        sx={{
          mt: 3,
          display: "flex",
          gap: 1.5,
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        <ActionButton
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          startIcon={<PlayArrowIcon />}
          sx={{
            flexGrow: { xs: 1, sm: 0 },
            boxShadow: (theme) =>
              theme.palette.mode === "light"
                ? "0 4px 12px rgba(58, 134, 255, 0.25)"
                : "0 4px 12px rgba(0, 0, 0, 0.3)",
            "&:hover": {
              boxShadow: (theme) =>
                theme.palette.mode === "light"
                  ? "0 6px 16px rgba(58, 134, 255, 0.35)"
                  : "0 6px 16px rgba(0, 0, 0, 0.4)",
            },
          }}
        >
          Parse JSON
        </ActionButton>

        <ActionButton
          variant="outlined"
          component="label"
          startIcon={<UploadFileIcon />}
          sx={{
            flexGrow: { xs: 1, sm: 0 },
            borderWidth: 1.5,
          }}
        >
          Upload File
          <input
            type="file"
            accept=".json"
            hidden
            onChange={handleFileUpload}
          />
        </ActionButton>

        <ActionButton
          variant="outlined"
          startIcon={<ContentPasteIcon />}
          onClick={handlePaste}
          sx={{
            flexGrow: { xs: 1, sm: 0 },
            borderWidth: 1.5,
          }}
        >
          Paste
        </ActionButton>

        <ActionButton
          variant="outlined"
          startIcon={<SampleIcon />}
          onClick={loadSampleJSON}
          sx={{
            flexGrow: { xs: 1, sm: 0 },
            borderWidth: 1.5,
          }}
        >
          Load Sample
        </ActionButton>
      </Box>
    </Box>
  );
};

export default JSONInput;
