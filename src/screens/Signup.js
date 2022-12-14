import Navbar from "../components/Navbar";
import axios from "axios";
import { format } from "date-fns";

import {
  Grid,
  Paper,
  Avatar,
  TextField,
  FormGroup,
  FormControlLabel,
  Button,
  Typography,
  FormLabel,
  RadioGroup,
  Radio,
  Alert,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  NAME_MIN_LENGTH_ERROR,
  PASSWORDS_DONT_MATCH_ERROR,
  PASSWORD_MIN_LENGTH_ERROR,
  PHONE_NUMBER_ERROR,
  USERNAME_MIN_LENGTH_ERROR,
  ZIPCODE_NUMBER_ERROR,
} from "../constants/Signup";

import "../css/signup.css";

//Requests
import { REGISTER_USER_REQUEST } from "../constants/Requests";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();

  const [error409, setError409] = useState(false);
  const [error400, setError400] = useState(false);

  //alert/error booleans

  const formInitialValues = {
    username: "",
    name: "",
    email: "",
    dob: "",
    gender: "",
    zipcode: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    avatarCloud: "",
  };

  const formValidationSchema = Yup.object().shape({
    username: Yup.string().min(3, USERNAME_MIN_LENGTH_ERROR),
    name: Yup.string().min(3, NAME_MIN_LENGTH_ERROR),
    zipcode: Yup.string().min(5, ZIPCODE_NUMBER_ERROR),
    phoneNumber: Yup.string().min(9, PHONE_NUMBER_ERROR),
    password: Yup.string().min(4, PASSWORD_MIN_LENGTH_ERROR),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      PASSWORDS_DONT_MATCH_ERROR
    ),
  });

  const submitForm = async (values, props) => {
    delete values.confirmPassword;

    values.dob = format(new Date(values.dob), "MM/dd/yyyy ");

    console.log("data", values);

    try {
      const res = await axios.post(REGISTER_USER_REQUEST, values);
      console.log(res);
      props.resetForm();
      navigate("/");
    } catch (error) {
      console.log(error);
      console.log(error.response.status);
      if (error.response.status === 409) setError409(true);
      if (error.response.status === 400) setError400(true);

      window.scrollTo(0, 0);
    }

    // sessionStorage.setItem("loggedInUser", JSON.stringify(values));
  };

  return (
    <>
      <Navbar />
      <Grid container>
        <Paper className="paper" elevation={3}>
          {error409 && (
            <Alert severity="error" className="margin_medium text_center">
              Username already exists
            </Alert>
          )}
          {error400 && (
            <Alert severity="error" className="margin_medium text_center">
              Invalid Request
            </Alert>
          )}

          <Grid align="center">
            <Avatar className="avatar">
              <AddBoxIcon></AddBoxIcon>
            </Avatar>
            <h2 className="margin_large" data-testid="heading">
              Register{" "}
            </h2>
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
                  name="username"
                  label="Username"
                  placeholder="Enter Username"
                  type="text"
                  className="margin_medium"
                  helperText={<ErrorMessage name="username" />}
                  fullWidth
                  required
                />

                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  placeholder="Enter Name"
                  type="text"
                  className="margin_medium"
                  helperText={<ErrorMessage name="name" />}
                  fullWidth
                  required
                />

                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  placeholder="Enter Email"
                  type="email"
                  className="margin_medium"
                  fullWidth
                  required
                />

                <FormGroup>
                  <FormLabel id="demo-radio-buttons-group-label" required>
                    Date of Birth
                  </FormLabel>
                  <Field
                    as={TextField}
                    name="dob"
                    type="date"
                    className="margin_medium"
                    helperText={<ErrorMessage name="dob" />}
                    fullWidth
                    required
                  />
                </FormGroup>

                <FormGroup className="margin_medium">
                  <FormLabel id="demo-radio-buttons-group-label" required>
                    Gender
                  </FormLabel>

                  <Field
                    as={RadioGroup}
                    row
                    name="gender"
                    aria-labelledby="gender-label-radio"
                    defaultValue="male"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio required />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      data-testid="male_radio"
                      control={<Radio required />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio required />}
                      label="Other"
                    />
                  </Field>
                </FormGroup>

                <Field
                  as={TextField}
                  name="zipcode"
                  label="Zipcode"
                  placeholder="Enter Zipcode"
                  helperText={<ErrorMessage name="zipcode" />}
                  className="margin_medium"
                  type="number"
                  fullWidth
                  required
                />

                <Field
                  as={TextField}
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="Enter Phone Number"
                  helperText={<ErrorMessage name="phoneNumber" />}
                  className="margin_medium"
                  type="number"
                  fullWidth
                  required
                />

                <Field
                  as={TextField}
                  name="password"
                  label="Enter Password"
                  data-testid="password_register"
                  placeholder="Enter Password"
                  className="margin_medium"
                  helperText={<ErrorMessage name="password" />}
                  type="password"
                  fullWidth
                  required
                />

                <Field
                  as={TextField}
                  name="confirmPassword"
                  label="Confirm Password"
                  inputProps={{ "data-testid": "confirm_register" }}
                  placeholder="Confirm Password"
                  className="margin_medium"
                  helperText={<ErrorMessage name="confirmPassword" />}
                  type="password"
                  fullWidth
                  required
                />

                <Button
                  variant="contained"
                  data-testid="button_register"
                  type="submit"
                  color="primary"
                  className="margin_medium"
                  disabled={props.isSubmitting}
                  fullWidth
                >
                  {props.isSubmitting ? "Loading" : "Sign up"}
                </Button>
              </Form>
            )}
          </Formik>

          <Typography variant="body1" gutterBottom>
            Already have an account?
            <Link to="/"> Sign In</Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default Signup;
