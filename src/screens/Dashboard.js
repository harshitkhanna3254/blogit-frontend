import Navbar from "../components/Navbar";
import Status from "../components/Status";
import NewPost from "../components/NewPost";

import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import "../css/dashboard.css";
import Friends from "../components/Friends";
import Posts from "../components/Posts";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  ARTICLES_REQUEST,
  ARTICLES_REQUEST_EFFICIENT,
  LOGIN_REQ_OPTIONS,
} from "../constants/Requests";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  elevation: 3,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [newPostData, setNewPostData] = useState({});
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedInUser")));
    const friends = [];
    getAllPosts(friends);
    // console.log("Dashboard main UE", loggedInUser);
  }, []);

  //Functions called from children
  const createNewPost = async (postInput, image) => {
    console.log("Create new post called with ", postInput, image);

    var postData;
    if (image) {
      postData = {
        body: postInput,
        name: loggedInUser.name,
        image,
      };
    } else {
      postData = {
        body: postInput,
        name: loggedInUser.name,
      };
    }

    try {
      const { data } = await axios.post(
        ARTICLES_REQUEST,
        postData,
        LOGIN_REQ_OPTIONS
      );
      console.log(data);
      setAllPosts((current) => [data, ...current]);
      // console.log("Create new post finished", allPosts);
    } catch (error) {
      console.log(error);
    }
  };

  async function getAllPosts(friends) {
    // console.log("getAllPosts method called from Dashboard");

    // await getArticlesEfficient(friends);

    // const postsBySelf = await getSelfPosts();
    // var postsByFriends;
    // for (const friend of friends) {
    //   const { data } = await axios.get(
    //     ARTICLES_REQUEST + `/${friend.username}`,
    //     LOGIN_REQ_OPTIONS
    //   );
    //   postsByFriends = { ...postsByFriends, ...data.articles };
    // }
    // // console.log(typeof postsByFriends);
    // const postsByFriendsArr = Object.values(postsByFriends);
    // const allPostsArr = [...postsBySelf, ...postsByFriendsArr];
    // console.log("Get all posts finished", allPostsArr);

    var allValidUsers = [];
    allValidUsers.push(loggedInUser.username);

    friends.map((friend) => {
      allValidUsers.push(friend.username);
    });

    console.log(allValidUsers);

    const { data } = await axios.post(
      ARTICLES_REQUEST_EFFICIENT,
      { requestedUsers: allValidUsers },
      LOGIN_REQ_OPTIONS
    );

    // console.log(data.articles);
    setAllPosts(data.articles);
  }

  const getUpdatedPostData = (updatedArticle) => {
    console.log(updatedArticle);

    var temp = allPosts;

    const idx = temp.findIndex((post) => post._id === updatedArticle._id);
    console.log(idx);

    temp[idx] = updatedArticle;
    console.log(temp);
    setAllPosts([...temp]);
  };

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
            <Friends getAllPosts={getAllPosts} data-testid="friendComponent" />
          </Item>
        </Grid>

        <Grid item xs={8}>
          <Item>
            <Posts
              loggedInUser={loggedInUser}
              newPostData={newPostData}
              allPosts={allPosts}
              getUpdatedPostData={getUpdatedPostData}
              data-testid="postComponentEmpty"
            />
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
