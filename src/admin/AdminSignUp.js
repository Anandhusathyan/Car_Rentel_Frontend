
import React from 'react'
import { useState } from 'react';
import axios from "axios";
import AdminLogin from "./AdminLogin"



const AdminSignUp = () => {


  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Name,setname]= useState("");
  const [contact,setcontact]= useState("");
  const [conf_pass,setconf_pass] = useState("");
  const [error,seterror]= useState("");
  const [signup,setsignup]= useState(false)


  async function Handleclick(e) {
    e.preventDefault();
  
    console.log(password.length)
    

    if(!email || !password || !Name|| !contact || !conf_pass){
          
      seterror("All Fields Are Required");
    }

    else if (/\d/.test(Name)){

      seterror("Name Should Contain Only Alphabates");
    }

    else if (password !== conf_pass){

      seterror("Confirm Password Didn't Match");
    }

    else if(password.length<6){

      seterror("Password Should Contain At Least 6 Characters");
    }

    else if(email.indexOf('@')===-1){
      seterror("email must contain @")
    }

    
    else if(/[a-zA-Z]/.test(contact)){
      seterror("Contact Should Contain Only Numbers")
    }

    else{

    try {
      const data = await axios.post("https://car-rental-app-rblz.onrender.com/adminsignup", { email, password, Name, contact }, { withCredentials: true });
      console.log(data);
      setsignup(true)
      seterror("Registered Sucessfully")
      setTimeout(() => {
        seterror("");
        setemail("");
        setpassword("");
        setname("");
        setcontact("");
        setconf_pass("");
      }, 3000);
      
    }
    catch (err) {
      console.log("error from backend", err,err.response.data.errors.email);
      seterror(err.response.data.errors.email);
      // seterror(err.response.data.erros.password);
    }
    }

  }
  return (
    <div>
      {signup ? <AdminLogin/> :
      <form   >
        {!error?<h4 className='text-light'> Register your Admin Account </h4>
        :<h4 className='text-warning'>{error}</h4>}

        <input value={Name} type="text" name="Name" placeholder='Name' onChange={e => {setname(e.target.value);seterror("")}} />

        <input value={email} type="email" name="email" placeholder='Email' onChange={e => {setemail(e.target.value);seterror("")}} />

        <input value={contact} type="tel" name="contact" placeholder='Contact' onChange={e =>{ setcontact(e.target.value);seterror("")}}/>

        <input value={password} type="password" name="password" placeholder='Password' 
        onChange={e => {setpassword(e.target.value);seterror("")}} />

        <input value={conf_pass} type="password" name="Confirm_Password" placeholder='Confirm Password' 
        onChange={e => {setconf_pass(e.target.value);seterror("")}}/>

        <button onClick={Handleclick}>Register</button>

      </form>
      }
    </div>
  );
};

export default AdminSignUp;
