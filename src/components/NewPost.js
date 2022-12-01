import { Grid, Button, TextField } from "@mui/material";
import { useState } from "react";

const NewPost = ({ createNewPost }) => {
  const [postInput, setPostInput] = useState("");
  const [image, setImage] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);

  const clearPost = () => {
    setPostInput("");
    setImage("");
  };

  const handleImageUpload = (e) => {
    setDisableSubmit(true);
    const file = e.target.files[0];
    console.log(file);
    transformFile(file);
  };

  const transformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      console.log("Converting file to _64");
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
        setDisableSubmit(false);
      };
    } else {
      setImage("");
      setDisableSubmit(false);
    }
  };

  const handleSubmit = () => {
    if (!postInput) {
      setPostInput("");
      return;
    }

    createNewPost(postInput, image);
    setPostInput("");
  };

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
          <Button variant="outlined" className="width_medium" component="label">
            Upload Image
            <input
              type="file"
              accept="image/"
              onChange={handleImageUpload}
              hidden
            />
          </Button>
        </Grid>
        <Grid item xs={4} mt={3}>
          <Button
            className="width_medium"
            variant="outlined"
            component="label"
            color="warning"
            onClick={clearPost}
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
            disabled={disableSubmit}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default NewPost;
