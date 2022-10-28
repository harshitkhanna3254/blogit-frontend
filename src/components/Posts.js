import Post from "../components/Post";

import { Grid, Box, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getPosts } from "../services/posts";

const Posts = ({ loggedInUser, newPostData, postsByFriends }) => {
  const [currentUserPosts, setCurrentUserPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    if (loggedInUser.id >= 0 && !searchInput) {
      setName(JSON.parse(sessionStorage.getItem("loggedInUser")).name);

      async function setUserPosts() {
        var postsByFetch = await getPosts(loggedInUser.id);
        postsByFetch = postsByFetch.map((post) => ({
          name: loggedInUser.name,
          ...post,
        }));
        setCurrentUserPosts(postsByFetch);
        setPosts(postsByFetch);
        localStorage.setItem("postsTest", JSON.stringify(posts));
      }
      setUserPosts();
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (newPostData) {
      setPosts((current) => [
        { body: newPostData.postText, name: newPostData.name },
        ...current,
      ]);
    }
  }, [newPostData]);

  useEffect(() => {
    if (postsByFriends) {
      setPosts([...currentUserPosts, ...postsByFriends]);
    }
  }, [postsByFriends]);

  const renderPosts = () => {
    if (posts) {
      const filteredPosts = posts.filter((post) => {
        if (searchInput === "") return post;
        else if (
          post.body.toLowerCase().includes(searchInput.toLowerCase()) ||
          post.name.toLowerCase().includes(searchInput.toLowerCase())
        ) {
          return post;
        }
      });

      localStorage.setItem("filteredPosts", JSON.stringify(filteredPosts));

      return posts
        .filter((post) => {
          if (searchInput === "") return post;
          else if (
            post.body.toLowerCase().includes(searchInput.toLowerCase()) ||
            post.name.toLowerCase().includes(searchInput.toLowerCase())
          ) {
            return post;
          }
        })
        .map((post, idx) => {
          return (
            <Post
              name={post.name || name}
              body={post.body}
              title={post.title}
              img={post.img}
              key={idx}
              id={post.id}
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
            inputProps={{ "data-testid": "search_input" }}
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
