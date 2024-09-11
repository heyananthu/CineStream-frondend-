import React from 'react'
import { Link } from 'react-router-dom'
import LandingNavbar from '../Navbars/LandingNavbar'
import logo from "../../Assets/Images/Vector.png";


function DistributorRegistration() {
  return (
    <div>
      <div className="landing_banner">
        <div className=" container">
          <div className="row ">
            <div className="col-lg-6 col-md-6 col-sm-12 landing_banner_left_box">
              <img src={logo} alt="logo" />
              <p><span className='logo_red' >Cine</span>Stream</p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 landing_banner_right_box">
              <div className='user_reg_container' >
                <p>Sign Up</p>
                <span className='text-center d-flex justify-content-center text-light mt-1' >Distributor</span>
                <div className='row mt-4' >
                    <div className='col-lg-12 col-md-12 col-sm-12 user_reg_input_grp ' >
                        <input type='text' placeholder='Enter Your Name'/>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 user_reg_input_grp mt-3' >
                       
                        <input type='email' placeholder='Enter Your Email'/>
                    </div>
                    
                    <div className='col-lg-6 col-md-6 col-sm-12 user_reg_input_grp mt-3' >
                        <input type='number' placeholder='Enter Your Contact'/>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 user_reg_input_grp mt-3' >
                       
                        <input type='text' placeholder='Registration Number'/>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 user_reg_input_grp mt-3' >
                       
                        <input type='password' placeholder='Enter Your Password'/>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 user_reg_input_grp_btn mt-4' >
                       
                       <button>Sign Up</button>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 mt-4' >
                       
                       <h6>Already have an Account? <Link to='/distributor_login' >Sign In</Link></h6>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DistributorRegistration
