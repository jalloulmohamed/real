import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FiFeather } from "react-icons/fi";
import PrivateRoute from "./PrivateRoute";
import CreatePostView from "./views/CreatePostView";
const CreatePost = () => {
  const navigate = useNavigate();
  return (
    <>
        
          <PrivateRoute>
                    <CreatePostView />
          </PrivateRoute>
          <Button
            variant="outlined"
            size="medium"
            onClick={() => navigate("/posts/create")}
            sx={{ 
              gap: "0.2rem",
              whiteSpace: "nowrap",
              color:"#566376",
              border:"none",
              '&:hover': {
                backgroundColor: '#fff',
                color: '#FDC04D',
                border:"none",
              }
            }}
          >
            <FiFeather size={24} color="#FDC04D"  />
            <span style={{marginLeft:5}} >New Post</span>
          </Button>
    </>
  );
};

export default CreatePost;
