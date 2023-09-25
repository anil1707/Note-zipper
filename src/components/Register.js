
import React, { useState } from "react";
import '../signin.css'
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { Button, IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Error from "./Error";
import Loading from "./Loading";
const Register = () => {
  const [error, seterror] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setloading] = useState(false)

  const [phone, setphone] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()
  const registerHandler = (e) => {
    e.preventDefault()
    setloading(true)
    fetch("/create", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email, password: password,confirmPassword:confirmPassword, phone: phone }),
    }).then((response) => {
      response.json().then((result) => {
        console.log(result);
        if(result.message==="successfully registered"){
          setloading(false)
          navigate('/signin')

        }else{
          seterror(result.message)
          setloading(false)
        }
      });
    });
    
  };
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
    {error && <Error errorMessage={error} />}
    {loading && <Loading/>}
    <form className="formBody" id="registerForm">
    <h1>Sign Up</h1>
     
      <TextField
        placeholder="Name"
        size="small"
        value={name}
        onChange={(e) => setname(e.target.value)}
        type="text" className="inputField"
        
      />
      <TextField
      placeholder="Email"
      size="small"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        type="text" className="inputField"
      />
      
      <OutlinedInput
            placeholder="Password"
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
            
          />
          <OutlinedInput
            placeholder="Confir Password"
            type={showConfirmPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=> setShowConfirmPassword(true)}
                  onMouseDown={() => setShowConfirmPassword(false)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            onChange={(e)=>setConfirmPassword(e.target.value)}
            value={confirmPassword}
            className="inputField"
            size="small"
            
          />
      <TextField
      placeholder="Phone Number"
      size="small"
        value={phone}
        onChange={(e) => setphone(e.target.value)}
        type="number" className="inputField"
      />
      <Button variant="contained" size="medium" id="submit_btn" onClick={registerHandler}>Register</Button>
      <p style={{alignItems:"left"}}>Already registered? <Link to="/signin" style={{textDecoration:"none", color:"blue", fontWeight:"bold"}}>login</Link></p>
    </form>
    </div>
    </>
  );
};

export default Register;
