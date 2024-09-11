import React, { useEffect, useState } from "react";
import "../../Assets/Styles/UserViewSingleVideo.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";
import { imageUrl } from "../Constants/Image_Url";
import MovieInfo from "../Common/MovieInfo";
import { toast } from "react-toastify";

function UserViewSingleVideo() {
  const navigate = useNavigate();
  const { id, img } = useParams();
  const uid = localStorage.getItem("userId");

  const [movieData, setMovieData] = useState({ name: "", description: "" });
  const [userData, setUserData] = useState({ paymentStatus: false });
  const [wishlistMovies, setWishlistMovies] = useState([]);
  const [wishlistStatus, setWishlistStatus] = useState(false);
  const [likeCounts, setLikeCounts] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (!uid) {
      navigate("/");
    }

    // Fetch movie data by ID
    axiosInstance
      .post(`/getMovieById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setMovieData(res.data.data);
        } else {
          console.log("Failed to fetch movie data");
        }
      })
      .catch(() => {
        console.log("Failed to fetch movie data");
      });

    // Fetch user data by ID
    axiosInstance
      .post(`/viewUserById/${uid}`)
      .then((res) => {
        if (res.data.status === 200) {
          setUserData(res.data.data);
        } else {
          console.log("Failed to fetch user data");
        }
      })
      .catch(() => {
        console.log("Failed to fetch user data");
      });

    // Fetch wishlist data for the user
    axiosInstance
      .post(`/viewWishlistsByUserId/${uid}`)
      .then((res) => {
        if (res.data.status === 200) {
          setWishlistMovies(res.data.data);
          // Check if the current movie is in the wishlist
          const isMovieInWishlist = res.data.data.some(
            (wishlistItem) => wishlistItem.movieId._id === id
          );
          setWishlistStatus(isMovieInWishlist);
        } else {
          console.log("Failed to fetch wishlist data");
        }
      })
      .catch(() => {
        console.log("Failed to fetch wishlist data");
      });

    // Fetch like count and user like status
  }, [id, uid, navigate]);

  useEffect(() => {
    axiosInstance
      .post(`/countLikes/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setLikeCounts(res.data.count);
        } else {
          console.log("Failed to fetch like data");
        }
      })
      .catch(() => {
        console.log("Failed to fetch like data");
      });
  }, [hasLiked]);

  const handleWishlist = () => {
    axiosInstance
      .post(`/addWishlist`, { userId: uid, movieId: id })
      .then((res) => {
        if (res.data.status === 200) {
          toast("Added to Wishlist");
          setWishlistStatus(true); // Update the state after adding to wishlist
        } else if (res.data.status === 409) {
          toast.warning(res.data.message);
        } else {
          toast.error("Failed to add");
        }
      })
      .catch(() => {
        console.log("Failed to add to wishlist");
      });
  };

  const handleLike = () => {
    axiosInstance
      .post(`/addLike`, { userId: uid, movieId: id })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setHasLiked(res.data.data.liked);
        } else if (res.data.status === 409) {
          toast.warning(res.data.message);
        } else {
          toast.error("Failed to add");
        }
      })
      .catch(() => {
        console.log("Failed to add like");
      });
  };

  const handlePlay = () => {
    console.log("uid", uid);
    console.log("mid", id);
    axiosInstance
      .post(`/addHistory`, { userId: uid, movieId: id })
      .then((res) => {
        console.log(res);
      })
      .catch(() => {
        console.log("Failed to add like");
      });
  };

  console.log(hasLiked);

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      console.log('URL copied to clipboard');
      toast('Link copied')
    }).catch(err => {
      console.log('Failed to copy URL: ', err);
    });
  };
  

  return (
    <div>
      <div
        style={{
          backgroundImage: `url('${imageUrl}/${img}')`,
        }}
        className="user_single_video_banner img-fluid mt-5"
      >
        <div className="user_single_video_title">
          <div>
            <h3>{movieData.name}</h3>
            <h6>{movieData.description}</h6>
            {userData.paymentStatus ? (
              <>
                <Link to={`/user_play_movie/${id}/movie`}>
                  <button
                    className="btn bg_red text-light mx-2"
                    onClick={handlePlay}
                  >
                    <i className="ri-play-fill"></i> Play
                  </button>
                </Link>
                <Link to={`/user_play_movie/${id}/trailer`}>
                  <button className="btn bg_icon text-light">Trailer</button>
                </Link>
              </>
            ) : (
              <>
                <Link to={`/user_play_movie/${id}/trailer`}>
                  <button className="btn bg_icon text-light mx-2">
                    Trailer
                  </button>
                </Link>
                <Link to={"/user_view_subscription"}>
                  <button className="btn bg_red text-light">
                    Subscribe Now
                  </button>
                </Link>
              </>
            )}

            {userData.paymentStatus && (
              <>
                <button
                  className="btn bg_icon mx-2 no-outline"
                  onClick={handleWishlist}
                >
                  <i
                    className={`ri-heart-add-fill ${
                      wishlistStatus ? "text-danger" : "text-light"
                    }`}
                  ></i>
                </button>
                <button className="btn bg_icon no-outline" onClick={handleLike}>
                  <i className={`ri-thumb-up-fill`}></i>
                  <small className="mx-1">{likeCounts}</small>
                </button>
                <button className="btn bg_icon no-outline mx-2" onClick={copyToClipboard}>
                  <i class="ri-file-copy-line"></i>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <MovieInfo userType="user" type="movie" />
    </div>
  );
}

export default UserViewSingleVideo;
