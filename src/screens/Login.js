import Navbar from "../components/Navbar";

import {
  Grid,
  Paper,
  Avatar,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";

import "../css/login.css";

const Login = () => {
  return (
    <>
      <Navbar />
      <Grid container>
        <Paper className="paper_login" elevation={3}>
          <Grid align="center">
            <Avatar className="avatar margin_small">
              <LockIcon></LockIcon>
            </Avatar>
            <h2 className="margin_large">Log In</h2>
          </Grid>

          <TextField
            id="outlined-error-helper-text"
            className="margin_medium"
            label="Username"
            placeholder="Enter Username"
            type="text"
            fullWidth
            required
          />

          <TextField
            label="Password"
            placeholder="Enter Password"
            className="margin_medium"
            type="password"
            fullWidth
            required
          />

          <FormGroup className="margin_medium">
            <FormControlLabel
              control={
                <Checkbox
                  name="checkbox"
                  color="success"
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="I accept the terms and conditions"
            />
          </FormGroup>

          <Link
            to="/dashboard"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button
              className="margin_medium"
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
            >
              Continue
            </Button>
          </Link>

          <Typography className="margin_small" variant="body1" gutterBottom>
            <Link to="/">Forgot Password</Link>
          </Typography>
          <Typography className="margin_small" variant="body1" gutterBottom>
            Don't have an account?
            <Link to="/signup"> Sign Up</Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
