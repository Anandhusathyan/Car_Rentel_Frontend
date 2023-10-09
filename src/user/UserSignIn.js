import React,{useContext} from "react";
import "./styles/signin.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CarContextDetails } from "../context/CarContext";


const UserSignIn = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");

  const {  setverifieduser } = useContext(CarContextDetails);

  const navigate = useNavigate();

  async function Handleclick(e) {
    e.preventDefault();

    if (!email || !password) {
      seterror("All Fields Are Required");
    } 
    
    else if (email.indexOf("@") === -1) {
      seterror("email must contain @");    
    } 
    
    else {
      try {
        const response = await axios.post(
          "https://car-rental-app-rblz.onrender.com/userlogin",
          { email, password },
          { withCredentials: true }
        );
        console.log(response);
        if(response.data.autherization){

          window.localStorage.setItem('authe_user', JSON.stringify(response.data.autherization));
          const autherization = window.localStorage.getItem("authe_user");
          if(autherization){
 
            setverifieduser(autherization);
      
          }

        }
        navigate("/destination");
      } catch (error) {
        console.log("error from frontend", error);
        seterror(error.response.data);
      }
    }
  }
  

  return (
    <div>
      <form action="post">
        {!error ? (
          <h4 className="text-light">Login Your Account</h4>
        ) : (
          <h4 className="text-warning">{error}</h4>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => {
            setemail(e.target.value);
            seterror("");
          }}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setpassword(e.target.value);
            seterror("");
          }}
        />
        <button onClick={Handleclick}>Login</button>
      </form>
    </div>
  );
};

export default UserSignIn;
