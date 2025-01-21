import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

export const Privacy = () => {
  const theme = useTheme();
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: theme.palette.appBar.main,
          color: theme.palette.appBar.contrastText,
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: { xs: "center", sm: "left" } }}
          >
            Forsa-Tech
          </Typography>
          <Button
            component={Link}
            to="/login"
            color="inherit"
            sx={{
              backgroundColor: theme.palette.button.main,
              color: theme.palette.button.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.button.main + "CC",
              },
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          marginTop: "64px",
          flexGrow: 1,
          overflowY: "auto",
          padding: { xs: "10px", sm: "20px" },
        }}
      >
        <Box
          sx={{
            maxWidth: "800px",
            margin: "auto",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            padding: { xs: "15px", sm: "20px" },
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem" },
              color: theme.palette.text.primary,
              marginBottom: "20px",
            }}
          >
            Privacy Policy
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, textAlign: "left" }}
          >
            This privacy policy explains how we handle data in the admin
            dashboard. By using this system, you agree to these rules:
          </Typography>
          <ul
            style={{ lineHeight: "1.8", fontSize: "0.9rem", textAlign: "left" }}
          >
            <li>
              <strong>Data Usage:</strong>The data in this system is only for
              work purposes.
            </li>
            <li>
              <strong>Admin Responsibilities:</strong>Admins must keep user data
              safe and private.
            </li>
            <li>
              <strong>Security:</strong> We use tools to protect user data.
            </li>
            <li>
              <strong>Restrictions:</strong> Misusing data or accessing it
              without permission will have consequences.
            </li>
          </ul>
        </Box>
      </Box>
    </Box>
  );
};
