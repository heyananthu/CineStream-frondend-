import React, { useEffect, useState } from "react";
import "../../Assets/Styles/UserAddReview.css";
import img2 from "../../Assets/Images/Comedy.jpg";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axiosInstance from "../Constants/BaseUrl";
import { toast } from "react-toastify";
import { imageUrl } from "../Constants/Image_Url";
import ReactStars from "react-rating-stars-component";

function UserAddReview() { 
  const { id } = useParams();
  const uid = localStorage.getItem("userId");

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [allReviews, setAllReviews] = useState([]);

  const handleShowReviewModal = () => setShowReviewModal(true);
  const handleCloseReviewModal = () => setShowReviewModal(false);
  const handleShowRatingModal = () => setShowRatingModal(true);
  const handleCloseRatingModal = () => setShowRatingModal(false);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/createReviews`, { movieId: id, userId: uid, review: review })
      .then((res) => {
        if (res.data.status === 200) {
          toast("Review Added");
          setShowReviewModal(false);
        } else {
          console.log("Failed to fetch movie data:", res.data.message);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch movie data:", error);
      });
  };

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/addRating/${id}`, { rating: rating })
      .then((res) => {
        if (res.data.status === 200) {
          toast("Rating Added");
          setShowRatingModal(false);
        } else {
          console.log("Failed to fetch movie data:", res.data.message);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch movie data:", error);
      });
  };

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
  }, [showReviewModal, showRatingModal]);

  return (
    <div className="user_review">
      <div className="user_add_review">
        <div className="text-center">
          <p className="user_add_complaint_title">Share Your Thoughts</p>
          <p className="user_add_complaint_sub_title">
            Your review helps others discover great movies. Tell us what you
            loved (or didn’t) about this film!
          </p>
          <button
            className="btn bg_red mt-3 text-light"
            onClick={handleShowReviewModal}
          >
            Add Review
          </button>
          <button
            className="btn bg_red mt-3 text-light mx-2"
            onClick={handleShowRatingModal}
          >
            Add Rating
          </button>
        </div>
        {allReviews.length ? (
          <div className="user_add_review_head">
            <p>Most Recent Reviews</p>
          </div>
        ) : (
          ""
        )}

        {allReviews.length
          ? allReviews.map((a) => {
              return (
                <div className="user_add_review_container" key={a._id}>
                  <div className="user_add_review_card mt-2">
                    <div className="d-flex align-items-center">
                      <img
                        src={`${imageUrl}/${a.userId.img.filename}`}
                        alt=""
                      />
                      <h4 className="mt-1 mx-3 text-light">
                        <b>{a.userId.name}</b>
                      </h4>
                    </div>
                    <div>
                      <p className="user_add_complaint_sub_title mt-3 text-justify">
                        {a.review}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          : ""}
      </div>

      {/* Bootstrap Modal for Add Review */}
      <div
        className={`modal fade ${showReviewModal ? "show" : ""}`}
        tabIndex="-1"
        style={{ display: showReviewModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark text-light">
            <div className="modal-header border-0">
              <h5 className="modal-title">
                <b>Add Review</b>
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseReviewModal}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-3">
                  <label htmlFor="reviewInput" className="form-label">
                    Share Here...
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id=""
                    onChange={(e) => {
                      setReview(e.target.value);
                    }}
                    required
                  />
                </div>
                <button type="submit" className="btn bg_red">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showReviewModal && <div className="modal-backdrop fade show"></div>}

      {/* Bootstrap Modal for Add Rating */}
      <div
        className={`modal fade ${showRatingModal ? "show" : ""}`}
        tabIndex="-1"
        style={{ display: showRatingModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark text-light">
            <div className="modal-header border-0">
              <h5 className="modal-title">
                <b>Add Rating</b>
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseRatingModal}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleRatingSubmit}>
                <div className="mb-3">
                  <label htmlFor="ratingInput" className="form-label">
                    Rate the Movie (0-5)
                  </label>
                  <div className="d-flex mt-2">
                    <ReactStars
                      count={5}
                      size={50}
                      onChange={(newRating) => {
                        setRating(newRating);
                      }}
                      activeColor="#ffd700"
                    />
                  </div>
                </div>
                <button type="submit" className="btn bg_red">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showRatingModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default UserAddReview;
