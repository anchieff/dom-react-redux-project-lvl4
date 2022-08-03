import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Channels from "./components/Channels.jsx";
import Chat from "./components/Chat.jsx";
import { fetchData } from "./slices/channelsSlice.js";
import { useChat } from "./hooks/useChat.jsx";
import filter from "leo-profanity";
import { ToastContainer } from "react-toastify";

const HomePage = () => {
  const dispatch = useDispatch();
  const chat = useChat();
  const [currentChannelId, setCurrentChannelId] = useState(1);

  useEffect(() => filter.loadDictionary("en"), []);
  useEffect(() => {
    const getData = () => dispatch(fetchData());
    getData();
  }, []);

  return (
    <>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels
            channelId={currentChannelId}
            changeChannel={(id) => setCurrentChannelId(id)}
            socket={chat}
            filter={filter}
          />
          <Chat channelId={currentChannelId} socket={chat} filter={filter} />
        </div>
      </div>
      <ToastContainer autoClose={5000} />
    </>
  );
};

export default HomePage;
