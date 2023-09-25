import React, { useState } from "react";
import Signin from "./components/Signin.js";
import Home from "./components/Home.js";
import Register from "./components/Register.js";
import { Route, Routes } from "react-router-dom";
import CreateNote from "./components/CreateNote.js";
import Edit from "./components/Edit.js";
import Profile from "./components/Profile.js";
function App() {

  return (
    <Routes className="App">
      <Route path="/signin" element={<Signin />} />
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/createNote" element={<CreateNote />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
