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
import React, { useRef,useEffect, useState } from "react";
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
import UserLikePreview from "./UserLikePreview";


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

  const containerRef = useRef(null); // Create a ref for the parent container

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
    document.addEventListener("mousedown", handleClickOutside); // Add event listener for clicks outside the parent container
    return () => {
      window.removeEventListener("resize", updateDimensions);
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup event listener
    };
  }, []);

  const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        // Check if the clicked element is outside the container
          handleMouseLeave()
    }
  };

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
    if (mobile) {
      setIsHovered(false);
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
    setConfirm(false);
    if (editing) {
      setEditing(false);
    }
    setIsHovered(false);
  };
  

  return (
    <Card sx={{overflow: "initial", padding: 0, mt:2,  border: "none" }} className="post-card">
      <Box padding={0}   className={preview}>
        <HorizontalStack
          spacing={0}
          alignItems="initial"
          
        >
          <Stack
            justifyContent="space-between "
            alignItems="center"
            spacing={1}
            sx={{
              width: "50px",
            }}
          >
            <UserAvatar width={40} height={40} username={post.poster.username} />
          </Stack>
          <PostContentBox post={post} editing={editing}>
            <HorizontalStack justifyContent="space-between">
              <ContentDetails
                username={post.poster.username}
                createdAt={post.createdAt}
                edited={post.edited}
                preview={preview === "secondary"}
              />
              <Box>
                {user && (isAuthor || user.isAdmin) && preview !== "secondary" && (
                   // Assign the ref to the parent container
                  <Stack sx={{ position: "relative", zIndex: 100 }} ref={containerRef} >
                    <FiMoreHorizontal
                      onClick={handleMouseEnter}
                      color={"#18181b"}
                      size={25}
                      cursor={"pointer"}
                    ></FiMoreHorizontal>
                    {isHovered && (
                      <Stack
                        sx={{
                          position: "absolute",
                          borderRadius: "50px",
                          px: "10px",
                          py: "1px",
                          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                          display: "flex",
                          flexDirection: "row",
                          top: "25px",
                          right: "2px",
                        }}
                      >
                        
                          <IconButton
                            disabled={loading}
                            size="small"
                            onClick={handleEditPost}
                          >
                            {editing ? (
                            <MdCancel color={"#666666"} />
                          ) : (
                            <FiEdit2 color={"#666666"} />
                          )}
                            
                          </IconButton>
                        <IconButton
                          disabled={loading}
                          size="small"
                          onClick={handleDeletePost}
                        >
                          {confirm ? (
                            <AiFillCheckCircle color={"#666666"} />
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
              sx={{
                fontWeight: "bold",
                fontSize: "13px",
                mt: 1,
                zIndex: 10,
                maxWidth: "50%",
                color: "#18181b",
              }}
              className="title"
            >
              {post.title}
            </Typography>

            {preview !== "secondary" && (editing ? (
              <ContentUpdateEditor
                handleSubmit={handleSubmit}
                originalContent={post.content}
              />
            ) : (
              <Box sx={{ mb:"10px" }}
              >
                <Markdown content={post.content} />
              </Box>
            ))}
            {/* <img
              src={"/2.png"}
              style={{
                width: "100%",
                marginTop: "10px",
                borderRadius: "10px",
              }}
            ></img> */}
            <HorizontalStack mt={2}  justifyContent={"space-between"} >
            <HorizontalStack >

              <LikeBox
                likeCount={likeCount}
                liked={post.liked}
                onLike={handleLike}
              />
              <HorizontalStack sx={{ cursor:"pointer"}}
                onClick={() => navigate("/posts/" + post._id)}
              >
                <AiFillMessage size={21} color="#D9D9D9" />
                <Typography
                  variant="subtitle2"
                  color="#D9D9D9"
              
                >
                  {post.commentCount}
                </Typography>
                <Typography
                  
                  color="#D9D9D9"
                  sx={{ fontSize:"12px" }}
                >
                  Comment
                </Typography>
              </HorizontalStack>
              </HorizontalStack>
            <Box>
                <UserLikePreview
                  postId={post._id}
                  userLikePreview={post.userLikePreview}
                />
            </Box>
            </HorizontalStack>
          </PostContentBox>
        </HorizontalStack>
      </Box>
    </Card>
  );
};

export default PostCard;
