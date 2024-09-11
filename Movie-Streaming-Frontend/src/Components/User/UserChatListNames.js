import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from "../../Assets/Images/support.jpg";
import axiosInstance from "../Constants/BaseUrl";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { imageUrl } from "../Constants/Image_Url";
import { toast } from "react-toastify";

function UserChatListNames({ userType }) {
  const [searchResults, setSearchResults] = useState([]);
  const [groups, setGroups] = useState([]);
  const [chats, setChats] = useState([]);
  const [support, setSupport] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [groupTitle, setgroupTitle] = useState("");
  const [groupId, setGroupId] = useState("");
  const [viewChatModal, setViewChatModal] = useState(false);
  const [viewSubmit, setViewSubmit] = useState(false); 

  const id = localStorage.getItem("userId");

  useEffect(() => {
    axiosInstance
      .post(`viewChatRecipientsforUserById/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setChats(res.data.users);
          setSupport(res.data.support);
        }
      })
      .catch(() => {
        console.log("Failed to Add Case");
      });

    axiosInstance
      .post(`viewgroupsByUserId/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          setGroups(res.data.data.reverse());
        }
      })
      .catch(() => {
        console.log("Failed to Add Case");
      });
  }, [id]);

  useEffect(() => {
    if (searchData) {
      axiosInstance
        .post(`searchUserByName/${searchData}`)
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            // Filter out the current user
            const filteredResults = res.data.data.filter(user => user._id !== id);
            setSearchResults(filteredResults);
          } else {
            setSearchResults([]);
          }
        })
        .catch(() => {
          setSearchResults([]);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchData, id]);
  

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  function createGroup(e) {
    e.preventDefault();
    axiosInstance
      .post(`createGroup/${id}`, { title: groupTitle })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setGroupId(res.data.data._id);
          setViewChatModal(true);
        }
      })

      .catch((err) => {
        console.log("Failed to Add Case");
        return err;
      });
  }

  function addGroupMember(memberId) {
    axiosInstance
      .post(`addUserToGroup`, { groupId: groupId, memberId: memberId })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast(res.data.msg);
          setViewSubmit(true);
        } else {
          toast.warning("Something went wrong!");
        }
      })
      .catch(() => {
        console.log("Failed to Add Case");
      });
  }

  console.log("groups", groups);

  return (
    <div>
      {userType === "all" ? (
        <>
          {support ? (
            <div className="adv_chat_sidebar_name">
              <Link to={`/user_single_chat/${id}/support`}>
                <div className="d-flex">
                  <div className="adv_chat_sidebar_name_img">
                    <img src={img} className="img-fluid" alt="Advocate" />
                  </div>
                  <div className="adv_chat_sidebar_name_content px-3">
                    <div>
                      <p>
                        <b>Support</b>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ) : (
            ""
          )}

          {chats.length
            ? chats.map((e, index) => (
                <div key={index} className="adv_chat_sidebar_name mt-2">
                  <Link to={`/user_single_chat/${e._id}/users`}>
                    <div className="d-flex">
                      <div className="adv_chat_sidebar_name_img">
                        <img
                          src={`${imageUrl}/${e.img.filename}`}
                          className="img-fluid"
                          alt="Advocate"
                        />
                      </div>
                      <div className="adv_chat_sidebar_name_content px-3">
                        <div>
                          <p>
                            <b>{e.name}</b>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            : ""}

          {groups.length
            ? groups.map((e, index) => (
                <div key={index} className="adv_chat_sidebar_name">
                  <Link to={`/user_single_chat/${e.groupId._id}/groups`}>
                    <div className="d-flex">
                      <div className="adv_chat_sidebar_name_grp d-flex justify-content-center align-items-center">
                        {/* <img
                          src={`${imageUrl}/${e.img.filename}`}
                          className="img-fluid"
                          alt="Advocate"
                        /> */}
                        <p className="text-uppercase text-danger fs-3">
                          <b>{e.groupId.title.slice(0, 2)}</b>
                        </p>
                      </div>
                      <div className="adv_chat_sidebar_name_content px-3">
                        <div>
                          <p>
                            <b>{e.groupId.title}</b>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            : ""}
        </>
      ) : userType === "support" ? (
        <>
          {support ? (
            <div className="adv_chat_sidebar_name">
              <Link to={`/user_single_chat/${id}/support`}>
                <div className="d-flex">
                  <div className="adv_chat_sidebar_name_img">
                    <img src={img} className="img-fluid" alt="Advocate" />
                  </div>
                  <div className="adv_chat_sidebar_name_content px-3">
                    <div>
                      <p>
                        <b>Support</b>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ) : (
            ""
          )}
        </>
      ) : userType === "groups" ? (
        <>
          <div className="user_add_gropuchat mb-4">
            <div className="containet">
              <div className="row">
                <div className="col-12">
                  <Link className="nav-link" onClick={handleShowModal}>
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="user_add_gropuchat_box">
                        <p className="text-light">
                          + <small>Create Group</small>
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {groups.length
            ? groups.map((e, index) => (
                <div key={index} className="adv_chat_sidebar_name">
                  <Link to={`/user_single_chat/${e.groupId._id}/groups`}>
                    <div className="d-flex">
                      <div className="adv_chat_sidebar_name_grp d-flex justify-content-center align-items-center">
                        {/* <img
                          src={`${imageUrl}/${e.img.filename}`}
                          className="img-fluid"
                          alt="Advocate"
                        /> */}
                        <p className="text-uppercase text-danger fs-3">
                          <b>{e.groupId.title.slice(0, 2)}</b>
                        </p>
                      </div>
                      <div className="adv_chat_sidebar_name_content px-3">
                        <div>
                          <p>
                            <b>{e.groupId.title}</b>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            : ""}
        </>
      ) : userType === "chats" ? (
        <>
          <div className="d-flex justify-content-center align-items-center">
            <div className="adv_chat_sidebar_search pt-2 px-0 w-75">
              <div class="input-group ">
                <input
                  type="text"
                  class="form-control text-light bg-dark border-secondary no-outline"
                  placeholder="Search"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={(e) => {
                    setSearchData(e.target.value);
                  }}
                />
                <span
                  class="input-group-text bg-dark text-light border-secondary"
                  id="basic-addon2"
                >
                  <i class="ri-search-2-line"></i>
                </span>
              </div>
            </div>
          </div>
          {chats.length
            ? chats.map((e, index) => (
                <div key={index} className="adv_chat_sidebar_name mt-3">
                  <Link to={`/user_single_chat/${e._id}/users`}>
                    <div className="d-flex">
                      <div className="adv_chat_sidebar_name_img">
                        <img
                          src={`${imageUrl}/${e.img.filename}`}
                          className="img-fluid"
                          alt="Advocate"
                        />{" "}
                      </div>
                      <div className="adv_chat_sidebar_name_content px-3">
                        <div>
                          <p>
                            <b>{e.name}</b>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            : ""}
          {searchResults.length ? (
            <div className="container mt-3 mb-3">
              <p className="text-danger">
                <small>Search Results({searchResults.length})</small>
              </p>
            </div>
          ) : (
            ""
          )}
          {searchResults.length
            ? searchResults.map((e, index) => (
                <div key={index} className="adv_chat_sidebar_name">
                  <Link to={`/user_single_chat/${e._id}/users`}>
                    <div className="d-flex">
                      <div className="adv_chat_sidebar_name_img">
                        {/* <img src={img} className="img-fluid" alt="Advocate" /> */}
                        <img
                          src={`${imageUrl}/${e.img.filename}`}
                          className="img-fluid"
                          alt="Advocate"
                        />
                      </div>
                      <div className="adv_chat_sidebar_name_content px-3">
                        <div>
                          <p>
                            <b>{e.name}</b>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            : ""}
        </>
      ) : (
        ""
      )}

      {/* Modal */}
      <div
        className={`modal fade ${showModal ? "show d-block" : "d-none"}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="createGroupModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content bg-dark text-light">
            <div className="modal-header border-0">
              <h5 className="modal-title" id="createGroupModalLabel">
                Create Group
              </h5>
              <button
                type="button"
                className="close text-light"
                aria-label="Close"
                onClick={handleCloseModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body border-0">
              {/* Modal content goes here */}

              {viewChatModal == false ? (
                <form onSubmit={createGroup}>
                  <div className="mb-3">
                    <label htmlFor="reviewInput" className="form-label">
                      Group Name
                    </label>
                    <input
                      type="text"
                      className="form-control text-light bg-dark border-secondary no-outline"
                      placeholder="hhh"
                      id=""
                      onChange={(e) => {
                        setgroupTitle(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="modal-footer border-0">
                    <button type="submit" className="btn bg_red ">
                      Create
                    </button>
                    <button
                      type="button"
                      className="btn bg_red"
                      onClick={() => {
                        handleCloseModal();
                        setViewChatModal(false);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <label htmlFor="reviewInput" className="form-label mt-2">
                    Search for group members
                  </label>
                  <div class="input-group ">
                    <input
                      type="text"
                      class="form-control text-light bg-dark border-secondary no-outline"
                      placeholder="Search"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      onChange={(e) => {
                        setSearchData(e.target.value);
                      }}
                    />
                    <span
                      class="input-group-text bg-dark text-light border-secondary"
                      id="basic-addon2"
                    >
                      <i class="ri-search-2-line"></i>
                    </span>
                  </div>
                  {searchResults.length
                    ? searchResults.map((e) => {
                        return (
                          <>
                            <div className="user_add_members px-4 pt-1">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex pt-1 pb-1">
                                  <div className="adv_chat_sidebar_name_img">
                                    {/* <img
                                    src={img}
                                    className="img-fluid"
                                    alt="Advocate"
                                  /> */}
                                    <img
                                      src={`${imageUrl}/${e.img.filename}`}
                                      className="img-fluid"
                                      alt="Advocate"
                                    />
                                  </div>
                                  <div className="adv_chat_sidebar_name_content px-3 mt-3">
                                    <div>
                                      <h6>
                                        <b>{e.name}</b>
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      addGroupMember(e._id);
                                    }}
                                    className="btn bg_red"
                                  >
                                    + Add
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })
                    : ""}
                  {viewSubmit ? (
                    <button
                      type="button"
                      className="btn bg_red mt-2 float-right"
                      onClick={() => {
                        handleCloseModal();
                        window.location.reload();
                      }}
                    >
                      Finish
                    </button>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserChatListNames;
