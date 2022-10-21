import { Grid, Button, TextField } from "@mui/material";
import { useState } from "react";

const NewPost = ({ createNewPost }) => {
  const [postInput, setPostInput] = useState("");
  // const [postImage, setPostImage] = useState("");

  function submitPost() {
    // console.log("Submit Post called from NewPost ", postInput);
    createNewPost({ body: postInput });
  }

  return (
    <>
      <Grid container spacing={2} className="post_container_1">
        <Grid item xs={12}>
          <TextField
            className="post_textfield"
            label="Push a new post"
            multiline
            rows={4}
            value={postInput}
            onChange={(e) => {
              setPostInput(e.target.value);
            }}
            placeholder="Push a new post"
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} className="post_container_2">
        <Grid item xs={4} mt={3}>
          <Button className="width_medium" variant="outlined" component="label">
            Upload Image
            <input type="file" hidden />
          </Button>
        </Grid>
        <Grid item xs={4} mt={3}>
          <Button
            className="width_medium"
            variant="outlined"
            component="label"
            color="warning"
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={4} mt={3}>
          <Button
            className="width_medium"
            variant="outlined"
            component="label"
            color="success"
            onClick={() => {
              if (postInput) submitPost();
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default NewPost;
