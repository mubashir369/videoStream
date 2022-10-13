import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../instance/axiosInstance";
import { Player } from "video-react";
import "video-react/dist/video-react.css";

function PlayVideo() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [video, setVideo] = useState("");
  const [videoPlayer, setVideoPlayer] = useState("");
  const getVideo = async () => {
    const { data } = await axiosInstance.get(`video/get/${id}`);
    setVideo(data?.video);
  };
  const incViewCount=async()=>{
    await axiosInstance.put(`video/view/${id}`)
  }
  useEffect(() => {
    getVideo();
  }, [videoPlayer]);
  useEffect(()=>{
    incViewCount()
  },[])
  return (
    <div className="">
      <Player
        autoPlay
        aspectRatio="25:9"
        height={500}
        ref={(player) => setVideoPlayer(player)}
        src={video?.videoUrl}
      />

    </div>
  );
}

export default PlayVideo;
