import { Typography } from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";
import "./markdown.css";

const Markdown = ({ content }) => {
  const disallowed = ["Image"];

  return (
    <Typography sx={{fontSize:"14px",lineHeight:"17px"}} component="span">
      <ReactMarkdown
        className="markdown"
        disallowedElements={disallowed}
        skipHtml
        children={content }
        style={{
          width: "100%",
          marginTop: "10px",
          borderRadius: "10px",
          "&p": { margin: 0} 
        }}
      />
    </Typography>
  );
};

export default Markdown;
