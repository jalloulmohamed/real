import { useTheme } from "@emotion/react";
import {
  Avatar,
  Button,
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { isLoggedIn } from "../helpers/authHelper";
import ContentUpdateEditor from "./ContentUpdateEditor";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";

const MobileProfile = (props) => {
  const [user, setUser] = useState(null);
  const currentUser = isLoggedIn();
  const theme = useTheme();
  const iconColor = theme.palette.primary.main;

  useEffect(() => {
    if (props.profile) {
      setUser(props.profile.user);
    }
  }, [props.profile]);

  return (
    <Card sx={{ border:0  , paddingLeft:0  , paddingRight:0, display: { sm: "block", md: "none" }, mb: 2 }}>
      {user ? (
        <Stack >
          <HorizontalStack   justifyContent="space-between">
            <HorizontalStack>
              <UserAvatar width={80} height={80} username={user.username} />
            </HorizontalStack>

            <Box sx={{ display: { sm: "block" } }}>
              <HorizontalStack spacing={2}>
              <HorizontalStack spacing={1}>
                  <Typography color="#A5A7B4" > Likes</Typography>
                  <Typography color="#566376">
                    <b>{props.profile.posts.likeCount}</b>
                  </Typography>
              </HorizontalStack>
              <HorizontalStack spacing={1}>
                  <Typography  color="#A5A7B4">Posts</Typography>
                  <Typography  color="#566376">
                    <b>{props.profile.posts.count}</b>
                  </Typography>
              </HorizontalStack>
              </HorizontalStack>
            </Box>
          </HorizontalStack>
          <Typography  sx={{ ml: 1, mt:2, mb:1 }}variant="h7" textOverflow="ellipses">
            {user.username}
          </Typography>
          <Box>
            {currentUser && user._id === currentUser.userId && (
              <IconButton onClick={props.handleEditing} sx={{ mr: 1 }}>
                {props.editing ? (
                  <MdCancel color={"#4A92FF"} />
                ) : (
                  <FiEdit2 size={18} color={"#4A92FF"} />
                )}
              </IconButton>
            )}
            {user.biography ? (
              <>
                <Typography sx={{ ml: 1}} textAlign="center" variant="p">
                  <b >Bio: </b>
                  {user.biography}
                </Typography>
              </>
            ) : (
              <Typography sx={{color:"#A5A7B4", ml: 1}} variant="p">
                <i>
                  No bio yet{" "}
                  {currentUser && user._id === currentUser.userId && (
                    <span style={{color:"#A5A7B4"}} >- Tap on the edit icon to add your bio</span>
                  )}
                </i>
              </Typography>
            )}
            {currentUser && user._id !== currentUser.userId && (
              <Box sx={{ mt: 2 }}>
                <Button variant="" sx={{color:"#FDC04D", ml: 1}}  s={{border: "1px solid #fff"}}  onClick={props.handleMessage}>
                  Send Message
                </Button>
              </Box>
            )}
            {props.editing && (
              <Box>
                <ContentUpdateEditor
                  handleSubmit={props.handleSubmit}
                  originalContent={user.biography}
                  validate={props.validate}
                />
              </Box>
            )}
          </Box>
        </Stack>
      ) : (
        <>Loading...</>
      )}
    </Card>
  );
};

export default MobileProfile;
