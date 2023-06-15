import { Avatar, AvatarGroup, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import HorizontalStack from "./util/HorizontalStack";
import { AiFillLike } from "react-icons/ai";
import UserLikeModal from "./UserLikeModal";

const UserLikePreview = ({ postId, userLikePreview }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    event.stopPropagation();
    setOpen(true);
  };

  let userLikes;
  if (userLikePreview) {
    userLikes = userLikePreview.slice(0, 3);
  }

  return (
    userLikes && (
      <>
        <Stack
          variant="outlined"
          size="small"
          startIcon={<AiFillLike />}
          color="primary"
          sx={{cursor:"pointer"}}
          onClick={handleClick}
        >
          <HorizontalStack>
            <Typography sx={{fontSize:"12px" ,ml:"5px"}} variant="subtitle2" color="text.secondary" >
                Likes
            </Typography>
            <AvatarGroup>
              {userLikes &&
                userLikes.map((userLike) => (
                  <Avatar
                    src={"https://robohash.org/" + userLike.username+ "?set=set5"}
                    sx={{ backgroundColor: "lightgray", width: 17, height: 16  }}
                    key={userLike._id}
                  />
                ))}
            </AvatarGroup>
          </HorizontalStack>
        </Stack>
        {open && (
          <UserLikeModal open={open} setOpen={setOpen} postId={postId} />
        )}
      </>
    )
  );
};

export default UserLikePreview;