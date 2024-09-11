import React from "react";
import "../../Assets/Styles/LandingPage.css";
import logo from "../../Assets/Images/Vector.png";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <div className="landing_banner">
        <div className=" container">
          <div className="row ">
            <div className="col-lg-6 col-md-6 col-sm-12 landing_banner_left_box">
              <img src={logo} alt="logo" />
              <p><span className='logo_red' >Cine</span>Stream</p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 landing_banner_right_box mt-5">
              <p className="landing_banner_right_box_title">
                CineStream - Transforming Entertainment in the New Normal
              </p>
              <p className="landing_banner_right_box_sub_title mt-5">
                Dive into boundless entertainment. Join DigitalCineHub now!
              </p>
              <Link to='/user_login' ><button className="btn btn-danger landing_banner_register_btn mt-5">
                Start Now
              </button></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="landing_banner_1 mt-2">
        <p className="landing_banner_left_title mt-5">Next-Gen Entertainment</p>
        <p className="landing_banner_left_content mt-4">
          Experience a digital revolution with <br />
          CineStream – where the future of <br />
          entertainment unfolds.
        </p>
      </div>
      <div className="landing_banner_2 mt-2">
        <p className="landing_banner_right_title mt-4">
        Seamless Streaming, <br/>Unmatched Experience
        </p>
        <p className="landing_banner_right_content mt-4">
        Join DigitalCineHub for a journey into limitless content, <br/>seamlessly delivered for an unparalleled <br/>viewing adventure.
        </p>
      </div>
      <div className="landing_banner_1 mt-2">
        <p className="landing_banner_left_title mt-5">Your Space, Your Entertainment</p>
        <p className="landing_banner_left_content mt-4">
        CineStream: Your personalized realm of diverse content, <br/>social engagement, and immersive entertainment.
        </p>
      </div>
      <div className="landing_banner_2 mt-2">
        <p className="landing_banner_right_title mt-5">
        Revolutionizing Viewership
        </p>
        <p className="landing_banner_right_content mt-4">
        Witness the evolution of entertainment habits at <br/>CineStream – where every click unlocks a world <br/>of possibilities.
        </p>
      </div>
      
    </div>
  );
}

export default LandingPage;
