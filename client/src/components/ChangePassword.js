import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const ChangePassword = () => {

    const [password,setPassword]=useState('');
    const history = useHistory();

    const PostPassword= async(e)=>{
        e.preventDefault();
        const res = await fetch("/ResetPass",{
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
            password
        })
      });
      const data =await res.json();
      if(res.status===422 || !data ){
            window.alert("Enter Password");
      }
      else{
        window.alert("Password Changed");
        history.push("/Login");
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
            <h2 className='Signup-h2'>Change Password</h2>
            <form method='POST' className='register-form' id='register-form'>
              <div className='form-group'>
              <div className='figure'>
                <figure>
                  <img className='Login-image' src='http://virtual.barodaweb.org.in/assets/img/advertiser.svg' alt="Login pic" />
                </figure>
              </div> 
              <div className='right'>
              <div className='LForm-element'>
                    <label htmlFor="Password"><i className="zmdi zmdi-lock"></i></label>
                    <input className='Lform-input'  type="password" name='Password' id='Password' autoComplete='off' value={password} 
                    onChange={(e)=>setPassword(e.target.value)}  placeholder='Enter Your Password' />
                </div>
                <div className='LForm-element'>
                    <label htmlFor="Password"><i className="zmdi zmdi-lock"></i></label>
                    <input className='Lform-input'  type="password" name='Password' id='Password' autoComplete='off' value={password} 
                    onChange={(e)=>setPassword(e.target.value)}  placeholder='Enter Conform Password' />
                </div>
                <div className='Forget-btn-div'>
                  <input type="Submit" onClick={PostPassword} name='Signup' id='Forgot' className='form-submit' value="Submit" />
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

export default ChangePassword
