import React, { useEffect, useState } from "react";
import "../../Assets/Styles/UserVideoCards.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";
import { imageUrl } from "../Constants/Image_Url";

function UserVideoCards({ title, isSmall }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userId") == null) {
      navigate("/");
    }
  });

  const id = localStorage.getItem("userId");

  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    if (title == "Recently Played") {
      axiosInstance
        .post(`/viewHistoryByUserId/${id}`)
        .then((res) => {
          if (res.data.status === 200) {
            const movieIds = res.data.data.map((movie) => movie.movieId);
            setMovieData(movieIds);
          } else {
            console.log("Failed to fetch cast data");
          }
        })
        .catch(() => {
          console.log("Failed to fetch cast data");
        });
    } else if (title == "For You") {
      axiosInstance
        .post(`/getSuggestedMovies/${id}`)
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            setMovieData(res.data.data);
          } else {
            console.log("Failed to fetch cast data");
          }
        })
        .catch((err) => {
          console.log(err,"Failed to fetch cast data");
        });
    } else if (title == "Top 10") {
      axiosInstance
        .post(`/getTopRatedMovies`)
        .then((res) => {
          if (res.data.status === 200) {
            setMovieData(res.data.data);
          } else {
            console.log("Failed to fetch cast data");
          }
        })
        .catch(() => {
          console.log("Failed to fetch cast data");
        });
    }else if(title=='New Releases'){
      axiosInstance
      .post(`/getRecentlyAddedMovies`)
      .then((res) => {
        if (res.data.status === 200) {
          setMovieData(res.data.data);
        } else {
          console.log("Failed to fetch cast data");
        }
      })
      .catch(() => {
        console.log("Failed to fetch cast data");
      });
    }else{

    axiosInstance
      .post(`/getMoviesByGenre/${title}`)
      .then((res) => {
        console.log(res);
        
        if (res.data.status === 200) {
          setMovieData(res.data.data.reverse());
        } else {
          console.log("Failed to fetch cast data");
        }
      })
      .catch(() => {
        console.log("Failed to fetch cast data");
      });
    }
  }, []);

  return (
    <div className="container">
      <div className="userVideoCards mt-3">
        {movieData.length ? (
          <>
            <h4>{title}</h4>
            <div className="videoPosters">
              {movieData.map((obj) =>
                obj.adminApproved == true ? (
                  <Link
                    to={`/user-view-single-movie/${obj._id}/${obj.thumbnail.filename}`}
                    className="text-decoration-none"
                  >
                    <div className={isSmall ? "smallPoster" : "bigPoster"}>
                      <img
                        className={isSmall ? "videoSmallPoster" : "poster"}
                        // className="videoSmallPoster"
                        src={`${imageUrl}/${obj.thumbnail.filename}`}
                        alt=""
                      />
                      <h6 className="mt-2">{obj.name}</h6>
                    </div>
                  </Link>
                ) : (
                  ""
                )
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default UserVideoCards;
