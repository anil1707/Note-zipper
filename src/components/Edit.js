import React, { useState } from "react";
import Nav from "./Nav";
import { Button, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const note = location.state;
  const [title, settitle] = useState(note.title);
  const [content, setcontent] = useState(note.content);
  const [category, setcategory] = useState(note.category);
  const editNoteHandler = async () => {
    const response = await fetch("/note/update/" + note.id, {
      method: "put",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        category: category,
        content: content,
      }),
    });

    const data = await response.json();
    navigate("/");
  };
  return (
    <>
      <Nav />
      <div className="signin">
        {/* {error && <Error errorMessage={error} />} */}
        {/* {loading && <Loading/>} */}
        <form className="formBody" id="registerForm">
          <h1>Update Note</h1>

          <TextField
            placeholder="Title"
            size="small"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            type="text"
            className="inputField"
            label="Title"
          />
          <TextField
            placeholder="Category"
            size="small"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            type="text"
            className="inputField"
            label="Category"
          />
          <TextField
            placeholder="Content"
            size="small"
            value={content}
            onChange={(e) => setcontent(e.target.value)}
            type="text"
            className="inputField"
            label="Content"
          />
          <Button
            variant="contained"
            size="medium"
            id="submit_btn"
            onClick={editNoteHandler}
          >
            UPDATE
          </Button>
         </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Edit;
