import React, { useState } from "react";
import HorizontalStack from "./util/HorizontalStack";
import UserAvatar from "./UserAvatar";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const UserEntry = ({ username ,onClose,size}) => {
    const [sizeimg, setSizeimg] = useState(size)
  
        
  return (
    <HorizontalStack mt={"10px"} justifyContent="space-between" key={username}>
      <HorizontalStack>
        <UserAvatar width={sizeimg} height={sizeimg} username={username} />
        <Typography>{username}</Typography>
      </HorizontalStack>
      <Link onClick={onClose} to={"/users/" + username} style={{
            backgroundColor:"#18181b",
            color:"#fff",
            padding:"5px 19px",
            borderRadius: "5px",
            fontSize: 13,
            textDecoration: 'none',
          }}>view</Link>
    </HorizontalStack>
  );
};

export default UserEntry;