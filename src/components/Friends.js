import Friend from "../components/Friend";

import { Grid, Box, TextField, Button, Typography } from "@mui/material";
import { getUsers } from "../services/users";
import { useEffect, useState } from "react";

const Friends = () => {
  const [friends, setFriends] = useState();
  const [newFriend, setNewFriend] = useState("");

  useEffect(() => {
    getUsers(0, 3).then((res) => {
      console.log(res.data);
      setFriends(res.data);
    });
  }, []);

  const renderFriends = () => {
    console.log("rendering freinds");
    if (friends) {
      return friends.map((friend, id) => {
        return <Friend name={friend.name} city={friend.address.city} />;
      });
    } else {
      return <Friend name="default" city="default" />;
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
          sx={
            {
              // color: "success.main",
            }
          }
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
                style={{
                  //   maxWidth: "50px",
                  //   maxHeight: "50px",
                  //   minWidth: "50px",
                  //   minHeight: "50px",
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
