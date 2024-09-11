import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";
import { imageUrl } from "../Constants/Image_Url";

function MovieByGenre() {
  const [movieData, setMovieData] = useState([]);
  const { genre } = useParams();

  useEffect(() => {
    axiosInstance
      .post(`/getMoviesByGenre/${genre}`)
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
  }, [genre]);

  return (
    <div className="support_view_movies mt-5 pt-5 mb-5 pb-5">
      <div className="container">
        <div className="row">
          {movieData.length ? (
            movieData.map((movie) => (
              <div className="col-3" key={movie._id}>
                <Link
                  to={`/user-view-single-movie/${movie._id}/${movie.thumbnail.filename}`}
                >
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
                          to={`/user-view-single-movie/${movie._id}/${movie.thumbnail.filename}`}
                        >
                          <p>
                            <i className="ri-eye-line"></i> View
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="no_data_found">
              <p>No Movies Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieByGenre;
