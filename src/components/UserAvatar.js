import { Avatar } from "@mui/material";
import React from "react";

const UserAvatar = ({ username, height, width }) => {
  return (
    <Avatar
      sx={{
        height: height,
        width: width,
        backgroundColor: "#dddddd",
      }}
      src={"https://robohash.org/" + username+ "?set=set5" }
    />
  );
};

export default UserAvatar;
