import {
  Button,
  Card,
  IconButton,
  Stack,
  Typography,
  useTheme,
  Divider
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { AiFillCheckCircle, AiFillEdit, AiFillMessage } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { deletePost, likePost, unlikePost, updatePost } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
import ContentDetails from "./ContentDetails";
import {FiMoreHorizontal} from 'react-icons/fi'
import LikeBox from "./LikeBox";
import PostContentBox from "./PostContentBox";
import HorizontalStack from "./util/HorizontalStack";

import {} from "react-icons/ai";
import ContentUpdateEditor from "./ContentUpdateEditor";
import Markdown from "./Markdown";

import "./postCard.css";
import { MdCancel } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import { FiEdit2 } from "react-icons/fi";
import UserAvatar from "./UserAvatar";

const PostCard = (props) => {
  const { preview, removePost } = props;
  let postData = props.post;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = isLoggedIn();
  const isAuthor = user && user.username === postData.poster.username;

  const theme = useTheme();
  const iconColor = theme.palette.primary.main;

  const [editing, setEditing] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [post, setPost] = useState(postData);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [isHovered, setIsHovered] = useState(false);
  const [width, setWindowWidth] = useState(0);

  let maxHeight = null;
  if (preview === "primary") {
    maxHeight = 250;
  }
  const mobile = width < 500;

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };
  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleDeletePost = async (e) => {
    e.stopPropagation();

    if (!confirm) {
      setConfirm(true);
    } else {
      setLoading(true);
      await deletePost(post._id, isLoggedIn());
      setLoading(false);
      if (preview) {
        removePost(post);
      } else {
        navigate("/");
      }
    }
  };

  const handleEditPost = async (e) => {
    e.stopPropagation();

    setEditing(!editing);

    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    await updatePost(post._id, isLoggedIn(), { content });
    setPost({ ...post, content, edited: true });
    setEditing(false);
    if(mobile)
    {
      setIsHovered(false)
    }

  };

  const handleLike = async (liked) => {
    if (liked) {
      setLikeCount(likeCount + 1);
      await likePost(post._id, user);
    } else {
      setLikeCount(likeCount - 1);
      await unlikePost(post._id, user);
    }
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <Card sx={{ padding: 0 ,border:"none"  }} className="post-card">
      <Box padding={0} className={preview}>
        <HorizontalStack spacing={0} alignItems="initial">
          <Stack
            justifyContent="space-between "
            alignItems="center"
            spacing={1}
            sx={{
              // backgroundColor: "grey.100",
              width: "50px",
              
              
              
            }}
          >
          <UserAvatar width={40} height={40} username={post.poster.username} />
          </Stack>
          <PostContentBox    post={post} editing={editing}>

            <HorizontalStack justifyContent="space-between">
              <ContentDetails
                username={post.poster.username}
                createdAt={post.createdAt}
                edited={post.edited}
                preview={preview === "secondary"}
              />
              <Box>
                {user && (isAuthor || user.isAdmin) && preview !== "secondary" && (
                  <Stack sx={{position:"relative", zIndex:100}} onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}>
                    <FiMoreHorizontal 
                      color={"#FDC04D"} 
                      size={25}
                      cursor={"pointer"}
                      
                    >
                    </FiMoreHorizontal>
                    {isHovered &&(
                       <Stack sx={{position:"absolute",
                        borderRadius:"50px", 
                        px:"10px", 
                        py:"1px", 
                        boxShadow:"rgba(0, 0, 0, 0.16) 0px 1px 4px", 
                        display:"flex" , 
                        flexDirection:"row",
                        top:"25px", 
                        right:"2px"}} >
                      <IconButton
                        disabled={loading}
                        size="small"
                        onClick={handleEditPost}
                      
                      >
                        {editing ? (
                          <MdCancel   color={"#666666"} />
                        ) : (
                          <FiEdit2  color={"#666666"} />
                        )}
                      </IconButton>
                      <IconButton
                        disabled={loading}
                        size="small"
                        onClick={handleDeletePost}
                      >
                        {confirm ? (
                          <AiFillCheckCircle  color={"#666666"} />
                        ) : (
                          <HiOutlineTrash size={20} color={"#666666"} />
                        )}
                      </IconButton>
                      </Stack>
                    )}
                  </Stack>
                )}
              </Box>
            </HorizontalStack>

            <Typography
              
              gutterBottom
              sx={{ fontWeight: 'bold' ,fontSize:"13px", overflow: "hidden", mt: 2, zIndex:10,maxWidth :"70%", color:"#FDC04D" }}
              className="title"
            >
              {post.title}
            </Typography>

            {preview !== "secondary" &&
              (editing ? (
                <ContentUpdateEditor
                  handleSubmit={handleSubmit}
                  originalContent={post.content}
                />
              ) : (
                <Box
                  maxHeight={maxHeight}
                  overflow="hidden"
                  className="content"
                >
                  <Markdown content={post.content} />
                </Box>
              ))}
              <img src={"/2.png" + post.title + "?set=set5"} style={{width:"100%"  ,marginTop:"10px", borderRadius:"10px"}}></img>
            <HorizontalStack  sx={{ mt:1,mb:3} }  >
                <HorizontalStack  onClick={() => navigate("/posts/" + post._id)} >
                  <AiFillMessage size={21} color="#D9D9D9" />
                  <Typography
                    variant="subtitle2"
                    color="#D9D9D9"
                    sx={{ fontWeight: "bold" }}
                  >
                    {post.commentCount}
                  </Typography>
                </HorizontalStack>
              <LikeBox
              likeCount={likeCount}
              liked={post.liked}
              onLike={handleLike}
            />
            </HorizontalStack>

          </PostContentBox>
        </HorizontalStack>
      </Box>
    </Card>
  );
};

export default PostCard;
