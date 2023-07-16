import React, { useState } from "react";
import HorizontalStack from "./util/HorizontalStack";
import UserAvatar from "./UserAvatar";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const UserEntry = ({ username ,bio ,onClose,size}) => {
    const [sizeimg, setSizeimg] = useState(size)
  
        
  return (
    <HorizontalStack mt={"10px"} justifyContent="space-between" key={username}>
      <HorizontalStack>
        <UserAvatar width={sizeimg} height={sizeimg} username={username} />
        <div>
          <Typography>{username}</Typography>
          <Typography sx={{fontSize:"14px", color:"#a4a7b4"}}>{bio}</Typography>
        </div>
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