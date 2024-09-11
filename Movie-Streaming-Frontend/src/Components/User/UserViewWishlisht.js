import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";
import { imageUrl } from "../Constants/Image_Url";
import { toast } from "react-toastify";

function UserViewWishlisht() {
  const [movieData, setMovieData] = useState([]);
  const uid = localStorage.getItem("userId");

  useEffect(() => {
    axiosInstance
      .post(`/viewWishlistsByUserId/${uid}`)
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

  const handleRemove = (movieId) => {
    axiosInstance
      .post(`/deleteWishlistById/${movieId}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast.success('Wishlist item removed successfully');
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
    <div className="support_view_movies mt-5 pt-5 mb-5">
      <div className="container">
        {movieData.length > 0 ? (
          <div className="row">
            <div>
              <p className="user_add_complaint_title">
                Dream It, <br />
                Wish It, Get It
              </p>
              <p className="user_add_complaint_sub_title">
                Discover and save all your favorite items in one place, making
                it easier than ever to turn your wishes into reality
              </p>
            </div>
            {movieData.length ? (
              movieData.map((movie) => {
                return (
                  <div className="col-3 mt-2">
                    <div className="support_view_movies_cards">
                      <div className="support_view_movies_cards_img">
                        <img
                          src={`${imageUrl}/${movie.movieId.thumbnail.filename}`}
                          alt="movie_image"
                        />
                      </div>
                      <div className="support_view_movies_cards_title">
                        <p>
                          {movie.movieId.name.length > 20
                            ? `${movie.movieId.name.slice(0, 20)} ...`
                            : movie.movieId.name}
                        </p>
                      </div>
                      <div className="support_view_movies_cards_actions">
                        <div className="support_view_movies_cards_actions_view">
                          <Link
                            to={`/user-view-single-movie/${movie.movieId._id}/${movie.movieId.thumbnail.filename}`}
                          >
                            <p>
                              <i class="ri-eye-line"></i> View
                            </p>
                          </Link>
                        </div>

                        <div className="support_view_movies_cards_actions_approval">
                          <div className="support_view_movies_cards_actions_accept bg-dark mx-2 fs-5">
                            <Link onClick={()=>{handleRemove(movie._id)}} >
                            <i class="ri-delete-bin-6-line"></i>

                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no_data_found">
                <p>No Wishlist Movies</p>
              </div>
            )}
          </div>
        ) : (
          <div className="no_data_found">
            <p>No Wishlist Movies</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserViewWishlisht;
