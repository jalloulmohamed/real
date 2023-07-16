import { Avatar } from "@mui/material";
import React from "react";

const UserAvatar = ({ username, height, width }) => {
  const len = username.lenth();
  return (
    <Avatar
      sx={{
        height: height,
        width: width,
        backgroundColor: "#dddddd",
      }}
      src={"https://xsgames.co/randomusers/assets/avatars/male/" + len + ".jpg" }
    />
  );
};

export default UserAvatar;
