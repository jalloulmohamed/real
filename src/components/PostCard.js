import {
  Button,
  Card,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
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
import { BiTrash } from "react-icons/bi";
import { BsReplyFill } from "react-icons/bs";
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

  let maxHeight = null;
  if (preview === "primary") {
    maxHeight = 250;
  }

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
                  <HorizontalStack>
                    <FiMoreHorizontal color={"#FDC04D"} size={25}></FiMoreHorizontal>
                    {/* <IconButton
                      disabled={loading}
                      size="small"
                      onClick={handleEditPost}
                      
                     
                    >
                      {editing ? (
                        <MdCancel  color={"#FDC04D"} />
                      ) : (
                        <AiFillEdit  color={"#FDC04D"} />
                      )}
                    </IconButton>
                    <IconButton
                      disabled={loading}
                      size="small"
                      onClick={handleDeletePost}
                    >
                      {confirm ? (
                        <AiFillCheckCircle  color={"#FDC04D"} />
                      ) : (
                        <BiTrash  color={"#FDC04D"} />
                      )}
                    </IconButton> */}
                  </HorizontalStack>
                )}
              </Box>
            </HorizontalStack>

            <Typography
              
              gutterBottom
              sx={{ fontWeight: 'bold' ,fontSize:"14px", overflow: "hidden", mt: 1, maxHeight: 125,  color:"#428efc"}}
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
            <HorizontalStack sx={{ mt: 1 , mb:3} }>
                <HorizontalStack onClick={() => navigate("/posts/" + post._id)} >
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
