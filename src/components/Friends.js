import Friend from "../components/Friend";

import { Grid, Box, TextField, Button, Typography, Alert } from "@mui/material";
import { getUsers } from "../services/users";
import { useEffect, useState } from "react";
import { getPosts } from "../services/posts";
import axios from "axios";
import { FOLLOWING_REQUEST, LOGIN_REQ_OPTIONS } from "../constants/Requests";

const Friends = ({ getAllPosts }) => {
  const [friends, setFriends] = useState([]);
  const [newFriendUsername, setNewFriendUsername] = useState("");

  //error state
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    const getFollowing = async () => {
      console.log("Friends main useEffect called");
      const { data } = await axios.get(FOLLOWING_REQUEST, LOGIN_REQ_OPTIONS);
      console.log(data.following);

      setFriends(data.following);
    };

    getFollowing();
  }, []);

  useEffect(() => {
    console.log("Friends temp useEffect called");

    const friendsPostsAdded = (friends) => {
      getAllPosts(friends);
    };

    if (friends.length > 0) {
      setTimeout(() => {
        friendsPostsAdded(friends);
      }, 100);
    }
  }, [friends]);

  const renderFriends = () => {
    console.log("Render friends", friends);
    if (friends.length > 0) {
      return friends.map((friend, id) => {
        return (
          <Friend
            name={friend.name}
            key={id}
            username={friend.username}
            avatar={friend.avatar}
            id={friend.id}
            unfollowFriend={unfollowFriend}
          />
        );
      });
    }
  };

  const addFriend = async () => {
    console.log("Add friend called with ", newFriendUsername);
    try {
      const { data } = await axios.put(
        FOLLOWING_REQUEST + `/${newFriendUsername}`,
        {},
        LOGIN_REQ_OPTIONS
      );
      setError(false);
      setErrorText("");
      setFriends(data.following);
      setNewFriendUsername("");
    } catch (error) {
      console.log(error);
      setError(true);
      setErrorText(error.response.data.message);
    }
  };

  const unfollowFriend = async (username) => {
    console.log("Unfollow friend called");
    try {
      const { data } = await axios.delete(
        FOLLOWING_REQUEST + `/${username}`,
        LOGIN_REQ_OPTIONS
      );
      setFriends(data.following);

      //For tests
      localStorage.setItem("friendsAfterRemoving", data.following);
    } catch (error) {
      setError(true);
      setErrorText(error.response.data.message);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          align="center"
          mt={1}
          mb={2}
          gutterBottom
          variant="h5"
          component="div"
        >
          Friends
        </Typography>

        <Grid container spacing={2} data-testid="friends_parent">
          {renderFriends()}
          <Grid container spacing={3} mt={4} ml={2}>
            {error && <Alert severity="warning">{errorText}</Alert>}

            <Grid item xs={6} mb={2}>
              <TextField
                label="Enter username"
                value={newFriendUsername}
                onChange={(e) => {
                  setNewFriendUsername(e.target.value);
                }}
                placeholder="Enter username"
              />
            </Grid>

            <Grid item xs={6}>
              <Button
                className="width_medium"
                variant="outlined"
                component="label"
                color="success"
                inputProps={{ "data-testid": "add_user" }}
                onClick={() => addFriend()}
                style={{
                  fontSize: "24px",
                }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Friends;
