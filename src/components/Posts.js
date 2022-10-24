import Post from "../components/Post";

import { Grid, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getPosts } from "../services/posts";

const Posts = ({ index, newPost }) => {
  const [posts, setPosts] = useState([]);

  // const [index, setIndex] = useState();

  const images = [
    `https://picsum.photos/id/110/200/300`,
    `https://picsum.photos/id/111/200/300`,
    `https://picsum.photos/id/112/200/300`,
    `https://picsum.photos/id/113/200/300`,
    `https://picsum.photos/id/114/200/300`,
    `https://picsum.photos/id/115/200/300`,
    `https://picsum.photos/id/116/200/300`,
    `https://picsum.photos/id/117/200/300`,
    `https://picsum.photos/id/118/200/300`,
    `https://picsum.photos/id/119/200/300`,
  ];

  useEffect(() => {
    if (index >= 0) {
      console.log("Getting posts for user with index " + index);
      getPosts(index).then((res) => {
        console.log(`All posts of user with index ${index}`, res);
        res.data.forEach((object, index) => {
          object.img = images[index];
        });
        setPosts(res.data);
      });
    }
  }, [index]);

  useEffect(() => {
    console.log("From second UE. New Post:", posts, newPost);
    if (newPost) {
      setPosts((current) => [{ body: newPost }, ...current]);
    }
    console.log(posts);
  }, [newPost]);

  const renderPosts = () => {
    console.log(posts);
    if (posts.length > 0) {
      return posts.map((post, idx) => {
        return (
          <Post
            body={post.body}
            title={post.title}
            img={post.img}
            key={idx}
            id={idx}
          />
        );
      });
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
          Posts
        </Typography>
        <Grid container spacing={2}>
          {renderPosts()}
        </Grid>
      </Box>
    </>
  );
};

export default Posts;
