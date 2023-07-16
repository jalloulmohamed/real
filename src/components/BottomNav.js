import React from 'react'
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigation from '@mui/material/BottomNavigation';
import {GoHomeFill} from 'react-icons/go';
import {GoSearch} from 'react-icons/go';
import {BiNotification} from 'react-icons/bi';
import { isLoggedIn,  } from "../helpers/authHelper";
import UserAvatar from "./UserAvatar";
import { Link} from "react-router-dom";
import { useState, useEffect } from 'react';
import { FiFeather } from "react-icons/fi";
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
  return (
    <>
      {login && 
          <BottomNavigation sx={{position:"fixed", zIndex:89999, minWidth:0,  display:{xs:'flex',md:"none"} ,justifyContent:"space-between" ,backgroundColor:"#fff",left:0,right:0,bottom:0 }}
          // value={value}
          // onChange={(event, newValue) => {
          //   setValue(newValue);
          // }}
        >
          <BottomNavigationAction sx={{px:0,minWidth:0}} to={"/"} icon={<GoHomeFill size={25} color='#18181b' />} />
          <BottomNavigationAction sx={{px:0,minWidth:0}} icon={<GoSearch size={25} color='#18181b'/>} />
          <BottomNavigationAction  sx={{px:0,minWidth:0}} icon={<FiFeather size={25} color='#18181b'/>} />
          <BottomNavigationAction  sx={{px:0,minWidth:0}} icon={<BiNotification size={25} color='#18181b'/>} />
          <BottomNavigationAction  sx={{px:0,minWidth:0}} component={Link}  to={"/users/" + username}  icon={<UserAvatar width={30} height={30}  />} />
        </BottomNavigation>
  }
  </>
  )
}
