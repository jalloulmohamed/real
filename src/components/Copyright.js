import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography  variant="subtitle1" color="text.secondary">
      Copyright © 2022{" "}
      <Link to="/" style={{
            color:"#FDC04D",
            fontSize: 15,
            textDecoration: 'none',
          }}>
        Real
      </Link>
    </Typography>
  );
};

export default Copyright;
