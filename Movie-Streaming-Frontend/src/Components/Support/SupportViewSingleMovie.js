import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";
import { imageUrl } from "../Constants/Image_Url";
import MovieInfo from "../Common/MovieInfo";
import { toast } from "react-toastify";

function SupportViewSingleMovie() {
  const navigate = useNavigate();

  const { id, img } = useParams();
  const [movieData, setMovieData] = useState({ releaseDate: "" });
  const [movieCast, setMovieCast] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    axiosInstance
      .post(`/getMovieById/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setMovieData(res.data.data);
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

  const handleReject = () => {
    axiosInstance
      .post(`/deleteMovieById/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast.success("Movie Removed");
        } else {
          toast.error("Failed to Remove");
        }
      })
      .catch(() => {
        toast.error("Failed to Remove");
      });
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url('${imageUrl}/${img}')`,
        }}
        className="user_single_video_banner img-fluid mt-3"
      >
        <div className="user_single_video_title">
          <div>
            <h3>{movieData.name}</h3>
            <h6>{movieData.description}</h6>
            <Link to={`/support_play_movie/${movieData._id}/movie`}>
              <button className="btn bg_red mx-2">Play</button>
            </Link>
            <Link to={`/support_play_movie/${movieData._id}/trailer`}>
              <button className="btn bg_icon">Trailer</button>
            </Link>

            <Link to={`/support_edit_movie/${movieData._id}`}>
              <button className="btn bg_icon mx-2">
                <i class="ri-file-edit-line"></i>
              </button>
            </Link>
            <button
              className="btn bg_icon"
              onClick={() => {
                handleReject();
                navigate("/support_view_movies");
              }}
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
        </div>
      </div>
      <MovieInfo userType='other' type='movie' />
    </div>
  );
}

export default SupportViewSingleMovie;
