import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles/carDetails.css";

const CarDetails = () => {
  const { carId } = useParams();
  const [carDetails, setCarDetails] = useState(1);

  useEffect(() => {
    // Simulating fetching car details from an API
    const fetchCarDetails = async () => {
      // Replace this with your actual API call to fetch car details from the backend
      try {
        const response = await fetch(`/api/cars/${carId}`);
        const data = await response.json();

        if (response.ok) {
          setCarDetails(data);
        } else {
          console.error("Error fetching car details:", data);
          setCarDetails(null);
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
        setCarDetails(null);
      }
    };

    fetchCarDetails();
  }, [carId]);

  if (!carDetails) {
    return <div className="car-details-container">Loading...</div>;
  }

  const {
    carname,
    carnumber,
    origin,
    destination,
    startdate,
    enddate,
    bookingid,
    bookingdate,
    bookingtime
  } = carDetails;

  return (
    <div className="car-details-container">
      <h2 className="car-details-title">Car Details</h2>
      <div className="card">
        <div className="card-body">
          <h3 className="card-name">{carname}</h3>
          <p className="card-text">Car Number: {carnumber}</p>
          <p className="card-text">Origin: {origin}</p>
          <p className="card-text">Destination: {destination}</p>
          <p className="card-text">Start Date: {startdate}</p>
          <p className="card-text">End Date: {enddate}</p>
          <p className="card-text">Booking ID: {bookingid}</p>
          <p className="card-text">Booking Date: {bookingdate}</p>
          <p className="card-text">Booking Time: {bookingtime}</p>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
