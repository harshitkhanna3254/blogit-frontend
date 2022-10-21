import Post from "../components/Post";

import { Grid, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getPosts } from "../services/posts";

const Posts = ({ newPost }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts(0, 7).then((res) => {
      setPosts(res.data);
    });
  }, []);

  useEffect(() => {
    console.log("From second UE. Current state:", posts);
    setPosts((current) => [{ newPost }, ...current]);
  }, [newPost]);

  const renderPosts = () => {
    if (posts) {
      return posts.map((post, id) => {
        return <Post body={post.body} />;
      });
    } else {
      return <Post body="default body" />;
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {renderPosts()}
        </Grid>
      </Box>
    </>
  );
};

export default Posts;
