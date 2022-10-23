import * as React from "react";
import { useEffect, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    setLoggedInUser(sessionStorage.getItem("loggedInUserIndex"));
  });

  const logout = () => {
    console.log("logout");
    sessionStorage.clear();
    setLoggedInUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="success">
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog-It
          </Typography>

          {loggedInUser ? (
            <>
              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "white" }}
              >
                Profile
                <Button color="inherit"></Button>
              </Link>
              <Link
                to="/"
                style={{ textDecoration: "none", color: "white" }}
                onClick={() => {
                  logout();
                }}
              >
                Log Out
                <Button color="inherit"></Button>
              </Link>
            </>
          ) : (
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Login
              <Button color="inherit"></Button>
            </Link>
          )}
          {/* <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Login
            <Button color="inherit"></Button>
          </Link> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
