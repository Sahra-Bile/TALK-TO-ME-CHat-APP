import React, { useState, useEffect, useRef } from "react";
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

  const messagesColumnRef = useRef<HTMLDivElement>(null); // Specify the type

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

  useEffect(() => {
    const fetchLast100Messages = () => {
      // Last 100 messages sent in the chat room (fetched from the db in backend)
      socket.on("last_100_messages", (last100Messages) => {
        console.log("Last 100 messages:", JSON.parse(last100Messages));
        last100Messages = JSON.parse(last100Messages);
        // Sort these messages by __createdtime__
        last100Messages = sortMessagesByDate(last100Messages);
        setMessagesReceived((state) => [...last100Messages, ...state]);
      });
    };

    fetchLast100Messages();

    return () => {
      socket.off("last_100_messages");
    };
  }, [socket]);
  useEffect(() => {
    if (messagesColumnRef.current) {
      // Check if it's not null
      messagesColumnRef.current.scrollTop =
        messagesColumnRef.current.scrollHeight;
    }
  }, [messagesReceived]);

  // Sortera meddelanden efter tid
  function sortMessagesByDate(messages: any[]) {
    return messages.sort((a, b) => a.__createdtime__ - b.__createdtime__);
  }

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp: number) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <MessagesColumn ref={messagesColumnRef}>
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
