import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/carlist.css"; // Import the CSS file
import { CarContextDetails } from "../context/CarContext";
import { useContext } from "react";
import axios from "axios";

import { Image } from 'cloudinary-react';


const CarList = () => {
  const [filterType, setfilterType] = useState("All");

  const { bookingDetails ,setBookingDetails,setCar,Car,verifieduser } = 
  useContext(CarContextDetails);

  const navigate = useNavigate();  

  const headers = {
    'Authorization':verifieduser,
    'Content-Type': 'application/json'
  }

  const [filtercar , setfiltercar]= useState(Car)


  useEffect(()=>{

    async function Allcar(){
      
      if(verifieduser){
      try{
        const value = await axios.get("https://car-rental-app-rblz.onrender.com/getallcar",{ headers })
        console.log(value);
        setCar(value.data);
      }
      catch(error){
        if(error.response.status == 302){
          navigate("/")
        }
      }
      }  
    }  
    Allcar();
    
  },[verifieduser])

  useEffect(()=>{
    console.log("from CarList",Car);
    setfiltercar(Car);
  },[Car])


  useEffect(() => {
    // Save data to local storage whenever it changes
    const booking=window.localStorage.setItem('bookingdata', JSON.stringify(bookingDetails));
    //console.log(data);
  },[bookingDetails]);

  useEffect(() => {
    // Save data to local storage whenever it changes
    const allcardetails=window.localStorage.setItem('allcarlist', JSON.stringify(Car));
    console.log('allcardetails',allcardetails);
  },[]);


  function handleFilterChange(e) {

    console.log(e.target.value);

    setfilterType(e.target.value);
    const type = Car.filter(d => d.model === e.target.value)
  
    if (e.target.value === "All") {
      console.log("if")
      //setfilterType(filterType);
      setfiltercar(Car)
    } 
    else if (type.length !== 0) {
      console.log("else if")
      //setfilterType(type);
      setfiltercar([...type]);
    }
    else if (type.length == 0) {
      console.log("else if")
      //setfilterType(type);
      setfiltercar([]);
    }  
  }

  

  const handleBookNow = (car,i) => {
    // Navigate to the car details page
    //console.log("carlist",car._id,i)
  
    setBookingDetails({
    carid:car._id,  
    name: car.name,
    type: car.cartype,
    model: car.model,
    milage: car.milage,
    image: car.images,
    availableFrom: car.availableFrom,
    availableTill: car.availableTill,
    perKm: car.perKm,
    description: car.description,
    carDetails: car.carDetails,
    Details: car.Details
  })

    navigate(`/bookingdetails`);
  };

  return (
    <>
    <div className="m-2">
    <div className="filter-section">
    <h6 className="mx-3 my-1 text-light">Car Type</h6>
    <select value={filterType} onChange={handleFilterChange}>
      <option value="All">All</option>
      <option value="XUV">XUV</option>
      <option value="SUV">SUV</option>
    </select>
  </div>
      <div className="ccontainer">
        <div className="car-list">
          {filtercar.map((car,index) => (
            <div key={car._id} className="card" style={{backgroundColor:"#526D82"}}>
              <div className="card-image">
              
              <Image cloudName="dtyutg5l9" publicId={car.images} width="300" height="180" crop="scale" />
              </div>
    
              
              <div className="card-body">
                <h3 className="card-title text-light">{car.name}</h3>
                <p className="card-text">Car Type: {car.cartype}</p>
                <p className="card-text">Mileage: {car.milage}</p>
                <button className="btn btn-primary" onClick={() => handleBookNow(car,index)}>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default CarList;
