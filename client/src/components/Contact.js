import React, { useEffect,useState } from 'react'


export default function Contact() {
  const [userData,setUserData]= useState({name:"",email:"",phone:"",device:"",message:"",provider:"",ReferanceNumber:""});
 
  const userContact=async()=>{
        try{
            const res =await fetch('/getdata',{
              method:"GET",
              headers:{
                "Content-Type":"application/json"
              }
            });
            const data = await res.json();
            setUserData({...userData,name:data.name,email:data.email,phone:data.phone});

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

const handleInputs =(e)=>{
      const name=e.target.name;
      const value=e.target.value;
      setUserData({...userData,[name]:value});
}
  
const contactform=async (e)=>{
  
  e.preventDefault();
  let {name,email,phone,device,message,provider,ReferanceNumber}=userData;
  ReferanceNumber=Random();
  const res= await fetch('/complain',{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name,email,phone,device,message,provider,ReferanceNumber
    })
  });
  const data = await res.json();
  if(!data){
    console.log("message not send");
  }else{
    alert("Complain send. Your ReferanceNumber is "+ ReferanceNumber);
    setUserData({...userData,device:"",message:"",provider:"",ReferanceNumber:""});
  }

}
function Random(props) {
  var maxNumber = 999999999;
  let randomNumber = Math.floor((Math.random() * maxNumber) + 111111111);
  return randomNumber
}
  return (
    <div className='First'>
      <div className='Contact-form'>
        <div className='container'>
          <div className='row'>
            <div className='Contact'>
              <div className='contact-form-container'>
                <div className='contect-form-title'>
                 <h3>Get In Touch</h3> </div>
                  <form method='POST' id='contact-form'>
                    <div className='contact-form-name d-flex '>
                    <div className='cform-field'>
                      <input type="text" id='contect-form-name' name='name' value={userData.name} onChange={handleInputs} className='contact-form-name-inputfield'
                      placeholder='Your Name' required/>
                    </div>
                    <div className='cform-field'>
                      <input type="text" id='contect-form-email' name='email' value={userData.email} onChange={handleInputs} className='contact-form-email-inputfield'
                      placeholder='Your Email' required/>
                    </div>
                    <div className='cform-field'>
                      <input type="text" id='contect-form-phone' name='phone' value={userData.phone} onChange={handleInputs} className='contact-form-phone-inputfield'
                      placeholder='Your Phone' required/>
                    </div>
                    </div>
                    <div className='cform-field'>
                      <input type="text" id='contect-form-name' name='provider' value={userData.provider} onChange={handleInputs} className='contact-form-provider-inputfield'
                      placeholder='Your DeviceProvider Name' required/>
                    </div>
                    <div className='cform-field'>
                      <input type="text" id='contect-form-name' name='device' value={userData.device} onChange={handleInputs} className='contact-form-provider-inputfield'
                      placeholder='Your Device' required/>
                    </div>
                    <div className='contact-form-text'>
                      <textarea className="textarea" id="textarea" name='message' value={userData.message} onChange={handleInputs} placeholder='Message' cols="30" rows="5"></textarea>
                    </div>
                    <div className='contact-form-btn'>
                    <button type="submit" onClick={contactform} className='contact-btn'>Send Message</button>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
