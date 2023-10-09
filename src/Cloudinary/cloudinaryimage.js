import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import axios from "axios";

export default function CloudinaryImage({ carname, carmodel, adminid }) {
  const [imageId, setImageId] = useState("");
  const loadImages = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/images",
        {
          params: {
            name: carname,
            model: carmodel,
            id: adminid,
          },
        },
        { withCredentials: true }
      );
      console.log(res);
      // const data = await res.json();

      setImageId(res.data[0]);
    } catch (err) {
      console.error("fronted", err);
    }
  };
  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div>
      {console.log(carname, carmodel)}
      {/* {imageIds &&
                    imageIds.map((imageId, index) => ( */}
      <Image
        // key={index}
        cloudName="dtyutg5l9"
        publicId={imageId}
        width="300"
        crop="scale"
      />
      {/* ))} */}
    </div>
  );
}
