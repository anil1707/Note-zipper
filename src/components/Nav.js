import {  Search } from "@mui/icons-material";
import { Avatar, Button, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Nav.css";
const Nav = () => {
  const navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem("userInfo"));
  const [userinfo, setUserInfo] = React.useState(userData && userData.user.name);
  function logoutHandler() {
    console.log("logout successfully!");
    localStorage.removeItem("userInfo");
    setUserInfo("");
    navigate('/signin')
  }
  
  return (
    <div className="main_container">
      {userinfo ?<Button variant="outfiled" sx={{marginLeft:"20px"}}  size="small"><Link style={{textDecoration:"none",color:"black"}} to="/">
        MyApp
      </Link> </Button>:
      <Button sx={{marginLeft:"20px"}}><Link style={{textDecoration:"none",color:"black"}} to="/signin">
      MyApp
    </Link></Button>
      }
      
      <div className="searchContainer">
      <OutlinedInput
            type="text"
            placeholder="Search note here"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                >
                  <Search/>
                </IconButton>
               </InputAdornment>
            }
          size="small"
          style={{background:"white"}}
          />
      </div>
      <div className="credentialContainer">
        {!userData ? (
          <>
          <Button variant="outfiled" size="small">
            <Link style={{cursor:"pointer", textDecoration:"none", color:"black"}} to="/signin">
              Login
            </Link>
            </Button>
            <Button variant="outfiled" size="small">
            <Link style={{cursor:"pointer",textDecoration:"none", color:"black"}} to="/register">
              SignUp
            </Link>
          </Button>
          </>
        ) : (
          <>
            <Avatar onClick={()=>navigate('/profile')} sx={{ textTransform:"uppercase",width: 35, height: 35, marginTop:"2px", backgroundColor:"red", cursor:"pointer"}} >{userinfo[0]}</Avatar>
            
            <Button variant="outfiled" onClick={logoutHandler} style={{color:"black"}} >
             Logout
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
