import { useState } from "react";
import {
  Typography,
  Box,
  Tabs,
  Tab,
  IconButton,
  Button,
  Tooltip,
  useTheme,
  Divider,
  Chip,
  Switch,
  FormControlLabel,
  Card,
  Paper,
  Fade,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import CodeIcon from "@mui/icons-material/Code";
import DataObjectIcon from "@mui/icons-material/DataObject";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { styled } from "@mui/material/styles";
import { highlightJSON, getJSONHighlightStyles } from "../utils/jsonHighlight";
import JSONTreeViewer from "./JsonTreeViewer";
import { motion } from "framer-motion";

// Custom styled component for pre tag
const StyledPre = styled("pre")(({ theme }) => ({
  margin: 0,
  padding: theme.spacing(2, 3),
  overflow: "auto",
  borderRadius: theme.shape.borderRadius,
  fontFamily:
    theme.typography?.fontFamilyMono ||
    'JetBrains Mono, Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
  fontSize: "0.9rem",
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(30, 30, 30, 0.6)"
      : "rgba(250, 250, 250, 0.8)",
  maxHeight: "65vh",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  lineHeight: 1.5,
  border: `1px solid ${theme.palette.divider}`,
  transition: "all 0.3s",
}));

const ToolButton = styled(IconButton)(({ theme }) => ({
  borderRadius: "8px",
  padding: "8px",
  transition: "all 0.2s",
  color: theme.palette.text.secondary,
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.08)"
        : "rgba(0, 0, 0, 0.05)",
    transform: "translateY(-2px)",
    color: theme.palette.primary.main,
  },
}));

const JSONViewer = ({ jsonData }) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [indentLevel, setIndentLevel] = useState(2);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [colorize, setColorize] = useState(true);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCopy = () => {
    let textToCopy;
    if (tabValue === 0) {
      textToCopy = JSON.stringify(jsonData, null, indentLevel);
    } else {
      textToCopy = JSON.stringify(jsonData);
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    let content;
    if (tabValue === 0) {
      content = JSON.stringify(jsonData, null, indentLevel);
    } else {
      content = JSON.stringify(jsonData);
    }

    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const toggleColorize = () => {
    setColorize(!colorize);
  };

  // render only if we have JSON data
  if (!jsonData) return null;

  const renderStats = () => {
    const stats = calculateJSONStats(jsonData);
    return (
      <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 1 }}>
        <Chip
          label={`${stats.size} bytes`}
          variant="outlined"
          size="small"
          color="primary"
          sx={{
            fontWeight: 500,
            borderRadius: "8px",
            borderWidth: 1.5,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        />
        {stats.keys > 0 && (
          <Chip
            label={`${stats.keys} fields`}
            variant="outlined"
            size="small"
            sx={{
              fontWeight: 500,
              borderRadius: "8px",
              borderWidth: 1.5,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          />
        )}
        {stats.arrays > 0 && (
          <Chip
            label={`${stats.arrays} arrays`}
            variant="outlined"
            size="small"
            sx={{
              fontWeight: 500,
              borderRadius: "8px",
              borderWidth: 1.5,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          />
        )}
        {stats.nested > 0 && (
          <Chip
            label={`${stats.nested} nested objects`}
            variant="outlined"
            size="small"
            sx={{
              fontWeight: 500,
              borderRadius: "8px",
              borderWidth: 1.5,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          />
        )}
      </Box>
    );
  };

  // Calculate some stats about the JSON
  const calculateJSONStats = (json) => {
    const stats = {
      size: JSON.stringify(json).length,
      keys: 0,
      arrays: 0,
      nested: 0,
    };

    const countItems = (obj) => {
      if (Array.isArray(obj)) {
        stats.arrays++;
        obj.forEach((item) => {
          if (typeof item === "object" && item !== null) {
            countItems(item);
          }
        });
      } else if (typeof obj === "object" && obj !== null) {
        const keys = Object.keys(obj);
        stats.keys += keys.length;

        keys.forEach((key) => {
          if (typeof obj[key] === "object" && obj[key] !== null) {
            stats.nested++;
            countItems(obj[key]);
          }
        });
      }
    };

    countItems(json);
    return stats;
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 0 },
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
          <AssessmentIcon
            sx={{
              color: "primary.main",
              fontSize: "1.2rem",
            }}
          />
          JSON Output
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(0, 0, 0, 0.2)"
                : "rgba(0, 0, 0, 0.03)",
            borderRadius: 2,
            p: 0.5,
          }}
        >
          <Tooltip title="Search (Coming Soon)">
            <span>
              <ToolButton disabled>
                <SearchIcon />
              </ToolButton>
            </span>
          </Tooltip>

          <Tooltip title={expanded ? "Collapse" : "Expand"}>
            <ToolButton onClick={toggleExpanded}>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ToolButton>
          </Tooltip>

          <Tooltip title={copied ? "Copied!" : "Copy to Clipboard"}>
            <ToolButton
              onClick={handleCopy}
              sx={{
                color: copied ? "success.main" : "inherit",
              }}
            >
              <ContentCopyIcon />
            </ToolButton>
          </Tooltip>

          <Tooltip title="Download JSON">
            <ToolButton onClick={handleDownload}>
              <DownloadIcon />
            </ToolButton>
          </Tooltip>
        </Box>
      </Box>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mb: 3,
          "& .MuiTabs-indicator": {
            height: 3,
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
          },
        }}
      >
        <Tab
          label="Tree View"
          icon={<DataObjectIcon />}
          iconPosition="start"
          sx={{
            minHeight: 48,
            transition: "all 0.2s",
            "&.Mui-selected": {
              fontWeight: 600,
              color: "primary.main",
            },
          }}
        />
        <Tab
          label="Text View"
          icon={<CodeIcon />}
          iconPosition="start"
          sx={{
            minHeight: 48,
            transition: "all 0.2s",
            "&.Mui-selected": {
              fontWeight: 600,
              color: "primary.main",
            },
          }}
        />
      </Tabs>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {tabValue === 0 && (
            <Box>
              <JSONTreeViewer jsonData={jsonData} />
            </Box>
          )}

          {tabValue === 1 && (
            <Box>
              <Box
                sx={{
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 3,
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  p: 2,
                  borderRadius: 2,
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(0, 0, 0, 0.2)"
                      : "rgba(0, 0, 0, 0.03)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body2" sx={{ mr: 2, fontWeight: 500 }}>
                    Indent:
                  </Typography>
                  <Button
                    size="small"
                    variant={indentLevel === 2 ? "contained" : "outlined"}
                    onClick={() => setIndentLevel(2)}
                    sx={{
                      minWidth: "36px",
                      mr: 1,
                      fontWeight: 600,
                    }}
                  >
                    2
                  </Button>
                  <Button
                    size="small"
                    variant={indentLevel === 4 ? "contained" : "outlined"}
                    onClick={() => setIndentLevel(4)}
                    sx={{
                      minWidth: "36px",
                      fontWeight: 600,
                    }}
                  >
                    4
                  </Button>
                </Box>

                <FormControlLabel
                  control={
                    <Switch
                      checked={colorize}
                      onChange={toggleColorize}
                      size="small"
                      color="primary"
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CodeIcon fontSize="small" sx={{ mr: 0.5 }} />
                      <Typography variant="body2" fontWeight={500}>
                        Syntax Highlighting
                      </Typography>
                    </Box>
                  }
                  sx={{
                    m: 0,
                  }}
                />
              </Box>

              <Paper
                elevation={0}
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  transition: "all 0.3s",
                  "&:hover": {
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  },
                }}
              >
                {colorize ? (
                  <StyledPre
                    dangerouslySetInnerHTML={{
                      __html: highlightJSON(
                        JSON.stringify(jsonData, null, indentLevel),
                        indentLevel
                      ),
                    }}
                  />
                ) : (
                  <StyledPre>
                    {JSON.stringify(jsonData, null, indentLevel)}
                  </StyledPre>
                )}

                {/* Add styling for JSON highlighting */}
                {colorize && (
                  <style
                    dangerouslySetInnerHTML={{
                      __html: getJSONHighlightStyles(theme.palette.mode),
                    }}
                  />
                )}
              </Paper>
            </Box>
          )}

          <Divider sx={{ my: 3 }} />
          {renderStats()}
        </motion.div>
      )}
    </Box>
  );
};

export default JSONViewer;
