import {
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { BiLeftArrowAlt} from "react-icons/bi";
import { Link } from "react-router-dom";
import { getMessages, sendMessage } from "../api/messages";
import { isLoggedIn } from "../helpers/authHelper";
import { socket } from "../helpers/socketHelper";
import Loading from "./Loading";
import Message from "./Message";
import SendMessage from "./SendMessage";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";

const Messages = (props) => {
  const messagesEndRef = useRef(null);
  const user = isLoggedIn();
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(true);

  const conversationsRef = useRef(props.conversations);
  const conservantRef = useRef(props.conservant);
  const messagesRef = useRef(messages);
  useEffect(() => {
    conversationsRef.current = props.conversations;
    conservantRef.current = props.conservant;
    messagesRef.current = messages;
  });

  const conversation =
    props.conversations &&
    props.conservant &&
    props.getConversation(props.conversations, props.conservant._id);

  const setDirection = (messages) => {
    messages.forEach((message) => {
      if (message.sender._id === user.userId) {
        message.direction = "from";
      } else {
        message.direction = "to";
      }
    });
  };

  const fetchMessages = async () => {
    if (conversation) {
      if (conversation.new) {
        setLoading(false);
        setMessages(conversation.messages);
        return;
      }

      setLoading(true);

      const data = await getMessages(user, conversation._id);

      setDirection(data);

      if (data && !data.error) {
        setMessages(data);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [props.conservant]);

  useEffect(() => {
    if (messages) {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  const handleSendMessage = async (content) => {
    const newMessage = { direction: "from", content };
    const newMessages = [newMessage, ...messages];

    if (conversation.new) {
      conversation.messages = [...conversation.messages, newMessage];
    }

    let newConversations = props.conversations.filter(
      (conversationCompare) => conversation._id !== conversationCompare._id
    );

    newConversations.unshift(conversation);

    props.setConversations(newConversations);

    setMessages(newMessages);

    await sendMessage(user, newMessage, conversation.recipient._id);

    socket.emit(
      "send-message",
      conversation.recipient._id,
      user.username,
      content
    );
  };

  const handleReceiveMessage = (senderId, username, content) => {
    const newMessage = { direction: "to", content };
    
    const conversation = props.getConversation(
      conversationsRef.current,
      senderId
    );

    console.log(username + " " + content);

    if (conversation) {
      let newMessages = [newMessage];
      if (messagesRef.current) {
        newMessages = [...newMessages, ...messagesRef.current];
      }

      setMessages(newMessages);

      if (conversation.new) {
        conversation.messages = newMessages;
      }
      conversation.lastMessageAt = Date.now();

      let newConversations = conversationsRef.current.filter(
        (conversationCompare) => conversation._id !== conversationCompare._id
      );

      newConversations.unshift(conversation);

      props.setConversations(newConversations);
    } else {
      const newConversation = {
        _id: senderId,
        recipient: { _id: senderId, username },
        new: true,
        messages: [newMessage],
        lastMessageAt: Date.now(),
      };
      props.setConversations([newConversation, ...conversationsRef.current]);
    }

    scrollToBottom();
  };

  useEffect(() => {
    socket.on("receive-message", handleReceiveMessage);
  }, []);

  return props.conservant ? (
    <>
      {messages && conversation && !loading ? (
        <>
          <HorizontalStack
            alignItems="center"
            borderBottom="1px solid #f5f5f5"
            sx={{
              paddingLeft: {
                md: '20px',
                xs: '0',
              }, 
              py:"12px",
            }}
          >
            {props.mobile && (
              <IconButton
                onClick={() => props.setConservant(null)}
                sx={{ padding: 0 ,marginLeft:"15px"}}
              >
                <BiLeftArrowAlt size={20} color="#000"  />
              </IconButton>
            )}
            <UserAvatar
              username={props.conservant.username}
              height={30}
              width={30}
            />
            <Typography >
              <Link  style={{
            color:"#000",

            fontWeight: 'bold',
            fontSize: 15,
            textDecoration: 'none',
          }} to={"/users/" + props.conservant.username}>
                <b>{props.conservant.username}</b>
              </Link>
            </Typography>
          </HorizontalStack>
          
          <Box >
            <Box >
              <Stack
                sx={{ padding: 2, overflowY: "auto", '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                backgroundColor:"#FFF5",
                scrollbarWidth: 'none',height:{
                 xs: "calc(100vh - 115px)",
                 md:"calc(100vh - 210px)",
                }  }}
                direction="column-reverse"
              >
                <div ref={messagesEndRef} />
                {messages.map((message, i) => (
                  <Message
                    conservant={props.conservant}
                    message={message}
                    key={i}
                  />
                ))}
              </Stack>
            </Box>
          </Box>
          <SendMessage onSendMessage={handleSendMessage} />
          {scrollToBottom()}
        </>
      ) : (
        <Stack sx={{ height:"80vh"}} justifyContent="center">
          <Loading />
        </Stack>
      )}
    </>
  ) : (
    <Stack
      sx={{ height:"80vh"}}
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      {/* <AiFillMessage color="#A5A7B4"  size={70} /> */}
      <Typography color="#A5A7B4" variant="h5">Real Chat</Typography>
      <Typography color="#A5A7B4">
        Privately message other users on Real
      </Typography>
    </Stack>
  );
};

export default Messages;
