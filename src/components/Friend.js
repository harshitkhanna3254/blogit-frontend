import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

import "../css/friend.css";

const Friend = ({ name, username, unfollowFriend, avatar }) => {
  return (
    <>
      <Grid item xs={6}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="Default Image"
            height="140"
            image={avatar}
          />
          <CardContent>
            <Typography
              align="center"
              gutterBottom
              variant="h5"
              component="div"
            >
              {name}
            </Typography>
            <Typography
              align="center"
              gutterBottom
              variant="subtle3"
              component="div"
            >
              ({username})
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="warning"
              data-testid="button_removeFriend"
              onClick={() => {
                unfollowFriend(username);
              }}
            >
              Unfollow
            </Button>
            <Button size="small">Message</Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default Friend;
