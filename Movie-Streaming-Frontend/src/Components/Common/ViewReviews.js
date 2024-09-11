import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from '../Constants/BaseUrl';
import { imageUrl } from '../Constants/Image_Url';

function ViewReviews() {

    const { id } = useParams();
  
    const [allReviews, setAllReviews] = useState([]);
  
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

  return (
    <div className="user_review">
        {
            allReviews.length?<div className="user_add_review">
        <div className="text-center">
          <p className="user_add_complaint_title">Share Your Thoughts</p>
          <p className="user_add_complaint_sub_title">
            Your review helps others discover great movies. Tell us what you
            loved (or didn’t) about this film!
          </p>

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
      </div>:<div className="no_data_found">
              <p>No Reviews Found</p>
            </div>
        }
      


    </div>
  )
}

export default ViewReviews
