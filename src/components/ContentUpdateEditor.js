import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import HorizontalStack from "./util/HorizontalStack";
import {RiSendPlaneFill} from 'react-icons/ri'
const ContentUpdateEditor = (props) => {
  const [content, setContent] = useState(props.originalContent);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    let error = null;

    if (props.validate) {
      error = props.validate(content);
    }

    if (error && error.length !== 0) {
      setError(error);
    } else {
      props.handleSubmit(e);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack>
      <HorizontalStack alignItems="start" >
        <TextField
          value={content}
          fullWidth
          size="small"
          name="content"
          onChange={handleChange}
          error={error.length !== 0}
          helperText={error}
          multiline
          id="margin-none"
          InputProps={{ sx: { width:"100%",border:"none" , '&:focus':{outline:"none"} } }}
        />
        <IconButton
          type="submit"
          variant="outlined"
          sx={{  backgroundColor:  "white", mt: 1  }}
        >
          <RiSendPlaneFill></RiSendPlaneFill>
        </IconButton>
      </HorizontalStack>
      </Stack>
    </Box>
  );
};

export default ContentUpdateEditor;
