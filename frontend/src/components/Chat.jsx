import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Chat = ({ socket }) => {
  const currentChannel = useSelector(
    (state) => state.chat.channels[state.chat.currentChannelId]
  );
  const messages = useSelector((state) => state.chat.messages);
  const channelId = useSelector((state) => state.chat.currentChannelId);
  const { t } = useTranslation();
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      body: text,
      channelId,
      username: "admin", // TODO брать значение из стора
    };
    socket.sendMessage(data);
    setText("");
  };

  if (!currentChannel) return null;

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {currentChannel.name}</b>
          </p>
          <span className="text-muted">
            {t("messages.key", { count: [messages.length] })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messages.map((message) => (
            <div className="text-break mb-2" key={message.id}>
              <b>{message.username}</b>: {message.body}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <form
            noValidate=""
            className="py-1 border rounded-2"
            onSubmit={handleSubmit}
          >
            <div className="input-group has-validation">
              <input
                name="body"
                aria-label="Новое сообщение"
                placeholder={t("message.placeholder")}
                className="border-0 p-0 ps-2 form-control"
                value={text}
                onChange={({ target }) => setText(target.value)}
              />
              <button
                type="submit"
                disabled=""
                className="btn btn-group-vertical"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                  ></path>
                </svg>
                <span className="visually-hidden">{t("message.send")}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
