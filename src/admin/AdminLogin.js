import React from "react";
import { useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CarContextDetails } from '../context/CarContext'

const AdminLogin = () => {

  const { setverifiedadmin } = useContext(CarContextDetails)

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error,seterror]= useState("");


  const navigate=useNavigate();

  async function Handleclick(e){
    e.preventDefault();

    

    if(!email || !password ){
          
      seterror("All Fields Are Required");
    }

    else if(email.indexOf('@')===-1){
      seterror("email must contain @")
    }


    else{

    try {
      const data = await axios.post("https://car-rental-app-rblz.onrender.com/adminlogin", { email, password })
      console.log(data)
      if(data.data.autherization){

        window.localStorage.setItem('authe_admin', JSON.stringify(data.data.autherization));

        const autherization = window.localStorage.getItem("authe_admin");

      if(autherization){
 
        setverifiedadmin(autherization);

      }

      }
      navigate("/helloadmin")
    }
    catch (error) {
      console.log("error from frontend", error);
      seterror(error.response.data)
    }
    }

  }
  return (
    <div>
      <form >
        {!error?<h4 className="text-light">Login Admin Account</h4>
        :<h4 className="text-light1">{error}</h4>}

        <input type="email" name="email" placeholder="Email"
        onChange={e => {setemail(e.target.value);seterror("")}} />

        <input type="password" placeholder="password" 
        onChange={e => {setpassword(e.target.value);seterror("")}}/>
        <button onClick={Handleclick}>Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
