import React, { useEffect, useState } from "react";
import "../../Assets/Styles/UserNavbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/Images/Vector (1).png";
import axiosInstance from "../Constants/BaseUrl";

function UserNavbar() {
  const navigate = useNavigate();
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchInfo, setSearchInfo] = useState("");
  const [searcResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("userId") == null) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSearchIconClick = () => {
    setShowSearchBox(!showSearchBox);
    setSearchResults([])
  };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   // Implement your search functionality here
  //   console.log("Searching for:", searchInfo);
  // };


  useEffect(() => {
    axiosInstance
      .post(`/searchMovies/${searchInfo}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setSearchResults(res.data.data);
        } else {
          console.log("Failed to fetch cast data");
          setSearchResults([]);
        }
      })
      .catch(() => {
        console.log("Failed to fetch cast data");
        setSearchResults([]);
      });

    
  }, [searchInfo]);

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/user_home">
          <img
            src={logo}
            alt="logo"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          <span className="ms-2 text-light">
            <span className="text-danger">Cine</span>Stream
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/user_home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-light"
                to="/user_view_subscription"
              >
                Subscription
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/user_chat">
                Chat
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/user_add_complaint">
                Add Complaint
              </Link>
            </li>
            {showSearchBox && (
              <div className="position-relative">
                <form className="d-flex ms-2"
                //  onSubmit={handleSearch}
                 >
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    // value={searchInfo}
                    onChange={(e) => setSearchInfo(e.target.value)}
                  />
                  {/* <button className="btn btn-outline-success" type="submit">
                    Search
                  </button> */}
                </form>
                {searcResults.length > 0 && (
                  <ul className="list-group position-absolute mt-1" style={{ zIndex: 1000, width: "100%" }}>
                    {searcResults.map((data, index) => (
                      <li key={index} className="list-group-item bg-dark text-light border-0">
                        <Link to={`/user-view-single-movie/${data._id}/${data.thumbnail.filename}`}onClick={handleSearchIconClick} className="nav-link p-0 text-light" >{data.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            <li className="nav-item nav-link text-light">
              <i
                className="ri-search-line"
                onClick={handleSearchIconClick}
                style={{ cursor: "pointer" }}
              ></i>
            </li>
            
            <li className="nav-item">
              <Link to={"/user_view_wishlist"} className="nav-link text-light">
                <i className="ri-heart-3-line"></i>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle text-light"
                to="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="ri-user-3-line"></i>
              </Link>
              <ul
                className="dropdown-menu dropdown-menu-end dropdown-menu-dark"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <Link className="dropdown-item" to="/user_profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/view_my_plans">
                    My Plans
                  </Link>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;
