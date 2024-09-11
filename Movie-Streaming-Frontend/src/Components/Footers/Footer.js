import React from 'react'
import '../../Assets/Styles/Footer.css'
import logo from '../../Assets/Images/Vector (1).png'


function Footer() {
  return (
    <div>
      <div className='footer' >
        <div className='footer_content_box' >
            <div className='footer_logo' >
                <img src={logo} alt='logo'/>
                <p><span className='logo_red' >Cine</span>Stream</p>
            </div>
            <div className='footer_content mt-4' >
                <p> Terms of use </p>
                <p> Help Centre </p>
                <p> Contact us </p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
