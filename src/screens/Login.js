import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../services/users";
import { useNavigate } from "react-router-dom";

import {
  Grid,
  Paper,
  Avatar,
  TextField,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Checkbox,
  Button,
  Typography,
  Alert,
} from "@mui/material";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { PASSWORD_MIN_LENGTH_ERROR } from "../constants/Login";

import LockIcon from "@mui/icons-material/Lock";
import "../css/login.css";

const Login = () => {
  const [users, setUsers] = useState([]);

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
      sessionStorage.setItem("allUsers", JSON.stringify(fetchedUsers));
    }
    fetchUsers();
  }, []);

  const formInitialValues = {
    username: "",
    password: "",
  };

  const formValidationSchema = Yup.object().shape({
    password: Yup.string().min(4, PASSWORD_MIN_LENGTH_ERROR),
  });

  const submitForm = ({ username, password }, props) => {
    users.map((user) => {
      if (username === user.username) {
        if (password === user.address.street) {
          sessionStorage.setItem("loggedInUser", JSON.stringify(user));
          sessionStorage.setItem("loggedInUserIndex", JSON.stringify(user.id));
          navigate("/dashboard");
          return;
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
    });

    // for (let index = 0; index < users.length; index++) {
    //   let user = users[index];

    // }

    props.resetForm();
  };

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

          <Formik
            initialValues={formInitialValues}
            validationSchema={formValidationSchema}
            onSubmit={submitForm}
          >
            {(props) => (
              <Form>
                <Field
                  as={TextField}
                  id="name_login"
                  className="margin_medium"
                  label="Username"
                  name="username"
                  placeholder="Username"
                  helperText={<ErrorMessage name="username" />}
                  type="text"
                  fullWidth
                  required
                />

                <Field
                  as={TextField}
                  label="Password"
                  id="password_login"
                  placeholder="Enter Password"
                  className="margin_medium"
                  name="password"
                  helperText={<ErrorMessage name="password" />}
                  type="password"
                  fullWidth
                  required
                />

                <FormGroup className="margin_medium">
                  <FormLabel id="" required>
                    Terms and Conditions
                  </FormLabel>

                  <Field
                    as={FormControlLabel}
                    name="termsAndConditions"
                    aria-labelledby="tnc-checkbox-label"
                    label="I agree to the Terms and Conditions"
                    required
                    control={
                      <Checkbox
                        defaultChecked
                        required
                        name="checkbox"
                        color="success"
                      />
                    }
                  ></Field>
                </FormGroup>

                {/* <Link
                  to="/dashboard"
                  style={{ textDecoration: "none", color: "white" }}
                > */}
                <Button
                  variant="contained"
                  data-testid="button_login"
                  type="submit"
                  color="primary"
                  className="margin_medium"
                  disabled={props.isSubmitting}
                  fullWidth
                >
                  {props.isSubmitting ? "Loading" : "Log In"}
                </Button>
                {/* </Link> */}
              </Form>
            )}
          </Formik>

          <Typography className="margin_small" variant="body1" gutterBottom>
            <Link to="/">Forgot Password</Link>
          </Typography>
          <Typography className="margin_small" variant="body1" gutterBottom>
            Don't have an account?
            <Link to="/signup"> Sign Up</Link>
          </Typography>
          {error ? <Alert severity="warning">Invalid Credentials</Alert> : null}
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
