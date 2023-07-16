import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import {BiSolidSend} from "react-icons/bi"
import React, { useEffect, useState } from "react";
import { sendMessage } from "../api/messages";
import { isLoggedIn } from "../helpers/authHelper";
import HorizontalStack from "./util/HorizontalStack";

const SendMessage = (props) => {
  const [content, setContent] = useState("");

  const handleSendMessage = () => {
    props.onSendMessage(content);
    setContent("");
  };

  return (
    <Stack
      sx={{
        my:1,
          paddingLeft: {
            md: '15px',
            xs: '10px',
          }, 
        backgroundColor:"#fff"
      }}
      justifyContent="space-between"
      
    >
      <HorizontalStack>
        <TextField
          onChange={(e) => setContent(e.target.value)}
          label="Send a message..."
          fullWidth
          value={content}
          autoComplete="off"
          size="small"
          InputProps={{ sx: {  borderRadius: 10 , width:"100%" } }}
          
          
          onKeyPress={(e) => {
            if (e.key === "Enter" && content.length > 0) {
              handleSendMessage();
            }
          }}
        />
        <IconButton size="medium"   sx={{marginLeft:0,}}  onClick={handleSendMessage} disabled={content.length === 0}>
          <BiSolidSend  color={"#18181b"}  size={30}></BiSolidSend>
        </IconButton>
      </HorizontalStack>
    </Stack>
  );
};

export default SendMessage;
