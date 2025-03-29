import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  useTheme,
  Tooltip,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

const TreeContainer = styled(Box)(({ theme }) => ({
  fontFamily:
    theme.typography?.fontFamilyMono ||
    'JetBrains Mono, Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
  [theme.breakpoints.up("xs")]: {
    fontSize: "0.7rem",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "0.80rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "0.85rem",
  },
  lineHeight: 1.5,
  padding: theme.spacing(1, 1.5),
  maxHeight: "65vh",
  overflow: "auto",
  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(30, 30, 30, 0.6)"
      : "rgba(250, 250, 250, 0.8)",
  border: `1px solid ${theme.palette.divider}`,
}));

const NodeContainer = styled(motion.div)(({ theme, level }) => ({
  position: "relative",
  paddingLeft: theme.spacing(level > 0 ? level * 1.5 : 0),
  marginLeft: level > 0 ? theme.spacing(0.25) : 0,
}));

const Key = styled("span")(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#F8C555" : "#881391",
  marginRight: theme.spacing(0.5),
  fontWeight: 500,
}));

const String = styled("span")(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#7EC699" : "#108040",
}));

const Number = styled("span")(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#F08D49" : "#1C00CF",
}));

const Boolean = styled("span")(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#CC99CD" : "#1C00CF",
}));

const Null = styled("span")(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#CC99CD" : "#1C00CF",
  fontStyle: "italic",
}));

const Bracket = styled("span")(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.mode === "dark" ? "#E8E8E8" : "#333333",
}));

const TreeNode = ({ keyName, value, level = 0, isLast = false }) => {
  const [expanded, setExpanded] = useState(level < 2);
  const [copied, setCopied] = useState(false);
  const isObject = value !== null && typeof value === "object";
  const isArray = Array.isArray(value);
  const theme = useTheme();

  const toggleExpand = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const copyValue = (e) => {
    e.stopPropagation();
    const valueToCopy = JSON.stringify(value, null, 2);
    navigator.clipboard.writeText(valueToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const renderNodeValue = () => {
    if (value === null) {
      return <Null>null</Null>;
    }

    if (typeof value === "string") {
      return <String>"{value}"</String>;
    }

    if (typeof value === "number") {
      return <Number>{value}</Number>;
    }

    if (typeof value === "boolean") {
      return <Boolean>{value.toString()}</Boolean>;
    }

    if (isArray) {
      return (
        <>
          <Bracket>Array[{value.length}]</Bracket>
        </>
      );
    }

    if (isObject) {
      const keys = Object.keys(value);
      return (
        <>
          <Bracket>Object{keys.length > 0 ? `{${keys.length}}` : "{}"}</Bracket>
        </>
      );
    }

    return String(value);
  };

  const renderCollapsibleContent = () => {
    if (!isObject || !expanded) return null;

    const entries = isArray
      ? value.map((item, index) => [index, item])
      : Object.entries(value);

    return (
      <Collapse in={expanded} timeout={300}>
        <Box>
          {entries.map(([key, val], index) => (
            <TreeNode
              key={key}
              keyName={key}
              value={val}
              level={level + 1}
              isLast={index === entries.length - 1}
            />
          ))}
        </Box>
      </Collapse>
    );
  };

  return (
    <NodeContainer
      level={level}
      isLast={isLast}
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.2,
        delay: level * 0.03,
      }}
    >
      <Box
        onClick={toggleExpand}
        sx={{
          display: "flex",
          alignItems: "center",
          py: 0.25,
          pl: isObject ? 0 : 1,
          borderRadius: 1,
          position: "relative",
          "&:hover": {
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.03)",
            "& .copy-button": {
              opacity: 1,
            },
            cursor: "pointer",
          },
        }}
      >
        {isObject && (
          <IconButton
            size="small"
            sx={{
              p: 0.1,
              mr: 0.25,
              color: "text.secondary",
              display: "flex",
              alignItems: "center",
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: "transparent",
                color: "primary.main",
              },
            }}
          >
            {expanded ? (
              <KeyboardArrowDownIcon fontSize="small" />
            ) : (
              <KeyboardArrowRightIcon fontSize="small" />
            )}
          </IconButton>
        )}

        <Box
          sx={{
            pt: 0.25,
            flex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          {keyName !== undefined && (
            <>
              <Key>"{keyName}"</Key>:
            </>
          )}
          {renderNodeValue()}
        </Box>

        {isObject && (
          <Tooltip title={copied ? "Copied!" : "Copy value"}>
            <IconButton
              size="small"
              onClick={copyValue}
              className="copy-button"
              sx={{
                p: 0.25,
                ml: 0.5,
                opacity: 0,
                transition: "all 0.2s",
                color: copied ? "success.main" : "text.secondary",
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.05)",
                },
              }}
            >
              <ContentCopyIcon sx={{ fontSize: "0.85rem" }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {renderCollapsibleContent()}
    </NodeContainer>
  );
};

const JSONTreeViewer = ({ jsonData }) => {
  const theme = useTheme();

  if (!jsonData) return null;

  return (
    <TreeContainer>
      <TreeNode value={jsonData} />
    </TreeContainer>
  );
};

export default JSONTreeViewer;
