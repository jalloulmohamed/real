import { Button, Container, IconButton,Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FiFeather } from "react-icons/fi";
import PrivateRoute from "./PrivateRoute";
import CreatePostView from "./views/CreatePostView";
import zIndex from "@mui/material/styles/zIndex";
const CreatePost = () => {
  const navigate = useNavigate();
  return (
    <Container>

          <IconButton
            variant="outlined"
            size="medium"
            onClick={() => navigate("/posts/create")}
            sx={{ 
              gap: "0.2rem",
              whiteSpace: "nowrap",
              color:"#fff",
              backgroundColor: '#18181b',
              border:"none",
              borderRadius:"50px",
              '&:hover': {
                backgroundColor: '#18181b',
                border:"none",
              },
              position:"fixed",
              bottom:{
                md:16,
              },
              right:{
                md:16,
              },
              right:16,
              zIndex:999,
              py:{
                xs:'12px',
                md: '7px'
              },
              px:{
                md:'12px',
                xs:'12px',
              },

              
            }}
          >
            <FiFeather size={22} color="#fff" />
            <Typography sx={{marginLeft:"5px", marginRight :"5px",
                display:{
                md: 'block',
                xs: 'none',
              }}} >
              New Post</Typography>
          </IconButton>
    </Container>
  );
};

export default CreatePost;
