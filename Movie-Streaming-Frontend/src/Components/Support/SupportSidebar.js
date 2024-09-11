import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SupportSidebar() {

  const navigate=useNavigate()

  useEffect(() => {
    if (localStorage.getItem("supportId") == null) {
      navigate("/");
    }
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const [showMoviesDropdown, setShowMoviesDropdown] = useState(false);

  const toggleMoviesDropdown = () => {
    setShowMoviesDropdown(!showMoviesDropdown);
  };

  return (
    <div className="row-4">
      <div className="admin-sidebar">
        <div className="profile-div">
          <div className="row">
            <div className="col-md-12 col-sm-12 d-flex justify-content-center">
              <label className="profile-label text-light">Support</label>
            </div>
          </div>
        </div>

        <div className="content-div">
          <div className="div-style">
            <div>
              <label className="label-general">Dashboard</label>
              <div className="adjust-space">
                <Link to={'/support_dashboard'}>
                <label className="label-sub">Home</label></Link>
              </div>
              <div className="adjust-space">
                <Link to={'/support_view_users'}>
                <label className="label-sub">Users</label></Link>
              </div>
              <div className="adjust-space" onClick={toggleMoviesDropdown}>
                <label className="label-sub">Movies</label>
              </div>
              {showMoviesDropdown && (
                <div className="custom-dropdown-menu">
                  <Link to={'/support_add_movies'}>
                    <div className="custom-dropdown-item">
                      <label className="label-sub">Add Movies</label>
                    </div>
                  </Link>
                  <Link to={'/support_view_movies'}>
                    <div className="custom-dropdown-item">
                      <label className="label-sub">View Movies</label>
                    </div>
                  </Link>
                </div>
              )}
              <div className="adjust-space">
                <Link to={'/support_view_complaints'}>
                <label className="label-sub">Complaints</label>
                </Link>
                
              </div>
              <div className="adjust-space">
                <Link onClick={handleLogout}>
                  <label className="label-sub">Logout</label>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportSidebar;
