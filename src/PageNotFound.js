import React from "react";
import pagenotfound from "./images/pagenotfound.svg";
import "./App.css";
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const navigate = useNavigate()
  function goback(){
    navigate(-1)
  }
  return (
    <div>
      <h2 className="text-center" style={{ marginTop: "40px" }}>
      Hmmm.... The page you are looking for does not exit
      </h2>
      <div className="page">
        <img src={pagenotfound} alt="" style={{ width: "400px" }} />
      </div>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"40px"}}>
      <button className="rounded" onClick={goback}>Go Back</button>
      </div>
    </div>
  );
};

export default PageNotFound;
