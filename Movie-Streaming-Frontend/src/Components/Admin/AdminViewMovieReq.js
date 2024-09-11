import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Assets/Styles/AdminViewMovieReq.css";
import axiosInstance from "../Constants/BaseUrl";
import { imageUrl } from "../Constants/Image_Url";
import { toast } from "react-toastify";

function AdminViewMovieReq() {

  const navigate=useNavigate()

  useEffect(() => {
    if (localStorage.getItem("adminId") == null) {
      navigate("/");
    }
  });

  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/getMoviesForApproval`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setMovieData(res.data.data);
        } else {
          console.log("Failed to fetch cast data");
        }
      })
      .catch(() => {
        console.log("Failed to fetch cast data");
      });
  }, []);

  const handleApprove = (movieId) => {
    axiosInstance
      .post(`/approveMovieById/${movieId}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast.success('Movie Approved');
          setMovieData((prevData) =>
            prevData.filter((movie) => movie._id !== movieId)
          );
        } else {
          toast.error("Failed to Approve");
        }
      })
      .catch(() => {
        toast.error("Failed to Approve");
      });
  };

  const handleReject = (movieId) => {
    axiosInstance
      .post(`/deleteMovieById/${movieId}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast.success('Movie Rejected');
          setMovieData((prevData) =>
            prevData.filter((movie) => movie._id !== movieId)
          );
        } else {
          toast.error("Failed to Approve");
        }
      })
      .catch(() => {
        toast.error("Failed to Approve");
      });
  };

  return (
    <div className="support_view_movies">
      <div className="container">
        <div className="row">
          {movieData.length ? (
            movieData.map((movie) => {
              return (
                <div className="col-3">
                  <div className="support_view_movies_cards">
                    <div className="support_view_movies_cards_img">
                      <img
                        src={`${imageUrl}/${movie.thumbnail.filename}`}
                        alt="movie_image"
                      />
                    </div>
                    <div className="support_view_movies_cards_title">
                      <p>
                        {movie.name.length > 20
                          ? `${movie.name.slice(0, 20)} ...`
                          : movie.name}
                      </p>
                    </div>
                    <div className="support_view_movies_cards_actions">
                      <div className="support_view_movies_cards_actions_view">
                        <Link to={`/admin_view_single_movie_req/${movie._id}/${movie.thumbnail.filename}`} >
                          <p>
                            <i class="ri-eye-line"></i> View
                          </p>
                        </Link>
                      </div>

                      <div className="support_view_movies_cards_actions_approval">
                        <Link onClick={()=>{handleApprove(movie._id)}} >
                          <div className="support_view_movies_cards_actions_accept mx-2">
                            <i class="ri-check-fill"></i>
                          </div>
                        </Link>
                        <Link onClick={()=>{handleReject(movie._id)}} >
                          <div className="support_view_movies_cards_actions_reject">
                            <i class="ri-close-line"></i>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no_data_found">
              <p>No Movie Requests</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminViewMovieReq;
