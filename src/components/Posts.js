import Post from "../components/Post";

import { Grid, Box, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getPosts } from "../services/posts";
import PaginationList from "./Pagination";

const Posts = ({ allPosts, getUpdatedPostData }) => {
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  //Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    console.log("Inside all posts UE", allPosts);
    if (allPosts) {
      setPosts(allPosts);
    }
  }, [allPosts]);

  const getUpdatedArticle = (updatedArticle) => {
    getUpdatedPostData(updatedArticle);
  };

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPosts = () => {
    console.log("Render posts -> ", posts);
    if (currentPosts) {
      return currentPosts
        .filter((post) => {
          if (searchInput === "") return post;
          else if (
            post.body.toLowerCase().includes(searchInput.toLowerCase()) ||
            post.author.toLowerCase().includes(searchInput.toLowerCase())
          ) {
            return post;
          }
        })
        .map((post, idx) => {
          return (
            <Post
              id={post._id}
              author={post.author}
              name={post.name}
              body={post.body}
              img={post.imageCloud.url}
              comments={post.comments}
              key={idx}
              getUpdatedArticle={getUpdatedArticle}
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
        <Grid container spacing={2} className="margin_medium">
          {renderPosts()}
        </Grid>
        <PaginationList
          className="margin_medium"
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </Box>
    </>
  );
};

export default Posts;
