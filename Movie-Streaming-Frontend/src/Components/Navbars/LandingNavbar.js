import React from "react";
import "../../Assets/Styles/LandingNavbar.css";
import logo from '../../Assets/Images/Vector (1).png'
import { Link } from "react-router-dom";

function LandingNavbar() {
  return (
    <div>
      <div className="landing_nav"> 
        <div className="container landing_nav">
          <Link to='/' className="nav-link" >
            <div className="landing_nav_logo">
              <img src={logo} alt="logo" />
              <p>
                <span className="logo_red">Cine</span>Stream
              </p>
            </div>
          </Link>
          <div className="landing_nav_login">
            <Link to='/user_login' className="nav-link" ><p>Sign In</p></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingNavbar;
