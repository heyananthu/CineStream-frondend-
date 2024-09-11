import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";
import { toast } from "react-toastify";
function UserViewMyPlans() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userId") == null) {
      navigate("/");
    }
  });

  const [plan, setPlans] = useState({subId:{}});
  const uId = localStorage.getItem("userId");

  useEffect(() => {
    axiosInstance
      .post(`/viewSubscriptionsByUserId/${uId}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setPlans(res.data.data);
        } else {
          setPlans(null)
          console.log("Failed to fetch cast data");
        }
      })
      .catch(() => {
        console.log("Failed to fetch cast data");
      });
  }, []);

  console.log(plan);

  const handleDelete = (movieId) => {
    axiosInstance
      .post(`/deleteSubscriptionById/${movieId}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast.success('Subscription Cancelled');
          setPlans((prevData) =>
            prevData.filter((movie) => movie._id !== movieId)
          );
        } else {
          toast.error("Failed to Removed");
        }
      })
      .catch(() => {
        toast.error("Failed to Removed");
      });
  };

  return (
    <div className="user_view_subscription">
      {
        plan!=null?<div className="container">
          <div className="row">
            <div className="col-12">
              <p className="subscription_head">
                Explore Your Subscribed Plans{" "}
              </p>
              <p className="subscription_para">
                Discover and manage your active subscription plans, ensuring you
                never miss a moment of CineStream's premium content.
              </p>
            </div>
          </div>
          <div className="row mt-5 ">
            {/* {plans.map((plan) => { */}
                <div className="col-3">
                  <div className="subscription_cards">
                    <p className="subscription_card_title">
                      {plan.subId?.title}
                    </p>
                    <p className="subscription_para">
                      {plan.subId?.description}
                    </p>
                    <p className="subscription_head mt-2 mb-2">
                      ₹ {plan.subId.price}{" "}
                      <span className="subscription_para fs-6">
                        /{plan.subId?.noOfMonth} month
                      </span>
                      <p className="subscription_para fs-6 text-danger"> Expires in {plan?.remainingDays} days</p>
                    </p>
                    <div className="user_subscription_actions">
                      {/* <button className="btn bg_red text-light" onClick={()=>{handleDelete(plan._id)}}>
                      Delete
                    </button> */}
                    </div>
                  </div>
                </div>
              {/* );
            })} */}
          </div>
        </div>:<div className="no_data_found">
            <p>No Subscription Plans</p>
          </div>
      }
        
    
    </div>
  );
}

export default UserViewMyPlans;
