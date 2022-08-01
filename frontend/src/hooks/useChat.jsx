import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { actions as messagesAction } from "../slices/messagesSlice";
import { actions as channelsAction } from "../slices/channelsSlice";

export const useChat = () => {
  const socketRef = useRef(null);
  const dispatch = useDispatch();
  const [error, setErrors] = useState();

  const { addMessage } = messagesAction;
  const { addChannel, removeChannel, updateChannel } = channelsAction;

  useEffect(() => {
    socketRef.current = io().connect();

    socketRef.current.on("newMessage", (newMessage) => {
      dispatch(addMessage(newMessage));
    });

    socketRef.current.on("newChannel", (newChannel) => {
      dispatch(addChannel(newChannel));
    });

    socketRef.current.on("removeChannel", ({ id }) => {
      dispatch(removeChannel(id));
    });

    socketRef.current.on("renameChannel", (channel) => {
      dispatch(
        updateChannel({
          id: channel.id,
          changes: {
            name: channel.name,
          },
        })
      );
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (data) =>
    socketRef.current.emit("newMessage", data, (response) => {
      if (response.status !== "ok") {
        setErrors(true);
      }
    });

  const createChannel = (data) => {
    socketRef.current.emit("newChannel", data, (response) => {
      if (response.status !== "ok") {
        setErrors(true);
      }
    });
  };

  const renameChannel = (data) => {
    socketRef.current.emit("renameChannel", data, (response) => {
      if (response.status !== "ok") {
        setErrors(true);
      }
    });
  };

  const deleteChannel = (data) => {
    socketRef.current.emit("removeChannel", { id: data }, (response) => {
      if (response.status !== "ok") {
        setErrors(true);
      }
    });
  };

  return { sendMessage, createChannel, renameChannel, deleteChannel, error };
};
