import React, { useState } from "react";
import { Link, BrowserRouter, useNavigate ,Route, Routes} from "react-router-dom";
import "./loginForm.css"
import CardPage from "./card";
import { Button, Card } from "react-bootstrap";

const LoginForm=()=>{
    const navigate=useNavigate();
    const [userDetails, setUserDetails]=useState({email:'',userName:''})
    
    const fnx=(e)=>{
        switch (e.target.id) {
            case 'email':
                setUserDetails({...userDetails,email:e.target.value})
                break;
            case 'username':
            setUserDetails({...userDetails,userName:e.target.value})
             break;
            default:
                break;
        }
    }

const submitHandler=()=>{

    var re = /\S+@\S+\.\S+/;

    localStorage.setItem('userdetails',JSON.stringify(userDetails))
    if(userDetails.email=='' || userDetails.userName=='' || re.test(userDetails.email) ===false || userDetails.userName.length<3){
    alert("Invalid Data")
    } 
     else {
     
    navigate('/card')    
    }
}


    return (
        <div className="cover">
            
            <h1 className="tex">Login</h1>

            <input type="email" onChange={fnx} placeholder="email" id="email" value={userDetails.email} required></input>
            <input type="text" onChange={fnx} placeholder="Name" id='username' value={userDetails.userName} required></input>
            
           
            
            <Button variant="primary" onClick={submitHandler}>Login</Button>
            
        </div>
    )
}


export default LoginForm