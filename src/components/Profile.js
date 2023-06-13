import { useTheme } from "@emotion/react";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { isLoggedIn } from "../helpers/authHelper";
import ContentUpdateEditor from "./ContentUpdateEditor";
import Footer from "./Footer";
import Loading from "./Loading";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";

const Profile = (props) => {
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
    <Card sx={{border:0}}>
      {user ? (
        <Stack alignItems="center"  spacing={2}>
          <Box >
            <UserAvatar width={150} height={150} username={user.username} />
          </Box>

          <Typography variant="h5">{user.username}</Typography>

          {props.editing ? (
            <Box>
              <ContentUpdateEditor
                handleSubmit={props.handleSubmit}
                originalContent={user.biography}
                validate={props.validate}
              />
            </Box>
          ) : user.biography ? (
            <Typography textAlign="center" variant="p">
              <b>Bio: </b>
              {user.biography}
            </Typography>
          ) : (
            <Typography variant="p">
              <i>No bio yet</i>
            </Typography>
          )}

          {currentUser && user._id === currentUser.userId && (
            <Box>
              <Button
                onClick={props.handleEditing}
                sx={{ '&:hover':{backgroundColor:"#fff"}}}
              >
                {props.editing ? <>Cancel</> : <>Edit bio</>}
              </Button>
            </Box>
          )}

          {currentUser && user._id !== currentUser.userId && (
            <Button variant="outlined" sx={{borderColor:"#fff" , '&:hover':{backgroundColor:"#fff",borderColor:"#fff"}}} onClick={props.handleMessage}>
              Message
            </Button>
          )}

          <HorizontalStack>
            <Typography color="#A5A7B4">
              Likes <b>{props.profile.posts.likeCount}</b>
            </Typography>
            <Typography color="#A5A7B4">
              Posts <b>{props.profile.posts.count}</b>
            </Typography>
          </HorizontalStack>
        </Stack>
      ) : (
        <Loading label="Loading profile" />
      )}
    </Card>
  );
};

export default Profile;
