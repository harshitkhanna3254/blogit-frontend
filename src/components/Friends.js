import Friend from "../components/Friend";

import { Grid, Box, TextField, Button, Typography, Alert } from "@mui/material";
import { getUsers } from "../services/users";
import { useEffect, useState } from "react";
import { getPosts } from "../services/posts";

const Friends = ({ id, getAllPostsByFriends }) => {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [newFriendUsername, setNewFriendUsername] = useState("");
  const [error, setError] = useState(false);

  console.log("id: ", id);
  useEffect(() => {
    // if (!id) {
    //   id = 9;
    // }
    console.log(id);
    setUsers(JSON.parse(sessionStorage.getItem("allUsers")));

    // const setAllUsers = async () => {
    //   const users = await getUsers();
    //   setUsers(users);
    // };
    // setAllUsers();

    if (id > 0) {
      console.log("y");
      var threeBuddies;

      const index = id - 1;
      const id1 = (index + 1) % users.length;
      const id2 = (id1 + 1) % users.length;
      const id3 = (id2 + 1) % users.length;

      threeBuddies = [users[id1], users[id2], users[id3]];

      setFriends(threeBuddies);

      const friendsPosts = (friends) => {
        getAllPostsByFriends(friends);
      };

      setTimeout(() => {
        if (friends.length > 0) {
          friendsPosts(friends);
        }
      }, 100);
    }
  }, [id]);

  useEffect(() => {
    const friendsPostsAdded = (friends) => {
      getAllPostsByFriends(friends);
    };

    setTimeout(() => {
      friendsPostsAdded(friends);
      localStorage.setItem("friendsOfUser", JSON.stringify(friends));
    }, 100);
  }, [friends]);

  const renderFriends = () => {
    console.log(friends, id);
    if (friends) {
      return friends.map((friend, id) => {
        return (
          <Friend
            name={friend.name}
            key={id}
            username={friend.username}
            id={friend.id}
            unfollowFriend={unfollowFriend}
          />
        );
      });
    }
  };

  const addFriend = () => {
    if (newFriendUsername != "") {
      let difference = users
        .filter((x) => !friends.includes(x))
        .filter((x) => x.id != id);

      var errorFlag = false;
      for (let i = 0; i < difference.length; i++) {
        const user = difference[i];
        if (user.username === newFriendUsername) {
          setFriends((current) => [...current, user]);
          setNewFriendUsername("");
          setError(false);
          errorFlag = false;
          break;
        } else {
          errorFlag = true;
        }
      }

      if (errorFlag == true) setError(true);
    }
  };

  const unfollowFriend = (id) => {
    setFriends(
      friends.filter((friend) => {
        return friend.id !== id;
      })
    );
    localStorage.setItem("friendsAfterRemoving", friends);
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
            {error ? <Alert severity="warning">Invalid Friend</Alert> : null}

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
