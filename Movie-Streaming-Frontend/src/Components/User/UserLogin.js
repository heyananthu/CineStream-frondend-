import React, { useEffect, useState } from "react";
import logo from "../../Assets/Images/Vector.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { LoginSchema } from "../Constants/Schema";
import { toast } from "react-toastify";
import axiosInstance from "../Constants/BaseUrl";
// import "remixicon/fonts/remixicon.css"; // Import RemixIcon CSS

function UserLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  

  const onSubmit = (values) => {
    console.log(values);
    axiosInstance.post('/loginUser', values)
      .then((res) => {
        console.log('working', res);
        if (res.data.status === 200) {
          localStorage.setItem('userId', res.data.data._id);
          if (res.data.data.profileStatus === false) {
            navigate('/user_prefer_languages');
          } else {
            navigate(`/user_home`);
            toast.success("Login Successful");
          }
        } else if (res.data.status === 405) {
          toast.warning(res.data.msg);
        } else {
          toast.error('Login Failed');
        }
      })
      .catch((err) => {
        toast.error('Login Failed');
      });
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: onSubmit
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
                <p className="mt-5">Sign In</p>
                <form onSubmit={(e) => { handleSubmit(e) }}>
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

                    <div className="col-lg-12 col-md-12 col-sm-12 user_reg_input_grp mt-3 position-relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Your Password"
                        className="form-control user_inp"
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <i
                        className={`ri-eye${showPassword ? "-off" : ""}-line password-toggle-icon`}
                        onClick={togglePasswordVisibility}
                      ></i>
                      {errors.password && touched.password && (
                        <span className="text-danger">{errors.password}</span>
                      )}
                    </div>
                    <div className="d-flex justify-content-end mt-2">
                      <h6>
                        <Link to="/user_forgot_password">Forgot Password</Link>
                      </h6>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 user_reg_input_grp_btn ">
                      <button type="submit" className="button_bg w-100 mt-2">Sign In</button>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
                      <h6>
                        New to Cinestream?{" "}
                        <Link to="/user_registration">Sign Up Now</Link>
                      </h6>
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

export default UserLogin;
