import { Button, IconButton, Typography, useTheme } from "@mui/material";
import { Box, compose } from "@mui/system";
import React, { useState } from "react";
import { AiFillEdit, AiOutlineLine, AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../helpers/authHelper";
import CommentEditor from "./CommentEditor";
import ContentDetails from "./ContentDetails";
import HorizontalStack from "./util/HorizontalStack";
import { deleteComment, updateComment } from "../api/posts";
import ContentUpdateEditor from "./ContentUpdateEditor";
import Markdown from "./Markdown";
import { MdCancel } from "react-icons/md";
import {  HiOutlineTrash } from "react-icons/hi";
import { FiEdit2 } from "react-icons/fi";
import Moment from "react-moment";
import UserAvatar from "./UserAvatar";
const Comment = (props) => {
  const theme = useTheme();
  const iconColor = theme.palette.primary.main;
  const { depth, addComment, removeComment, editComment } = props;
  const commentData = props.comment;
  const [minimised, setMinimised] = useState(depth % 4 === 3);
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [comment, setComment] = useState(commentData);
  const user = isLoggedIn();
  const isAuthor = user && user.userId === comment.commenter._id;
  const navigate = useNavigate();

  const handleSetReplying = () => {
    if (isLoggedIn()) {
      setReplying(!replying);
    } else {
      navigate("/login");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = e.target.content.value;

    await updateComment(comment._id, user, { content });

    const newCommentData = { ...comment, content, edited: true };

    setComment(newCommentData);

    editComment(newCommentData);

    setEditing(false);
  };

  const handleDelete = async () => {
    await deleteComment(comment._id, user);
    removeComment(comment);
  };

  let style = {
    borderRadius: 1.5,
    marginTop:"5px",
    marginBottom:"5px",
    display:"flex",


  };

  if (depth % 2 === 1) {
    style.backgroundColor = "white";
  }

  return (
    <Box sx={style}>
      <UserAvatar  width={30} height={30} username={comment.commenter.username} />
      <Box
        sx={{
          pl: 1,
        }}
      >
        {props.profile ? (
          <Box>
            <Typography variant="h6">
              <Link  style={{
            color:"#FDC04D",
            fontWeight: 'bold',
            fontSize:"14px",
            textDecoration: 'none',
          }} underline="hover" to={"/posts/" + comment.post._id}>
                {comment.post.title}
              </Link>
            </Typography>
            <Typography variant="subtitle2" color="#EEEEEE" gutterBottom>
              <Moment fromNow>{comment.createdAt}</Moment>{" "}
              {comment.edited && <>(Edited)</>}
            </Typography>
          </Box>
        ) : (
          <HorizontalStack justifyContent="space-between">
            <HorizontalStack>
              <ContentDetails
                username={comment.commenter.username}
                createdAt={comment.createdAt}
                edited={comment.edited}
              />

              {/* <IconButton
                color="primary"
                onClick={() => setMinimised(!minimised)}
              >
                {minimised ? (
                  <AiOutlinePlus size={15} />
                ) : (
                  <AiOutlineLine size={15} />
                )}
              </IconButton> */}
            </HorizontalStack>
            {!minimised && (
              <HorizontalStack spacing={1}>
                {/* <IconButton
                  variant="text"
                  size="small"
                  onClick={handleSetReplying}
                >
                  {!replying ? (
                    <FiEdit2 size={15} color={"#666666"} />
                  ) : (
                    <MdCancel color={iconColor} />
                  )}
                </IconButton> */}
                {user && (isAuthor || user.isAdmin) && (
                  <HorizontalStack spacing={1}>
                    <IconButton
                      variant="text"
                      size="small"
                      onClick={() => setEditing(!editing)}
                    >
                      {editing ? (
                        <MdCancel color={"#666666"} />
                      ) : (
                        <FiEdit2 size={14} color={"#666666"} />
                      )}
                    </IconButton>
                    <IconButton
                      variant="text"
                      size="small"
                      onClick={handleDelete}
                    >
                      <HiOutlineTrash  size={14} color={"#666666"} />
                    </IconButton>
                  </HorizontalStack>
                )}
              </HorizontalStack>
            )}
          </HorizontalStack>
        )}

        {!minimised && (
          <Box sx={{ mt: 1  ,color:"#868686" ,}} overflow="hidden">
            {!editing ? (
              <>
              <Markdown content={comment.content} />
              {!replying ? (
                <Typography py={"5px"}  sx={{fontSize:"13px" , cursor:"pointer"}} color={"#4A92FF"}  onClick={handleSetReplying}> reply
                </Typography> 
              ) : (
                <Typography py={"5px"} color={"#4A92FF"} sx={{fontSize:"13px" , cursor:"pointer"}} onClick={handleSetReplying}> close
                </Typography> 
              )}
              </>
            ) : (
              <ContentUpdateEditor
                handleSubmit={handleSubmit}
                originalContent={comment.content}
              />
            )}

            {replying && !minimised && (
              <Box sx={{ mt: 1 }}>
                <CommentEditor
                  comment={comment}
                  addComment={addComment}
                  setReplying={setReplying}
                  label="What are your thoughts on this comment?"
                />
              </Box>
            )}
            {comment.children && (
              <Box sx={{ backgroundColor:"#EEEEE",pt: theme.spacing(2) }}>
                {comment.children.map((reply, i) => (
                  <Comment
                    key={reply._id}
                    comment={reply}
                    depth={depth + 1}
                    addComment={addComment}
                    removeComment={removeComment}
                    editComment={editComment}
                  />
                ))}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Comment;
