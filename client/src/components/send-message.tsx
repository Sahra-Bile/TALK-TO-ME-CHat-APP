import React, { useState, useEffect } from "react";
import { useSocket, useRoomContext, useUserContext } from "../context";
import {
  SendMessageContainer,
  MessageInput,
} from "./styled-compoents/styled-components";

export const SendMessage = () => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const socket = useSocket();
  const { username } = useUserContext();
  const { room } = useRoomContext();

  const sendMessage = () => {
    if (message !== "") {
      const __createdtime__ = Date.now();
      socket.emit("send_message", { username, room, message, __createdtime__ });
      setMessage("");
      setIsTyping(false);
    }
  };

  useEffect(() => {
    const handleTyping = (typing: boolean) => {
      setIsTyping(typing);
    };

    const typingTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 1500);

    socket.on("user_typing", handleTyping);

    return () => {
      clearTimeout(typingTimeout);
      socket.off("user_typing", handleTyping);
    };
  }, [socket]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (e.target.value !== "") {
      socket.emit("user_typing", { room, username });
    } else {
      socket.emit("user_typing_end", { room, username });
    }
  };

  const submitByEnter = (e:any) => {
    if(e.keyCode === 13){
      sendMessage();
    }
  };

  return (
    <SendMessageContainer>
      <MessageInput
        placeholder="Type a message..."
        value={message}
        onChange={handleInputChange}
        onKeyDown={submitByEnter}
      />
      <button className="btn btn-primary " onClick={sendMessage}>
        Send Message
      </button>
      {isTyping && <p>Typing...</p>}
    </SendMessageContainer>
  );
};
