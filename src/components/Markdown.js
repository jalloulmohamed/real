import { Typography } from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";
import "./markdown.css";
const renderers = {
  image: ({ src, alt }) => (
    <img src={src} alt={alt} style={{ maxWidth: '100%', height: 'auto' }} />
  ),
  link: ({ href, children }) => (
    <a href={href} style={{ color: '#4A92FF'  , textDecoration:"none"}}>
      {children}
    </a>
  ),
};
const Markdown = ({ content }) => {
  const disallowed = ["Image"];

  return (
    <Typography sx={{fontSize:"16px",lineHeight:"17px"}} component="span">
       <ReactMarkdown
        className="markdown"
        disallowedElements={disallowed}
        skipHtml
        renderers={renderers}
        children={content}
      />
    </Typography>
  );
};

export default Markdown;
