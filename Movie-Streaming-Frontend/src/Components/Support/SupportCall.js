import React, { useEffect } from "react";
import SupportSidebar from "./SupportSidebar";
import SupportDashboard from "./SupportDashboard";
import SupportAddMovies from "./SupportAddMovies";
import SupportAddCast from "./SupportAddCast";
import SupportViewMoviesCard from "./SupportViewMoviesCard";
import { useNavigate } from "react-router-dom";
import SupportViewSingleMovie from "./SupportViewSingleMovie";
import PlayVideo from "../Common/PlayVideo";
import SupportEditMovie from "./SupportEditMovie";
import SupportViewComplaints from "./SupportViewComplaints";
import SupportChatBox from "./SupportChatBox";
import ViewReviews from "../Common/ViewReviews";
import SupportViewAllUsers from "./SupportViewAllUsers";
import SupportViewWatchHistory from "./SupportViewWatchHistory";

function SupportCall({ type }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("supportId") == null) {
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
          <SupportSidebar />
        </div>
        <div className=" col-lg-9 col-md-6 col-sm-12 adminmain-content">
          {type === "dashboard" ? (
            <SupportDashboard />
          ) : type == "add_movies" ? (
            <SupportAddMovies />
          ) : type == "add_cast" ? (
            <SupportAddCast />
          ) : type == "view_movies" ? (
            <SupportViewMoviesCard />
          ) : type == "view_movie_by_id" ? (
            <SupportViewSingleMovie />
          ) : type == "support_play_movie" ? (
            <PlayVideo userType="other" />
          ) : type == "support_edit_movie" ? (
            <SupportEditMovie />
          ) : type == "support_view_complaints" ? (
            <SupportViewComplaints />
          ) : type == "support_chat" ? (
            <SupportChatBox />
          ) : type == "view_review" ? (
            <ViewReviews />
          ) : type == "view_users" ? (
            <SupportViewAllUsers />
          ) : type == "recently_played_movies" ? (
            <SupportViewWatchHistory />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default SupportCall;
