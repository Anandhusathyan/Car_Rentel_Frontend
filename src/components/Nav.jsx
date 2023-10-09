import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/nav.css";

// Import the CSS file for styling

const Nav = () => {
  const navigate = useNavigate();

  function logOutHandler(){

  // window.localStorage.setItem('authe_user', "");

    window.localStorage.clear();
    navigate("/");
  }

  return (
    <div className="nav-container" style={{backgroundColor:"#526D82"}}>
      <div className="logo" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <span>Speedy</span>
      </div>
      <div className="links d-flex justify-content-center align-items-center gap-2">
        <Link to="/mybookings" className="link text-light">
          My Bookings
        </Link>
        <button className="text-light rounded" onClick={logOutHandler}>Log Out</button>
      </div>
    </div>
  );
};

export default Nav;
