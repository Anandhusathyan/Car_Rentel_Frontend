import React, { createContext, useState } from "react";
import { useEffect } from "react";

export const CarContextDetails = createContext();

const CarContext = ({ children }) => {

  
  const [Car, setCar] = useState([]);
  const [usereditbooking, setusereditbooking] = useState({});
  const [headerData, setheaderData] = useState({});
  const [CarData, setCarData] = useState({});
  // const [bookingDetails, setBookingDetails] = useState({});
  const [admineditdata, setadmineditdata] = useState([]);
  const [verifieduser,setverifieduser]= useState("");
  const [verifiedadmin,setverifiedadmin]= useState("")

  const [inputdata, setInputData] = useState({
    origin: "",
    destination: "",
    startdate: "",
    enddate: "",
    distance: "",
    MapImg: "",
  });

  const [data, setData] = useState({
    carid:"",
    name: "",
    type: "",
    model: "",
    milage: "",
    image: "",
    availableForm: "",
    availableTill: "",
    perKm: "",
    description: "",
    carDetails: "",
    Details: "",
  });

  const [EditPaymaentDatails, setEditPaymaentDatails] = useState({});


  useEffect(() => {
    // Load data from local storage on component mount
    const savedData = window.localStorage.getItem("my_data");
    //console.log("savedData",savedData)
    if (savedData) {
      setInputData(JSON.parse(savedData));
    }
  }, []);

  // useEffect(() => {
  //   // Load data from local storage on component mount
  //   const savedData = window.localStorage.getItem("bookingdata");
  //   //console.log("Data",savedData)
  //   if (savedData) {
  //     setBookingDetails(JSON.parse(savedData));
  //   }
  // }, []);

  useEffect(() => {
    // Load data from local storage on component mount
    const savedData = window.localStorage.getItem("allcarlist");
    console.log("allcarlist",savedData)
    if (savedData) {
      setCar(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    // Load data from local storage on component mount
    const savedData = window.localStorage.getItem("admineditdata");
    console.log("admineditdata",savedData)
    if (savedData) {
      setadmineditdata(JSON.parse(savedData));
    }
    const editcardetails = window.localStorage.getItem("usereditbooking");
    console.log("admineditdata",editcardetails)
    if (editcardetails) {
      setusereditbooking(JSON.parse(editcardetails));
    }

  }, []);

  useEffect(()=>{

    const autherization = window.localStorage.getItem("authe_user");

    if(autherization){
 
      setverifieduser(autherization);

    }
  },[]);

  useEffect(()=>{

    const autherization = window.localStorage.getItem("authe_admin");

    if(autherization){
 
      setverifiedadmin(autherization);

    }
  },[]);


  

  return (
    <>
      <CarContextDetails.Provider
        value={{
          Car,
          setCar,
          data,
          setData,
          usereditbooking,
          setusereditbooking,
          headerData,
          setheaderData,
          CarData,
          setCarData,
          // bookingDetails,
          // setBookingDetails,
          admineditdata,
          setadmineditdata,
          inputdata,
          setInputData,
          verifieduser,
          setverifieduser,
          verifiedadmin,
          setverifiedadmin
        }}
      >
        {children}
      </CarContextDetails.Provider>
    </>
  );
};

export default  CarContext;
