import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import CarList from "../Car/CarList";
import "./styles/orderpage.css";
import { CarContextDetails } from "../context/CarContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {


  const { verifieduser,setverifieduser }=useContext(CarContextDetails);

  const navigate = useNavigate();  

  useEffect(()=>{

    const autherization = window.localStorage.getItem("authe_user");

    if(autherization){
 
      setverifieduser(autherization);

    }
  },[]);

  const [show,setshow] = useState(false);

  const headers={
    'Authorization': verifieduser,
    'Content-Type' : 'application/json'
  }

  useEffect(()=>{

    if(verifieduser){
  
      async function Allcar(){
  
        try{
          const value = await axios.get("https://car-rental-app-rblz.onrender.com/Userauth",{ headers })
          console.log(value);
          if(value.status == 200){
  
            setshow(true);
  
          }
          
        }
        catch(error){
          if(error.response.status == 302){
            navigate("/")
          }
        }
      }
      Allcar();
    }
      
    },[verifieduser])

  return (
    show && <div className="orderpage">
      <Nav />
      <Header />
      <CarList />
    </div>
  );
};

export default OrderPage;
