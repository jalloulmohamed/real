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
              backgroundColor: '#FDC04D',
              border:"none",
              borderRadius:"50px",
              '&:hover': {
                backgroundColor: '#FDC04D',
                border:"none",
              },
              position:"fixed",
              bottom:15,
              right:15,
              zIndex:999,
              p:{
                xs:'14px',
                md: '7px'
              },
              px:{
                md:'10px',
   
              },

              
            }}
          >
            <FiFeather size={25} color="#fff"  />
            <Typography sx={{marginLeft:"5px", 
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
