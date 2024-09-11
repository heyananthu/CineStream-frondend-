import React, { useEffect, useRef, useState } from "react";
import "../../Assets/Styles/UserChatBox.css";
import img from "../../Assets/Images/support.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";
import { imageUrl } from "../Constants/Image_Url";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function UserChatBox() {
  const { id } = useParams();
  const { type } = useParams();
  const navigate = useNavigate();

  const fId = localStorage.getItem("userId");
  const [messageList, setMessageList] = useState([]);
  const [userDetalis, setUserDetails] = useState({
    img: { filename: "" },
  });
  const [inputValue, setInputValue] = useState("");
  const chatBodyRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMembersModalOpen, setIsAddMembersModalOpen] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]); 

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messageList]);

  useEffect(() => {
    if (type === "support") {
      axiosInstance
        .post(`viewChatBetweenuserandSupport/${id}`)
        .then((res) => {
          if (res.data.status === 200) {
            setMessageList(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type === "users") {
      axiosInstance
        .post(`viewChatBetweenUsers`, { fromId: fId, toId: id,loggedInUserId:fId })
        .then((res) => {
          if (res.data.status === 200) {
            setMessageList(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      axiosInstance
        .post(`viewUserById/${id}`)
        .then((res) => {
          if (res.data.status === 200) {
            setUserDetails(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type === "groups") {
      axiosInstance
        .post(`viewgroupChatsByGroupId/${id}`)
        .then((res) => {
          if (res.data.status === 200) {
            setMessageList(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      axiosInstance
        .post(`viewUsersByGroupId/${id}`)
        .then((res) => {
          if (res.data.status === 200) {
            setGroupMembers(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      axiosInstance
        .post(`viewGroupById/${id}`)
        .then((res) => {
          if (res.data.status === 200) {
            setUserDetails(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id, type]);

  console.log("msg", messageList);

  const handleSupportSend = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`chatting`, {
        msg: inputValue,
        from: "users",
        fromId: id,
        support: true,
      })
      .then((res) => {
        if (res.data.status === 200) {
          setInputValue("");
          setMessageList((prevMessageList) => [
            ...prevMessageList,
            res.data.data,
          ]);
        } else {
          console.log("Failed to send message");
        }
      })
      .catch(() => {
        console.log("Failed to send message");
      });
  };

  const handleUserSend = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`chatting`, {
        msg: inputValue,
        from: "users",
        support: false,
        fromId: fId,
        toId: id,
      })
      .then((res) => {
        if (res.data.status === 200) {
          setInputValue("");
          setMessageList((prevMessageList) => [
            ...prevMessageList,
            res.data.data,
          ]);
        } else {
          console.log("Failed to send message");
        }
      })
      .catch(() => {
        console.log("Failed to send message");
      });
  };

  const handleGroupSend = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`groupChatting`, {
        msg: inputValue,
        memberId: fId,
        groupId: id,
      })
      .then((res) => {
        if (res.data.status === 200) {
          setInputValue("");
          setMessageList((prevMessageList) => [
            ...prevMessageList,
            {
              ...res.data.data,
              memberId: { _id: fId, name: userDetalis.name },
            },
          ]);
        } else {
          console.log("Failed to send message");
        }
      })
      .catch(() => {
        console.log("Failed to send message");
      });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDiscussion = () => {
    axiosInstance
      .post(`closeGroupById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setUserDetails((prevDetails) => ({
            ...prevDetails,
            status: false,
          }));
          setIsDropdownOpen(false); // Close dropdown after successful action
          navigate('/user_chat')
          window.location.reload()
        } else {
          toast.error("Failed to close discussion");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to close discussion");
      });
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".dropdown-wrapper")) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const [searchResults, setSearchResults] = useState([]);
  const [searchData, setSearchData] = useState("");

  console.log("members", groupMembers);

  useEffect(() => {
    if (searchData) {
      axiosInstance
        .post(`searchUserByName/${searchData}`)
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            // Filter out the current user
            const filteredResults = res.data.data.filter(
              (user) => user._id !== fId
            );
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

  function addGroupMember(memberId) {
    axiosInstance
      .post(`addUserToGroup`, { groupId: userDetalis._id, memberId: memberId })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast(res.data.msg);
          // Find the added member in searchResults
          const addedMember = searchResults.find(
            (user) => user._id === memberId
          );
          if (addedMember) {
            setGroupMembers((prevMembers) => [
              ...prevMembers,
              { memberId: addedMember },
            ]);
          }
        } else {
          toast.warning("Something went wrong!");
        }
      })
      .catch(() => {
        console.log("Failed to Add Case");
      });
  }

  function removeMember(memberId) {
    console.log(memberId);
    axiosInstance
      .post(`removeUserToGroup/${memberId}`, { groupId: userDetalis._id })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast(res.data.msg);
          navigate(-1);
          setTimeout(() => {
            window.location.reload();
          }, 500); // Delay of 500 milliseconds before reloading
        } else {
          toast.warning("Something went wrong!");
        }
      })
      .catch(() => {
        console.log("Failed to Add Case");
      });
  }

  function clearChat() {
    axiosInstance
      .post(`clearChatBetweenUsers`, { userId: fId,chatPartnerId:id })
      .then((res) => {
        if(res.data.status==200){
          console.log(res);
        toast('Chat Cleared')
        setMessageList([]); 
        }
        
      })
      .catch(() => {
        console.log("Failed to Add Case");
      });
  }

  // console.log("group", userDetalis);
  console.log("user", id);
  console.log("user2", fId);

  const formatLocalTime = (utcTime) => {
    const date = new Date(utcTime);
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    return localDate.toISOString().slice(11, 16);
  };

  const renderMessageContent = (message) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = message.split(urlRegex);
    return parts.map((part, index) => 
      urlRegex.test(part) ? (
        <Link key={index} to={part} rel="noopener noreferrer" className="nav-link">
          {part}
        </Link>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };


  return (
    <div>
      {type === "support" ? (
        <div className="advocate_chat">
          {messageList.length ? (
            <div className="adv_chat_container">
              <div className="chat-header">
                <img src={img} className="img-fluid" alt="Advocate" />
                <span className="fs-5 px-3 text-light">Support</span>
              </div>

              <div className="adv_chat-body" ref={chatBodyRef}>
                {messageList.map((msg) => (
                  <div key={msg.id}>
                    {type === "support" ? (
                      <div
                        className={`chat-message ${
                          msg.from === "support" ? "received" : "sent"
                        }`}
                      >
                        <div className="message-header">
                          <span className="username">
                            <small className="fs-12">
                              {msg.from === "users"
                                ? msg.fromId?.name || ""
                                : "Support"}
                            </small>
                          </span>
                          <span className="text-light fs-12">
                            {msg.createdAt.slice(0, 10)}
                          </span>
                        </div>
                        <p className="message-content">{renderMessageContent(msg.msg)}</p>
                        <div className="timestamp text-light d-flex justify-content-end">
                          {formatLocalTime(msg.createdAt)}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSupportSend}>
                <div className="chat-input">
                  <input
                    type="text"
                    placeholder="Type Your Message"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button type="submit">
                    <i className="ri-send-plane-fill"></i>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="no_chat_container">
              <h3>
                Please select a person to start a conversation and get the help
                or information you need.
              </h3>
            </div>
          )}
        </div>
      ) : type === "users" ? (
        <div className="advocate_chat">
          <div className="adv_chat_container">
            <div className="chat-header d-flex justify-content-between">
              
              <div>
              <img
                src={`${imageUrl}/${
                  userDetalis.img ? userDetalis.img.filename : ""
                }`}
                className="img-fluid"
                alt="Advocate"
              />
              <span className="fs-5 px-3 text-light">{userDetalis.name}</span>
              </div>
              
            
            
              <div
                className="dropdown-wrapper"
                style={{ position: "relative" }}
              >
                <i
                  className="ri-more-2-fill text-light"
                  onClick={toggleDropdown}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                ></i>
                {isDropdownOpen && (
                  <ul className="dropdown-menu show" id="intern_dropdown">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={clearChat}
                      >
                        Clear Chat
                      </button>
                    </li>

                  </ul>
                )}
              </div>
            
            
            </div>
            
            
            <div className="adv_chat-body" ref={chatBodyRef}>
              {messageList.length ? (
                messageList.map((msg) => {
                  const fromId = msg.fromId?._id || msg.fromId;

                  return (
                    <div key={msg.id}>
                      {type === "users" ? (
                        <div
                          className={`chat-message ${
                            fromId === fId ? "sent" : "received"
                          }`}
                        >
                          <div className="message-header">
                            <span className="username">
                              <small className="fs-12">
                                {msg.fromId?.name || ""}
                              </small>
                            </span>
                            <span className="fs-12 text-light">
                              {msg.createdAt.slice(0, 10)}
                            </span>
                          </div>
                          <p className="message-content">{renderMessageContent(msg.msg)}</p>
                          <div className="timestamp text-light d-flex justify-content-end">
                            {formatLocalTime(msg.createdAt)}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="no_chat_container">
                  <h3 className="text-light">Please start the conversation.</h3>
                </div>
              )}
            </div>
            <form onSubmit={handleUserSend}>
              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Type Your Message"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit">
                  <i className="ri-send-plane-fill"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : type === "groups" ? (
        <div className="advocate_chat">
          <div className="adv_chat_container">
            <div className="chat-header d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <div className="adv_chat_sidebar_name_grp d-flex justify-content-center align-items-center">
                  <p className="text-uppercase text-danger fs-3">
                    <b>
                      {userDetalis.title ? userDetalis.title.slice(0, 2) : ""}
                    </b>
                  </p>
                </div>
                <span className="fs-5 px-3 text-light">
                  {userDetalis.title}
                </span>
              </div>
              <div
                className="dropdown-wrapper"
                style={{ position: "relative" }}
              >
                <i
                  className="ri-more-2-fill text-light"
                  onClick={toggleDropdown}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                ></i>
                {isDropdownOpen && (
                  <ul className="dropdown-menu show" id="intern_dropdown">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Group Info
                      </button>
                    </li>
                    {userDetalis.adminId ? (
                      userDetalis.adminId._id === fId ? (
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={closeDiscussion}
                          >
                            Close Group
                          </button>
                        </li>
                      ) : (
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => {
                              removeMember(fId);
                            }}
                          >
                            Left Group
                          </button>
                        </li>
                      )
                    ) : (
                      ""
                    )}
                  </ul>
                )}
              </div>
            </div>
            <div className="adv_chat-body" ref={chatBodyRef}>
              {messageList.length ? (
                messageList.map((msg) => {
                  const fromId = msg.memberId?._id || msg.fromId;

                  return (
                    <div key={msg.id}>
                      {type === "groups" ? (
                        <div
                          className={`chat-message ${
                            fromId === fId ? "sent" : "received"
                          }`}
                        >
                          <div className="message-header">
                            <span className="username">
                              <small className="fs-12">
                                {msg.memberId && msg.memberId.name
                                  ? msg.memberId.name
                                  : ""}
                              </small>
                            </span>
                            <span className="fs-12 text-light">
                              {msg.createdAt ? msg.createdAt.slice(0, 10) : ""}
                            </span>
                          </div>
                          <p className="message-content">{renderMessageContent(msg.msg)}</p>
                          <div className="timestamp text-light d-flex justify-content-end">
                            {formatLocalTime(msg.createdAt)}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })
              ) : (
                <>
                  {userDetalis.status ? (
                    <div className="no_chat_container">
                      <h3 className="text-light">
                        Start the conversation now.
                      </h3>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>

            {userDetalis.status ? (
              <form onSubmit={handleGroupSend}>
                <div className="chat-input">
                  <input
                    type="text"
                    placeholder="Type Your Message"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button type="submit">
                    <i className="ri-send-plane-fill"></i>
                  </button>
                </div>
              </form>
            ) : (
              <div className="discussion_closed">
                <p className="text-danger p-0">
                  Group closed by <b>Admin</b>
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="no_chat_container">
          <h3 className="text-light">
            Select a person to start a conversation
          </h3>
        </div>
      )}

      {isModalOpen && (
        <div
          className="modal fade show text-light"
          style={{ display: "block" }}
          tabIndex="-1"
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-scrollable ">
            <div className="modal-content bg-dark">
              <div className="modal-header border-0 bg-danger">
                <h5 className="modal-title">Group Info</h5>
                <button
                  type="button"
                  className="btn-close text-light"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-0">
                <div className="grp_modal_container group_modal_head">
                  <div className="d-flex justify-content-center">
                    <div>
                      <div className="adv_chat_sidebar_name_grp_info d-flex justify-content-center align-items-center m-auto">
                        <p className="text-uppercase text-danger fs-1">
                          <b>
                            {userDetalis.title
                              ? userDetalis.title.slice(0, 2)
                              : ""}
                          </b>
                        </p>
                      </div>
                      <p className="fs-1 px-3 text-light text-center">
                        {userDetalis.title}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grp_modal_container group_modal_details mt-2">
                  <p className="text-danger">Group Details</p>
                  <p className="text-secondary">
                    Group Created by{" "}
                    {`${
                      userDetalis.adminId?._id == fId
                        ? "you"
                        : userDetalis.adminId.name
                    }`}
                    , on {userDetalis.createdAt.slice(0, 10)}{" "}
                  </p>
                </div>
                <div className="grp_modal_container mt-2">
                  {userDetalis.adminId._id == fId ? (
                    <div className="d-flex align-items-center">
                      <div className="grp_modal_icon">
                        <i class="ri-add-line fs-4"></i>
                      </div>
                      <Link
                        className="nav-link"
                        onClick={() => setIsAddMembersModalOpen(true)}
                      >
                        <p className="mx-3">Add Members</p>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="d-flex align-items-center mt-2">
                    <div className="grp_modal_icon">
                      <i class="ri-logout-box-r-line fs-4"></i>
                    </div>
                    {userDetalis.adminId._id == fId ? (
                      <Link className="nav-link" onClick={closeDiscussion}>
                        <p className="mx-3 ">Close Group</p>
                      </Link>
                    ) : (
                      <Link
                        onClick={() => {
                          removeMember(fId);
                        }}
                        className="nav-link"
                      >
                        <p className="mx-3">Exit Group</p>
                      </Link>
                    )}
                  </div>
                </div>
                <div className="grp_modal_container mt-2">
                  <p className="text-secondary">
                    <small>{groupMembers.length} members</small>
                  </p>
                  {groupMembers.length
                    ? groupMembers.map((e, index) => (
                        <div
                          key={index}
                          className="adv_chat_sidebar_name mt-1 p-1"
                        >
                          <div className="d-flex">
                            <div className="adv_chat_sidebar_name_img">
                              <img
                                src={`${imageUrl}/${
                                  e.adminId?.img.filename ||
                                  e.memberId?.img.filename
                                }`}
                                className="img-fluid"
                                alt="Advocate"
                              />
                            </div>
                            <div className="adv_chat_sidebar_name_content px-3 ">
                              <div className=" d-flex justify-content-between">
                                <p>
                                  <b>{e.adminId?.name || e.memberId?.name}</b>
                                </p>

                                <div className="mx-4">
                                  {e.adminId?._id ===
                                  userDetalis.adminId._id ? (
                                    <p className="bg-dark text-danger p-1 rounded fs-12">
                                      <b>ADMIN</b>
                                    </p>
                                  ) : e.memberId?._id !== fId ? (
                                    <Link
                                      onClick={() =>
                                        removeMember(e.memberId._id)
                                      }
                                    >
                                      <p className="bg-dark text-danger p-1 rounded fs-12">
                                        <b>Remove</b>
                                      </p>
                                    </Link>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : ""}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {isAddMembersModalOpen && (
        <div
          className="modal fade show text-light"
          style={{ display: "block" }}
          tabIndex="-1"
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content bg-dark">
              <div className="modal-header border-0 bg-danger">
                <h5 className="modal-title">Add Members</h5>
                <button
                  type="button"
                  className="btn-close text-light"
                  onClick={() => setIsAddMembersModalOpen(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-0 pt-3">
                <p className="fs-6 px-3 text-light">
                  Invite Members to the Group
                </p>
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
                  ? searchResults.map((e) => {
                      return (
                        <>
                          <div className="user_add_members px-4 pt-1">
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex pt-1 pb-1">
                                <div className="adv_chat_sidebar_name_img">
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
              </div>
             
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserChatBox;
