import { Card, Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <Box pb={3}>
      <Card sx={{border:0}}>
        <Copyright />
      </Card>
    </Box>
  );
};

export default Footer;
