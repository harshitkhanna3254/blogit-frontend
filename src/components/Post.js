import * as React from "react";

import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
} from "@mui/material";

const Post = ({ id, body, img, name, title }) => {
  const firstUrl = "https://picsum.photos/id/";
  const secondUrl = "/200/300";
  const imgUrl = `${firstUrl}${id}${secondUrl}`;

  return (
    <>
      <Grid item xs={4}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="Default Image"
            height="140"
            image={imgUrl}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {body}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="warning">
              Edit
            </Button>
            <Button size="small">Comment</Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default Post;
