import React, { useState } from "react";
import { useUserContext, useSocket, useRoomContext } from "../context";
import {
  SendMessageContainer,
  MessageInput,
} from "./styled-compoents/styled-components";

export const SendMessage = () => {
  const [message, setMessage] = useState("");
  const socket = useSocket();
  const { username } = useUserContext();
  const { room } = useRoomContext();

  const sendMessage = () => {
    if (message !== "") {
      const __createdtime__ = Date.now();
      socket.emit("send_message", { username, room, message, __createdtime__ });
      setMessage("");
    }
  };

  return (
    <SendMessageContainer>
      <MessageInput
        placeholder=" Hi..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button className="btn btn-primary " onClick={sendMessage}>
        Send Message
      </button>
    </SendMessageContainer>
  );
};
