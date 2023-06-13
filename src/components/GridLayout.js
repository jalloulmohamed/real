import { Grid, Stack } from "@mui/material";
import React from "react";

const GridLayout = (props) => {
  const { left, right } = props;

  return (
    <Grid container marginLeft={0} marginTop={0} sx={{width:"100%"}}  spacing={2}>
      <Grid   xs={12} md={8}>
        {left}
      </Grid>
      <Grid  item md={4} sx={{ display: { xs: "none", md: "block" },borderLeft:"1px solid #f1f0ec" }}>
        {right}
      </Grid>
    </Grid>
  );
};

export default GridLayout;
