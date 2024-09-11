import React, { useEffect, useState } from 'react'
import axiosInstance from '../Constants/BaseUrl';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { imageUrl } from '../Constants/Image_Url';
function AdminViewRecentlyPlayed() {

    const navigate=useNavigate()

  useEffect(() => {
    if (localStorage.getItem("adminId") == null) {
      navigate("/");
    }
  });

    const [movieData, setMovieData] = useState([]);
    const {id}=useParams()

  useEffect(() => {
    axiosInstance
      .post(`/viewHistoryByUserId/${id}`)
      .then((res) => {
        console.log(res);
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
  }, []);

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
                        <Link to={`/admin_view_single_approved_movies/${movie._id}/${movie.thumbnail.filename}`} >
                          <p>
                            <i class="ri-eye-line"></i> View
                          </p>
                        </Link>
                      </div>

                     
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no_data_found">
              <p>No History Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminViewRecentlyPlayed
