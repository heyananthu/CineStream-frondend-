import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import "../../Assets/Styles/UserRegistration.css";
import logo from "../../Assets/Images/Vector.png";
import { UserRegistrationSchema } from "../Constants/Schema";
import { toast } from "react-toastify";
import axiosMultipartInstance from "../Constants/FormDataUrl";

function UserRegistration() {
  const navigate = useNavigate();
  const [isToastVisible, setToastVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      dob: "",
      gender: "",
      contact: "",
      state: "",
      nationality: "",
      pincode: "",
      img: null,
      password: "",
      confirmPassword: "",
    },
    validationSchema: UserRegistrationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      axiosMultipartInstance
        .post("/registerUser", formData)
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            if (!isToastVisible) {
              setToastVisible(true);
              toast.success("Registration Successful", {
                onClose: () => setToastVisible(false),
              });
            }
            navigate("/user_login");
          } else if (res.data.status === 409) {
            if (!isToastVisible) {
              setToastVisible(true);
              toast.warning(res.data.msg, {
                onClose: () => setToastVisible(false),
              });
            }
          } else {
            if (!isToastVisible) {
              setToastVisible(true);
              toast.error("Registration Failed", {
                onClose: () => setToastVisible(false),
              });
            }
          }
        })
        .catch(() => {
          if (!isToastVisible) {
            setToastVisible(true);
            toast.error("Registration Failed", {
              onClose: () => setToastVisible(false),
            });
          }
        });
    },
  });

  return (
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
              <p>Sign Up</p>
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="row mt-5">
                  <div className="col-lg-6 col-md-6 col-sm-12 user_reg_input_grp">
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Your Name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.name && errors.name && (
                      <span className="text-danger">{errors.name}</span>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 user_reg_input_grp">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Your Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.email && errors.email && (
                      <span className="text-danger">{errors.email}</span>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 user_reg_input_grp">
                    <label>DOB</label>
                    <input
                      type="date"
                      name="dob"
                      value={values.dob}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.dob && errors.dob && (
                      <span className="text-danger">{errors.dob}</span>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <label>Gender</label>
                    <div className="d-flex justify-content-around">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <label>Male</label>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <label>Female</label>
                    </div>
                    {touched.gender && errors.gender && (
                      <span className="text-danger">{errors.gender}</span>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 user_reg_input_grp mt-1">
                    <input
                      type="number"
                      name="contact"
                      placeholder="Enter Your Phone Number"
                      value={values.contact}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="no-arrows"
                    />
                    {touched.contact && errors.contact && (
                      <span className="text-danger">{errors.contact}</span>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 user_reg_input_grp mt-1">
                    <input
                      type="text"
                      name="state"
                      placeholder="Enter Your State"
                      value={values.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.state && errors.state && (
                      <span className="text-danger">{errors.state}</span>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 user_reg_input_grp mt-1">
                    <input
                      type="text"
                      name="nationality"
                      placeholder="Enter Your Nationality"
                      value={values.nationality}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.nationality && errors.nationality && (
                      <span className="text-danger">{errors.nationality}</span>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 user_reg_input_grp mt-1">
                    <input
                      type="number"
                      name="pincode"
                      placeholder="Enter Your Pincode"
                      value={values.pincode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="no-arrows"
                    />
                    {touched.pincode && errors.pincode && (
                      <span className="text-danger">{errors.pincode}</span>
                    )}
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 user_reg_input_grp mt-1">
                    <label>Upload Image</label>
                    <input
                      type="file"
                      name="img"
                      onChange={(event) => {
                        setFieldValue("img", event.target.files[0]);
                      }}
                    />
                    {touched.img && errors.img && (
                      <span className="text-danger">{errors.img}</span>
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
                  <div className="col-lg-12 col-md-12 col-sm-12 user_reg_input_grp_btn mt-3">
                    <button type="submit">Sign Up</button>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 mt-2">
                    <h6>
                      Already have an Account?{" "}
                      <Link to="/user_login">Sign In</Link>
                    </h6>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRegistration;
