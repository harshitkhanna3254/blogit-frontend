import Post from "../components/Post";

import { Grid, Box, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getPosts } from "../services/posts";

const Posts = ({ index, newPost }) => {
  const [posts, setPosts] = useState([]);
  // const [tempPosts, setTempPosts] = useState([]);
  const [name, setName] = useState("");
  const [searchInput, setSearchInput] = useState("");

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

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Handle Search");
    setSearchInput(e.target.value);
    // if (searchInput.length > 0) {
    //   console.log("> 0");

    //   tempPosts.filter((post) => {
    //     return setPosts(post.body.match(searchInput));
    //   });
    // }
  };

  useEffect(() => {
    if (index >= 0 && !searchInput) {
      console.log("Getting posts for user with index " + index);
      setName(JSON.parse(sessionStorage.getItem("loggedInUser")).name);
      getPosts(index).then((res) => {
        console.log(`All posts of user with index ${index}`, res);
        res.data.forEach((object, index) => {
          object.img = images[index];
        });
        setPosts(res.data);
        // setTempPosts(res.data);
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
    if (posts) {
      return posts
        .filter((post) => {
          if (searchInput == "") return post;
          else if (
            post.body.toLowerCase().includes(searchInput.toLowerCase()) ||
            name.toLowerCase().includes(searchInput.toLowerCase())
          ) {
            return post;
          }
        })
        .map((post, idx) => {
          return (
            <Post
              name={name}
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
        <Box
          sx={{
            maxWidth: "100%",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <TextField
            fullWidth
            type="search"
            onChange={handleSearch}
            label="Search Posts"
            value={searchInput}
          />
        </Box>
        <Grid container spacing={2}>
          {renderPosts()}
        </Grid>
      </Box>
    </>
  );
};

export default Posts;
