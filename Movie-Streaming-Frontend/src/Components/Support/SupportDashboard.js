import React, { useEffect, useState } from "react";
import img from "../../Assets/Images/support.png";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";
import SupportViewReports from "./SupportViewReports";


function SupportDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("supportId") == null) {
      navigate("/");
    }
  });

  const [users, setUsers] = useState(0);
  const [movies, setMovies] = useState(0);
  const [complaints, setComplaints] = useState(0);

 

  useEffect(() => {
    axiosInstance
      .post(`/viewAllcomplaints`)
      .then((res) => {
        // console.log(res);
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
      .post(`/getAllMovies`)
      .then((res) => {
        // console.log(res);
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
        // console.log(res);
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
          <div className="col-7">
            <div className="admin_dashboard_container">
              <div className="row">
                <div className="col-12">
                  <div className="">
                    <div>
                      <p className="admin_dashboard_head_title">
                        Movie Reports
                      </p>
                    <SupportViewReports/>
                      
                    </div>
                  </div>
                </div>
                {/* <div className="col-4">
                  <img src={img} className="img-fluid" />
                </div> */}
              </div>
            </div>
          </div>
          <div className="col-5">
            <div className="admin_dashboard_container ">
              <div className="row">
                <div className="col-12">
                  <div className="admin_dashboard_head">
                    <div>
                      <p className="admin_dashboard_head_title">
                        Manage Cinematic Excellence
                      </p>
                      <p className="mt-4">
                        Welcome to the Support Dashboard of CineStream, your hub
                        for enriching our movie streaming platform. As a support
                        team member, you play a crucial role in adding and
                        managing movie titles, ensuring a diverse and engaging
                        library for our users. Use this dashboard to streamline
                        content updates, handle user feedback, and maintain the
                        highest standards of service. Your dedication and
                        expertise help make CineStream a preferred destination
                        for movie lovers worldwide. Thank you for your
                        invaluable contribution to our community.
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="col-4">
                  <img src={img} className="img-fluid" />
                </div> */}
              </div>
            </div>
          </div>
          <div className="col-12 d-flex align-items-center">
            <div className="admin_dashboard_card_container">
              <div className="admin_dashboard_cards">
                <div>
                  <div className="admin_dashboard_cards_icon">
                    <i class="ri-user-line"></i>
                  </div>
                </div>
                <div className="text-center">
                  <div className="admin_dashboard_cards_user_type">
                    <p>User</p>
                  </div>
                  <div className="admin_dashboard_cards_count">
                    <p>{users}</p>
                  </div>
                </div>
              </div>
              <div className="admin_dashboard_cards">
                <div>
                  <div className="admin_dashboard_cards_icon">
                    <i class="ri-movie-2-line"></i>
                  </div>
                </div>
                <div className="text-center">
                  <div className="admin_dashboard_cards_user_type">
                    <p>Movies</p>
                  </div>
                  <div className="admin_dashboard_cards_count">
                    <p>{movies}</p>
                  </div>
                </div>
              </div>
              <div className="admin_dashboard_cards">
                <div>
                  <div className="admin_dashboard_cards_icon">
                    <i class="ri-ball-pen-line"></i>
                  </div>
                </div>
                <div className="text-center">
                  <div className="admin_dashboard_cards_user_type">
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

export default SupportDashboard;
