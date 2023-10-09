import React, { useContext, useState, useEffect } from 'react';
import "./styles/addcar.css"; // Import the CSS file for styling
import { CarContextDetails } from "../context/CarContext";
import { useRef } from "react";
import Nav from "./Nav";
import { Image } from 'cloudinary-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ColorRing } from "react-loader-spinner";


const SplitForm = () => {

  const navigator = useNavigate()

  const { admineditdata, setadmineditdata, verifiedadmin } = useContext(CarContextDetails)

  const [loading, setLoading] = useState(false);

  const headers={
    'Authorization':verifiedadmin,
    'Content-Type':"application/json"
  }

  useEffect(() => {
    // Load data from local storage on component mount
    const savedData = window.localStorage.getItem("admineditdata");
    
    //console.log("savedData",savedData)
    if (savedData) {
      setadmineditdata(JSON.parse(savedData));
    }
    
  }, []);

  const [image, setimage] = useState(null);

  const [cloudinary, setcloudinary] = useState([])

  const fileInputRef = useRef(null);

  const [public_id, setpublic_id] = useState("")

  const [filter,setfilter] =useState("")

  const [show,setshow] = useState(false);


  const [carDetails, setCarDetails] = useState({
    _id: '',
    name: '',
    cartype: '',
    model: '',
    milage: '',
    perKm: '',
    availableFrom: '',
    availableTill: '',
    description: '',
    carDetails: '',
    Details: ''
  });

  useEffect(() => {
    
    async function adminvar() {

     
      try {

        const adminvar = await axios.get("https://car-rental-app-rblz.onrender.com/adminAuth", { headers });
        console.log("hello",adminvar);

        if(adminvar.status == 200){
          setshow(true);
        }

      } catch (error) {
          if(error.response.status == 302){
            console.log("change",error)
            // navigator("/")
        }
      }
    
    }

    adminvar();
    
  }, [verifiedadmin])


//   Final Publicid Part

  useEffect(() => {

    console.log("triggered useeffect")


    if (!public_id) {
      return;
    }

    async function sendDataToServer() {

      console.log("sendDataToServer", public_id);

      try {

        const data = await axios.post("https://car-rental-app-rblz.onrender.com/editadmincar", filter
        ,{
          params: {
            images:public_id
          },
          headers
        });
        console.log(data);

        if (data.status === 201) {
          // console.log("updated image")
          setLoading(false);
          alert("Added successfully");
          navigator("/helloadmin");
          window.localStorage.removeItem("admineditdata")
          setadmineditdata({});
          setimage(null);
          setpublic_id("");
          setcloudinary([]);
          fileInputRef.current.value = null;
          
          
        }
      }
      catch (err) {
        console.log(err);
      }
    }

    sendDataToServer();
  }, [public_id]);


  //  Handle cancle button

  const handleCancel = (e) => {
    e.preventDefault();

    navigator("/helloadmin")

  }


  //  Handle image upload part

  const handleImageUpload = async (e) => {

    const file = e.target.files[0]
    setimage(file)
    console.log(file)
    if (file) {

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setcloudinary([reader.result]);
      };
      reader.onerror = () => {
        console.error('error in image loading');
      }

    }

  }


// Final image upload to cloudinary

  let Name = "";
  let Model = "";
  

  const uploadImage = async (base64EncodedImage) => {

    console.log("hello", base64EncodedImage)
      let object = {}

        object.publicId = admineditdata.images;
        //console.log(publicId)

      try {
        const data = await axios.post('https://car-rental-app-rblz.onrender.com/api/deleteimage', object, { headers })
        console.log(data)
      }
      catch (error) {

        console.log("frontend", error)
      }
    
    try {
      const publicid = await axios.post('https://car-rental-app-rblz.onrender.com/api/upload', base64EncodedImage
        , {
          params: {
            name: Name,
            model: Model
          }
          , headers
        });

      setpublic_id(publicid.data);

    }
    catch (err) {
      console.error(err);
    }

  };

  ///  Handle Delate part

  const handleDelete = async (e) => {
    e.preventDefault();

    setLoading(true);
    console.log("handleDelete", admineditdata._id)

    const { _id } = admineditdata

    if (!_id) {
      return;
    }

    let object = {}

    object.publicId = admineditdata.images;
    //console.log(publicId)

    try {
      const data = await axios.post('https://car-rental-app-rblz.onrender.com/api/deleteimage', object, { withCredentials: true })
      console.log(data)
    }
    catch (error) {

      console.log("frontend", error)
    }

    try {
      const data = await axios.post('https://car-rental-app-rblz.onrender.com/deleteadmincar', { _id }, { headers })
      console.log(data);

      if (data.status == 201) {
        window.localStorage.removeItem("admineditdata")
        //window.localStorage.clear()
        setLoading(false);
        setadmineditdata({});
        navigator("/helloadmin");
        fileInputRef.current.value = null;
        alert("Deleted successfully");
      }
    }
    catch (error) {
      console.log("frontend", error)
    }

  };

  // Handle input changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //console.log(name, value)
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };


  //  Handle Submit Part

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    let update = {};


    for (let prop in carDetails) {

      if (prop == '_id') {

        update[prop] = admineditdata._id
      }

      if (carDetails[prop]) {

        update[prop] = carDetails[prop];
      }

    }

    if (update.name) {

      Name = update.name;
    }
    else {

      Name = admineditdata.name
    }

    if (update.model) {

      Model = update.model;
    }
    else {

      Model = admineditdata.model
    }

    setfilter(update)

    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onloadend = () => {
        uploadImage(cloudinary);
      };
      reader.onerror = () => {
        console.error('error in image loading');
      }
    }

    else if (admineditdata.images) {

      for (let prop in carDetails) {

        if (carDetails[prop] && prop != '_id') {

          try {
                console.log("admineditdata.images")
                const updatedata = await axios.post("https://car-rental-app-rblz.onrender.com/editadmincar", update, { headers })
                console.log(updatedata)

            if (updatedata.status == 201) {

              window.localStorage.removeItem("admineditdata")
              //window.localStorage.clear()
              setLoading(false);
              alert("Added successfully");
              console.log("navigate")
              navigator("/helloadmin");
              setadmineditdata({});
              setimage(null);
              setpublic_id("");
              setcloudinary([]);
              fileInputRef.current.value = null;

            }
          }
          catch (err) {
            console.log(err);
          }

          break;
        };
      }

    }

    else if (!image) {

      alert("Please upload a car image");
      return;
    }

  }



  return loading ?(
    <div className="loader-container">
      <ColorRing type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  ) :(
  show && <>
  <div style={{backgroundColor:"#27374D"}}>
    <Nav />
    <div className="add-car-details-container">
      <div className="left-section">
        <h1 className="text-light">Edit Car Details</h1>
        <form >
          <div className="form-group">
            <label className="text-light" htmlFor="carName">Car Name:</label>
            <input
              type="text"
              id="carName"
              placeholder={admineditdata.name}
              name="name"
              value={carDetails.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="text-light" htmlFor="carType">Type:</label>
            <input
              type="text"
              id="carType"
              name="cartype"
              placeholder={admineditdata.cartype}
              value={carDetails.cartype}
              onChange={handleInputChange}
            />
            <label className="text-light" htmlFor="carModel">Model:</label>
            <input
              type="text"
              id="carModel"
              name="model"
              placeholder={admineditdata.model}
              value={carDetails.model}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="text-light" htmlFor="carMilage">Milage:</label>
            <input
              type="text"
              id="carMilage"
              name="milage"
              placeholder={admineditdata.milage}
              value={carDetails.milage}
              onChange={handleInputChange}
            />
            <label className="text-light" htmlFor="carPerKM">Per KM:</label>
            <input
              type="text"
              id="carPerKM"
              name="perKm"
              placeholder={admineditdata.perKm}
              value={carDetails.perKm}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="text-light" htmlFor="availableFrom">Available from:</label>
            <input
              type="date"
              id="availableFrom"
              name="availableFrom"
              defaultValue={admineditdata.availableFrom}
              onChange={handleInputChange}
            />
            <label
              htmlFor="availableTill"
              className="text-light"
              style={{ marginTop: "10px", display: "block" }}
            >
              Available till:
            </label>
            <input
              type="date"
              id="availableTill"
              name="availableTill"
              defaultValue={admineditdata.availableTill}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="text-light" htmlFor="carDescription">Description:</label>
            <textarea
              id="carDescription"
              name="description"
              placeholder={admineditdata.description}
              value={carDetails.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="form-buttons">
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="add-button" onClick={handleSubmit}>
              Save
            </button>
            <button onClick={handleDelete} id="anandhudelete-button">
              Delete
            </button>
          </div>
        </form>
      </div>
      <div className="vertical-line"></div>
      <div className="right-section" style={{marginTop:"50px"}}>
        <div className="image-upload-section">
          <h2 className='text-light'>Images</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
          />



          <div className="image-preview">
            <div className="image-item" >
              {image ? <img
                src={URL.createObjectURL(image)}
                alt="Selected Image"
              /> :
                <Image cloudName="dtyutg5l9" publicId={admineditdata.images} width="300" crop="scale" />}
              {/* <button
              className="delete-button"
              onClick={() => handleImageDelete()}
            >
              X
            </button> */}
            </div>
          </div>



        </div>
        <div className="details-section">
          <h2  className='text-light'>Car Details</h2>
          <textarea
            name="carDetails"
            placeholder={admineditdata.carDetails}
            value={carDetails.carDetails}
            onChange={handleInputChange}
          ></textarea>
          <h2  className='text-light'>Owner Details</h2>
          <textarea
            name="Details"
            placeholder={admineditdata.Details}
            value={carDetails.Details}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>
    </div>
    </div>
  </>
  )
}
export default SplitForm
