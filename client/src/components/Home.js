import React from 'react'
import { useState,useEffect } from 'react';

const Home = () => {
  const [userName,setUserName]= useState('');

  const userHome=async()=>{
        try{
            const res =await fetch('/getdata',{
              method:"GET",
              headers:{
                "Content-Type":"application/json"
              }
            });
            const data = await res.json('');
            setUserName(data.name);
            if(!res.status===200){
              const error = new Error(res.error);
              throw error;
            }

        }
        catch(err){
          console.log(err);
        }
  }
useEffect(()=>{
    userHome();
},[]);
  return (
    <div>
      <div className='welcomediv'>
      <h2 className='welcome'>Hello {userName}</h2>
      <h2 className='welcome'>Welcome to Complain Monitoring</h2>
      </div>
    </div>
  )
}

export default Home
