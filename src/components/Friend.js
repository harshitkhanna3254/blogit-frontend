import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";

import "../css/friend.css";

const Friend = ({ name, status }) => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  return (
    <>
      <Grid item xs={6}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="Default Image"
            height="140"
            image={`https://picsum.photos/id/${getRandomInt(1, 255)}/200/300`}
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
            <Typography variant="body2" color="text.secondary">
              {status}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default Friend;
