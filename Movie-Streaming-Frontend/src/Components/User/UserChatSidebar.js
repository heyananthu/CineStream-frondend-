import React, { useEffect, useState } from "react";
import { imageUrl } from "../Constants/Image_Url";
import "../../Assets/Styles/UserChatSidebar.css";
import img from "../../Assets/Images/support.jpg";
import { Link } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";
import UserChatListNames from "./UserChatListNames";

function UserChatSidebar() {
  const [allUsers, setAllUsers] = useState([]);
  // const [userList, setUserList] = useState([]);
  const [groups, setGroups] = useState([]);
  const [support, setSupport] = useState(false);
  const [userType, setUserType] = useState("all");

  const id = localStorage.getItem("userId");

  useEffect(() => {
    axiosInstance
      .post(`viewChatRecipientsforUserById/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          setAllUsers(res.data.users);
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
          setGroups(res.data.data);
        }
      })
      .catch(() => {
        console.log("Failed to Add Case");
      });
  }, [id]);

  return (
    <div className="user_chat_sidebar">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* <div className="adv_chat_sidebar_search">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Search"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <span class="input-group-text" id="basic-addon2">
                <i class="ri-search-2-line"></i>
              </span>
            </div>
          </div> */}
            <div className="mt-3">
              <div className="adv_chat_sidebar_search mb-2">
                <>
                  <Link className="nav-link" onClick={() => setUserType("all")}>
                    <div className="user_type_box">
                      <p className="text-light">
                        <small>All</small>
                      </p>
                    </div>
                  </Link>

                  <Link
                    className="nav-link"
                    onClick={() => setUserType("chats")}
                  >
                    <div className="user_type_box">
                      <p className="text-light">
                        <small>Chats</small>
                      </p>
                    </div>
                  </Link>

                  <Link
                    className="nav-link"
                    onClick={() => setUserType("groups")}
                  >
                    <div className="user_type_box">
                      <p className="text-light">
                        <small>Groups</small>
                      </p>
                    </div>
                  </Link>
                  <Link
                    className="nav-link"
                    onClick={() => setUserType("support")}
                  >
                    <div className="user_type_box">
                      <p className="text-light">
                        <small>Support</small>
                      </p>
                    </div>
                  </Link>
                </>
              </div>
              <UserChatListNames userType={userType} />
            </div>
            {allUsers.length == 0 && support == false && groups.length == 0 ? (
              <div className="no_data_found_chat">
                <p>No Recipient found</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserChatSidebar;
