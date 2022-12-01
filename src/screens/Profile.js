import Navbar from "../components/Navbar";

import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Card,
  CardMedia,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Alert,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PasswordIcon from "@mui/icons-material/Password";
import HomeIcon from "@mui/icons-material/Home";
import "../css/profile.css";
import {
  GENDER_MAX_LENGTH_ERROR,
  NAME_MIN_LENGTH_ERROR,
  PHONE_NUMBER_ERROR,
  ZIPCODE_NUMBER_ERROR,
} from "../constants/Signup";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  AVATAR_REQUEST,
  EMAIL_REQUEST,
  GENDER_REQUEST,
  IMG_LOGIN_REQ_OPTIONS,
  LOGIN_REQ_OPTIONS,
  NAME_REQUEST,
  PHONE_NUMBER_REQUEST,
  PROFILE_REQUEST,
  ZIPCODE_REQUEST,
} from "../constants/Requests";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [gender, setGender] = useState("");
  const [zipcode, setZipcode] = useState("");

  //Image (outside formik)
  const [avatar, setAvatar] = useState("");

  //error states
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    const getProfileData = async () => {
      const { data } = await axios.get(PROFILE_REQUEST, LOGIN_REQ_OPTIONS);
      console.log("Profile UE", data);

      setName(data.name);
      setEmail(data.email);
      setPhoneNumber(data.phoneNumber);
      setGender(data.gender);
      setZipcode(data.zipcode);
      setAvatar(data.avatarCloud.url);
    };

    getProfileData();
  }, [name, email, phoneNumber, gender, zipcode]);

  const formInitialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    gender: "",
    zipcode: "",
  };

  const formValidationSchema = Yup.object().shape({
    name: Yup.string().min(3, NAME_MIN_LENGTH_ERROR),
    phoneNumber: Yup.string().min(10, PHONE_NUMBER_ERROR),

    gender: Yup.string().max(20, GENDER_MAX_LENGTH_ERROR),
    zipcode: Yup.string().min(4, ZIPCODE_NUMBER_ERROR),
  });

  const submitForm = async (values, props) => {
    const { name, email, phoneNumber, gender, zipcode } = values;

    try {
      if (name !== "") {
        const { data } = await axios.put(
          NAME_REQUEST,
          { name },
          LOGIN_REQ_OPTIONS
        );
        setName(data.name);
      }

      if (email !== "") {
        const { data } = await axios.put(
          EMAIL_REQUEST,
          { email },
          LOGIN_REQ_OPTIONS
        );
        setEmail(data.email);
      }

      if (phoneNumber !== "") {
        const { data } = await axios.put(
          PHONE_NUMBER_REQUEST,
          { phoneNumber },
          LOGIN_REQ_OPTIONS
        );
        setPhoneNumber(data.phoneNumber);
      }

      if (gender !== "") {
        const { data } = await axios.put(
          GENDER_REQUEST,
          { gender },
          LOGIN_REQ_OPTIONS
        );
        setGender(data.gender);
      }

      if (zipcode !== "") {
        console.log("Update zipcode", zipcode);
        const { data } = await axios.put(
          ZIPCODE_REQUEST,
          { zipcode },
          LOGIN_REQ_OPTIONS
        );
        setZipcode(data.zipcode);
      }

      if (avatar !== "") {
        console.log("Upload image _64", avatar);

        const { data } = await axios.put(
          AVATAR_REQUEST,
          { avatar },
          LOGIN_REQ_OPTIONS
        );
        console.log(data);
        setAvatar(data.avatar.url);
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setErrorText(error.message || error.response.data.message);
    }
    props.resetForm();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    transformFile(file);
  };

  const transformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      console.log("Converting file to _64");
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
    } else {
      setAvatar("");
    }
  };

  return (
    <div>
      <Navbar loggedInUser={true} />

      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={3}>
            <Grid item>
              <Paper className="paper_profile" elevation={3}>
                <div className="image_container">
                  <img
                    src={avatar}
                    alt="Avatar will appear here"
                    className="image_avatar"
                  ></img>
                  {/* {avatarImg ? (
                   
                  ) : (
                    <p>Avatar will appear here</p>
                  )} */}
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="small"
                  component="label"
                  className="margin_small"
                >
                  Upload Image
                  <input
                    type="file"
                    accept="image/"
                    onChange={handleImageUpload}
                    hidden
                  />
                </Button>
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
                    <ListItemText
                      data-testid="name_text_profile"
                      primary="Name"
                      secondary={name}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <EmailIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      data-testid="email_text_profile"
                      primary="Email"
                      secondary={email}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <LocalPhoneIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      data-testid="phone_text_profile"
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
                    <ListItemText
                      data-testid="password_text_profile"
                      primary="Gender"
                      secondary={gender}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <HomeIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Zipcode" secondary={zipcode} />
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
                  {error && (
                    <Alert
                      severity="error"
                      className="margin_medium text_center"
                    >
                      {errorText}
                    </Alert>
                  )}
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
                        inputProps={{ "data-testid": "name_profile" }}
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
                        inputProps={{ "data-testid": "email_profile" }}
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
                        inputProps={{ "data-testid": "phone_profile" }}
                        helperText={<ErrorMessage name="phoneNumber" />}
                        className="margin_medium"
                        type="number"
                        fullWidth
                        size="small"
                      />

                      <Field
                        as={TextField}
                        name="gender"
                        label="Gender"
                        placeholder="Enter Gender"
                        className="margin_medium"
                        helperText={<ErrorMessage name="gender" />}
                        type="text"
                        fullWidth
                        size="small"
                      />

                      <Field
                        as={TextField}
                        name="zipcode"
                        label="Zipcode"
                        placeholder="Enter Zipcode"
                        className="margin_medium"
                        helperText={<ErrorMessage name="zipcode" />}
                        type="number"
                        fullWidth
                        size="small"
                      />

                      <Button
                        variant="contained"
                        type="submit"
                        color="success"
                        data-testid="button_profile"
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
