import React, { useState, useEffect, useRef } from "react";
import { useRoomContext, useSocket } from "../context";
import {
  MessagesColumn,
  Message,
  MessageMeta,
} from "./styled-compoents/styled-components";
import {
  getMessagesFromLocalStorage,
  saveMessageToLocalStorage,
} from "../utils/localStorageUtils";

export const MessagesReceived = () => {
  const [messagesReceived, setMessagesReceived] = useState<any[]>([]);

  const messagesColumnRef = useRef<HTMLDivElement>(null);
  const { room } = useRoomContext();
  const socket = useSocket();

  useEffect(() => {
    // Ladda meddelanden från localStorage när användaren går med i ett rum
    const roomMessages = getMessagesFromLocalStorage(room);
    setMessagesReceived(roomMessages);

    const receiveMessageHandler = (data: any) => {
      if (data.room === room) {
        // Kolla om meddelandet hör till det aktuella rummet
        setMessagesReceived((state) => [
          ...state,
          {
            message: data.message,
            username: data.username,
            __createdtime__: data.__createdtime__,
          },
        ]);
        // Lägg till det nya meddelandet i arrayen och spara i localStorage
        saveMessageToLocalStorage(room, data);
      }
    };

    socket.on("receive_message", receiveMessageHandler);

    return () => {
      socket.off("receive_message", receiveMessageHandler);
    };
  }, [socket, room]);

  useEffect(() => {
    if (messagesColumnRef.current) {
      messagesColumnRef.current.scrollTop =
        messagesColumnRef.current.scrollHeight;
    }
  }, [messagesReceived]);

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
