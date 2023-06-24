import { Box, Divider, List, Stack, Typography } from "@mui/material";
import React from "react";
import { AiFillMessage } from "react-icons/ai";
import Loading from "./Loading";
import UserMessengerEntry from "./UserMessengerEntry";
import HorizontalStack from "./util/HorizontalStack";
import "react-icons/bi";
import { BiSad } from "react-icons/bi";

const UserMessengerEntries = (props) => {
  return !props.loading ? (
    <>
      {props.conversations.length > 0 ? (
        <Stack >
          <HorizontalStack
            alignItems="center"
            spacing={2}
            
            sx={{ height: "50px" }}
            color="#566376"
          >
            
            <Typography sx={{fontSize:"20px"}} size={30}>
              <b>Chat</b>
            </Typography>
          </HorizontalStack>
          <Box sx={{ height: "calc(100vh - 136px)"}}>
            <Box sx={{ height: "100%" }}>
              <List sx={{ padding: 0, maxHeight: "100%", overflowY: "auto" ,'&::-webkit-scrollbar': {display:"none"}}}>
                {props.conversations.map((conversation) => (
                  <UserMessengerEntry
                    conservant={props.conservant}
                    conversation={conversation}
                    key={conversation.recipient.username}
                    setConservant={props.setConservant}
                  />
                ))}
              </List>
            </Box>
          </Box>
        </Stack>
      ) : (
        <Stack
          sx={{ height:"80vh"}}
          justifyContent="center"
          alignItems="center"
          spacing={2}
          textAlign="center"
        >
          {/* <BiSad color="#A5A7B4" size={60} /> */}
          <Typography color="#A5A7B4" variant="h5">No Conversations</Typography>
          <Typography  color="#A5A7B4" sx={{ maxWidth: "70%" }}>
            Click 'Message' on another user's profile to start a conversation
          </Typography>
        </Stack>
      )}
    </>
  ) : (
    <Stack sx={{ height:"80vh"}} justifyContent="center">
      <Loading />
    </Stack>
  );
};

export default UserMessengerEntries;
