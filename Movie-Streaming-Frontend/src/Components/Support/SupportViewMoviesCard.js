import React, { useEffect, useState } from "react";
import "../../Assets/Styles/SupportViewMoviesCard.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";
import { imageUrl } from "../Constants/Image_Url";
import { toast } from "react-toastify";

function SupportViewMoviesCard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("supportId") == null) {
      navigate("/");
    }
  });

  const [movieData, setMovieData] = useState([]);
  const [searchInfo, setSearchInfo] = useState("");
  const [searcResults, setSearchResults] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/getAllMovies`)
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

  useEffect(() => {
    axiosInstance
      .post(`/searchMovies/${searchInfo}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setMovieData(res.data.data);
        } else {
          console.log("Failed to fetch cast data");
          // setSearchResults([]);
        }
      })
      .catch(() => {
        console.log("Failed to fetch cast data");
        // setSearchResults([]);
      });
  }, [searchInfo]);

  const handleReject = (movieId) => {
    axiosInstance
      .post(`/deleteMovieById/${movieId}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast.success("Movie Removed");
          setMovieData((prevData) =>
            prevData.filter((movie) => movie._id !== movieId)
          );
        } else {
          toast.error("Failed to Removed");
        }
      })
      .catch(() => {
        toast.error("Failed to Removed");
      });
  };

  return (
    <div className="support_view_movies">
      <div className="container">
      <div className="w-25 mt-4">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Movies"
              aria-label="Search"
              onChange={(e) => setSearchInfo(e.target.value)}
            />
          </div>
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
                        <Link
                          to={`/support_view_single_movie/${movie._id}/${movie.thumbnail.filename}`}
                        >
                          <p>
                            <i class="ri-eye-line"></i> View
                          </p>
                        </Link>
                      </div>

                      <div className="support_view_movies_cards_actions_approval">
                        <Link to={`/support_edit_movie/${movie._id}`}>
                          <div className="support_view_movies_cards_actions_accept mx-2 fs-5">
                            <i class="ri-file-edit-line"></i>
                          </div>
                        </Link>
                        <Link
                          onClick={() => {
                            handleReject(movie._id);
                          }}
                        >
                          <div className="support_view_movies_cards_actions_reject fs-5">
                            <i class="ri-delete-bin-6-line"></i>
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

export default SupportViewMoviesCard;
