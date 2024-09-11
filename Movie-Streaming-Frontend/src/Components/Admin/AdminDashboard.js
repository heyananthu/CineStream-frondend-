import React, { useEffect, useState } from "react";
import "../../Assets/Styles/AdminDashboard.css";
import img from "../../Assets/Images/admin.jpg";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";
import SupportViewReports from "../Support/SupportViewReports";

function AdminDashboard() {

  const navigate=useNavigate()

  useEffect(() => {
    if (localStorage.getItem("adminId") == null) {
      navigate("/");
    }
  }); 

  const [users,setUsers]=useState(0)
  const [movies,setMovies]=useState(0)
  const [complaints,setComplaints]=useState(0)

  useEffect(() => {
    axiosInstance
      .post(`/viewAllcomplaints`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setComplaints(res.data.data.length);
        } else {
          console.log("Failed to fetch cast data");
        }
      })
      .catch(() => {
        console.log("Failed to fetch cast data");
      });
    axiosInstance
      .post(`/getApprovedMovies`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setMovies(res.data.data.length);
        } else {
          console.log("Failed to fetch cast data");
        }
      })
      .catch(() => {
        console.log("Failed to fetch cast data");
      });
    axiosInstance
      .post(`/viewUsers`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setUsers(res.data.data.length);
        } else {
          console.log("Failed to fetch cast data");
        }
      })
      .catch(() => {
        console.log("Failed to fetch cast data");
      });
  }, []);

  return (
    <div className="admin_dashboard">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="admin_dashboard_container ">
              <div className="row">
                <div className="col-8">
                  <div className="admin_dashboard_head">
                    <div>
                      <p className="admin_dashboard_head_title">
                        Ultimate Admin Dashboard
                      </p>
                      <p className="mt-4">
                        Welcome to the Admin Dashboard of CineStream, your
                        ultimate movie streaming platform. Here, as an
                        administrator, you have the power to manage users,
                        oversee platform settings, and ensure smooth operations.
                        Use this dashboard to monitor user activities, handle
                        support requests, and maintain the overall quality and
                        security of our service. Your role is essential in
                        providing an exceptional streaming experience for all
                        CineStream users. Thank you for your commitment and
                        leadership in making CineStream a top choice for movie
                        enthusiasts everywhere.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <img src={img} className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 mt-3">
                  <div className="">
                    <div>
                      <p className="admin_dashboard_head_title text-light ">
                        Movie Reports
                      </p>
                    <SupportViewReports/>
                      
                    </div>
                  </div>
                </div>
          <div className="col-6 d-flex align-items-center">
            <div className="admin_dashboard_card_container">
              <div className="admin_dashboard_cards_new">
                <div>
                  <div className="admin_dashboard_cards_icon mx-1">
                    <i class="ri-user-line"></i>
                  </div>
                </div>
                <div className="text-center" >
                  <div className="admin_dashboard_cards_user_type fs-6">
                    <p>User</p>
                  </div>
                  <div className="admin_dashboard_cards_count">
                    <p>{users}</p>
                  </div>
                </div>
              </div>
              <div className="admin_dashboard_cards_new">
                <div>
                  <div className="admin_dashboard_cards_icon mx-1">
                  <i class="ri-movie-2-line"></i>
                  </div>
                </div>
                <div className="text-center" >
                  <div className="admin_dashboard_cards_user_type fs-6">
                    <p>Movies</p>
                  </div>
                  <div className="admin_dashboard_cards_count">
                    <p>{movies}</p>
                  </div>
                </div>
              </div>
              <div className="admin_dashboard_cards_new">
                <div>
                  <div className="admin_dashboard_cards_icon mx-1">
                  <i class="ri-ball-pen-line"></i>
                  </div>
                </div>
                <div className="text-center" >
                  <div className="admin_dashboard_cards_user_type fs-6">
                    <p>Complaints</p>
                  </div>
                  <div className="admin_dashboard_cards_count">
                    <p>{complaints}</p>
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
