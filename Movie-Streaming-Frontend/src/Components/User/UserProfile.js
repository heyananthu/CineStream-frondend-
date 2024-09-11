import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from "../../Assets/Images/complaintBanner.png";
import axiosInstance from "../Constants/BaseUrl";
import { imageUrl } from "../Constants/Image_Url";

function UserProfile() {
  const uid = localStorage.getItem("userId");
  const [userData, setUserData] = useState({ img: { filename: "" },dob:'' });

  useEffect(() => {
    axiosInstance
      .post(`/viewUserById/${uid}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setUserData(res.data.data);
        } else {
          console.log("Failed to fetch movie data");
        }
      })
      .catch(() => {
        console.log("Failed to fetch movie data");
      });
  }, [uid]);

  console.log(userData.img.filename);

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
                  ensure your CineStream experience is just how you like it.{" "}
                </p>
              </div>
              <div className="user_add_complaint_box1_img mt-3">
                <img src={img} alt="Complaint Banner" />
              </div>
            </div>
            <div className="col-7">
              <div className="user_add_complaint_form">
                <div className="container">
                  <form>
                    <div className="row">
                      <div className="d-flex justify-content-end">
                        <div className="user_profile_pic">
                          <img
                            src={`${imageUrl}/${userData.img?.filename}`}
                            alt="user_profile_pic"
                          />
                        </div>
                      </div>

                      <div className="col-6 user_reg_input_grp">
                        <label>
                          <small>Name</small>
                        </label>
                        <h4>{userData.name}</h4>
                      </div>
                      <div className="col-6 user_reg_input_grp">
                        <label>
                          <small>E-mail</small>
                        </label>

                        <h4>{userData.email}</h4>
                      </div>
                      <div className="col-6 user_reg_input_grp mt-2">
                        <label>
                          <small>Contact</small>
                        </label>

                        <h4>{userData.contact}</h4>
                      </div>
                      <div className="col-6 user_reg_input_grp mt-2">
                        <label>
                          <small>DOB</small>
                        </label>

                        <h4>{userData.dob.slice(0,10)}</h4>
                      </div>
                      <div className="col-6 user_reg_input_grp mt-2">
                        <label>
                          <small>Gender</small>
                        </label>

                        <h4>{userData.gender}</h4>
                      </div>
                      <div className="col-6 user_reg_input_grp mt-2">
                        <label>
                          <small>State</small>
                        </label>

                        <h4>{userData.state}</h4>
                      </div>
                      <div className="col-6 user_reg_input_grp mt-2">
                        <label>
                          <small>Nationality</small>
                        </label>

                        <h4>{userData.nationality}</h4>
                      </div>
                      <div className="col-6 user_reg_input_grp mt-2">
                        <label>
                          <small>Pincode</small>
                        </label>

                        <h4>{userData.pincode}</h4>
                      </div>

                      <div className="d-flex justify-content-end">
                        <Link to={"/user_edit_profile"}>
                          <button type="submit" className="btn bg_red">
                            Edit
                          </button>
                        </Link>
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

export default UserProfile;
