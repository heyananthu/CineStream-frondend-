import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import img from "../../Assets/Images/complaintBanner.png";
import { subscriptionSchema } from "../Constants/Schema";
import axiosInstance from "../Constants/BaseUrl";
import { toast } from "react-toastify";

function AdminAddSubscription() {
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      noOfMonth: "",
      description: "",
    },
    validationSchema: subscriptionSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      axiosInstance
        .post(`/addsubscriptionPlan`, values)
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            toast.success("Subscription Added");
            resetForm(); // Reset form fields after successful submission
          } else {
            toast.error("Failed to Add");
          }
        })
        .catch(() => {
          console.log("Failed to fetch cast data");
        });
    },
  });

  return (
    <div>
      <div className="mt-5">
        <div className="container mt-5">
          <div className="row">
            <div className="col-5">
              <div>
                <p className="user_add_complaint_title">
                  Create a New <br />
                  Subscription Plan
                </p>
                <p className="user_add_complaint_sub_title">
                  Define the details of your new subscription plan below. Help
                  users access more content by offering diverse subscription
                  options.
                </p>
              </div>
              <div className="user_add_complaint_box1_img mt-3">
                <img src={img} alt="Subscription Banner" />
              </div>
            </div>
            <div className="col-7">
              <div className="user_add_complaint_form">
                <div className="container">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                      <div className="col-12 user_reg_input_grp">
                        <label>Plan Name</label>
                        <input
                          type="text"
                          name="title"
                          placeholder="Plan Name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.title}
                        />
                        {formik.touched.title && formik.errors.title ? (
                          <div className="error text-danger">
                            {formik.errors.title}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-6 user_reg_input_grp mt-2">
                        <label>Plan Price</label>
                        <input
                          type="number"
                          name="price"
                          placeholder="Plan Price"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.price}
                        />
                        {formik.touched.price && formik.errors.price ? (
                          <div className="error text-danger">
                            {formik.errors.price}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-6 user_reg_input_grp mt-2">
                        <label>No Of Month</label>
                        <input
                          type="number"
                          name="noOfMonth"
                          placeholder="No of Month"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.noOfMonth}
                        />
                        {formik.touched.noOfMonth && formik.errors.noOfMonth ? (
                          <div className="error text-danger">
                            {formik.errors.noOfMonth}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-12 user_reg_input_grp mt-2">
                        <label>Description</label>
                        <textarea
                          name="description"
                          placeholder="Enter Your Description"
                          rows="4"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.description}
                        />
                        {formik.touched.description &&
                        formik.errors.description ? (
                          <div className="error text-danger">
                            {formik.errors.description}
                          </div>
                        ) : null}
                      </div>

                      <div className="d-flex justify-content-end">
                        <button type="submit" className="btn bg_red">
                          Add Plan
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

export default AdminAddSubscription;
