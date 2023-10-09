import React from "react";
import "./styles/navbar.css"
import sedan from "../images/sedan.png"

const Navigation = () => {
  return (
    <>
      <nav id="admin-page-nav-container-my-nav" style={{backgroundColor:"#526D82"}}>
        <div id="logo-of-the-rental-car-app" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <span id="name-of-the-app-rental-car-app">Speedy</span>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
