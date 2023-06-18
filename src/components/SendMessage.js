import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import {IoSend} from "react-icons/io5"
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
        <Button  sx={{margin:0 ,color:"#FDC04D" ,padding:0,'&:hover':{backgroundColor:"#fff"}}} onClick={handleSendMessage} disabled={content.length === 0}>
          <IoSend size={25}></IoSend>
        </Button>
      </HorizontalStack>
    </Stack>
  );
};

export default SendMessage;
