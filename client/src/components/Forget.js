import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Forget = () => {
    const [user,setUser] = useState({email:""});
    const history = useHistory();

let name,value;
const handleinputs=(e)=>{
        name=e.target.name;
        value=e.target.value;
        setUser({...user,[name]:value});
  }
    const Postemail= async(e)=>{
        e.preventDefault();
        const {
          email
        }= user;
        const res = await fetch("/reset1",{
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email
        })
      });
      const data =await res.json();
      if(res.status===422 || !data ){
            window.alert("Enter Email");
      }
      else{
        window.alert("Otp Sent");
        history.push("/OTP");
      }
      
      }
  return (
    <div>
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
                <h2 className='Signup-h2'>Set your Password</h2>
                <form method='POST' className='register-form' id='register-form'>
                  <div className='form-group'>
                  <div className='figure'>
                    <figure>
                      <img className='Login-image' src='http://virtual.barodaweb.org.in/assets/img/advertiser.svg' alt="Login pic" />
                    </figure>
                  </div> 
                  <div className='right'>
                    <div className='LForm-element'>
                    <label htmlFor="Email"><i className="zmdi zmdi-email-open"></i></label>
                    <input className='Lform-input'  type="email" name='email' id='Email' autoComplete='off' onChange={handleinputs}
                      placeholder='Enter Your Email' />
                    </div>
                    <div className='Forget-btn-div'>
                      <input type="Submit" onClick={Postemail} name='Signup' id='Forgot' className='form-submit' value="Genreate Otp" />
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

export default Forget
