import { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import "./styles/helloadmin.css";
import { Link, useNavigate } from "react-router-dom";
import { CarContextDetails } from "../context/CarContext";
import axios from "axios";
import { Image } from 'cloudinary-react';

function HelloAdmin() {

  const { verifiedadmin }=useContext(CarContextDetails);

  const [car_data, setcar_data] = useState([]);

  const [show,setshow] = useState(false);
 
  const navigate = useNavigate();

  const headers={
    'Authorization':verifiedadmin,
    'Content-Type':"application/json"
  }

  const addCar = () => {
    navigate("/addcar");
  };

  useEffect(() => {

    async function admincar() {

      try {

        const admincar = await axios.get("https://car-rental-app-rblz.onrender.com/getadmincar", { headers });
        console.log(admincar.data)
        setcar_data([...admincar.data])
        setshow(true);

      } 
      catch (error) {
        console.log(error);
      }

    
    }
    admincar();

    console.log('hello')

  },[verifiedadmin]);


  function Admineditdata(editcar){
    // Save data to local storage whenever it changes
    console.log(editcar)
    const allcardetails=window.localStorage.setItem('admineditdata', JSON.stringify(editcar));

}

  return show && <div style={{backgroundColor:"#27374D"}}>
      <Nav />
      <div style={{ marginBottom: "20px", marginLeft: "30px" }}>
        <p className="text-dark"></p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: "30px",
          }}
        >
          <h2 className="text-light" style={{ marginLeft: "20px" }}>Hello Admin</h2>
          <button id="a-adminpage-butt" className="rounded" onClick={addCar}>
            Add Cars
          </button>
        </div>
      </div>


      <div id="container" style={{ margin: "30px" }}>
        {car_data[0] && car_data.map((value, index) => (
          <div id="card" key={index}  style={{backgroundColor:"#526D82"}}>
            <Link to = {`/edit-car/${value.name}`} className="text-decoration-none"  onClick={e=>Admineditdata(value)} >
              <div id="img">
                <Image cloudName="dtyutg5l9" publicId={value.images} width="300" crop="scale" />
              </div>

              <div id="details">
                <p className="text-dark" style={{marginLeft:"5px"}}>{value.name}</p>
                <span className="text-dark">{value.cartype}</span>
                <span className="text-dark">{value.perKm} Rs/KM</span>

                <hr style={{ color: "#7C7C7C" }} />

                <div style={{ marginTop: "20px" }}>
                  <span className="text-dark">Available date</span>
                  <span className="text-light">{value.availableFrom} - {value.availableTill}</span>

                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  
}

export default HelloAdmin;

