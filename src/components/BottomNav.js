import React from 'react'
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigation from '@mui/material/BottomNavigation';
import {GoHome,GoHomeFill} from 'react-icons/go';
import {GoSearch} from 'react-icons/go';
import {GrSearch} from 'react-icons/gr';

import {BiNotification,BiSolidNotification} from 'react-icons/bi';
import { isLoggedIn } from "../helpers/authHelper";
import {BiMessageSquare,BiSolidMessageSquare} from "react-icons/bi";
import { Link} from "react-router-dom";
import { useState, useEffect } from 'react';
import { IoCreateOutline,IoCreate } from "react-icons/io5";
export const BottomNav = () => {
    const user = isLoggedIn();;
    const username = user && isLoggedIn().username;
    const [login,setLogin] = useState(true) 


    const handle = () => {
      const currentPathname = window.location.pathname;
      if(currentPathname === "/login" || currentPathname === "/signup")
        setLogin(false);
      else
        setLogin(true);
    };

    useEffect(() => {
      handle()
      
    }, [user]);
    const [value, setValue] = useState("home");

  return (
    <>
      {login && 
          <BottomNavigation sx={{position:"fixed", zIndex:500, minWidth:0,  display:{xs:'flex',md:"none"} ,justifyContent:"space-between" ,backgroundColor:"#fff",left:0,right:0,bottom:0 }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction sx={{px:0,minWidth:0}} value="home" component={Link} to={"/"} icon={(value === 'home')? <GoHomeFill size={25} color='#18181b'/> : <GoHome size={25} color='#a5a5a5'/> } />
          <BottomNavigationAction sx={{px:0,minWidth:0}} value="search" icon={(value === 'search')? <GrSearch size={25} color='#18181b'/> : <GoSearch size={25} color='#a5a5a5'/> } />
          <BottomNavigationAction  sx={{px:0,minWidth:0}} value="post" component={Link} to={"/posts/create"} icon={(value === 'post')? <IoCreate size={25} color='#18181b'/> : <IoCreateOutline size={25} color='#a5a5a5'/> } />
          <BottomNavigationAction sx={{px:0,minWidth:0}} value="chat" component={Link} to={"/messenger"} icon={(value === 'chat')? <BiSolidMessageSquare size={25} color='#18181b'/> : <BiMessageSquare size={25} color='#a5a5a5'/> } />
          <BottomNavigationAction  sx={{px:0,minWidth:0}} value="notification"  icon={(value === 'notification')? <BiSolidNotification size={25} color='#18181b'/> : <BiNotification size={25} color='#a5a5a5'/> } />
        </BottomNavigation>
  }
  </>
  )
}
