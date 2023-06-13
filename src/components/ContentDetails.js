import { Avatar, Typography } from "@mui/material";
import React from "react";
import HorizontalStack from "./util/HorizontalStack";
import Moment from "react-moment";

import { Link } from "react-router-dom";

const ContentDetails = ({ username, createdAt, edited, preview }) => {
  return (
    <HorizontalStack >
     
      <Typography variant="subtitle2" color="text.secondary" >
        <Link  
          onClick={(e) => {
            e.stopPropagation();
          }}
          to={"/users/" + username}
          underline="none"
          style={{
            color:"#000",
            fontWeight: 'bold',
            fontSize:"14px",
            textDecoration: 'none',
          }}
        >
        {username}  
        </Link>
        {!preview && (
          <>
            {" "}
            · <Moment fromNow>{createdAt}</Moment> {edited && <>(Edited)</>}
          </>
        )}
      </Typography>
    </HorizontalStack>
  );
};

export default ContentDetails;
