import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "./styles/signup.css";
import axios from "axios";
import UserSignIn from "./UserSignIn";
import "react-toastify/dist/ReactToastify.css";

const UserSignUp = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [contact, setcontact] = useState("");
  const [conf_pass, setconf_pass] = useState("");
  const [error, seterror] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  async function Handleclick(e) {
    e.preventDefault();

    console.log(password.length);

    if (!email || !password || !name || !contact || !conf_pass) {
      seterror("All Fields Are Required");
    } else if (/\d/.test(name)) {
      seterror("Name Should Contain Only Alphabates");
    } else if (password !== conf_pass) {
      seterror("Confirm Password Didn't Match");
    } else if (password.length < 6) {
      seterror("Password Should Contain At Least 6 Characters");
    } else if (email.indexOf("@") === -1) {
      seterror("Email must contain @");
    } else if (/[a-zA-Z]/.test(contact)) {
      seterror("Contact Should Contain Only Numbers");
    } else {
      try {
        const data = await axios.post(
          "https://car-rental-app-rblz.onrender.com/usersignup",
          { email, password },
          { withCredentials: true }
        );
        console.log(data);
        if (data.status === 201) {
          setIsRegistered(true);
          toast.success("Registered Successfully"); // Display success toast
        }
        setTimeout(() => {
          seterror("");
          setemail("");
          setpassword("");
          setname("");
          setcontact("");
          setconf_pass("");
        }, 3000);
      } catch (err) {
        console.log("error from frontend", err, err.response.data.errors.email);
        seterror(err.response.data.errors.email);
      }
    }
  }

  return (
    <div>
      <ToastContainer position="top-center" /> {/* Set position to top-center */}
      {!isRegistered ? (
        <form>
          {!error ? (
            <h4 className='text-light'>Register your Account</h4>
          ) : (
            <h4 className='text-warning'>{error}</h4>
          )}

          {/* Rest of your form inputs */}
          <input
            value={name}
            type="text"
            name="Name"
            placeholder="Name"
            
            onChange={(e) => {
              setname(e.target.value);
              seterror("");
            }}
          />

          <input
            value={email}
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => {
              setemail(e.target.value);
              seterror("");
            }}
          />

          <input
            value={contact}
            type="tel"
            name="contact"
            placeholder="Contact"
            onChange={(e) => {
              setcontact(e.target.value);
              seterror("");
            }}
          />

          <input
            value={password}
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              setpassword(e.target.value);
              seterror("");
            }}
          />

          <input
            value={conf_pass}
            type="password"
            name="Confirm_Password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setconf_pass(e.target.value);
              seterror("");
            }}
          />
          <button onClick={Handleclick}>Register</button>
        </form>
      ) : (
        <UserSignIn />
      )}
    </div>
  );
};

export default UserSignUp;
