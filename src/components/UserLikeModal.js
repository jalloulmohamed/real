import { Backdrop, Box, Card, Modal, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { getUserLikes } from "../api/posts";
import Loading from "./Loading";
import UserEntry from "./UserEntry";



const UserLikeModal = ({ postId, open, setOpen }) => {
  const [userLikes, setUserLikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMorePages, setHasMorePages] = useState(true);
  const scrollBoxRef = useRef(null);

  const handleClose = () => setOpen(false);
  const handleBackdropClick = (event) => {
    event.stopPropagation();
    setOpen(false);
  };

  const fetchUserLikes = async () => {
    if (loading || !hasMorePages) return;

    setLoading(true);

    let anchor = "";
    if (userLikes && userLikes.length > 0) {
      anchor = userLikes[userLikes.length - 1].id;
    }

    const data = await getUserLikes(postId, anchor);

    setLoading(false);
    if (data.success) {
      setUserLikes([...userLikes, ...data.userLikes]);
      setHasMorePages(data.hasMorePages);
    }
  };

  useEffect(() => {
    if (open) {
      fetchUserLikes();
    }
  }, [open]);

  const handleScroll = () => {
    const scrollBox = scrollBoxRef.current;

    if (
      scrollBox.scrollTop + scrollBox.clientHeight >
      scrollBox.scrollHeight - 12
    ) {
      fetchUserLikes();
    }
  };

  useEffect(() => {
    if (!scrollBoxRef.current) {
      return;
    }
    const scrollBox = scrollBoxRef.current;
    scrollBox.addEventListener("scroll", handleScroll);

    return () => {
      scrollBox.removeEventListener("scroll", handleScroll);
    };
  }, [userLikes]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      BackdropComponent={Backdrop}
      BackdropProps={{ onClick: handleBackdropClick }} 
    >
        <Card sx={{position:"absolute",
                top:0 , 
                borderRadius:"10px" ,
                borderColor:"#fff",
                bottom:0,
                right:0 ,
                left:0 , 
                width:{
                    md:"350px",
                    xs:"90%",
                },
                outline:"none",
                height:"300px" , 
                margin:"auto",
                overflowY:"scroll",
                '&::-webkit-scrollbar':{
                    display: "none",
                  }
            }}
            ref={scrollBoxRef}
            onClick={(e) => {
            e.stopPropagation();
        }}
        >
                <Typography    sx={{textAlign:"center",mb:"10px"} } color="text.secondary" >
                    Likes
                </Typography>
            <Stack>
                <Stack spacing={2}>
                {userLikes &&
                    userLikes.map((like) => (
                    <UserEntry username={like.username}  size={40}  onClose={handleClose} key={like.username} />
                    ))}
                </Stack>
                {loading ? <Loading /> : hasMorePages && <Box py={6}></Box>}
            </Stack>
        </Card>
    </Modal>
  );
};

export default UserLikeModal;