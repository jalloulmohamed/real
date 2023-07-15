import { Button,IconButton, Card, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createComment } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
import ErrorAlert from "./ErrorAlert";
import HorizontalStack from "./util/HorizontalStack";
import {RiSendPlaneFill} from "react-icons/ri"
const CommentEditor = ({ label, comment, addComment, setReplying }) => {
  const [formData, setFormData] = useState({
    content: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      ...formData,
      parentId: comment && comment._id,
    };
    console.log(body)
    setLoading(true);
    const data = await createComment(body, params, isLoggedIn());
    setLoading(false);

    if (data.error) {
      setError(data.error);
    } else {
      formData.content = "";
      setReplying && setReplying(false);
      addComment(data);
    }
  };

  const handleFocus = (e) => {
    !isLoggedIn() && navigate("/login");
  };

  return (
    <Card  sx={{border:0 , m:0 ,p:0}}>
      <Stack spacing={2}>
        <HorizontalStack justifyContent="space-between">
        </HorizontalStack>

        <Box  component="form" onSubmit={handleSubmit}>
        <HorizontalStack  >   
          <TextField
            rows={1}
            label="Add comment"
            fullWidth
            required
            size="small"
            name="content"
            sx={{
              backgroundColor: "white",
            }}
            onChange={handleChange}
            onFocus={handleFocus}
            value={formData.content}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            InputProps={{ sx: {  borderRadius: 10 , } }}
          />
          {/* <IconButton
            variant="outlined"
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              backgroundColor: "white",
            }}
          >
            {loading ?  <div style={{fontSize:"12px", color:"#18181b"}}>Sending</div> : <RiSendPlaneFill></RiSendPlaneFill>}
          </IconButton> */}
        </HorizontalStack>

          <ErrorAlert error={error} />
        </Box>
      </Stack>
    </Card>
  );
};

export default CommentEditor;
