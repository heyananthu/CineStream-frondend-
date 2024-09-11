import React, { useEffect, useState } from "react";
import "../../Assets/Styles/UserAddComplaints.css";
import img from "../../Assets/Images/complaintBanner.png";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";
import SubscriptionBanner from "./SubscriptionBanner";
import { toast } from "react-toastify";

function UserAddComplaints() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userId") == null) {
      navigate("/");
    }
  }, [navigate]);

  const id = localStorage.getItem("userId");
  const [userDetails, setUserDetails] = useState({});
  const [complaint, setComplaint] = useState('');

  useEffect(() => {
    axiosInstance
      .post(`/viewUserById/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setUserDetails(res.data.data);
        } else {
          console.log("Failed to fetch user data");
        }
      })
      .catch(() => {
        console.log("Failed to fetch user data");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/createComplaint`, { userId: userDetails._id, complaint: complaint })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast.success('Complaint Added');
          setComplaint('');
        } else {
          toast.error("Failed to add");
        }
      })
      .catch(() => {
        console.log("Failed to add complaint");
      });
  }

  return (
    <div>
      <div className="user_add_complaint">
        <div className="container">
          <div className="row">
            <div className="col-5">
              <div>
                <p className="user_add_complaint_title">
                  Speak Up: <br />
                  Report an Issue
                </p>
                <p className="user_add_complaint_sub_title">
                  Your feedback is essential in helping us improve our services.
                  Please fill out the form to let us know about any issues or
                  concerns you have.
                </p>
              </div>
              <div className="user_add_complaint_box1_img mt-3">
                <img src={img} alt="Complaint Banner" />
              </div>
            </div>
            <div className="col-7">
              <div className="user_add_complaint_form">
                <div className="container">
                  <form onSubmit={handleSubmit} >
                    <div className="row">
                      <div className="col-6 user_reg_input_grp mt-3">
                        <label>Name</label>
                        <input
                          type="text"
                          placeholder="Enter Your Name"
                          value={userDetails.name || ''}
                          readOnly
                        />
                      </div>
                      <div className="col-6 user_reg_input_grp mt-3">
                        <label>Contact</label>
                        <input
                          type="number"
                          placeholder="Enter Your Contact"
                          value={userDetails.contact || ''}
                          readOnly
                        />
                      </div>
                      <div className="col-12 user_reg_input_grp mt-4">
                        <label>E-mail</label>
                        <input
                          type="email"
                          placeholder="Enter Your E-mail"
                          value={userDetails.email || ''}
                          readOnly
                        />
                      </div>
                      <div className="col-12 user_reg_input_grp mt-4">
                        <label>Message</label>
                        <textarea
                          placeholder="Enter Your Message"
                          rows="5"
                          value={complaint}
                          onChange={(e) => setComplaint(e.target.value)}
                          required
                        />
                      </div>
                      <div className="d-flex justify-content-end mt-4">
                        <button type="submit" className="btn bg_red">Send Message</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {userDetails.paymentStatus === false && <SubscriptionBanner />}
    </div>
  );
}

export default UserAddComplaints;
