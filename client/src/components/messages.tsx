import React, { useState, useEffect } from "react";
import { useSocket } from "../context";
import { styled } from "styled-components";

const MessagesColumn = styled.div(() => ({
  height: "85vh",
  overflow: "auto",
  padding: "10px 10px 10px 40px",
}));

const Message = styled.div(() => ({
  background: "rgb(0, 24, 111)",
  borderRadius: "6px",
  marginBottom: "24px",
  maxWidth: "600px",
  padding: "12px",
}));

const MessageMeta = styled.span(() => ({
  color: "rgb(153, 217, 234)",
  fontSize: "0.75rem",
}));

export const MessagesReceived = () => {
  const [messagesReceived, setMessagesReceived] = useState<
    { message: string; username: string; __createdtime__: number }[]
  >([]);

  const socket = useSocket();

  useEffect(() => {
    const receiveMessageHandler = (data: any) => {
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    };

    socket.on("receive_message", receiveMessageHandler);

    // Returnera en funktion som tar bort eventlyssnaren när komponenten avmonteras
    return () => {
      socket.off("receive_message", receiveMessageHandler);
    };
  }, [socket]);

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp: any) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <MessagesColumn>
      {messagesReceived.map((msg, i) => (
        <Message key={i}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <MessageMeta>{msg.username}</MessageMeta>
            <MessageMeta>
              {formatDateFromTimestamp(msg.__createdtime__)}
            </MessageMeta>
          </div>
          <p style={{ color: "#fff" }}>{msg.message}</p>
          <br />
        </Message>
      ))}
    </MessagesColumn>
  );
};
