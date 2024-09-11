import React from "react";
import "../../Assets/Styles/UserChat.css";
import UserChatSidebar from "./UserChatSidebar";
import UserChatBox from "./UserChatBox";

function UserChat({ type,view }) {
  return (
    <div>
      <div className="container-fluid advocate_main">
        <div className="row">
          <div
            className="col-lg-3 col-md-6 col-sm-12 advocate_chat_sidebar"
            style={{ padding: 0 }}
          >
            <UserChatSidebar view={view} />
          </div>
          <div className=" col-lg-9 col-md-6 col-sm-12">
            {type === "noChat" ? (
              <div className="no_chat_container">
                <h3>
                  Please select a person to start a conversation and get the
                  help or information you need.
                </h3>
              </div>
            ) : (
              <UserChatBox />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserChat;
