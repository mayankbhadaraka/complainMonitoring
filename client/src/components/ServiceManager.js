import React, { useEffect,useState } from 'react'
import { useHistory } from 'react-router-dom';


export default function ServiceManager() {
  const [userData,setUserData]= useState({name:""});
  const [managerData,setmanagerData]= useState([]);
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
          console.log(err);

        }
  }
useEffect(()=>{
    userContact();
},[]);

const UserComplain=async()=>{
  try{
      const res =await fetch('/getmanager',{
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
  list.push({name:element?.name,email:element?.email,phone:element?.phone,device:element?.device,message:element?.message,ReferanceNumber:element?.ReferanceNumber,serviceManager:element?.serviceManager})
    })
    let i=0;
    while(i<list.length){
      const x=Object.entries(list[i])
      managerData[i]=x
      i++;
    }
}
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
const handleInputs =(e,key,x)=>{
  let newArr = [...managerData];
  if(x=7){
    let x=[e.target.name,e.target.value]
    newArr[key][7]=x
  }
  else{
    newArr[key][x][1] = e.target.value;
  } 
    setmanagerData(newArr);
}
const HardwareForm=async (e,key)=>{
  e.preventDefault();
  const x={name:managerData[key][0][1],email:managerData[key][1][1],phone:managerData[key][2][1],device:managerData[key][3][1],message:managerData[key][4][1],ReferanceNumber:managerData[key][5][1],HardwareVendor:managerData[key][7][1]}
  const res= await fetch('/forwardtoHardware',{
    method:'POST',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({name:managerData[key][0][1],email:managerData[key][1][1],phone:managerData[key][2][1],device:managerData[key][3][1],message:managerData[key][4][1],ReferanceNumber:managerData[key][5][1],HardwareVendor:managerData[key][7][1]})
  });
  const data = await res.json();
  if(!data){
    console.log("Not send to serviceManager");
  }else{
    alert("message send to HardwareVendor");
    setmanagerData({...managerData[key][7],HardwareVendor:""});
    history.push("/");
  }
}
  return (
    <div className='First'>
    <section>
          <h1 id='title'>Complain For ServiceManager</h1>
          <div className='Table'>
                {
                  managerData.length!=0?(
                    managerData.map((serviceManager,key)=>(
                      userData.name===managerData[key][6][1]?(
                  <form className='Tr' method='POST'>
                    <div className='Ref'>
                    <h5 className='td' id='name'>ReferanceNumber</h5>
                    <input id='input' type="text" className='td'   name='ReferanceNumber' defaultValue={managerData[key][5][1]} placeholder='Enter ReferanceNumber' />
                    </div>
                  <div className='divn'>
                    <h5 className='td' id='name'>Name</h5>
                    <input id='input' type="text" className='td'  name='name' defaultValue={managerData[key][0][1]} placeholder='Enter Name' />
                  </div>
                  <div >
                  <h5 className='td' id='name'>Email</h5>
                    <input id='input' type="text" className='td'  name='email' defaultValue={managerData[key][1][1]} placeholder='Enter Email'   />
                  </div>
                  <div className='phone'>
                  <h5 className='td' id='name'>Phone</h5>
                    <input id='input' type="text" className='td'  name='phone' defaultValue={managerData[key][2][1]} placeholder='Enter Phone' />  
                  </div>
                  <div className='phone'>
                  <h5 className='td' id='name'>Device</h5>
                    <input id='input' type="text" className='td'  name='device' defaultValue={managerData[key][3][1]} placeholder='Enter Device' />
                  </div>
                  <div>
                  <h5 className='td' id='name'>Message</h5>
                    <input id='input' type="textarea" className='td'  name='message' defaultValue={managerData[key][4][1]} placeholder='Enter Message' />
                  </div>
                  <div>
                  <h5 className='td' id='name'>HardwareVendor Name</h5>
                    <input id='input' type="text" className='td'  name='serviceManager' placeholder='Enter HardwareVendor Name' onChange={event=>handleInputs(event,key,7)} />
                  </div>
                  <div>
                    <h5 className='td' id='name'>Responce</h5>
                    <input id='input' type="Submit" className='td'  defaultValue="Responce" onClick={event=>HardwareForm(event,key)} /></div>
                  </form>):null
                  ))):(<h3>No Complains ServiceManager Try to Reload</h3>)
                }
                </div>
          
    </section>
    </div>
  )
}