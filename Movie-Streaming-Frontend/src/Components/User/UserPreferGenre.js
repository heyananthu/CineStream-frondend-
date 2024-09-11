import React, { useState, useRef, useEffect } from "react";
import "../../Assets/Styles/UserPreferLanguages.css";
import action from "../../Assets/Images/Action.jpg";
import drama from "../../Assets/Images/Drama.jpg";
import comedy from "../../Assets/Images/Comedy.jpg";
import horror from "../../Assets/Images/Horror.jpg";
import romantic from "../../Assets/Images/Romantic.jpg";
import doc from "../../Assets/Images/Documentary.jpg";
import { toast } from "react-toastify";
import axiosInstance from "../Constants/BaseUrl";
import { useNavigate } from "react-router-dom";

function UserPreferGenre() {

  const navigate = useNavigate(); 

  useEffect(() => {
    if (localStorage.getItem("userId") == null) {
      navigate("/");
    }
  });


  const [preferredGenre, setPreferredGenre] = useState([]);

  const id=localStorage.getItem('userId')
  console.log(id);
  const checkboxRefs = useRef([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setPreferredGenre((prev) => [...prev, value]);
    } else {
      setPreferredGenre((prev) =>
        prev.filter((language) => language !== value)
      );
    }
  };

  const handleCardClick = (index) => {
    const checkbox = checkboxRefs.current[index];
    if (checkbox) {
      checkbox.click();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (preferredGenre.length === 0) {
        
      toast.warning("Please select at least one genre.");
      return;
    }
    console.log(preferredGenre);
    axiosInstance.post(`/addUserPreferences/${id}`, {preferredGenre:preferredGenre})
      .then((res) => {
        console.log('working', res);
        if (res.data.status === 200) {
            toast.success('Profile Updated')
            navigate(`/user_home`);
        } else {
          toast.error('Something Went Wrong');
        }
      })
      .catch((err) => {
        toast.error('Something Went Wrong');
      });
  };

  const languages = [
    { name: "Action Movies", img: action },
    { name: "Drama Movies", img: drama },
    { name: "Comedy Movies", img: comedy },
    { name: "Horror Movies", img: horror },
    { name: "Romantic Movies", img: romantic },
    { name: "Documentaries Movies", img: doc },
  ];

  useEffect(() => {
    // Initialize the ref array
    checkboxRefs.current = checkboxRefs.current.slice(0, languages.length);
  }, [languages.length]);

  return (
    <div>
      <div className="user_prefer_languages">
        <div className="user_prefer_languages_containers">
          <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between">
              <p className="user_prefer_languages_title">Select Genres</p>
              <button type="submit" className="red_btn">
                Submit
              </button>
            </div>
            <div className="user_prefer_languages_container1">
              {languages.slice(0, 3).map((language, index) => (
                <div
                  className="user_prefer_languages_card"
                  key={language.name}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="image_wrapper">
                    <img src={language.img} alt={language.name} />
                    <div className="form-check form-check-inline mt-2 card_form">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`checkbox-${index}`}
                        name="preferredGenre"
                        value={language.name}
                        onChange={handleCheckboxChange}
                        ref={(el) => (checkboxRefs.current[index] = el)}
                      />
                      <label
                        className="form-check-label mx-2"
                        htmlFor={`checkbox-${index}`}
                      >
                        {language.name}
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="user_prefer_languages_container1 mt-3">
              {languages.slice(3).map((language, index) => (
                <div
                  className="user_prefer_languages_card"
                  key={language.name}
                  onClick={() => handleCardClick(index + 3)}
                >
                  <div className="image_wrapper">
                    <img src={language.img} alt={language.name} />
                    <div className="form-check form-check-inline mt-2 card_form">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`checkbox-${index + 3}`}
                        name="preferredGenre"
                        value={language.name}
                        onChange={handleCheckboxChange}
                        ref={(el) => (checkboxRefs.current[index + 3] = el)}
                      />
                      <label
                        className="form-check-label mx-2"
                        htmlFor={`checkbox-${index + 3}`}
                      >
                        {language.name}
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserPreferGenre;
