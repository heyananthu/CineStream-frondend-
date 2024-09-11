import React from "react";
import "../../Assets/Styles/SubscriptionBanner.css";
import { Link } from "react-router-dom";

function SubscriptionBanner() {
  return (
    <div>
      <div className="container mb-4">
        <div className="row">
          <div className="col-12">
            <div className="subscription_banner">
              <div>
                <p className="subscription_head">
                  Choose the plan that's right for you
                </p>
                <p className="subscription_para">
                  Join CineStream and select from our flexible subscription
                  options tailored to suit your viewing preferences. Get ready
                  for non-stop entertainment!
                </p>
              </div>
              <div className="user_subscription_actions">
                <Link to={'/user_view_subscription'}>
                <button className="btn bg_red text-light">Choose Plan</button>
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionBanner;
