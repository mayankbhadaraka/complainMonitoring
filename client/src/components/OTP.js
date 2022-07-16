import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const OTP = () => {
    const [user,setUser] = useState({otp:""});
    const history = useHistory();

    const OtpVerify= async(e)=>{
        e.preventDefault();
        const {
          otp
        }= user;
        const res = await fetch("/OtpVerify",{
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
            otp
        })
      });
      const data =await res.json();
      if(res.status===422 || !data ){
            window.alert("Enter Email");
      }
      else{
        window.alert("Otp Sent");
        history.push("/ChangePassword");
      }
    
      }


  return (
    <div className='First'>
        <section className='signup'>
          <div className='container'>
            <div className='signup-content'>
              <div className='Signup-form'>
              <div>
      <div class="container">
            <div class="logo-header">
                {/* <a href="/index.html" class="logo me-auto"><img src='http://virtual.barodaweb.org.in/index.html' alt="" class="img-fluid"/></a> */}
                <div >
                  <div class="logo-header-full">
                    <h1 className='Name'>Virtual Ads Management System</h1>
                  </div>
                  <div class="logo-header bottom">
                    <div class="hl-class">
                    <div class="hl one"></div>
                    <div class="hl two"></div>
                  </div>
                    <p className='Namep'>One Stop Solution for Advertising</p>
                  </div>
              </div>
            <img src="/assets/img/advertiser.svg" class="image" alt=""/>
        </div>
      </div>
      </div>
                <h2 className='Signup-h2'>Enter OTP</h2>
                <form method='POST' className='register-form' id='register-form'>
                  <div className='form-group'>
                  <div className='figure'>
                    <figure>
                      <img className='Login-image' src='http://virtual.barodaweb.org.in/assets/img/advertiser.svg' alt="Login pic" />
                    </figure>
                  </div> 
                  <div className='right'>
                    <div className='LForm-element'>
                    <label htmlFor="Email"><i class="zmdi zmdi-confirmation-number zmdi-hc-lg"></i></label>
                    <input className='Lform-input'  type="otp" name='otp' id='otp' autoComplete='off' 
                      placeholder='Enter Otp' />
                    </div>
                    <div className='Forget-btn-div'>
                      <input type="Submit" onClick={OtpVerify} name='Signup' id='Forgot' className='form-submit' value="Submit" />
                    </div>
                    </div>
                  </div>
                </form>
              </div>
                  
            </div>
          </div>
        </section>
      
    </div>
  )
}

export default OTP
