import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../services/users";
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
} from "@mui/material";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { PASSWORD_MIN_LENGTH_ERROR } from "../constants/Login";

import LockIcon from "@mui/icons-material/Lock";
import "../css/login.css";

const Login = () => {
  var users;

  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers().then((res) => {
      console.log(res.data);
      // setFriends(res.data);
      users = res.data;
    }, []);
  });

  const formInitialValues = {
    username: "",
    password: "",
  };

  const formValidationSchema = Yup.object().shape({
    password: Yup.string().min(4, PASSWORD_MIN_LENGTH_ERROR),
  });

  const submitForm = ({ username, password }, props) => {
    // console.log(values, props);
    // console.log(username, password, props);

    for (let index = 0; index < users.length; index++) {
      let user = users[index];
      if (username === user.username) {
        if (password === user.address.street) {
          // console.log("Login success");
          sessionStorage.setItem("loggedInUser", JSON.stringify(user));
          sessionStorage.setItem("loggedInUserIndex", JSON.stringify(index));
          navigate("/dashboard");
          break;
        }
      }
    }

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
                  placeholder="Enter Password"
                  className="margin_medium"
                  name="password"
                  helperText={<ErrorMessage name="password" />}
                  type="password"
                  fullWidth
                  required
                />

                <FormGroup className="margin_medium">
                  <FormLabel id="">Terms and Conditions</FormLabel>

                  <Field
                    as={FormControlLabel}
                    name="termsAndConditions"
                    aria-labelledby="tnc-checkbox-label"
                    label="I agree to the Terms and Conditions"
                    required
                    control={
                      <Checkbox
                        defaultChecked
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
                  type="submit"
                  color="primary"
                  className="margin_medium"
                  disabled={props.isSubmitting}
                  fullWidth
                >
                  {props.isSubmitting ? "Loading" : "Sign up"}
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
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
