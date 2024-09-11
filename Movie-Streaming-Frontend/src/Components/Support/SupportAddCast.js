import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import img from "../../Assets/Images/complaintBanner.png";
import { AddCastSchema } from "../Constants/Schema"; 
import axiosMultipartInstance from "../Constants/FormDataUrl";
import axiosInstance from "../Constants/BaseUrl";


function SupportAddCast() {
  const navigate=useNavigate()

  useEffect(() => {
    if (localStorage.getItem("supportId") == null) {
      navigate("/");
    }
  });
  const { id } = useParams();
  const [isToastVisible, setToastVisible] = useState(false);
  const [movieData, setMovieData] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    axiosInstance.post(`/getMovieById/${id}`) 
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setMovieData(res.data.data);
        } else {
          toast.error("Failed to fetch cast data");
        }
      })
      .catch(() => {
        toast.error("Failed to fetch cast data");
      });
  }, [id]);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      name: "",
      image: null,
    },
    validationSchema: AddCastSchema,
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      console.log(formData);
      axiosMultipartInstance
        .post(`/addCast/${id}`, formData) 
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            if (!isToastVisible) {
              setToastVisible(true);
              toast.success("Cast Added Successfully", {
                onClose: () => setToastVisible(false),
              });
            }
            resetForm(); 
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
            // navigate("/casts"); // Adjust the navigation path as needed
          } else {
            if (!isToastVisible) {
              setToastVisible(true);
              toast.error("Failed to Add Cast", {
                onClose: () => setToastVisible(false),
              });
            }
          }
        })
        .catch(() => {
          if (!isToastVisible) {
            setToastVisible(true);
            toast.error("Failed to Add Cast", {
              onClose: () => setToastVisible(false),
            });
          }
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
                  Contribute to Our Library: <br />
                  Add Cast for <span className="text-uppercase">{movieData.name}</span>
                </p>
                <p className="user_add_complaint_sub_title">
                  Help us expand our collection by adding favorite movies below.
                </p>
              </div>
              <div className="user_add_complaint_box1_img mt-3">
                <img src={img} alt="Complaint Banner" />
              </div>
            </div>
            <div className="col-7">
              <div className="user_add_complaint_form">
                <div className="container">
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="row">
                      <div className="col-12 user_reg_input_grp mt-5">
                        <input
                          type="text"
                          name="name"
                          placeholder="Actor Name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            touched.name && errors.name ? "input-error" : ""
                          }
                        />
                        {touched.name && errors.name && (
                          <span className="text-danger">{errors.name}</span>
                        )}
                      </div>

                      <div className="col-12 user_reg_input_grp mt-3">
                        <label>Image</label>
                        <input
                          type="file"
                          name="image"
                          ref={fileInputRef}
                          onChange={(event) =>
                            setFieldValue("image", event.currentTarget.files[0])
                          }
                          onBlur={handleBlur}
                          className={
                            touched.image && errors.image ? "input-error" : ""
                          }
                        />
                        {touched.image && errors.image && (
                          <span className="text-danger">{errors.image}</span>
                        )}
                      </div>

                      <div className="d-flex justify-content-end mt-4">
                        <button type="submit" className="btn bg_red">
                          Add Cast
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

export default SupportAddCast;
