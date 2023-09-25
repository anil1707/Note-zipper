import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import Loading from "./Loading";
import Nav from "./Nav";
import { ToastContainer, toast } from "react-toastify";
import EditIcon from '@mui/icons-material/Edit';
import { Delete } from "@mui/icons-material";

const Home = () => {
  const [allNote, setAllNote] = useState({});
  const [loading, setloading] = useState(false);
  // const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [deleteSuccess, setdeleteSuccess] = useState("");
  const [showEdit, setShowEdit] = useState(false)
  const fetchData = async () => {
    setloading(true);
    if (userInfo) {
      const response = await fetch("/note/all_notes", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email: userInfo.user.email }),
      });
      const result = await response.json();
      setAllNote(result);
      setloading(false);
    } else {
      console.log("user not login");
      setloading(false);
    }
  };
  useEffect(() => {
    fetchData();
    setdeleteSuccess("");
  }, [deleteSuccess]);

  const deleteHandler = async (id) => {
    console.log(id);
    const response = await fetch("/note/delete/" + id, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
      },
    });

    const deletedNote = await response.json();
    console.log(deletedNote);
    setdeleteSuccess(deletedNote.message);
    // navigate("/");
    toast(deletedNote.message);
  };
  
  return (
    <>
      <Nav />
      <div
        style={{
          marginTop: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Button variant="contained" sx={{margin:"20px"}}>
        <Link
          to={userInfo ? "/createNote" : "/signin"}
          style={{
            textDecoration: "none",
            color: "white",
            cursor:"pointer"
          }}
        >
          Create Note
        </Link>
        </Button>
        <hr style={{ marginTop: 25, width: 900 }} />
        {loading && <Loading />}
        {allNote.length > 0 ?
          allNote.map((item) => {
            return (
              <Card sx={{ width: "900px", marginTop: "30px", boxShadow:"0px 0px 10px black"}} key={item._id}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" >
                    Title: {item.title}
                  </Typography>
                  <Typography variant="body4" >
                    Content: {item.content}
                  </Typography>
                  <Typography variant="body2">Category: {item.category}</Typography>
                  
                  <Typography variant="h7" color="text.secondary">Created Date : {item.createdAt.split('T')[0]}</Typography><br/>
                  <Typography variant="body4" color="text.secondary">Created Time : {item.createdAt.split('T')[1]}</Typography>
                </CardContent>
                <CardActions>
                  
                  <Button  size="small" variant="contained" startIcon={<EditIcon/> } onClick={()=> setShowEdit(true)} >
                  <Link 
                    to="/edit"
                    style={{
                      textDecoration: "none",
                      color: "white"
                    }}
                    state={{id:item._id, title:item.title, content:item.content, category:item.category}}
                     >
                    EDIT
                  </Link>
                  </Button>
                  <Button  size="small" style={{backgroundColor:"rgb(245, 61, 61)"}}variant="contained" startIcon={<Delete/>} onClick={() => deleteHandler(item._id)}>
                    Delete
                  </Button>
                </CardActions>
                <ToastContainer />
              </Card>
            );
          })
        :<Card sx={{width: "900px", marginTop: "30px", boxShadow:"0px 0px 10px black", padding:"15px", textAlign:"center"}}><Typography>No Note, Pls create Note</Typography></Card>}
      </div>
    </>
  );
};

export default Home;
