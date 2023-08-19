import React, { useState } from "react";
import { useUserContext, useSocket, useRoomContext } from "../context";
import { styled } from "styled-components";

const SendMessageContainer = styled.div(() => ({
  padding: "16px 20px 20px 16px",
  background: "burlywood",
}));

const MessageInput = styled.input(() => ({
  padding: "14px",
  marginRight: "16px",
  width: "60%",
  borderRadius: "10px",
  border: "1px solid rgb(153, 217, 234)",
  fontSize: "1rem",
}));
const Button = styled.button(() => ({
  background: "rgb(153, 217, 234)",
  color: "rgb(0, 24, 111)",
  alignItems: "center",
}));
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
      <Button className="btn" onClick={sendMessage}>
        Send Message
      </Button>
    </SendMessageContainer>
  );
};
