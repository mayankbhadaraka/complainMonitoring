import React, { useEffect, useState } from 'react'
const Status = () => {
  const [complainData,setComplainData]= useState({name:"",email:"",phone:"",device:"",message:"",Status:"",ReferanceNumber:""});
  const [userData,setuserData]=useState({name:""});
  const [SolvedData,setSolvedData]= useState({name:"",email:"",phone:"",device:"",message:"",responce:"",ReferanceNumber:""});
 
  const userContact=async()=>{
    try{
        const res =await fetch('/getdata',{
          method:"GET",
          headers:{
            "Content-Type":"application/json"
          }
        });
        const data = await res.json();
        await setuserData({ ...userData, name: data.name });
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
userContact();
},[]);
  const UserComplain=async()=>{
    try{
        const res =await fetch('/status',{
          method:"GET",
          headers:{
            "Content-Type":"application/json"
          }
        });
        const data = await res.json();
        await setComplainData(data)
        console.log(complainData)

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
  UserComplain();
  },[]);
  const UserSolvedComplain=async()=>{
    try{
        const res =await fetch('/solved',{
          method:"GET",
          headers:{
            "Content-Type":"application/json"
          }
        });
        const data = await res.json();
        await setSolvedData(data)
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
  UserSolvedComplain();
  },[]);


  return (
    <div className='First'>
      <div>
        <h3 className='welcome'>In Progress Complains</h3>
      </div>
      <div className='Card'>
      {
      complainData.length>0?(
       complainData.map((x)=>(
          userData.name===x.name&&x.Status!='Solved'?(<>
            
            <div className="card First">
        <div className="card-header">
              <h3 className='welcome'> Referance Number: {x.ReferanceNumber}</h3>
        </div>
        <div className="card-body">
            <h5 className='welcome'>Device: {x.device}</h5>
            <h5 className='welcome'>Message: {x.message}</h5>
            <h5 className='welcome'>Status: {x.Status}</h5>
        </div>
      </div></>):null
                ))):(<h3>No Progress Complains</h3>)
      }
      </div>
      <div className='Card'>
      <div><h3 className='welcome'>Solved Complains</h3></div>
      {
       SolvedData.length>0?(
       SolvedData.map((x)=>(
          userData.name===x.name?(<>
            
            <div className="card">
        <div className="card-header">
                 <h3 className='welcome'> Referance Number: {x.ReferanceNumber}</h3>
        </div>
        <div className="card-body">
            <h5 className='welcome'>Device: {x.device}</h5>
            <h5 className='welcome'>Message: {x.message}</h5>
            <h5 className='welcome'>Responce: {x.responce}</h5>
        </div>
      </div></>):null
                ))):(<h3>No Solved Complains</h3>)
      }
      </div>
    </div>
  )
}

export default Status
