import Navbar from "../components/Navbar";

import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import "../css/dashboard.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  elevation: 3,
  textAlign: "center",
  height: "100%",
  color: theme.palette.text.secondary,
}));

const Prac = () => {
  return (
    <>
      <Navbar />
      <Grid container mt={1} spacing={2} className="top_container">
        <Grid item xs={4}>
          <Item>
            <Typography variant="h5" component="h5">
              Harshit Khanna
            </Typography>

            <Typography
              variant="subtle2"
              component="h6"
              className="margin_medium"
            >
              Hello my name is Harshit and I'm new here!
            </Typography>
            <TextField
              id="status_text"
              className="status_text margin_large"
              label="Status"
              variant="standard"
              fullWidth
            />
            <Button
              className="status_button"
              variant="contained"
              type="submit"
              color="success"
              fullWidth
            >
              Push Status
            </Button>
          </Item>
        </Grid>

        <Grid item xs={8}>
          <Item className="">
            <Grid container spacing={2} className="post_container_1">
              <Grid item xs={12}>
                <TextField
                  className="post_textfield"
                  label="Push a new post"
                  multiline
                  rows={4}
                  placeholder="Push a new post"
                />
              </Grid>
            </Grid>
            <Grid container spacing={4} className="post_container_2">
              <Grid item xs={4} mt={3}>
                <Button
                  className="width_medium"
                  variant="contained"
                  component="label"
                >
                  Upload File
                  <input type="file" hidden />
                </Button>
              </Grid>
              <Grid item xs={4} mt={3}>
                <Button
                  className="width_medium"
                  variant="contained"
                  component="label"
                  color="warning"
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={4} mt={3}>
                <Button
                  className="width_medium"
                  variant="contained"
                  component="label"
                  color="success"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default Prac;
