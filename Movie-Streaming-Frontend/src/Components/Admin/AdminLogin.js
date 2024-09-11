import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { AdminSchema } from "../Constants/Schema";
import logo from "../../Assets/Images/Vector.png";

function AdminLogin() {
  const [isToastVisible, setToastVisible] = useState(false);

  const navigate = useNavigate();

  const onSubmit = (values) => {
    if (values.email === "Admin" && values.password === "admin123") {
      if (!isToastVisible) {
        setToastVisible(true);
        toast.success("Login Successful", {
          onClose: () => setToastVisible(false),
        });
      }
      navigate("/admin_dashboard");
      localStorage.setItem("adminId", 1);
    } else if (values.email === "Admin") {
      if (!isToastVisible) {
        setToastVisible(true);
        toast.warning("Password Mismatch", {
          onClose: () => setToastVisible(false),
        });
      }
    } else {
      if (!isToastVisible) {
        setToastVisible(true);
        toast.warning("Username Not Found", {
          onClose: () => setToastVisible(false),
        });
      }
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: AdminSchema,
    onSubmit: onSubmit,
  });

  return (
    <div className="landing_banner pt-5">
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
              <span className="text-center d-flex justify-content-center text-light mt-1">
                Admin
              </span>
              <div className="row mt-5">
                <div className="col-lg-12 col-md-12 col-sm-12 user_reg_input_grp">
                  <form
                    onSubmit={(e) => {
                      handleSubmit(e);
                    }}
                    onReset={resetForm}
                  >
                    <div className="user_registration_input mt-4">
                      <input
                        type="text"
                        className="form-control border border-dark"
                        placeholder="Enter Username"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.email && touched.email && (
                        <span className="text-danger">{errors.email}</span>
                      )}
                    </div>
                    <div className="user_registration_input mt-4">
                      <input
                        type="password"
                        className="form-control border border-dark"
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.password && touched.password && (
                        <span className="text-danger">{errors.password}</span>
                      )}
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 user_reg_input_grp_btn mt-4">
                      <button>Sign In</button>
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

export default AdminLogin;
