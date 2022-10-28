import Navbar from "../components/Navbar";
import Status from "../components/Status";
import NewPost from "../components/NewPost";

import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import "../css/dashboard.css";
import Friends from "../components/Friends";
import Posts from "../components/Posts";
import { useEffect, useState } from "react";
import { getPosts } from "../services/posts";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  elevation: 3,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {
  const [id, setId] = useState();
  const [loggedInUser, setLoggedInUser] = useState({});
  const [newPostData, setNewPostData] = useState({});
  const [postsByFriends, setPostsByFriends] = useState([]);

  useEffect(() => {
    setId(sessionStorage.getItem("loggedInUserIndex"));
    setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedInUser")));
  }, [id]);

  //Functions called from children
  const createNewPost = (postText) => {
    const postData = { postText, postOwner: loggedInUser.name };
    setNewPostData(postData);
  };

  async function getAllPostsByFriends(friends) {
    var p = [];

    for (let i = 0; i < friends.length; i++) {
      const friend = friends[i];
      const newPosts = await getPosts(friend.id);
      const finalPostArr = newPosts.map((post) => ({
        name: friend.name,
        ...post,
      }));
      p.push(...finalPostArr);
    }
    setPostsByFriends(p);
  }

  return (
    <>
      <Navbar loggedInUser={true} />
      <Grid
        container
        mt={1}
        ml={1}
        spacing={2}
        className="top_container"
        data-testid="grid1"
      >
        <Grid item xs={4}>
          <Item>
            <Status name={loggedInUser.name} data-testid="statusComponent" />
          </Item>
        </Grid>

        <Grid item xs={8}>
          <Item>
            <NewPost
              createNewPost={createNewPost}
              data-testid="newPostComponent"
            />
          </Item>
        </Grid>
      </Grid>

      <Grid
        container
        mt={1}
        ml={1}
        spacing={2}
        className="bottom_container"
        data-testid="grid2"
      >
        <Grid item xs={4}>
          <Item data-testid="item2">
            {id ? (
              <Friends
                id={id}
                getAllPostsByFriends={getAllPostsByFriends}
                data-testid="friendComponent"
              />
            ) : (
              <Friends
                getAllPostsByFriends={getAllPostsByFriends}
                data-testid="friendComponentEmpty"
              />
            )}
          </Item>
        </Grid>

        <Grid item xs={8}>
          <Item>
            {id ? (
              <Posts
                loggedInUser={loggedInUser}
                newPostData={newPostData}
                postsByFriends={postsByFriends}
                data-testid="postComponent"
              />
            ) : (
              <Posts
                loggedInUser={loggedInUser}
                newPostData={newPostData}
                postsByFriends={postsByFriends}
                data-testid="postComponentEmpty"
              />
            )}
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
