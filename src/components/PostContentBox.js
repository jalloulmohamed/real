import { useTheme } from "@emotion/react";
import { autocompleteClasses, Box, Card, CardActionArea } from "@mui/material";
import React from "react";
import "react-router-dom";
import { useNavigate } from "react-router-dom";

const PostContentBox = (props) => {
  const { clickable, post, editing } = props;
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      {clickable && !editing ? (
        <Box
          sx={{
            width: "92%",
            "&:hover": { backgroundColor: "#fff", cursor: "pointer" },
          }}
        >
          {props.children}
        </Box>
      ) : (
        <Box sx={{ padding:0 ,paddingLeft:"10px", paddingRight:"10px" , width: "100%" }}>
          {props.children}
        </Box>
      )}
    </>
  );
};

export default PostContentBox;
