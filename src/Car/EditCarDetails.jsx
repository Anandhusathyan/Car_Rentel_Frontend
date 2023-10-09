import React, { useEffect } from "react";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import { CarContextDetails } from "../context/CarContext";
import { useContext, useState } from "react";
import { Image } from "cloudinary-react";
import axios from "axios";
import map from "../images/hero_directions_api.png"


const CarDetails = ({ setCurrentDate, setCurrentTime, currentDate, currentTime, places, setPlaces }) => {
  const { inputdata,  usereditbooking } = useContext(CarContextDetails);

  

  useEffect(() => {
    console.log(places, inputdata);
  }, [places]);

  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toLocaleDateString());
    setCurrentTime(now.toLocaleTimeString());
  }, []);

  const handleOriginChange = (e) => {
    const { name, value } = e.target;
    setPlaces((values) => ({ ...values, [name]: value }));
  };

  const handleDestinationChange = (e) => {
    const { name, value } = e.target;
    setPlaces((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className="car-details">
      <ul>
        <li className="text-light">
          Car Name: <span className="text mx-2">{usereditbooking.name}</span>
        </li>
        <li className="text-light">
          Car Model: <span className="text mx-2">{usereditbooking.model}</span>
        </li>
        <Image cloudName="dtyutg5l9" publicId={usereditbooking.image} width="300" crop="scale" />
        <hr />
        <div>
          <div className="form-group">
            <label htmlFor="origin" className="text-light mx-2">Origin:</label>
            <input
              type="text"
              className="form-control"
              id="origin"
              name="origin"
              placeholder={usereditbooking.origin}
              value={places.origin}
              onChange={handleOriginChange}
              style={{width:"300px"}}
            />
          </div>
          <div className="form-group">
            <label htmlFor="destination" className="text-light">Destination:</label>
            <input
              type="text"
              className="form-control"
              id="destination"
              name="destination"
              style={{width:"300px"}}
              placeholder={usereditbooking.destination}
              value={places.destination}
              onChange={handleDestinationChange}
            />
          </div>
          <div style={{width:"460px",height:"150px"}}>
            <img src={map} alt="map" style={{width:"460px",height:"150px",objectFit:"cover"}}/>
          </div>
        </div>
        <hr />
        <li className="text-light">
          Booking Date: <span className="text mx-2">{currentDate}</span>
        </li>
        <li className="text-light">
          Booking Time: <span className="text mx-2">{currentTime}</span>
        </li>
      </ul>
    </div>
  );
};

const PaymentDetails = ({  places }) => {
  const navigate = useNavigate();
  const {  usereditbooking,  verifieduser } = useContext(CarContextDetails);

  
  let perkm = Number(usereditbooking.perKm);

  const headers = {
    'Authorization': verifieduser,
    'Content-Type': 'application/json'
  }

  const handleClick = async () => {
    let obj = {
      carid: usereditbooking.carid,
    };

    for (let prop in places) {
      if (places[prop]) {
        obj[prop] = places[prop];
      }
    }

    try {
      console.log(obj);

      let editplaces = await axios.post("https://car-rental-app-rblz.onrender.com/editcar", obj,{headers} );

      if (editplaces.status === 201) {
        alert("successfully edited");
        navigate("/mybookings");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="payment-details" style={{ marginTop: "-280px" }}>
      <h3 className="text-light">Payment Details</h3>
      <ul>
        <li className="text-light">
          Price/Km: <span className="text mx-2">{usereditbooking.perKm}</span>
        </li>
        <li className="text-light">
          Pricing: <span className="text mx-2">{perkm * 3}</span>
        </li>
        <li className="text-light">
          Tax charges:<span className="text mx-2">{50}</span>
        </li>
        <li className="text-light">
          Grand Total:
          <span className="text mx-2" style={{color:"lightgreen"}}>{usereditbooking.perKm * 3 + 50}</span>
        </li>
      </ul>
      <button className="btn btn-primary rounded" onClick={handleClick}>
        Proceed
      </button>
    </div>
  );
};

const EditCarDetails = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [places, setPlaces] = useState({
    origin: "",
    destination: "",
  });

  const { setusereditbooking, verifieduser } = useContext(CarContextDetails);

  // const [show ,setshow]=useState(false);

  const headers = {
    'Authorization': verifieduser,
    'Content-Type': 'application/json'
  }

  useEffect(()=>{

      async function Allcar(){

        if(verifieduser){

        try{
          const value = await axios.get("https://car-rental-app-rblz.onrender.com/Userauth",{ headers })
          console.log(value);
          if(value.status == 200){
  
            // setshow(true);
  
          }
        }

        catch(error){
          console.log("CarList",error);
        }

        }
      }
    Allcar();
      
    },[verifieduser]);


  useEffect(() => {
    // Load data from local storage on component mount
    const savedData = window.localStorage.getItem("usereditbooking");
    console.log("allcarlist", savedData);
    if (savedData) {
      setusereditbooking(JSON.parse(savedData));
    }
  }, []);

  return (
    <>
      <Nav />
      <div className="booking-details">
        <div className="container">
          <div className="left-side">
            <CarDetails
              setCurrentDate={setCurrentDate}
              setCurrentTime={setCurrentTime}
              currentDate={currentDate}
              currentTime={currentTime}
              places={places}
              setPlaces={setPlaces}
            />
          </div>
          <div className="right-side">
            <PaymentDetails
              currentDate={currentDate}
              currentTime={currentTime}
              places={places}
              setPlaces={setPlaces}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCarDetails;
