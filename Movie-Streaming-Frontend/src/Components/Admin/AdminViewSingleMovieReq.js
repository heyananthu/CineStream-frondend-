import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";
import { imageUrl } from "../Constants/Image_Url";
import { toast } from "react-toastify";
import MovieInfo from "../Common/MovieInfo";

function AdminViewSingleMovieReq({ type }) {

  const navigate=useNavigate()

  useEffect(() => {
    if (localStorage.getItem("adminId") == null) {
      navigate("/");
    }
  });

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

  const handleApprove = () => {
    axiosInstance
      .post(`/approveMovieById/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast.success("Movie Approved");
        } else {
          toast.error("Failed to Approve");
        }
      })
      .catch(() => {
        toast.error("Failed to Approve");
      });
  };

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

  const handlePlay = () => {
    setIsPlaying(true);
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
            <Link to={`/admin_play_video/${movieData._id}/movie`}>
            <button className="btn bg_red mx-2">
              Play
            </button>
            </Link>
            <Link to={`/admin_play_video/${movieData._id}/trailer`}>
            <button className="btn bg_icon">
              Trailer
            </button>
            </Link>
            
            {type == "request" ? (
              <>
                <button className="btn bg_icon mx-2" onClick={()=>{handleApprove();navigate('/admin_view_movie_req')}}>
                  <i className="ri-check-line"></i>
                </button>
                <button className="btn bg_icon" onClick={()=>{handleReject();navigate('/admin_view_movie_req')}}>
                  <i className="ri-close-line"></i>
                </button>
              </>
            ) : (
              <button className="btn bg_icon mx-2" onClick={()=>{handleReject();navigate('/admin_view_approved_movies')}}>
                <i class="ri-delete-bin-6-line"></i>
              </button>
            )}
          </div>
        </div>
      </div>
            <MovieInfo userType='admin' type='movie'  />
      
    </div>
  );
}

export default AdminViewSingleMovieReq;
