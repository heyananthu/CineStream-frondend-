import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Assets/Styles/UserSubscription.css";
import axiosInstance from "../Constants/BaseUrl";
import { toast } from "react-toastify";

function UserViewSubscriptionPlans() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userId") == null) {
      navigate("/");
    }
  });

  const [plans, setPlans] = useState([]);
  const uId=localStorage.getItem('userId')


  useEffect(() => {
    axiosInstance
      .post(`/viewAllsubscriptionPlans`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setPlans(res.data.data);
        } else {
          console.log("Failed to fetch cast data");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const choosePlan=(id,price)=>{
    axiosInstance
        .post(`/addSubscription`,{userId:uId,subId:id})
        .then((res) => {
          if (res.data.status === 200) {
            console.log('subscription',res);
            navigate(`/user_subscription_payment/${price}/${res.data.data._id}`)
          } 
          else if(res.data.status==400){
            toast(res.data.message)
          }
          else{
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }

  return (
    <div className="user_view_subscription">
      {plans.length > 0 ? (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className="subscription_head">
                Choose the plan that's right for you
              </p>
              <p className="subscription_para">
                Join CineStream and select from our flexible subscription
                options tailored to suit your viewing preferences. Get ready for
                non-stop entertainment!
              </p>
            </div>
          </div>
          <div className="row mt-5 ">
            {
              plans.map((plan)=>{
                return(
                  <div className="col-3">
              <div className="subscription_cards">
              <p className="subscription_card_title">{plan.title}</p>
              <p className="subscription_para">
                {plan.description}
              </p>
                <p className="subscription_head mt-2 mb-2">
                ₹ {plan.price} <span className="subscription_para fs-6">/{plan.noOfMonth} month</span>
                  {/* <span className="subscription_para fs-6"> - 1 month</span> */}
                </p>
                <div className="user_subscription_actions">
                  {/* <Link to={`/user_subscription_payment/${plan.price}/${plan._id}`}> */}
                    <button className="btn bg_red text-light" onClick={()=>{choosePlan(plan._id,plan.price)}}>
                      Choose Plan
                    </button>
                  {/* </Link> */}
                </div>
              </div>
            </div>
                )
              })
            }
            
           
          </div>
        </div>
      ) : (
        <div className="no_data_found">
          <p>No Plan Added</p>
        </div>
      )}
    </div>
  );
}

export default UserViewSubscriptionPlans;
