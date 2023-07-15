import { Alert } from "@mui/material";
import React from "react";

const ErrorAlert = ({ error }) => {
  return (
    error && (
      <Alert  sx={{my:1, py:0,  bgcolor:"#FFF" , color:"#18181b"}} variant="filled" severity="error">
        {error}
      </Alert>
    )
  );
};

export default ErrorAlert;
