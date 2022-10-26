import Navbar from "../components/Navbar";
import Status from "../components/Status";
import NewPost from "../components/NewPost";

import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import "../css/dashboard.css";
import Friends from "../components/Friends";
import Posts from "../components/Posts";
import { useEffect, useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  elevation: 3,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {
  const [index, setIndex] = useState();
  const [name, setName] = useState();
  // const [user, setUser] = useState();

  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    setIndex(sessionStorage.getItem("loggedInUserIndex"));
    setName(JSON.parse(sessionStorage.getItem("loggedInUser")).name);
    // setUser(JSON.parse(sessionStorage.getItem("loggedInUser")));
    console.log(index);
  }, [index]);

  //Functions called from children
  const createNewPost = (postData) => {
    console.log("createNewPost() called from Dashboard", postData);
    setNewPost(postData);
  };

  return (
    <>
      <Navbar loggedInUser={true} />
      <Grid container mt={1} ml={1} spacing={2} className="top_container">
        <Grid item xs={4}>
          <Item>
            <Status name={name} />
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
          <Item>
            {index ? <Friends index={index} /> : <Friends index={-1} />}
          </Item>
        </Grid>

        <Grid item xs={8}>
          <Item>
            {index ? (
              <Posts index={index} newPost={newPost} />
            ) : (
              <Posts index={-1} newPost={newPost} />
            )}
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
