import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import '../Css/Navbar.css';
import { DeleveryContext } from "../store.js";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import samimg from "../Images/profilesample.jpg"
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';

function Navbar() {

  useEffect(() => {
    getLive();
  }, []);
  const { isLoggedin } = DeleveryContext();
  const { user1 } = DeleveryContext();
  const [isNewLivestream, setIsNewLivestream] = useState(false); // State to manage if there's a new livestream

  const shapeStyles = { width: 40, height: 40 };
  const shapeCircleStyles = { borderRadius: '50%' };
  const rectangle = (
    <Box component="span" sx={shapeStyles}>
      Live
    </Box>
  );
  <Badge
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
      color: 'red',
    }}
  ></Badge>

  

  const [data, setData] = useState([]);
  const getLive = async () => {
    try {
      const response = await fetch("http://localhost:9000/liveget", {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to fetch posts:", errorData);
      } else {
        const data = await response.json();
        setData(data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light font-weight-bold p-3 ">
        <NavLink className="navbar-brand ml-3 font-weight-bold" id="logohead" to="/">
          Innovest
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
          className="collapse navbar-collapse justify-content-between ml-4"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto mr-3">
            <li className="nav-item item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            {/* <li className="nav-item item">
              <NavLink className="nav-link" to="/Contact">
                Contact
              </NavLink>
            </li> */}
            <li className="nav-item item">
              <NavLink className="nav-link" to="/News">
                News
              </NavLink>
            </li>
            {/* <li className="nav-item item">
              <NavLink className="nav-link" to="/liveshow">
                Live
              </NavLink>
            </li> */}
            <li className="nav-item item">
              <NavLink className="nav-link" to="/liveshow">
                <Badge color="secondary" badgeContent={isNewLivestream ? ' ' : null} variant="dot">
                  {rectangle}
                </Badge>
              </NavLink>
            </li>
            {isLoggedin ? (
              <li class="nav-item dropdown" >
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={user1.image || samimg} width="30" height="30" className="rounded-circle" /> {user1.name}
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="/Profile"> <AccountCircleIcon fontSize='large' /> Profile</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="/Logout"> <LogoutIcon fontSize='large' /> Logout</a>
                </div>
              </li>

            ) : (
              <>
                <li className="nav-item item">
                  <NavLink className="nav-link" to="/Signup">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item item">
                  <NavLink className="nav-link" to="/Login">
                    Login
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav-item item">
              <NavLink className="nav-link" to="/getpost">
                Post
              </NavLink>
            </li>
            <li className="nav-item item">
              <NavLink className="nav-link" to="/getproduct">
                Products
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
