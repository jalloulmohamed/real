import { IconButton, Stack, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../helpers/authHelper";

const LikeBox = (props) => {
  const { likeCount, onLike } = props;
  const theme = useTheme();
  const [liked, setLiked] = useState(props.liked);

  const navigate = useNavigate();

  const handleLike = (e) => {
    if (isLoggedIn()) {
      const newLikedValue = !liked;
      setLiked(newLikedValue);
      onLike(newLikedValue);
    } else {
      navigate("/login");
    }
  };

  return (
    <Stack display="flex" flexDirection={"row"} alignItems="center" justifyContent={"center"}>
      <IconButton sx={{ padding: 0 , '&:hover':{backgroundColor:"#fff"}}} onClick={handleLike}>
        {liked ? (
          <IconContext.Provider  value={{ color: "#fa4748"}}>
            <AiFillHeart size={23} />
          </IconContext.Provider>
        ) : (
          <AiOutlineHeart  size={23} color="#D9D9D9"/>
        )}
      </IconButton>
      <Typography size={20} color={"#D9D9D9"} >{likeCount}</Typography>
    </Stack>
  );
};

export default LikeBox;
