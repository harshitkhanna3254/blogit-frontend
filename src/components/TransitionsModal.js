import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Alert, Grid, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";

import { ARTICLES_REQUEST, LOGIN_REQ_OPTIONS } from "../constants/Requests";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({
  color,
  text,
  id,
  sendUpdatedArticleToParent,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Update article
  const [updatedText, setUpdatedText] = useState("");

  //Errors
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async () => {
    if (updatedText == "") {
      return;
    }

    console.log(updatedText);
    const bodyObj = {
      body: updatedText,
    };

    try {
      const { data } = await axios.put(
        ARTICLES_REQUEST + `/${id}`,
        bodyObj,
        LOGIN_REQ_OPTIONS
      );

      console.log("Updated article", data.updatedArticle);

      sendUpdatedArticleToParent(data.updatedArticle);

      handleClose();
    } catch (error) {
      setError(true);
      setErrorText(error.response.data.message);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} color={color}>
        {text}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              className="margin_medium"
              variant="h6"
              component="h2"
            >
              Enter new Text
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  name="editArticleTextfield"
                  label="Enter Text Here"
                  placeholder="Enter New Text"
                  type="text"
                  onChange={(e) => setUpdatedText(e.target.value)}
                  value={updatedText}
                />
              </Grid>
              <Grid item xs={6} mt={1}>
                <Button
                  className="margin_medium"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSubmit}
                >
                  Update Article
                </Button>
              </Grid>
            </Grid>
            {error && (
              <Alert severity="error" className="margin_medium text_center">
                {errorText}
              </Alert>
            )}

            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Only the post owner will be able to edit the post
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
