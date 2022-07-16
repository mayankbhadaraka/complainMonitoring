import React, { useEffect,useState } from 'react'
import Register from "../Images/Register.png";
import {useHistory} from "react-router-dom";
export default function About() {
  

    const history=useHistory();
    const [userData,setUserData]= useState({});

    const callAboutPage=async()=>{
          try{
              const res =await fetch('/about',{
                method:"GET",
                headers:{
                  Accept:"application/json",
                  "Content-Type":"application/json"
                },
                credentials:"include"
              });
              const data = await res.json();
              setUserData(data);

              if(!res.status===200){
                const error = new Error(res.error);
                throw error;
              }

          }
          catch(err){
            history.push('/login');

          }
    }
  useEffect(()=>{
      callAboutPage();
  },[]);

  return (
    <div className='First'>
      <div className='container-profile'>
        <form method='GET'>
            <div className='row'>
              <div className='col-md-4'>
                <img className='profile-img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzfBDE21zGj51VFNobA4JMQiNShRP8NyunLSfu7LKiMiK9n1mpRSoLT2iUroQxMSXNQGk&usqp=CAU' alt="Image" />
              </div>
              <div className='col-md-6'>
                <div className='Profile-head'>
                  <div className='ml-92'>
                  <h5>{userData.name}</h5>
                  <h6>{userData.work}</h6>
                  </div>
                  <ul className='nav-tab' role="tablist">
                    <li className='navitem'>
                      <h3 className='About'>About</h3>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='AccountDetail'>
              <div className='col-md-8 pl-5 about-info'>
                <div className='tab-content profile-tab'id='mytabcontent'>
                  <div className='tab-pane fade show active' id='home' role="tabpanel" area-labelledby="home-tab">
                    <div className='row'>
                      <div className='col-md-6'>
                          <label >User Id</label>
                      </div>
                      <div className='col-md-6'>
                         <p>{userData._id}</p>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                          <label >Name</label>
                      </div>
                      <div className='col-md-6'>
                         <p>{userData.name}</p>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                          <label >Email</label>
                      </div>
                      <div className='col-md-6'>
                         <p>{userData.email}</p>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                          <label >Phone Number</label>
                      </div>
                      <div className='col-md-6'>
                         <p>{userData.phone}</p>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                          <label >Profession</label>
                      </div>
                      <div className='col-md-6'>
                         <p>{userData.work}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </form>
      </div>
    </div>
  )
}
