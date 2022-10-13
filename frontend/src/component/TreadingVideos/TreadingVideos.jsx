import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../instance/axiosInstance'
import Card from '../Card/Card'
import Header from '../Header/Header'
function TreadingVideos() {
    const [videos,setVideos]=useState()
    const navigate=useNavigate()
   const getTreadingVideos=async()=>{
    const {data} =await axiosInstance.get(`video/trend`)
   setVideos(data)
   }
 
    useEffect(()=>{
        getTreadingVideos()
    },[])
  return (
   
    <div>
        <Header/>
        <div className='grid sm:grid-cols-1 md:grid-cols-4 gap-4 container mx-auto mt-24' >
            {videos?.map((video)=>{
                return(
                    <div key={video?._id} >
                        <Card video={video}/>
                    </div>
                    
                )
            })}
        </div>
      
    </div>
  )
}

export default TreadingVideos
