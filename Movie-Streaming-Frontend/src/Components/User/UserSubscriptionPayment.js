import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { paymentSchema } from "../Constants/Schema";
import img from "../../Assets/Images/complaintBanner.png";
import axiosInstance from "../Constants/BaseUrl";
import { toast } from "react-toastify";

function UserSubscriptionPayment() {
  const navigate = useNavigate();
  const { cost } = useParams();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    if (localStorage.getItem("userId") == null) {
      navigate("/");
    }
  }, [navigate]);


  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11, adding 1 to make it 1-12

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  const formik = useFormik({
    initialValues: {
      cardName: "",
      cardNo: "",
      cvv: "",
      month: "",
      year: "",
    },
    validationSchema: paymentSchema,
    onSubmit: (values) => {
      console.log(values);
      

      axiosInstance
        .post(`/addPayment/${id}`,values)
        .then((res) => {
          if (res.data.status === 200) {
            console.log('subscription',res);
            toast.success('Payment Successfull')
            navigate('/user_home')
          } else {
            console.log("Failed to fetch cast data");
          }
        })
        .catch(() => {
          console.log("Failed to fetch cast data");
        });
    },
  });

  return (
    <div>
      <div className="user_add_complaint">
        <div className="container">
          <div className="row">
            <div className="col-5">
              <div>
                <p className="user_add_complaint_title">
                  Confirm Your Subscription ₹ {cost}
                </p>
                <p className="user_add_complaint_sub_title">
                  Review your chosen plan and complete your payment to start
                  enjoying an extensive library of movies and shows.
                </p>
              </div>
              <div className="user_add_complaint_box1_img mt-3">
                <img src={img} alt="Complaint Banner" />
              </div>
            </div>
            <div className="col-7">
              <div className="user_add_complaint_form">
                <div className="container">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                      <div className="col-12 user_reg_input_grp mt-3">
                        <label>Account Holder Name</label>
                        <input
                          type="text"
                          name="cardName"
                          placeholder="Enter Your Name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.cardName}
                        />
                        {formik.touched.cardName && formik.errors.cardName ? (
                          <div className="text-danger">
                            {formik.errors.cardName}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-6 user_reg_input_grp mt-4">
                        <label>Account Number</label>
                        <input
                          type="number"
                          name="cardNo"
                          placeholder="Enter Your Card Number"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.cardNo}
                        />
                        {formik.touched.cardNo && formik.errors.cardNo ? (
                          <div className="text-danger">
                            {formik.errors.cardNo}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-6 user_reg_input_grp mt-4">
                        <label>CVV Number</label>
                        <input
                          type="number"
                          name="cvv"
                          placeholder="Enter Your CVV"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.cvv}
                        />
                        {formik.touched.cvv && formik.errors.cvv ? (
                          <div className="text-danger">{formik.errors.cvv}</div>
                        ) : null}
                      </div>
                      <div className="col-6 user_reg_input_grp mt-4">
                        <label>Expiry Month</label>
                        <select
                          name="month"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.month}
                        >
                          <option value="" label="Select month" />
                          {months
                            .filter(
                              (month) =>
                                formik.values.year !== currentYear.toString() ||
                                month.value >= currentMonth
                            )
                            .map((month) => (
                              <option key={month.value} value={month.label}>
                                {month.label}
                              </option>
                            ))}
                        </select>
                        {formik.touched.month && formik.errors.month ? (
                          <div className="text-danger">
                            {formik.errors.month}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-6 user_reg_input_grp mt-4">
                        <label>Expiry Year</label>
                        <select
                          name="year"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.year}
                        >
                          <option value="" label="Select year" />
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                        {formik.touched.year && formik.errors.year ? (
                          <div className="text-danger">
                            {formik.errors.year}
                          </div>
                        ) : null}
                      </div>
                      <div className="d-flex justify-content-end mt-4">
                        <button type="submit" className="btn bg_red">
                          Pay Now
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSubscriptionPayment;
