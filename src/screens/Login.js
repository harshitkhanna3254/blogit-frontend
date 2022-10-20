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
    <Grid container>
      <Paper className="paper" elevation={3}>
        <Grid align="center">
          <Avatar className="avatar margin_small">
            <LockIcon></LockIcon>
          </Avatar>
          <h2 className="margin_large">Log In</h2>
        </Grid>

        <TextField
          error
          id="outlined-error-helper-text"
          className="margin_medium"
          label="Username"
          placeholder="Enter Username"
          helperText="Incorrect entry."
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
            label="Label"
          />
          <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
        </FormGroup>

        <Button
          className="margin_medium"
          variant="contained"
          type="submit"
          color="primary"
          fullWidth
        >
          Continue
        </Button>
        <Typography className="margin_small" variant="body1" gutterBottom>
          <Link href="#">Forgot Password</Link>
        </Typography>
        <Typography className="margin_small" variant="body1" gutterBottom>
          Don't have an account?
          <Link to="/signup"> Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
