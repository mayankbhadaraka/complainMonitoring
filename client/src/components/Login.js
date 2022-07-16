import React, { useContext, useState } from 'react'
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from '../App';

export default function Login() {

  const {state,dispatch} = useContext(UserContext);
  const history = useHistory();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const loginuser = async (e)=>{
          e.preventDefault();
          const res = await fetch('/signin',{
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },body:JSON.stringify({
              email,
              password
            })
          });
          const data = res.json();
          if(res.status=== 400 || !data){
            window.alert("Invalid Credential");
          }else{
            dispatch({type:'USER',payload:true})
            window.alert("Login Successfull");
            history.push("/"); 
          }
  }
  return (
    
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
                
                <h2 className='Signup-h2'>Login into your account</h2>
                <form className='register-form' method='POST' id='register-form'>
                  <div className='form-group'>
                  <div className='figure'>
                    <figure>
                      <img className='Login-image' src='http://virtual.barodaweb.org.in/assets/img/advertiser.svg' alt="Login pic" />
                    </figure>
                    <NavLink className="signup-image-link" to="/Signup">Create Account</NavLink>
                  </div> 
                  <div className='right'>
                    <div className='LForm-element'>
                    <label htmlFor="Email"><i className="zmdi zmdi-email-open"></i></label>
                    <input className='Lform-input'  type="email" name='Email' id='Email' autoComplete='off' value={email} 
                    onChange={(e)=>setEmail(e.target.value)}  placeholder='Enter Your Email' />
                    </div>
                    <div className='LForm-element'>
                    <label htmlFor="Password"><i className="zmdi zmdi-lock"></i></label>
                    <input className='Lform-input'  type="password" name='Password' id='Password' autoComplete='off' value={password} 
                    onChange={(e)=>setPassword(e.target.value)}  placeholder='Enter Your Password' />
                    </div>
                    <div>
                    <NavLink className="signup-image-link" to="/Forget">Forget Password?</NavLink>
                    </div>
                  
                    <div className='form-group form-button'>
                      <input type="Submit" onClick={loginuser} name='Signup' id='Signup' className='form-submit' value="Login" />
                    </div>
                    </div>
                  </div>
                </form>
              </div>
                  
            </div>
          </div>
        </section>
  )
}
