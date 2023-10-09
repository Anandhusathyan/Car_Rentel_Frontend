import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import axios from 'axios';

export default function AllImageCloudinary({carname,carmodel,adminid,seturl,url}) {


    useEffect(()=>{
        console.log("AllImageCloudinary",url)  
    },[url])

    const [imageId, setImageId] = useState(""); 
    const loadImages = async () => {

        try {
            const res = await axios.get('http://localhost:5000/api/allimages',{
                params:{
                    name:carname,
                    model:carmodel,
                }}, {withCredentials:true});
            console.log(res);
            // const data = await res.json();
        
            const imageUrl = res.data[0];
            if (imageUrl && !url.includes(imageUrl)) {
                seturl((url) => [...url, imageUrl]);
            }
           
            setImageId(res.data[0]);
        } 
        catch (err) {
            console.error("fronted",err);
        }
    };
    useEffect(() => {
        loadImages();
    }, []);

    return (
        <div>
            {console.log(carname,carmodel)}
            
                        <Image
                            // key={index}
                            cloudName="dtyutg5l9"
                            publicId={imageId}
                            width="300"
                            crop="scale"
                        />
                    
        </div>
    );
}
