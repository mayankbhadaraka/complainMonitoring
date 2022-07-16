import React, { useState } from 'react'
import { NavLink, useHistory } from "react-router-dom";
import Register from "../Images/Register.png";
export default function Signup() {
  const history = useHistory();
  const [user,setUser] = useState({
    name:"",email:"",phone:"", work:"",password:"",cpassword:""
  });

let name,value;
  const handleinputs=(e)=>{
        name=e.target.name;
        value=e.target.value;
        setUser({...user,[name]:value});
  }

  const PostData= async(e)=>{
    e.preventDefault();
    const {
      name,email,phone, work,password,cpassword
    }= user;
    const res = await fetch("/register",{
    method: "POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
        name,email,phone, work,password,cpassword
    })
  });
  const data =await res.json();
  if(res.status===422 || !data ){
        window.alert("Invalid Registration");
  }
  else{
    window.alert("Registration Sucessfull");
    history.push("/login");
  }

  }
  return (
    <>
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
                <h2 className='Signup-h2'>Sign up</h2>
                <form className='register-form' method='POST' id='register-form'>
                  <div className='form'>
                    <div  className='Form-element'>
                    <label htmlFor="name"><i className="zmdi zmdi-account-circle"></i></label>
                    <input className='form-input'  type="text" name='name' id='Name' autoComplete='off' value={user.name} onChange={handleinputs} placeholder='Enter Your Name' />
                    </div>
                    <div className='Form-element'>
                    <label htmlFor="email"><i className="zmdi zmdi-email-open"></i></label>
                    <input className='form-input'  type="email" name='email' id='email' autoComplete='off' value={user.email} onChange={handleinputs} placeholder='Enter Your email' />
                    </div>
                    <div className='Form-element'>
                    <label htmlFor="phone"><i className="zmdi zmdi-phone-in-talk"></i></label>
                    <input className='form-input'  type="text" name='phone' id='phone' autoComplete='off' value={user.phone} onChange={handleinputs} placeholder='Enter Your phone' />
                    </div>
                    <div className='Form-element'>
                    <label htmlFor="work"><i className="zmdi zmdi-slideshow"></i></label>
                    <input className='form-input'  type="text" name='work' id='work' autoComplete='off' value={user.work} onChange={handleinputs} placeholder='Enter Your work' />
                    </div>
                    <div className='Form-element'>
                    <label htmlFor="password"><i className="zmdi zmdi-lock"></i></label>
                    <input className='form-input'  type="password" name='password' id='password' autoComplete='off' value={user.password} onChange={handleinputs} placeholder='Enter Your password' />
                    </div>
                    <div className='Form-element'>
                    <label htmlFor="cpassword"><i className="zmdi zmdi-lock"></i></label>
                    <input className='form-input'  type="password" name='cpassword' id='cpassword' autoComplete='off' value={user.cpassword} onChange={handleinputs} placeholder='Enter Your Conform password' />
                    </div>
                    <div className='form-group form-button'>
                      <input type="Submit" name='Signup' id='Signup' className='form-submit' value="Register" onClick={PostData}/>
                    </div>
                  </div>
                </form>
              </div>
                  <div>
                    <figure>
                      <img className='signup-image' src={Register} alt="registration pic" />
                    </figure>
                    <NavLink className="signup-image-link" to="/Login">I am already register</NavLink>
                  </div> 
            </div>
          </div>
        </section>
    </>
  )
}
