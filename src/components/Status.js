import { Typography, Button, TextField } from "@mui/material";
import { useState } from "react";

const Status = ({ name }) => {
  const [statusInput, setStatusInput] = useState("");
  const [statusValue, setStatusValue] = useState("Welcome to Blog-It");

  const submitStatus = () => {
    setStatusValue(statusInput);
    setStatusInput("");
  };

  return (
    <>
      <Typography variant="h5" component="h5">
        {name}
      </Typography>

      <Typography variant="subtle2" component="h6" className="margin_medium">
        {statusValue}
      </Typography>
      <TextField
        id="status_text"
        className="status_text margin_large"
        label="Status"
        variant="standard"
        value={statusInput}
        onChange={(e) => {
          setStatusInput(e.target.value);
        }}
        required
        fullWidth
      />
      <Button
        className="status_button"
        variant="outlined"
        type="submit"
        color="success"
        onClick={() => {
          if (statusInput) submitStatus();
        }}
        fullWidth
      >
        Push Status
      </Button>
    </>
  );
};

export default Status;
