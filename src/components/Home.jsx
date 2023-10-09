import React from "react";
import UserSignIn from "../user/UserSignIn.js";
import UserSignUp from "../user/UserSignUp.js";
import AdminLogin from "../admin/AdminLogin.js";
import Navigation from "./Navigation.jsx";
import { useState } from "react";
import "../components/styles/home.css";
import AdminSignUp from "../admin/AdminSignUp.js";

const Home = () => {
  const [FormType, setFormType] = useState(<UserSignIn />);

  function usersignup() {
    setFormType(<UserSignUp />);
  }

  function userlogin() {
    setFormType(<UserSignIn />);
  }

  function Adminlogin() {
    setFormType(<AdminLogin />);
  }
  function Adminsignup(){
    setFormType(<AdminSignUp />)
  }

  return (
    <div className="font-poppins">
      <Navigation />
      <div className="Home-page">
        <div className="Register">
          <p className="slogan">
          Turn Moments into Memories with Our Rental Fleet
          </p>
          <div className="user">
            <p className="text-dark">User</p>
            <div className="button-user-admin-login-containecr">
              <button id="btn" className="rounded" onClick={userlogin}>
                {" "}
                User Login{" "}
              </button>
              <button id="btn" className="rounded" onClick={usersignup}>
                {" "}
                User Signup
              </button>
            </div>
          </div>
          <div className="Admin">
            <p className="text-dark">Admin</p>
            <div className="button-user-admin-login-containecr">
              <button id="btn" className="rounded" onClick={Adminlogin}>
                Admin login
              </button>
              <button id="btn" className="rounded" onClick={Adminsignup}>
                Admin signup
              </button>
            </div>
          </div>
        </div>
        <div className="form-type">{FormType}</div>
      </div>
    </div>
  );
};

export default Home;
