import React from "react";
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import BugReportIcon from "@mui/icons-material/BugReport";
import DevicesIcon from "@mui/icons-material/Devices";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

const IconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 50,
  height: 50,
  borderRadius: "50%",
  marginBottom: theme.spacing(2),
  background:
    theme.palette.mode === "dark"
      ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`
      : `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 6px 20px rgba(0, 0, 0, 0.3)"
      : "0 6px 20px rgba(58, 134, 255, 0.2)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 10px 25px rgba(0, 0, 0, 0.4)"
        : "0 10px 25px rgba(58, 134, 255, 0.3)",
  },
}));

const getIcon = (iconName) => {
  switch (iconName) {
    case "visualization":
      return <VisibilityIcon sx={{ fontSize: "1.8rem", color: "#fff" }} />;
    case "format":
      return <FormatAlignLeftIcon sx={{ fontSize: "1.8rem", color: "#fff" }} />;
    case "error":
      return <BugReportIcon sx={{ fontSize: "1.8rem", color: "#fff" }} />;
    case "responsive":
      return <DevicesIcon sx={{ fontSize: "1.8rem", color: "#fff" }} />;
    case "data":
      return <DataObjectIcon sx={{ fontSize: "1.8rem", color: "#fff" }} />;
    default:
      return <DataObjectIcon sx={{ fontSize: "1.8rem", color: "#fff" }} />;
  }
};

const FeaturesCard = ({ title, description, icon }) => {
  const theme = useTheme();

  return (
    <Card
      component={motion.div}
      whileHover={{ translateY: -5 }}
      sx={{
        height: "100%",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 4px 20px rgba(0, 0, 0, 0.2)"
            : "0 4px 20px rgba(0, 0, 0, 0.05)",
        transition: "all 0.3s ease",
        border: `1px solid ${theme.palette.divider}`,
        "&:hover": {
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 8px 30px rgba(0, 0, 0, 0.3)"
              : "0 8px 30px rgba(0, 0, 0, 0.1)",
          borderColor:
            theme.palette.mode === "dark"
              ? theme.palette.primary.dark
              : theme.palette.primary.light,
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          p: 3,
        }}
      >
        <IconContainer>{getIcon(icon)}</IconContainer>
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          fontWeight={600}
          sx={{ mb: 1 }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.6 }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeaturesCard;
