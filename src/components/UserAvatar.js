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
      src={"https://xsgames.co/randomusers/assets/avatars/male/"+ username.length +".jpg" }
    />
  );
};

export default UserAvatar;
