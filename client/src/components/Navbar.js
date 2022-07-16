import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <li className="nav-item">
            <NavLink className="Link" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="Link" to="/about">
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="Link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="Link" to="/signup">
              Signup
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <NavLink className="Link" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="Link" to="/about">
              About
            </NavLink>
          </li>
        </>
      );
    }
  };
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
  });
  const userContact = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
        work: data.work,
      });
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    userContact();
  }, []);
  if (userData.work === "Agrigator") {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light">
          <NavLink className="navbar-brand" to="#">
            <img
              className="Logo"
              src="http://virtual.barodaweb.org.in/assets/img/logo.png"
              alt="logo"
            />
          </NavLink>
          <button
            className="username"
            onClick={() => {
              history.push("/about");
            }}
          >
            <i className="zmdi zmdi-account mr-3"></i>
            {userData.name}
          </button>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse ml-auto"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ml-auto">
            <RenderMenu/>
              <li className="nav-item">
                <NavLink className="Link" to="/contact">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="Link" to="/status">
                  CheckComplainStatus
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="Link" to="/logout">
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
  if (userData.work === "Company") {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light ">
          <NavLink className="navbar-brand" to="#">
            <img
              className="Logo"
              src="http://virtual.barodaweb.org.in/assets/img/logo.png"
              alt="logo"
            />
          </NavLink>
          <button
            className="username"
            onClick={() => {
              history.push("/about");
            }}
          >
            <i className="zmdi zmdi-account mr-3"></i>
            {userData.name}
          </button>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse ml-auto"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ml-auto">
            <RenderMenu/>
              <li className="nav-item">
                <NavLink className="Link" to="/company">
                  Complains
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="Link" to="/logout">
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
  if (userData.work === "ServiceManager") {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light ">
          <NavLink className="navbar-brand" to="#">
            <img
              className="Logo"
              src="http://virtual.barodaweb.org.in/assets/img/logo.png"
              alt="logo"
            />
          </NavLink>
          <button
            className="username"
            onClick={() => {
              history.push("/about");
            }}
          >
            <i className="zmdi zmdi-account mr-3"></i>
            {userData.name}
          </button>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse ml-auto"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ml-auto">
            <RenderMenu/>
              <li className="nav-item">
                <NavLink className="Link" to="/ServiceManager">
                  Complains
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="Link" to="/logout">
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
  if (userData.work === "HardwareVendor") {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light">
          <NavLink className="navbar-brand" to="#">
            <img
              className="Logo"
              src="http://virtual.barodaweb.org.in/assets/img/logo.png"
              alt="logo"
            />{" "}
          </NavLink>
          <button
            className="username"
            onClick={() => {
              history.push("/about");
            }}
          >
            <i className="zmdi zmdi-account mr-3"></i>
            {userData.name}
          </button>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse ml-auto"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ml-auto">
            <RenderMenu/>
              <li className="nav-item">
                <NavLink className="Link" to="/HardwareVendor">
                  Complains
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="Link" to="/logout">
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <NavLink className="navbar-brand" to="#">
          <img
            className="Logo"
            src="http://virtual.barodaweb.org.in/assets/img/logo.png"
            alt="logo"
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse ml-auto"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">
          <RenderMenu/>
          <li className="nav-item">
            <NavLink className="Link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="Link" to="/signup">
              Signup
            </NavLink>
          </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
