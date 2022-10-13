import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../instance/axiosInstance";
import Card from "../Card/Card";


function Cards() {
  const [allVideo, setAllVideo] = useState([]);
 const navigate=useNavigate()
  const getVideo = async () => {
    try {
      const res = await axiosInstance.get(`video/getall`);
      setAllVideo(res?.data?.videos);
    } catch (error) {
      alert("error");
    }
  };
  

  useEffect(() => {
    getVideo();
    console.log(allVideo);
  }, []);
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-4 container mx-auto mt-24">
      {allVideo?.map((video) => {
        return (
          <div key={video._id} >
            <Card  video={video} />
          </div>
        );
      })}
     
    </div>
  );
}

export default Cards;
