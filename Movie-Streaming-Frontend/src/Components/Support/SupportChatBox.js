import React, { useEffect, useRef, useState } from "react";
import img from "../../Assets/Images/Action.jpg";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";
import { imageUrl } from "../Constants/Image_Url";

function SupportChatBox() {
  const { id } = useParams();

  const [messageList, setMessageList] = useState([]);
  const [userDetalis, setUserDetails] = useState({
    img: { filename: "" },
  });
  const [inputValue, setInputValue] = useState("");
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messageList]);

  useEffect(() => {
    axiosInstance
      .post(`viewChatBetweenuserandSupport/${id}`)
      .then((res) => {
        // console.log(res);
        if (res.data.status === 200) {
          setMessageList(res.data.data);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`viewUserById/${id}`)
      .then((res) => {
        // console.log(res);
        if (res.data.status === 200) {
          setUserDetails(res.data.data);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleSend = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`chatting`, {
        msg: inputValue,
        from: "support",
        to: "users",
        support: true,
        toId: id,
      })
      .then((res) => {
        // console.log(res);
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
    console.log("client");
  };

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
        <Link
          key={index}
          to={`/support_view_single_movie/${
            part.split("/movie_streaming/user-view-single-movie/")[1]
          }`}
          rel="noopener noreferrer"
          className="nav-link text-decoration-underline"
        >
          {part}
        </Link>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  console.log(messageList);

  return (
    <div>
      <div className="advocate_chat mt-2">
        <div className="chat-header">
          <img
            src={`${imageUrl}/${userDetalis.img.filename}`}
            className="img-fluid"
            alt="Advocate"
          />
          <span className="fs-5 px-3 text-light">{userDetalis.name}</span>
        </div>
        {messageList.length ? (
          <div className="adv_chat_container">
            <div className="adv_chat-body p-5" id="min-80" ref={chatBodyRef}>
              {messageList.map((msg) => (
                <div>
                  <div
                    key={msg.id}
                    className={`chat-message ${
                      msg.from == "users" ? "received" : "sent"
                    }`}
                  >
                    <div className="message-header">
                      <span className="username">
                        <small>
                          {msg.from == "users" ? msg.fromId.name : "Support"}
                        </small>
                      </span>
                      <span className="timestamp text-light">
                        {msg.createdAt.slice(0, 10)}
                      </span>
                    </div>
                    {/* <p className="message-content">{msg.msg}</p> */}
                    <p className="text-wrap message-content">
                      {renderMessageContent(msg.msg)}
                    </p>
                    <div className="timestamp text-light d-flex justify-content-end">
                      {formatLocalTime(msg.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="no_chat_container text-light " id="min-80">
            <h3>Please start the conversation.</h3>
          </div>
        )}
        <form onSubmit={handleSend}>
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
  );
}

export default SupportChatBox;
