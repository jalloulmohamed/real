import {
  Avatar,
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdRefresh } from "react-icons/md";
import { Link } from "react-router-dom";
import { getRandomUsers } from "../api/users";
import Loading from "./Loading";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";
import UserEntry from "./UserEntry";
const FindUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await getRandomUsers({ size: 5 });
    setLoading(false);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClick = () => {
    fetchUsers();
  };

  return (
    <Card sx={{border:0}}>
      <Stack spacing={2}>
        <HorizontalStack justifyContent="space-between">
          <HorizontalStack>
            <Typography color={"#A5A7B4"}>Find Others</Typography>
          </HorizontalStack>
          <IconButton
            sx={{ padding: 0 }}
            disabled={loading}
            onClick={handleClick}
          >
            <MdRefresh  size={20} color="#A5A7B4"/>
          </IconButton>
        </HorizontalStack>

        

        {loading ? (
          <Loading />
        ) : (
          users &&
          users.map((user) => (
            <UserEntry username={user.username} bio={user.biography} size={35} key={user.username} />
          ))
        )}
      </Stack>
    </Card>
  );
};

export default FindUsers;
