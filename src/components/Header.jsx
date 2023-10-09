import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./styles/header.css";
import { CarContextDetails } from "../context/CarContext";

const Header = () => {

  const { headerData, setheaderData, inputdata } = useContext(CarContextDetails);


  return (
    <div id="header">
      <div className="container">
        <ul className="list-inline">
          <li className="list-inline-item text-light">
            Orgin:<span className="text-info mx-2">{inputdata.origin}</span>
            <i
              className="fa-solid fa-arrowo-right"
              style={{ color: "red" }}
            ></i>
          </li>
          <li className="list-inline-item text-light">
            Destination: 
               <span className="text-info mx-2">{inputdata.destination}</span>
          </li>
          <li className="list-inline-item text-light">
            Starting Date:  <span className="text-info mx-2">{inputdata.startdate}</span>
          </li>
          <li className="list-inline-item text-light bold">
            End Date:<span className="text-info mx-2">{inputdata.enddate}</span>
          </li>
          </ul>
          <Link className="btn btn-primary" id="modify" to='/destination' onClick={()=>setheaderData(headerData)}>Modify</Link>
      
      </div>
    </div>
  );
};

export default Header;
