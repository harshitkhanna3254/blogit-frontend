import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AlignItemsList from "./AlignItemsList";
import { Alert, Grid, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { ARTICLES_REQUEST, LOGIN_REQ_OPTIONS } from "../constants/Requests";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({
  color,
  text,
  id,
  comments,
  sendUpdatedArticleToParent,
}) {
  const [open, setOpen] = React.useState(false);

  console.log(color, text, id, comments);

  //Comment
  const [comment, setComment] = useState("");

  //Errors
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (comment == "") {
      return;
    }

    console.log(comment);
    const bodyObj = {
      body: comment,
      commentId: -1,
    };

    try {
      const { data } = await axios.put(
        ARTICLES_REQUEST + `/${id}`,
        bodyObj,
        LOGIN_REQ_OPTIONS
      );

      console.log("Updated article", data.article);

      sendUpdatedArticleToParent(data.article);
      setComment("");
      handleClose();
    } catch (error) {
      setError(true);
      setErrorText(error.response.data.message);
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Comments</Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          All Comments
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {comments.length > 0 ? (
            <AlignItemsList comments={comments} />
          ) : (
            <h2>No Comment found</h2>
          )}
        </DialogContent>
        {error && (
          <Alert severity="error" className="margin_medium text_center">
            {errorText}
          </Alert>
        )}
        <DialogActions>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                name="addCommentTextField"
                label="Enter Text Here"
                placeholder="Add a Comment"
                type="text"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
            </Grid>
            <Grid item xs={4}>
              <Button autoFocus onClick={handleSubmit}>
                Add Comment
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
