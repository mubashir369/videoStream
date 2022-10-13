import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../component/Header/Header'
function MyVideos() {
    const {userAuth}=useSelector((state)=>state.user)
    console.log(userAuth);
    useEffect(()=>{

    },[])
  return (
    <div>
      <Header/>
      <div>
        
      </div>
    </div>
  )
}

export default MyVideos
