import { useTheme } from "@emotion/react";
import {
  Avatar,
  IconButton,
  Stack,
  TextField,
  Typography,
  Button,
  InputAdornment,
  Image,
  Container
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "react-icons/ai";
import "react-icons/ri";
import "./postCard.css";
import {
  AiFillFileText,
  AiFillHome,
  AiFillMessage,
  AiOutlineSearch,
} from "react-icons/ai";
import {IoSearchOutline} from "react-icons/io5"
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logoutUser } from "../helpers/authHelper";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";
import { FiLogOut } from "react-icons/fi";
import reactDom from "react-dom";
import { socket } from "../helpers/socketHelper";
import { useLocation } from 'react-router-dom';
import CreatePost from "./CreatePost";
import {BiNotification,BiSolidNotification} from 'react-icons/bi';
import {BiMessageSquare,BiSolidMessageSquare} from "react-icons/bi";
import { IoCreateOutline,IoCreate } from "react-icons/io5"; 
const Navbar = () => {
  const navigate = useNavigate();
  const user = isLoggedIn();
  const theme = useTheme();
  const username = user && isLoggedIn().username;
  const [search, setSearch] = useState("");
  const [searchIcon, setSearchIcon] = useState(false);
  const [width, setWindowWidth] = useState(0);
  const [notefication, setNotefication] = useState(false);
  const [login,setLogin] = useState(true) 


  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const mobile = width < 500;
  const navbarWidth = width < 600;

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const handleLogout = async (e) => {
    logoutUser();
    navigate("/login");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search?" + new URLSearchParams({ search }));
  };

  const handleSearchIcon = (e) => {
    setSearchIcon(!searchIcon);
  };

  const handleNotification = async (senderId, user, content) => {
    const currentPathname = window.location.pathname;
    if(currentPathname!== "/messenger")
    {
      setNotefication(true);
      const audio = new Audio('/notification.mp3');
      if (Notification.permission === "granted") {
        await audio.play();
      } else if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          await audio.play();
        }
      }
    }
  };
  const handle = async () => {
    const currentPathname = window.location.pathname;
    if(currentPathname === "/login" || currentPathname === "/signup")
      setLogin(false);
    else
      setLogin(true);
  };
  
  const handleClickNotification = () => {
    setNotefication(false);
  };
  
  useEffect(() => {
    socket.on('receive-message', handleNotification);

  }, []);
  
  useEffect(() => {
    handle()
    
  }, [window.location.pathname]);
  

  return (
    <> { login && 
        <Container>

          <Stack mb={2}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                pt: 2,
                pb: 0,
              }}

            >
              <HorizontalStack alignItems="center"  sx={{ textDecoration: 'none' }} component={Link}  to={"/"}>
                 
                <img src="/logo.svg" alt="Image" width={27}  />
              
                {/* <Typography
                  sx={{ display: mobile ? "block" : "none" }}
                  variant={navbarWidth ? "h5" : "h5"}
                  color="#18181b"
                >   
                    Real
                </Typography> */}
              </HorizontalStack>

              {/* {!navbarWidth && (
                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    size="small"
                    label="Search for posts..."
                    sx={{ flexGrow: 1, maxWidth: 300 }}
                    onChange={handleChange}
                    value={search}
                  />
                </Box>
              )} */}

              <HorizontalStack  >
                {/* {mobile && (
                  <IconButton onClick={handleSearchIcon}>
                    <IoSearchOutline size={24} color="#18181b"/>
                  </IconButton>
                )} */}
                

                {/* <IconButton component={Link}  to={"/"}>
                  <AiFillHome size={20} color="#18181b" />
                </IconButton> */}
                {user ? (
                  <>
                    <IconButton  sx={{display:{md:"flex",xs:"none"}}} component={Link}  to={"/posts/create"}>
                      <IoCreateOutline size={20}  color="#18181b"/>
                    </IconButton>
                    <IconButton sx={{display:{md:"flex",xs:"none"}}}>
                      <BiNotification size={20} color="#18181b"/>
                    </IconButton>
                    <IconButton  sx={{display:{md:"flex",xs:"none"}}} onClick={handleClickNotification} className={notefication ? 'notificationDot' : ''} component={Link} to={"/messenger"}>
                      <BiMessageSquare size={18}  color="#18181b" />
                    </IconButton>
                    <IconButton  sx={{display:{md:"flex",xs:"none"}}}  onClick={handleLogout}>
                      <FiLogOut size={20} color="#18181b" ></FiLogOut>
                    </IconButton>
                    <IconButton   component={Link}  to={"/users/" + username}>
                      <UserAvatar width={28} height={28} username={user.username} />
                    </IconButton>

                  </>
                ) : (
                  <>
                    <Button variant="text" sx={{   py:"4px",  fontSize:"15px",   color: "#18181b"  ,'&:hover': {backgroundColor: '#fff'}}} href="/login">
                      Login
                    </Button>
                    <Button variant="text" sx={{py:"4px", fontSize:"13px", backgroundColor : "#18181b", color: "#FFF", '&:hover': {backgroundColor: '#18181b'}}} href="/signup">
                      Sign Up
                    </Button>
                  </>
                )}
              </HorizontalStack>
            </Stack>
            {navbarWidth && searchIcon && (
              <Box component="form" onSubmit={handleSubmit} mt={2}>
                <TextField
                  size="small"
                  label="Search for posts..."
                  fullWidth
                  onChange={handleChange}
                  value={search}
                />
              </Box>
            )}
          </Stack>
        </Container>
      }
    </>
  );
};

export default Navbar;
