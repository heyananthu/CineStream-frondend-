import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminDashboard from "./AdminDashboard";
import "../../Assets/Styles/AdminCall.css";
import AdminViewMovieReq from "./AdminViewMovieReq";
import AdminViewSingleMovieReq from "./AdminViewSingleMovieReq";
import AdminViewApprovedMovies from "./AdminViewApprovedMovies";
import PlayVideo from "../Common/PlayVideo";
import { useNavigate } from "react-router-dom";
import AdminAddSubscribtion from "./AdminAddSubscribtion";
import AdminViewSubscription from "./AdminViewSubscription";
import AdminEditSubscription from "./AdminEditSubscription";
import AdminViewComplaints from "./AdminViewComplaints";
import AdminViewAllUsers from "./AdminViewAllUsers";
import ViewReviews from "../Common/ViewReviews";
import AdminViewRecentlyPlayed from "./AdminViewRecentlyPlayed";

function AdminCall({ type }) {

  const navigate=useNavigate()

  useEffect(() => {
    if (localStorage.getItem("adminId") == null) {
      navigate("/");
    }
  });

  return (
    <div className="container-fluid admin_main">
      <div className="row">
        <div
          className="col-lg-3 col-md-6 col-sm-12 adminmain-sidebar"
          style={{ padding: 0 }}
        >
          <AdminSidebar />
        </div>
        <div className=" col-lg-9 col-md-6 col-sm-12 adminmain-content">
          {type === "dashboard" ? (
            <AdminDashboard />
          ) : type === "movie_req" ? (
            <AdminViewMovieReq />
          ) : type === "movie_req_by_id" ? (
            <AdminViewSingleMovieReq type='request' />
          ) : type === "approved_movies" ? (
            <AdminViewApprovedMovies />
          ) : type === "approved_movies_by_id" ? (
            <AdminViewSingleMovieReq type='view'  />
          ) : type === "admin_play_movie" ? (
            <PlayVideo userType='admin'  />
          ) : type === "add_subscription" ? (
            <AdminAddSubscribtion  />
          ) : type === "view_subscription" ? (
            <AdminViewSubscription  />
          ) : type === "edit_subscription" ? (
            <AdminEditSubscription  />
          ) : type === "view_complaints" ? (
            <AdminViewComplaints  />
          ) : type === "view_users" ? (
            <AdminViewAllUsers  />
          ) : type === "view_review" ? (
            <ViewReviews  />
          ) : type === "recently_played_movies" ? (
            <AdminViewRecentlyPlayed  />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminCall;
