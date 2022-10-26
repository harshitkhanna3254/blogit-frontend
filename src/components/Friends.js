import Friend from "../components/Friend";

import { Grid, Box, TextField, Button, Typography } from "@mui/material";
import { getUsers } from "../services/users";
import { useEffect, useState } from "react";

const Friends = ({ index }) => {
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState("");

  useEffect(() => {
    // console.log("Index of Logged In user received", index);
    if (index > 0) {
      console.log("Fetchind 3 friends of user " + index);
      getUsers().then((res) => {
        const friends = [
          res.data[(index + 1) % 10],
          res.data[(index + 2) % 10],
          res.data[(index + 3) % 10],
        ];
        setFriends(friends);
      });
    }
  }, [index]);

  const addFriend = () => {
    console.log("Adding friend");
    setFriends((current) => [...current, { name: newFriend }]);
    setNewFriend("");
  };

  const renderFriends = () => {
    if (friends) {
      console.log(friends);
      return friends.map((friend, id) => {
        return (
          <Friend
            name={friend.name}
            key={id}
            id={friend.id}
            unfollowFriend={unfollowFriend}
          />
        );
      });
    }
  };

  const unfollowFriend = (id) => {
    console.log("Unfollow friends", id);
    setFriends(
      friends.filter((friend) => {
        return friend.id !== id;
      })
    );
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

        <Grid container spacing={2}>
          {renderFriends()}
          <Grid container spacing={3} mt={4} ml={2}>
            <Grid item xs={6} mb={2}>
              <TextField
                label="Add a new Friend"
                value={newFriend}
                onChange={(e) => {
                  setNewFriend(e.target.value);
                }}
                placeholder="Add a new friend"
              />
            </Grid>

            <Grid item xs={6}>
              <Button
                className="width_medium"
                variant="outlined"
                component="label"
                color="success"
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
