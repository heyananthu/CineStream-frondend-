import React, { useState, useRef, useEffect } from "react";
import "../../Assets/Styles/UserPreferLanguages.css";
import english from "../../Assets/Images/English.jpg";
import malayalam from "../../Assets/Images/malayalam.jpg";
import tamil from "../../Assets/Images/tamil.jpg";
import hindi from "../../Assets/Images/Hindi.jpg";
import telugu from "../../Assets/Images/telugu.jpg";
import kannada from "../../Assets/Images/Kannada.jpg";
import { toast } from "react-toastify";
import axiosInstance from "../Constants/BaseUrl";
import { useNavigate } from "react-router-dom";

function UserPreferLanguages() {

  const navigate = useNavigate(); 

  useEffect(() => {
    if (localStorage.getItem("userId") == null) {
      navigate("/");
    }
  });

  const [preferredLanguages, setPreferredLanguages] = useState([]);
  const checkboxRefs = useRef([]);
  const id=localStorage.getItem('userId')

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setPreferredLanguages((prev) => [...prev, value]);
    } else {
      setPreferredLanguages((prev) =>
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
    if (preferredLanguages.length === 0) {
        
      toast.warning("Please select at least one language.");
      return;
    }
    console.log(preferredLanguages);
    axiosInstance.post(`/addUserPreferences/${id}`,{preferredLanguages: preferredLanguages})
      .then((res) => {
        console.log('working', res);
        if (res.data.status === 200) {
            navigate('/user_prefer_genre');
        } else {
          toast.error('Something Went Wrong');
        }
      })
      .catch((err) => {
        toast.error('Something Went Wrong');
      });
  };

  const languages = [
    { name: "English", img: english },
    { name: "Malayalam", img: malayalam },
    { name: "Tamil", img: tamil },
    { name: "Hindi", img: hindi },
    { name: "Telugu", img: telugu },
    { name: "Kannada", img: kannada },
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
              <p className="user_prefer_languages_title">Select Languages</p>
              <button type="submit" className="red_btn">
                Next
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
                        name="preferredLanguages"
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
                        name="preferredLanguages"
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

export default UserPreferLanguages;
