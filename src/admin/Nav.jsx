import React from "react";
import { Link } from "react-router-dom";
import "./styles/nav.css"; // Import the CSS file for styling


const Nav = () => {

  function logOutHandler(){

    window.localStorage.clear();
    
  }



  return (
    <div className="nav-container" style={{backgroundColor:"#526D82"}}>
      <div className="logo">
        <span>Speedy</span>
      </div>
      <div className="links">
      <button className="btn btn-primary text-decoration-none">
      <Link to="/" className="text-light rounded"  onClick={logOutHandler}>
        Log out
      </Link>
      </button>
      </div>
    </div>
  );
};

export default Nav;