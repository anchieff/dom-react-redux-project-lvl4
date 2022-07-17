import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Channels from "./components/Channels.jsx";
import Chat from "./components/Chat.jsx";
import { fetchData } from "./slices/chatSlice.js";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = () => dispatch(fetchData());
    getData();
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Chat />
      </div>
    </div>
  );
};

export default HomePage;
