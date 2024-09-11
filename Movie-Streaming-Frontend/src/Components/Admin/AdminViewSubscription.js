import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../Constants/BaseUrl';
import { toast } from 'react-toastify';

function AdminViewSubscription() {

  const [plans, setPlans] = useState([]);

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
      .catch(() => {
        console.log("Failed to fetch cast data");
      });
  }, []);

  const handleRemove = (id) => {
    axiosInstance
      .post(`/deletesubscriptionPlanById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          toast.success('Removed')
          setPlans(prevData => prevData.filter(item => item._id !== id));
        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });
  };

  return (
    <div className="user_view_subscription">
      <div className="container">
        <div className="row">
          {/* <div className="col-12">
            <p className="subscription_head">
              Choose the plan that's right for you
            </p>
            <p className="subscription_para">
              Join CineStream and select from our flexible subscription options
              tailored to suit your viewing preferences. Get ready for non-stop
              entertainment!
            </p>
          </div> */}
        </div>
        <div className="row">
          {
            plans.length?plans.map((plan)=>{
              return(
                <div className="col-3">
            <div className="subscription_cards">
              <p className="subscription_card_title">{plan.title}</p>
              <p className="subscription_para">
                {plan.description}
              </p>
              <p className="subscription_head mt-2 mb-2">
                ₹ {plan.price} <span className="subscription_para fs-6">/{plan.noOfMonth} month</span>
              </p>
              <div className="d-flex">
                <Link to={`/admin_edit_subscription_plan/${plan._id}`}>
                <button className="btn bg_red text-light">Edit</button>
                </Link>
                <button type='button' className="btn bg_red text-light mx-1" onClick={()=>{handleRemove(plan._id)}} >Delete</button>

              </div>
            </div>
          </div>
              )
            }):<div className="no_data_found">
            <p>No Plan Added</p>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default AdminViewSubscription
