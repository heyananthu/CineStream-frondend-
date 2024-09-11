import React, { useState } from "react";
import logo from "../../Assets/Images/Vector.png";
import { useFormik } from "formik";
import { ForgotPasswordSchema } from "../Constants/Schema"; // Ensure this is the correct path
import axiosInstance from "../Constants/BaseUrl"; // Ensure this is the correct path
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ForgotPassword({ activeUser }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (values) => {
    const { confirmPassword, ...dataToSend } = values;
    console.log(dataToSend);

    switch (activeUser) {
      case "user":
        axiosInstance
          .post("/forgotPassword", dataToSend)
          .then((res) => {
            console.log("working", res);
            if (res.data.status === 200) {
              toast.success("Updated Successfully");
              navigate("/user_login");
            } else if (res.data.status === 500) {
              toast.warning(res.data.msg);
            } else {
              toast.error("Updation Failed");
            }
          })
          .catch((err) => {
            toast.error("Updation Failed");
          });
        break;

      // Add other user types if necessary
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: ForgotPasswordSchema,
      onSubmit: onSubmit,
    });

  return (
    <div>
      <div className="landing_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 landing_banner_left_box">
              <img src={logo} alt="logo" />
              <p>
                <span className="logo_red">Cine</span>Stream
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 landing_banner_right_box">
              <div className="user_reg_container">
                <p className="mt-5">Reset Password</p>
                <p className="text-center fs-6 text-uppercase">{activeUser}</p>
                <form onSubmit={(e)=>{handleSubmit(e)}}>
                  <div className="row mt-5">
                    <div className="col-lg-12 col-md-12 col-sm-12 user_reg_input_grp">
                      <input
                        type="email"
                        placeholder="Enter Your Email"
                        className="form-control user_inp"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.email && touched.email && (
                        <span className="text-danger">{errors.email}</span>
                      )}
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 user_reg_input_grp mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter Your Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <i
                      className={`ri-eye${
                        showPassword ? "-off" : ""
                      }-line password-toggle-icon`}
                      onClick={togglePasswordVisibility}
                    ></i>
                    {touched.password && errors.password && (
                      <span className="text-danger">{errors.password}</span>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 user_reg_input_grp mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <i
                      className={`ri-eye${
                        showPassword ? "-off" : ""
                      }-line password-toggle-icon`}
                      onClick={togglePasswordVisibility}
                    ></i>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <span className="text-danger">
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 user_reg_input_grp_btn mt-4">
                      <button type="submit" className="button_bg w-100 mt-3">
                        Reset Password
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
  );
}

export default ForgotPassword;
