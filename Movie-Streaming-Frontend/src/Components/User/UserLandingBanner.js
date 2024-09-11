import React, { useEffect, useState } from "react";
import axiosInstance from "../Constants/BaseUrl";
import { imageUrl } from "../Constants/Image_Url";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "../../Assets/Styles/UserLandingBanner.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function UserLandingBanner() { 
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userId") === null) {
      navigate("/");
    }
  }, [navigate]);

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/getApprovedMovies`)
      .then((res) => {
        if (res.data.status === 200) {
          const lastMovies = res.data.data.slice(-10);
          setMovies(lastMovies);
        } else {
          console.log("Failed to fetch movie data");
        }
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false, // Hide the slide buttons
  };

  return (
    <div className="userLandingBanner">
      {movies.length > 0 ? (
        <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie._id} className="movieSlide">
              <img
                src={`${imageUrl}/${movie.thumbnail.filename}`}
                alt="movie_image"
              />
              <div className="userLandingBannerContent">
                <h1 className="userLandingBannerTitle">{movie.name}</h1>
                <div className="userLandingBannerButtons">
                  <Link to={`/user-view-single-movie/${movie._id}/${movie.thumbnail.filename}`}>
                    <button className="button">Play</button>
                  </Link>
                  <h1 className="userLandingBannerDescription">
                    {movie.description}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="no_data_found">
          <p>No Movies Found</p>
        </div>
      )}
      <div className="fade_bottom"></div>
    </div>
  );
}

export default UserLandingBanner;
