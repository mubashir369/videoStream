import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../../instance/axiosInstance";
import Header from "../Header/Header";
import {useSelector} from 'react-redux'
import "react-toastify/dist/ReactToastify.css";
import "./Upload.css";

function Upload() {
    const usertoken=useSelector((state)=>state?.user)
    const {userAuth}=usertoken
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [videoUrl, setVideoUrl] = useState("");
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if(!videoUrl){
        toast.error("please upload video")
    }
    const formData={
        userId:userAuth.details._id,
        title:inputs.title,
        desc:inputs.disc,
        videoUrl
    }
    const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
    const res = await axiosInstance.post(`video/addVideo`,formData,config);
    if(res.data.success){
        await toast.success("Video Upload Success")
        navigate('/')
    }else{
        toast.error("Video Upload Field")
    }
  };
  const handleUpload = async (e) => {
    e.preventDefault();

    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dtrkaljqy",
        uploadPreset: "videoStream",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setVideoUrl(result.info.url);
          console.log("Done! Here is the image info: ", result.info);
        }
      }
    );
    myWidget.open();
  };
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("vsuToken"));
    if (token) {
      setUser(token.details);
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <>

      <Header />
      <ToastContainer />
      <div className="grid h-screen place-items-center z-50">
        <form className="w-full max-w-lg">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-4xl dark:text-gray-500">
            Upload Video
          </h1>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-title"
                type="title"
                name="title"
                required
                onChange={handleChange}
                placeholder="Title..."
              />
            </div>

            <div className="w-full px-3">
              <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-description"
                name="disc"
                onChange={handleChange}
                placeholder="Description..."
                required
              />
            </div>
            <input type="text" value={videoUrl} hidden required />
          </div>
          <div className="flex justify-center ">
            <div className="rounded-lg shadow-xl bg-gray-50 w-full">
              <div className="flex justify-center p-2 space-x-4">
                <button
                  onClick={handleUpload}
                  className="px-4 py-2 w-1/2 text-white bg-blue-500 rounded shadow-xl"
                >
                  Upload Video
                </button>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="px-4 py-2 w-1/2 text-white bg-green-500 rounded shadow-xl"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Upload;
