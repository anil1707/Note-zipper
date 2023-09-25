import React, { useState } from "react";
import Nav from "./Nav";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateNote = () => {
  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  const [content, setcontent] = useState("");
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const createNoteHandler = async (e) => {
    toast("Wow so easy!");
    e.preventDefault();
    
    const response = await fetch("/note/create", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        category: category,
        title: title,
        content: content,
        email: userInfo.user.email,
      }),
    });

    const result = await response.json();

    navigate("/");
  };
  return (
    <>
      <Nav />
      <div className="signin">
        {/* {error && <Error errorMessage={error} />} */}
        {/* {loading && <Loading/>} */}
        <form className="formBody" id="registerForm">
          <h1>Create New Note</h1>

          <TextField
            placeholder="Title"
            size="small"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            type="text"
            className="inputField"
          />
          <TextField
            placeholder="Category"
            size="small"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            type="text"
            className="inputField"
          />
          <TextField
            placeholder="Content"
            size="small"
            value={content}
            onChange={(e) => setcontent(e.target.value)}
            type="text"
            className="inputField"
          />
          <Button
            variant="contained"
            size="medium"
            id="submit_btn"
            onClick={createNoteHandler}
          >
            Create
          </Button>
          {/* <p style={{alignItems:"left"}}>Already registered? <Link to="/signin" style={{textDecoration:"none", color:"blue", fontWeight:"bold"}}>login</Link></p> */}
          
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateNote;
