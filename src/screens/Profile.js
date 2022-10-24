import Navbar from "../components/Navbar";

import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PasswordIcon from "@mui/icons-material/Password";
import "../css/profile.css";
import {
  NAME_MIN_LENGTH_ERROR,
  PASSWORD_MIN_LENGTH_ERROR,
  PHONE_NUMBER_ERROR,
} from "../constants/Signup";
import { useEffect, useState } from "react";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("ProfileUE called");

    const userData = JSON.parse(sessionStorage.getItem("loggedInUser"));
    setName(userData.name);
    setEmail(userData.email);
    setPhoneNumber(userData.phone.slice(0, 13));
    setPassword(userData.address.street);

    console.log(userData);
  }, []);

  const formInitialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  };

  const formValidationSchema = Yup.object().shape({
    name: Yup.string().min(3, NAME_MIN_LENGTH_ERROR),
    phoneNumber: Yup.string().min(10, PHONE_NUMBER_ERROR),

    password: Yup.string().min(4, PASSWORD_MIN_LENGTH_ERROR),
  });

  const submitForm = (values, props) => {
    console.log(values, props);

    const { name, email, phoneNumber, password } = values;

    if (name !== "") setName(values.name);

    if (email !== "") setEmail(values.email);

    if (phoneNumber !== "") setPhoneNumber(values.phoneNumber);

    if (password !== "") setPassword(values.password);

    props.resetForm();
  };

  return (
    <div>
      <Navbar loggedInUser={true} />

      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={3}>
            <Grid item>
              <Paper className="paper_profile" elevation={3}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="120"
                    image="/public/images/default_person.png"
                    className="margin_medium"
                    alt="default_image"
                  />
                  <CardContent>
                    <Button
                      variant="contained"
                      type="submit"
                      color="success"
                      fullWidth
                      size="small"
                    >
                      Upload Image
                    </Button>
                  </CardContent>
                </Card>

                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <BadgeIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Name" secondary={name} />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <EmailIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Email" secondary={email} />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <LocalPhoneIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Phone Number"
                      secondary={phoneNumber}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PasswordIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Password" secondary={password} />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            <Grid item>
              <Paper className="paper_profile" elevation={3}>
                <Grid align="center">
                  <Avatar className="avatar margin_medium">
                    <AddBoxIcon></AddBoxIcon>
                  </Avatar>
                  <h2 className="margin_large">Update Your Info</h2>
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
                        size="small"
                      />

                      <Field
                        as={TextField}
                        name="email"
                        label="Email"
                        placeholder="Enter Email"
                        type="email"
                        className="margin_medium"
                        fullWidth
                        size="small"
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
                        size="small"
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
                        size="small"
                      />

                      <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        className="margin_medium"
                        disabled={props.isSubmitting}
                        fullWidth
                        size="small"
                      >
                        {props.isSubmitting ? "Loading" : "Update"}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
