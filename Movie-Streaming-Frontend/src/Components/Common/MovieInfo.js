import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";
import { toast } from "react-toastify";
import { imageUrl } from "../Constants/Image_Url";
import img2 from "../../Assets/Images/Comedy.jpg";
import ReactStars from "react-rating-stars-component";

function MovieInfo({ userType, type }) {
  const { id, img } = useParams();
  const [movieData, setMovieData] = useState({ releaseDate: "", rating: 0 });
  const [movieCast, setMovieCast] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  const [allReviews, setAllReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .post(`/viewReviewssByMovie/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setAllReviews(res.data.data.reverse());
        } else {
          console.log("Failed to fetch movie data");
        }
      })
      .catch(() => {
        console.log("Failed to fetch movie data");
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .post(`/getMovieById/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setMovieData(res.data.data);
          // setRating(res.data.data.rating);
          setLoading(false); // Set loading to false after data is fetched
        } else {
          console.log("Failed to fetch movie data");
        }
      })
      .catch(() => {
        console.log("Failed to fetch movie data");
      });

    axiosInstance
      .post(`/getCastBYMovieId/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setMovieCast(res.data.data);
        } else {
          console.log("Failed to fetch movie data");
        }
      })
      .catch(() => {
        console.log("Failed to fetch movie data");
      });
  }, [id]);

  console.log(userType);

  return (
    <div>
      <div className="user_single_video_containers">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-8 user_single_video_container1">
              <p className="user_single_video_container1_title">Description</p>
              <p className="mt-1">{movieData.description}</p>
            </div>
            <div className="col-4 user_single_video_container2">
              <p className="user_single_video_container1_title">
                <i className="ri-calendar-fill pe-1"></i> Release Date
              </p>
              <p className="mt-1">{movieData.releaseDate.slice(0, 10)}</p>
              <p className="user_single_video_container1_title mt-3">
                <i className="ri-global-fill"></i> Language
              </p>
              <p className="mt-1">{movieData.language}</p>
              <p className="user_single_video_container1_title mt-3">
                <i className="ri-hourglass-2-fill"></i> Duration
              </p>
              <p className="mt-1">{movieData.duration} hrs</p>

              <p className="user_single_video_container1_title mt-3">
                <i className="ri-star-half-line"></i> CineStream Rating
              </p>
              <p className="mt-1 d-flex">
                {!loading && (
                  <ReactStars
                    count={5}
                    size={20}
                    value={movieData.rating}
                    edit={false}
                    activeColor="#d62933"
                  />
                )}
              </p>
              <p className="user_single_video_container1_title mt-3">
                <i className="ri-star-half-line"></i> IMDb
              </p>
              {/* <p className="mt-1">{movieData.imdb}</p> */}
              <p>
                {!loading && (
                  <ReactStars
                    count={10}
                    size={20}
                    value={movieData.imdb}
                    edit={false}
                    activeColor="#d62933"
                  />
                )}
              </p>
            </div>
            <div className="col-12 user_single_video_container1 mt-2">
              {movieCast.length ? (
                <p className="user_single_video_container1_title mb-3">Cast</p>
              ) : (
                ""
              )}

              <div className="user_single_video_cast_card_container">
                {movieCast.length ? (
                  movieCast.map((cast) => (
                    <div className="user_single_video_cast_card" key={cast.id}>
                      <img
                        src={`${imageUrl}/${cast.image.filename}`}
                        alt={cast.name}
                      />
                      <p className="mt-1">{cast.name}</p>
                    </div>
                  ))
                ) : (
                  <div className="mt-4">
                    <p className="fs-3">No Cast Available</p>
                  </div>
                )}
              </div>
            </div>
            <div className="col-4 user_single_video_cast_container2">
              <p className="user_single_video_container1_title">
                <i className="ri-clapperboard-fill"></i> Director
              </p>
              <p className="mt-1">{movieData.director}</p>
              <p className="user_single_video_container1_title mt-3">
                <i className="ri-edit-2-fill"></i> Script
              </p>
              <p className="mt-1">{movieData.scriptWriter}</p>
            </div>
            {(userType == "user" && type == "movie") ||
            (userType == "other" && type == "movie") ||(userType == "admin" && type == "movie") ? (
              <div className="col-12 user_single_video_review mt-2">
                <div className="d-flex justify-content-between">
                  <p className="user_single_video_container1_title mb-3">
                    Reviews
                  </p>
                  {userType == "user" ? 
                  (
                    <Link
                      to={`/user_add_review/${id}`}
                      className="text-decoration-none"
                    >
                      <p className="text-danger mb-3">
                        <b>
                          {allReviews.length} reviews{" "}
                          <i className="ri-arrow-right-s-line mt-2"></i>
                        </b>
                      </p>
                    </Link>
                  ) : userType=='admin'?(
                    <Link
                      to={`/admin_view_reviews/${id}`}
                      className="text-decoration-none"
                    >
                      <p className="text-danger mb-3">
                        <b>
                          {allReviews.length} reviews{" "}
                          <i className="ri-arrow-right-s-line mt-2"></i>
                        </b>
                      </p>
                    </Link>
                  ):
                  (
                    <Link
                      to={`/support_view_reviews/${id}`}
                      className="text-decoration-none"
                    >
                      <p className="text-danger mb-3">
                        <b>
                          {allReviews.length} reviews{" "}
                          <i className="ri-arrow-right-s-line mt-2"></i>
                        </b>
                      </p>
                    </Link>
                  )
                
                }
                </div>

                <div className="user_single_video_review_card_container">
                  {allReviews.length ? (
                    allReviews.map((cast) => (
                      <div className="user_single_video_cast_review_card">
                        <div className="d-flex align-items-center">
                          <img
                            src={`${imageUrl}/${cast.userId.img.filename}`}
                            alt=""
                          />
                          <p className="mt-1 mx-3">{cast.userId.name}</p>
                        </div>
                        <div className="mt-4">
                          {userType == "user" ?  
                          (
                            <p>
                              {cast.review.slice(0, 400)}
                              {cast.review.length > 400 ? (
                                <Link
                                  to={`/user_add_review/${id}`}
                                  className="text-decoration-none"
                                >
                                  <span className="text-danger"> ...more</span>
                                </Link>
                              ) : (
                                ""
                              )}
                            </p>
                          ) : userType=='admin'?<p>
                          {cast.review.slice(0, 400)}
                          {cast.review.length > 400 ? (
                            <Link
                              to={`/admin_view_reviews/${id}`}
                              className="text-decoration-none"
                            >
                              <span className="text-danger"> ...more</span>
                            </Link>
                          ) : (
                            ""
                          )}
                        </p>:
                          
                          (
                            <p>
                              {cast.review.slice(0, 400)}
                              {cast.review.length > 400 ? (
                                <Link
                                  to={`/support_view_reviews/${id}`}
                                  className="text-decoration-none"
                                >
                                  <span className="text-danger"> ...more</span>
                                </Link>
                              ) : (
                                ""
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="mt-4">
                      <p className="fs-3">No Reviews Available</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
