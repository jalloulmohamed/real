import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";

const Loading = ({ label }) => {
  return (
    <Stack alignItems="center">
      <CircularProgress  size={20} sx={{ my: 1 }} />
      <Typography color="#4A92FF" sx={{ mb: 3 }}>
        {label}
      </Typography>
    </Stack>
  );
};

export default Loading;
