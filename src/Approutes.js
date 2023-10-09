import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UserSignIn from "./user/UserSignIn";
import UserSignUp from "./user/UserSignUp";
import AdminLogin from "./admin/AdminLogin";
import AdminSignUp from "./admin/AdminSignUp";
import Destination from "./mybookings/Destination";
import PageNotFound from "./PageNotFound";
import OrderPage from "./mybookings/OrderPage";
import BookingDetails from "./mybookings/BookingDetails";
import CarDetails from "./Car/CarDetails";
import EditCarDetails from "./Car/EditCarDetails";
import HelloAdmin from "./admin/HelloAdmin";

import EditCar from "./admin/EditCar.jsx";
import AddCar from "./admin/AddCar.jsx";
import MyBookings from "./mybookings/MyBookings";

const Approutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usersignin" element={<UserSignIn />} />
        <Route path="/usersignup" element={<UserSignUp />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<AdminSignUp />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/orderpage" element={<OrderPage />} />
        <Route path="/bookingdetails" element={<BookingDetails />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/cardetails/:carId" element={<CarDetails />} />
        <Route path="/editcar/:carId" element={<EditCarDetails />} />
        <Route path="/helloadmin" element={<HelloAdmin />} />
        <Route path="/addcar" element={<AddCar />} />
        <Route path="/edit-car/:Id" element={<EditCar />} />
        <Route path="/*" element={<PageNotFound />} />   
      </Routes>
    </Router>
  );
};

export default Approutes;
