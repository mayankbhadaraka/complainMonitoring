import './App.css';
import { Route,Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from './components/Home';
import About from './components/About';
import Forget from './components/Forget';
import Otp from "./components/OTP";
import ChangePassword from "./components/ChangePassword";
import Status from './components/Status';
import Contact from "./components/Contact";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Complain from "./components/complain";
import Logout from "./components/Logout";
import HardwareVendor from "./components/HardwareVendor";
import ServiceManager from "./components/ServiceManager";
import { createContext, useReducer } from 'react';
import { initialState,reducer } from './reducer/UseReducer';




export const UserContext=createContext();
const Routing=()=>{
          return(
                <Switch>
                     <Route exact path="/">
                        <Home/>
                     </Route>
                     <Route path="/about">
                        <About/>
                     </Route>
                     <Route path="/contact">
                        <Contact/>
                     </Route>
                     <Route path="/login">
                        <Login/>
                     </Route>
                     <Route path="/signup">
                        <Signup/>
                     </Route>
                     <Route exact path="/Forget">
                        <Forget/>
                     </Route>
                     <Route exact path="/OTP">
                        <Otp/>
                     </Route>
                     <Route exact path="/ChangePassword">
                        <ChangePassword/>
                     </Route>
                     <Route path="/logout">
                        <Logout/>
                     </Route>
                     <Route exact path="/status">
                        <Status/>
                     </Route>
                     <Route exact path="/company">
                        <Complain/>
                     </Route>
                     <Route exact path="/ServiceManager">
                        <ServiceManager/>
                     </Route>
                     <Route exact path="/HardwareVendor">
                        <HardwareVendor/>
                     </Route>
                     </Switch>
               )
   } 
function App() {
     const[state,dispatch]=useReducer(reducer,initialState)

  return (
   <>
   <UserContext.Provider value={{state,dispatch}}>
   <Navbar/>
   <Routing/>
   </UserContext.Provider>
   
   </>
  );
}

export default App;
