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
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import "../css/signup.css";
import {
  NAME_MIN_LENGTH_ERROR,
  PASSWORDS_DONT_MATCH_ERROR,
  PASSWORD_MIN_LENGTH_ERROR,
  PHONE_NUMBER_ERROR,
} from "../constants/Signup";

const Signup = () => {
  const formInitialValues = {
    name: "",
    email: "",
    gender: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const formValidationSchema = Yup.object().shape({
    name: Yup.string().min(3, NAME_MIN_LENGTH_ERROR),
    phoneNumber: Yup.string()
      .min(10, PHONE_NUMBER_ERROR)
      .max(10, PHONE_NUMBER_ERROR),
    password: Yup.string().min(8, PASSWORD_MIN_LENGTH_ERROR),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      PASSWORDS_DONT_MATCH_ERROR
    ),
  });

  const submitForm = (values, props) => {
    console.log(values, props);
  };

  return (
    <Grid container>
      <Paper className="paper" elevation={3}>
        <Grid align="center">
          <Avatar className="avatar">
            <AddBoxIcon></AddBoxIcon>
          </Avatar>
          <h2 className="margin_large">Register</h2>
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

              <FormGroup className="margin_medium">
                <FormLabel id="demo-radio-buttons-group-label">
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
                label="Password"
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
                placeholder="Confirm Password"
                className="margin_medium"
                helperText={<ErrorMessage name="confirmPassword" />}
                type="password"
                fullWidth
                required
              />

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
            </Form>
          )}
        </Formik>

        <Typography variant="body1" gutterBottom>
          Already have an account?
          <Link to="/"> Sign In</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Signup;
