import {
  Alert,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/users";
import ErrorAlert from "../ErrorAlert";
import { loginUser } from "../../helpers/authHelper";
import Copyright from "../Copyright";
import HorizontalStack from "../util/HorizontalStack";
const LoginView = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await login(formData);
    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate("/");
    }
  };

  return (
    <Container maxWidth={"xs"} sx={{ mt: 6 }}>
      <Stack alignItems="center" >
        <HorizontalStack alignItems="end"  sx={{ textDecoration: 'none' ,marginBottom:10 }}  component={Link}  to={"/"}>
          <Box >
          <img src="/logo.svg" alt="Image" width={50} />
          </Box>
          <Typography
            variant="h3"
            color="#18181b"
          >
            {/* <Link to="/" color="inherit"> */}
              eal
            {/* </Link> */}
          </Typography>
        </HorizontalStack>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <Typography color="text.secondary">
          Don't have an account yet? <Link  style={{
            color:"#18181b",
            fontWeight: 'bold',
            fontSize: 15,
            textDecoration: 'none',
          }} to="/signup">Sign Up</Link>
        </Typography>
        <Box  sx={{maxWidth:{
          md:"310px"
        }}}  component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            fullWidth
            margin="normal"
            autoComplete="email"
            required
            id="email"
            name="email"
            onChange={handleChange}
            size="small"
          />
          <TextField
            label="Password"
            fullWidth
            required
            margin="normal"
            id="password  "
            name="password"
            onChange={handleChange}
            type="password"
            size="small"
            sx={{ my: 2 , backgroundColor:"#fff" ,'&:hover':{ backgroundColor:"#fff" , border:0},'&:focus':{ bordre:0, backgroundColor:"#fff"}}}
          />

          <ErrorAlert error={serverError} />
          <Button type="submit" fullWidth variant="contained" sx={{ p:"8px", my: 2  , backgroundColor:"#18181b" ,'&:hover':{ backgroundColor:"#18181b", } }}>
            Login
          </Button>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Copyright />
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginView;
