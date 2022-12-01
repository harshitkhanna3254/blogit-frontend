import { Typography, Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { HEADLINE_REQUEST, LOGIN_REQ_OPTIONS } from "../constants/Requests";

const Status = ({ name }) => {
  const [statusInput, setStatusInput] = useState("");
  const [statusValue, setStatusValue] = useState("Welcome to Blog-It");

  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);

  useEffect(() => {
    async function getHeadline() {
      const { data } = await axios.get(HEADLINE_REQUEST, LOGIN_REQ_OPTIONS);

      setStatusValue(data.headline);
    }
    getHeadline();
  });

  const submitStatus = async () => {
    try {
      const { data } = await axios.put(
        HEADLINE_REQUEST,
        { headline: statusInput },
        LOGIN_REQ_OPTIONS
      );
      setStatusValue(data.headline);
    } catch (error) {
      setError(true);
      setErrorText(error.response.data.message);
    }

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
