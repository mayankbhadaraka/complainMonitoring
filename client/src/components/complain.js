import React, { useEffect,useState } from 'react'
import { useHistory } from 'react-router-dom';

export default function Complain() {
  
  const [userData,setUserData]= useState({name:""});
  const [complainData,setComplainData]= useState([]);

  const history = useHistory();
 
  const userContact=async()=>{
        try{
            const res =await fetch('/getdata',{
              method:"GET",
              headers:{
                "Content-Type":"application/json"
              }
            });
            const data = await res.json();
            setUserData({ ...userData, name: data.name });
            if(!res.status===200){
              const error = new Error(res.error);
              throw error;
            }

        }
        catch(err){
            console.log(err)
        }
  }
useEffect(()=>{
    userContact();
},[]);

const UserComplain=async()=>{
  try{
      const res =await fetch('/getcomplain',{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      });
      const data = await res.json();
   if(data?.length!==0)
   {
    let list=[]
    let y=[]
    data.forEach(element => {
  list.push({name:element?.name,email:element?.email,phone:element?.phone,device:element?.device,message:element?.message,provider:element?.provider,ReferanceNumber:element?.ReferanceNumber})
    })
    let i=0;
    while(i<list.length){
      let x=Object.entries(list[i])
      complainData[i]=x
      
      i++;
    }
    console.log(complainData)
}
      if(!res.status===200){
        const error = new Error(res.error);
        throw error;
      }
  }
  catch(err){
    console.log(err)
  }
}
useEffect(()=>{
UserComplain();
},[]);

const handleInputs =(e,key,x)=>{
  let newArr = [...complainData];
  if(x=7){
    let x=[e.target.name,e.target.value]
    newArr[key][7]=x
  }
  else{
    newArr[key][x][1] = e.target.value;
  } 
    setComplainData(newArr);
}

const Complainform=async (e,key)=>{
  e.preventDefault();
  const x={name:complainData[key][0][1],email:complainData[key][1][1],phone:complainData[key][2][1],device:complainData[key][3][1],message:complainData[key][4][1],serviceManager:complainData[key][7][1],ReferanceNumber:complainData[key][6][1]}
  const res= await fetch('/forwardtomanager',{
    method:'POST',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({name:complainData[key][0][1],email:complainData[key][1][1],phone:complainData[key][2][1],device:complainData[key][3][1],message:complainData[key][4][1],serviceManager:complainData[key][7][1],ReferanceNumber:complainData[key][6][1]})
  });
  const data = await res.json();
  if(!data){
  }else{
    setComplainData({...complainData[key][7],serviceManager:""});
    history.push("/");
  }
}
return (
  <div className='First'>
  <section>
        <h1 id='title'>Complain For Your Company</h1>
        <div className='Table'>
              {
                complainData.length!=0?(
                complainData.map((Complain,key)=>(
                  userData.name===complainData[key][5][1]?(
                <form className='Tr' method='POST'>
                  <div className='Ref'>
                  <h5 className='td' id='name'>ReferanceNumber</h5>
                  <input id='input' type="text" className='td'   name='ReferanceNumber' defaultValue={complainData[key][6][1]} placeholder='Enter ReferanceNumber' />
                  </div>
                <div className='divn'>
                  <h5 className='td' id='name'>Name</h5>
                  <input id='input' type="text" className='td'  name='name' defaultValue={complainData[key][0][1]} placeholder='Enter Name' />
                </div>
                <div >
                <h5 className='td' id='name'>Email</h5>
                  <input id='input' type="text" className='td'  name='email' defaultValue={complainData[key][1][1]} placeholder='Enter Email'  />
                </div>
                <div className='phone'>
                <h5 className='td' id='name'>Phone</h5>
                  <input id='input' type="text" className='td'  name='phone' defaultValue={complainData[key][2][1]} placeholder='Enter Phone'  />  
                </div>
                <div className='phone'>
                <h5 className='td' id='name'>Device</h5>
                  <input id='input' type="text" className='td'  name='device' defaultValue={complainData[key][3][1]} placeholder='Enter Device' />
                </div>
                <div>
                <h5 className='td' id='name'>Message</h5>
                  <input id='input' type="textarea" className='td'  name='message' defaultValue={complainData[key][4][1]} placeholder='Enter Message'  />
                </div>
                <div>
                <h5 className='td' id='name'>ServiceManager Name</h5>
                  <input id='input' type="text" className='td'  name='serviceManager' placeholder='Enter service Manager Name' onChange={event=>handleInputs(event,key,7)} />
                </div>
                <div>
                  <h5 className='td' id='name'>Responce</h5>
                  <input id='input' type="Submit" className='td'  defaultValue="Responce" onClick={event=>Complainform(event,key)} /></div>
                </form>):null
                ))):(<h3>No Complains For your Company Try to reload</h3>)
              }
              </div>
        
  </section>
  </div>
)
}
