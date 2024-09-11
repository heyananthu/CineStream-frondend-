import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Constants/BaseUrl';
import axiosMultipartInstance from '../Constants/FormDataUrl';
import { toast } from 'react-toastify';
import img from "../../Assets/Images/complaintBanner.png";

function UserEditProfile() {
  const [formData, setFormData] = useState({});
  const uid = localStorage.getItem('userId');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'img') {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else if (name === 'dob') {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      if (selectedDate > currentDate) {
        toast.warning("Date of Birth cannot be a future date");
        return;
      }
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  

  useEffect(() => {
    axiosInstance.post(`/viewUserById/${uid}`)
      .then((res) => {
        if (res.data.status === 200) {
          const userData = res.data.data;
          if (userData.dob) {
            userData.dob = new Date(userData.dob).toISOString().split('T')[0];
          }
          setFormData(userData);
        } else {
          console.log('Failed to fetch user data');
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went wrong');
      });
  }, [uid]);

  console.log(formData);


  const handleSubmit = (event) => {
    event.preventDefault();

    // Add validation for pincode and contact
    if (!/^\d{6}$/.test(formData.pincode)) {
      alert("Pincode must have 6 digits");
      return;
    }
    if (!/^\d{10}$/.test(formData.contact)) {
      alert("Contact must have 10 digits");
      return;
    }

    console.log(formData);


    axiosMultipartInstance.post(`/editUserById/${uid}`, formData)
      .then((res) => {
        if (res.data.status === 200) {
          toast.success("Profile Updated Successfully");
          navigate('/user_profile');
        } else {
          toast.error("Profile Update Failed");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  

  return (
    <div>
      <div className="mt-5 pt-5 mb-5">
        <div className="container mt-5">
          <div className="row">
            <div className="col-5">
              <div>
                <p className="user_add_complaint_title">
                  Your Space, <br />
                  Your Customization
                </p>
                <p className="user_add_complaint_sub_title">
                  Keep your information up-to-date, manage your settings, and
                  ensure your CineStream experience is just how you like it.
                </p>
              </div>
              <div className="user_add_complaint_box1_img mt-3">
                <img src={img} alt="User Banner" />
              </div>
            </div>
            <div className="col-7">
              <div className="user_add_complaint_form">
                <div className="container">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-6 user_reg_input_grp">
                        <label><small>Name</small></label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter Your Name"
                          value={formData.name || ''}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-6 user_reg_input_grp">
                        <label><small>E-mail</small></label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter Your Email"
                          value={formData.email || ''}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-6 user_reg_input_grp mt-2">
                        <label><small>Contact</small></label>
                        <input
                          type="text"
                          name="contact"
                          placeholder="Enter Your Phone Number"
                          value={formData.contact || ''}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-6 user_reg_input_grp mt-2">
                        <label><small>DOB</small></label>
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob || ''}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-6 user_reg_input_grp mt-2">
                        <label><small>Gender</small></label>
                        <select
                          name="gender"
                          value={formData.gender || ''}
                          onChange={handleChange}
                          required
                        >
                          <option value="" label="Select gender" />
                          <option value="male" label="Male" />
                          <option value="female" label="Female" />
                        </select>
                      </div>
                      <div className="col-6 user_reg_input_grp mt-2">
                        <label><small>State</small></label>
                        <input
                          type="text"
                          name="state"
                          placeholder="Enter Your State"
                          value={formData.state || ''}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-6 user_reg_input_grp mt-2">
                        <label><small>Nationality</small></label>
                        <input
                          type="text"
                          name="nationality"
                          placeholder="Enter Your Nationality"
                          value={formData.nationality || ''}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-6 user_reg_input_grp mt-2">
                        <label><small>Pincode</small></label>
                        <input
                          type="text"
                          name="pincode"
                          placeholder="Enter Your Pincode"
                          value={formData.pincode || ''}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-6 user_reg_input_grp mt-2">
                        <label><small>Upload Image</small></label>
                        <input
                          type="file"
                          name="img"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-12 mt-4">
                        <button type="submit" className="btn bg_red">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default UserEditProfile;
