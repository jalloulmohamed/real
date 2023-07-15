import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography  variant="subtitle1" color="text.secondary">
      Copyright © 2023{" "}
      <Link to="/" style={{
            color:"#18181b",
            fontSize: 15,
            textDecoration: 'none',
          }}>
        Real
      </Link>
    </Typography>
  );
};

export default Copyright;
