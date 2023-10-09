import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarContextDetails } from "../context/CarContext";
import Nav from "../components/Nav";
import { Image } from "cloudinary-react";
import axios from "axios";
import "./styles/mybookings.css"

const MyBookings = () => {
  const navigate = useNavigate();
  const {  verifieduser, setverifieduser } = useContext(CarContextDetails);


  const [booked_cars,setbooked_cars] = useState([])

  const [cancelBooking, setcancelBooking] = useState(false);

  const [ show,setshow ]= useState(true)

  const headers = {
    'Authorization':verifieduser,
    'Content-Type': 'application/json'
  }

  useEffect(()=>{

    async function Mycart(){

      // if(verifieduser){
  
      try{
        const data = await axios.get("https://car-rental-app-rblz.onrender.com/getallbookcar",{ headers });

        console.log("MyBookings",data);
        setbooked_cars([...data.data]);

        if(data.status == 201){
          setshow(true);
          console.log("sucess")
        }
      }
      catch(error){
        console.log("mybooking",error);
        if(error.response.status == 302){
          // navigate("/")
        }
      }

      // }
    }

    Mycart()
    
  },[cancelBooking,verifieduser]) 

  

  const handleEdit = (booking) => {

    window.localStorage.setItem('usereditbooking', JSON.stringify(booking));
    console.log('usereditbooking');
    //setEditedBooking(booking);usereditbooking
    navigate(`/editcar/${booking.carid}`);
  };

  const handleCancel = async (bookingid) => {
    // Add your cancellation logic here
    // Remove the canceled booking from the booking details array
    
    try{
      const data = await axios.post("https://car-rental-app-rblz.onrender.com/deletecar",{ bookingid} ,{headers})
      console.log(data);
      setcancelBooking(true) 
    }
    catch(error){
      console.log("mybooking",error);
    }

  };

  
  return (
    show && <div className="my-bookings">
      <Nav />
      <div className="booking-details">
      <h4 className="text-light">My Bookings</h4>
        { booked_cars[0]  && booked_cars.map((booking) => (
          <div key={booking._id} className="card mb-3 mx-5"  style={{backgroundColor:"#526D82"}}>
            {console.log(booking)}
            <div className="row g-0">
              <div className="col-md-4">
              <Image
                  cloudName="dtyutg5l9"
                  publicId={booking.image}
                  width="300"
                  crop="scale"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title text-light"> {booking.name}</h5>
                  <p className="card-text">Model: {booking.model}</p>
                  {/* Display other booking details */}
                </div>
              </div>
            </div>
            <div className="card-footer">
                  <button className="btn btn-primary me-2" onClick={() => handleEdit(booking)}>
                    Edit
                  </button>
                  <button className="btn btn-dark" onClick={() => handleCancel(booking._id)}>
                    Cancel
                  </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};
export default MyBookings;