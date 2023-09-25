
import React, { useEffect, useState } from 'react'

const User = () => {
    const [data, setData] = useState([])
    const fetchData = ()=>{
        fetch('/users').then(response=>{
            response.json().then(res=>{
                console.log(res);
                setData(res)
            })
        })
    }


    useEffect(fetchData,[])
  return (
    <div>
        {
        data.length>0 && data.map((item, index)=>{
            return <div><h1>User Name: {item.name}</h1>
            <h3>Email :{item.email} </h3>
            <h4>Phone : {item.pone} </h4></div>
        })
    }
    </div>
  )
    }

export default User