import Navbar from "../components/Navbar";
import Status from "../components/Status";
import NewPost from "../components/NewPost";

import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import "../css/dashboard.css";
import Friends from "../components/Friends";
import Posts from "../components/Posts";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  elevation: 3,
  textAlign: "center",
  height: "100%",
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {
  var newPost = {};

  //Functions called from children
  const createNewPost = (postData) => {
    console.log("createNewPost() called from Dashboard", postData);
    newPost = postData;
    console.log(newPost);
  };

  return (
    <>
      <Navbar />
      <Grid container mt={1} ml={1} spacing={2} className="top_container">
        <Grid item xs={4}>
          <Item>
            <Status />
          </Item>
        </Grid>

        <Grid item xs={8}>
          <Item>
            <NewPost createNewPost={createNewPost} />
          </Item>
        </Grid>
      </Grid>

      <Grid container mt={1} ml={1} spacing={2} className="bottom_container">
        <Grid item xs={4}>
          <Paper>
            <Friends />
          </Paper>
        </Grid>

        <Grid item xs={8}>
          <Item>
            <Posts newPost={newPost} />
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
