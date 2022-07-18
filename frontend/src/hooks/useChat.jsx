import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { addMessage } from "../slices/chatSlice";

export const useChat = () => {
  const socketRef = useRef(null);
  const dispatch = useDispatch();
  const [error, setErrors] = useState();

  useEffect(() => {
    socketRef.current = io().connect();

    socketRef.current.on("newMessage", (newMessage) => {
      dispatch(addMessage(newMessage));
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (data) =>
    socketRef.current.emit("newMessage", data, (response) => {
      if (response.status !== "ok") {
        console.log("This case");
        setErrors(true);
      }
    });

  return { sendMessage, error };
};
