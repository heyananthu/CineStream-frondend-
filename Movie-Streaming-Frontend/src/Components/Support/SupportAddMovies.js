import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import img from "../../Assets/Images/complaintBanner.png";
import { AddMovieSchema } from "../Constants/Schema";
import axiosMultipartInstance from "../Constants/FormDataUrl";
import Lottie from "lottie-react";
import loading from "../../Assets/Json/loading.json";

// Define the allowed video types
const SUPPORTED_VIDEO_FORMATS = ["video/mp4", "video/x-matroska", "video/avi"];

function SupportAddMovies() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("supportId") == null) {
      navigate("/");
    }
  }, [navigate]);

  const [isToastVisible, setToastVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    { name: "English" },
    { name: "Malayalam" },
    { name: "Tamil" },
    { name: "Hindi" },
    { name: "Telugu" },
    { name: "Kannada" },
  ];

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
      genre: "",
      director: "",
      scriptWriter: "",
      duration: "",
      releaseDate: "",
      description: "",
      language: "",
      thumbnail: null,
      video: null,
      adults: "",
      trailer: null,
      imdb: "",
    },
    validationSchema: AddMovieSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      axiosMultipartInstance
        .post("/createMovie", formData)
        .then((res) => {
          setIsLoading(false);
          if (res.data.status === 200) {
            if (!isToastVisible) {
              setToastVisible(true);
              toast.success("Movie Added Successfully", {
                onClose: () => setToastVisible(false),
              });
            }
            navigate(`/support_add_cast/${res.data.data._id}`);
          } else {
            if (!isToastVisible) {
              setToastVisible(true);
              toast.error("Failed to Add Movie", {
                onClose: () => setToastVisible(false),
              });
            }
          }
        })
        .catch(() => {
          setIsLoading(false);
          if (!isToastVisible) {
            setToastVisible(true);
            toast.error("Failed to Add Movie", {
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
                  Add a Movie
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
                  {isLoading ? (
                    <div className="no_data_animation">
                      <Lottie
                        animationData={loading}
                        className="no_data_animation"
                      />
                    </div>
                  ) : (
                    <form onSubmit={(e) => handleSubmit(e)}>
                      <div className="row">
                        <div className="col-6 user_reg_input_grp">
                          <input
                            type="text"
                            name="name"
                            placeholder="Movie Name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.name && errors.name && (
                            <span className="text-danger">{errors.name}</span>
                          )}
                        </div>
                        <div className="col-6 user_reg_input_grp">
                          <select
                            name="genre"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.genre}
                          >
                            <option value="">Genre</option>
                            <option value="Action">Action Movies</option>
                            <option value="Drama">Drama Movies</option>
                            <option value="Comedy">Comedy Movies</option>
                            <option value="Horror">Horror Movies</option>
                            <option value="Romantic">Romantic Movies</option>
                            <option value="Documentary">Documentaries</option>
                          </select>
                          {touched.genre && errors.genre && (
                            <span className="text-danger">{errors.genre}</span>
                          )}
                        </div>
                        <div className="col-6 user_reg_input_grp mt-2">
                          <input
                            type="text"
                            name="director"
                            placeholder="Director Name"
                            value={values.director}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.director && errors.director && (
                            <span className="text-danger">
                              {errors.director}
                            </span>
                          )}
                        </div>
                        <div className="col-6 user_reg_input_grp mt-2">
                          <input
                            type="text"
                            name="scriptWriter"
                            placeholder="Script Writer Name"
                            value={values.scriptWriter}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.scriptWriter && errors.scriptWriter && (
                            <span className="text-danger">
                              {errors.scriptWriter}
                            </span>
                          )}
                        </div>
                        <div className="col-6 user_reg_input_grp mt-2">
                          <select
                            name="language"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.language}
                          >
                            <option value="">Language</option>
                            {languages.map((e) => {
                              return <option key={e.name} value={e.name}>{e.name}</option>;
                            })}
                          </select>
                          {touched.language && errors.language && (
                            <span className="text-danger">
                              {errors.language}
                            </span>
                          )}
                        </div>
                        <div className="col-6 user_reg_input_grp mt-2">
                          <select
                            name="adults"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.adults}
                          >
                            <option value="">Adult</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </select>
                          {touched.adults && errors.adults && (
                            <span className="text-danger">{errors.adults}</span>
                          )}
                        </div>
                        <div className="col-6 user_reg_input_grp mt-2">
                          <label>Movie Thumbnail</label>
                          <input
                            type="file"
                            name="thumbnail"
                            onChange={(event) => {
                              setFieldValue(
                                "thumbnail",
                                event.currentTarget.files[0]
                              );
                            }}
                            onBlur={handleBlur}
                          />
                          {touched.thumbnail && errors.thumbnail && (
                            <span className="text-danger">
                              {errors.thumbnail}
                            </span>
                          )}
                        </div>
                        <div className="col-6 user_reg_input_grp mt-2">
                          <label>Release Date</label>
                          <input
                            type="date"
                            name="releaseDate"
                            value={values.releaseDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.releaseDate && errors.releaseDate && (
                            <span className="text-danger">
                              {errors.releaseDate}
                            </span>
                          )}
                        </div>
                        <div className="col-6 user_reg_input_grp mt-2">
                          <label>Duration</label>
                          <input
                            type="text"
                            name="duration"
                            placeholder="Duration (HH:MM)"
                            value={values.duration}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.duration && errors.duration && (
                            <span className="text-danger">
                              {errors.duration}
                            </span>
                          )}
                        </div>
                        <div className="col-6 user_reg_input_grp mt-2">
                          <label>Add Video</label>
                          <input
                            type="file"
                            name="video"
                            onChange={(event) => {
                              setFieldValue(
                                "video",
                                event.currentTarget.files[0]
                              );
                            }}
                            onBlur={handleBlur}
                          />
                          {touched.video && errors.video && (
                            <span className="text-danger">{errors.video}</span>
                          )}
                        </div>
                        <div className="col-6 user_reg_input_grp mt-2">
                          <label>Add Trailer</label>
                          <input
                            type="file"
                            name="trailer"
                            onChange={(event) => {
                              setFieldValue(
                                "trailer",
                                event.currentTarget.files[0]
                              );
                            }}
                            onBlur={handleBlur}
                          />
                          {touched.trailer && errors.trailer && (
                            <span className="text-danger">{errors.trailer}</span>
                          )}
                        </div>
                        <div className="col-6 user_reg_input_grp mt-2">
                          <label>IMDb Link</label>
                          <input
                            type="text"
                            name="imdb"
                            placeholder="IMDb Link"
                            value={values.imdb}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.imdb && errors.imdb && (
                            <span className="text-danger">{errors.imdb}</span>
                          )}
                        </div>
                        <div className="col-12 user_reg_input_grp mt-2">
                          <textarea
                            name="description"
                            placeholder="Description"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.description && errors.description && (
                            <span className="text-danger">
                              {errors.description}
                            </span>
                          )}
                        </div>
                        <div className="d-flex justify-content-end">
                          <button type="submit" className="btn bg_red">
                            Add Movie
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportAddMovies;
