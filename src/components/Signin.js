import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../signin.css";
import Error from "./Error";
import Loading from "./Loading";
import Nav from "./Nav";

const Signin = () => {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();
  async function login(e) {
    e.preventDefault();

    setloading(true);
    const response = await fetch("/signin", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    const result = await response.json();
    // alert(result.message);
    if (result.message === "Login successfully!") {
      localStorage.setItem("userInfo", JSON.stringify(result));
      seterror("")
      setloading(false);
      navigate("/");
      
    } else {
      seterror(result.message);
      setloading(false);
    }

     
  }
  function registerHandler(e) {
    e.preventDefault();
    navigate("/register");
  }
  function handleClickShowPassword(){
    setShowPassword(true)
  }

  function handleMouseDownPassword(){
    setShowPassword(false)
  }
  return (
    <>
      <Nav />
      <div className="signin">
        {loading && <Loading />}
        {error && <Error errorMessage={error} />}
        <form className="formBody">
          <h1>Sing In</h1>
          
            <TextField
              placeholder="Email"
              variant="outlined"
              size="small"
              type="text"
              value={email}
              className="inputField"
              onChange={(e) => setemail(e.target.value)}
            />
          <OutlinedInput
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            onChange={(e)=>setpassword(e.target.value)}
            value={password}
            className="inputField"
            size="small"
            placeholder="Password"
          />
          <Button variant="contained" size="medium" id="submit_btn" onClick={login}>
            Sign In
          </Button>
          {/* <div className="Or"></div> */}
          <Button variant="outlined" id="submit_btn" size="medium" onClick={registerHandler}>
            Sign Up
          </Button>
        </form>
      </div>
    </>
  );
};

export default Signin;
