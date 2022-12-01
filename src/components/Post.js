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
import TransitionsModal from "./TransitionsModal";
import TransitionsModalComment from "./TransitionsModalComment";

const Post = ({ id, author, name, body, img, comments, getUpdatedArticle }) => {
  const sendUpdatedArticleToParent = (updatedArticle) => {
    getUpdatedArticle(updatedArticle);
  };

  return (
    <>
      <Grid item xs={4}>
        <Card sx={{ maxWidth: 345, height: "300px" }}>
          <CardMedia
            component="img"
            alt="No Image for this post"
            height="140"
            image={img}
          />
          <CardContent>
            <Typography align="center" variant="h5" component="div">
              {name}
            </Typography>
            <Typography
              align="center"
              gutterBottom
              variant="subtle3"
              component="div"
              data-testid="name"
            >
              ({author})
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {body}
            </Typography>
          </CardContent>
          <CardActions>
            <TransitionsModal
              color={"warning"}
              text={"Update"}
              id={id}
              sendUpdatedArticleToParent={sendUpdatedArticleToParent}
            />
            {/* <Button size="small" color="warning">
              Edit
            </Button> */}
            <TransitionsModalComment
              color={"primary"}
              text={"Comments"}
              id={id}
              comments={comments}
              sendUpdatedArticleToParent={sendUpdatedArticleToParent}
            />
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default Post;
