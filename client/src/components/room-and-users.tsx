import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRoomContext, useSocket, useUserContext } from "../context";
import {
  RoomColumn,
  RoomTitle,
  UserName,
  UsersList,
} from "./styled-compoents/styled-components";
import { ActiveRoomsList } from "./ActiveRoomsList";
import { getMessagesFromLocalStorage } from "../utils/localStorageUtils";

type User = {
  id: string;
  username: string;
};
type Room = {
  id: string;
  name: string;
  createdBy: string;
};

export const RoomAndUsers = () => {
  const [roomUsers, setRoomUsers] = useState<User[]>([]);
  const [activeRooms, setActiveRooms] = useState<Room[]>([]);

  const { username, setUsername } = useUserContext();
  const socket = useSocket();
  const { room, setRoom } = useRoomContext();

  const navigate = useNavigate();

  useEffect(() => {
    const handleChatroomUsers = (data: User[]) => {
      console.log("Received chatroom_users:", data);
      setRoomUsers(data);
    };

    const handleUserLeft = (leftUsername: string) => {
      console.log("User left:", leftUsername);
      setRoomUsers((prevUsers) =>
        prevUsers.filter((user) => user.username !== leftUsername)
      );
    };

    const handleActiveRooms = (data: Room[]) => {
      setActiveRooms(data);
      // Uppdatera det aktiva rummet baserat på vad som finns i context
      const currentRoom = data.find((rooms) => rooms.id === room);
      if (!currentRoom) return;
    };

    socket.on("chatroom_users", handleChatroomUsers);
    socket.on("user_left", handleUserLeft);
    socket.emit("get_active_rooms");
    socket.on("active_rooms", handleActiveRooms);

    return () => {
      socket.off("chatroom_users", handleChatroomUsers);
      socket.off("user_left", handleUserLeft);
      socket.off("active_rooms", handleActiveRooms);
    };
  }, [room, socket]);

  const handleLeaveRoom = () => {
    if (room !== "") {
      const __createdtime__ = Date.now();
      socket.emit("leave_room", { username, room, __createdtime__ });

      //Remove messages from localStorage for the current room
      const messagesFromLocalStorage = getMessagesFromLocalStorage(room);
      localStorage.removeItem(room); // Remove the messages for the current room
      socket.emit("last_100_messages", messagesFromLocalStorage);

      socket.emit("get_active_rooms");
      // Redirect to home page
      navigate("/", { replace: true });
      setUsername("");
      setRoom("");
    } else {
      console.log("Inget aktivt rum att lämna.");
    }
  };

  const handleJoinActiveRoom = (roomName: string) => {
    const data = { roomName, username };
    socket.emit("join_active_room", data);
  };

  return (
    <RoomColumn>
      <RoomTitle>{room}</RoomTitle>
      <div>
        {<UserName>Users:</UserName>}
        <UsersList>
          {roomUsers.map((user) => (
            <li
              style={{
                marginBottom: "12px",
                fontWeight: `${user.username === username ? "bold" : "normal"}`,
              }}
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </UsersList>
      </div>

      <button className="btn btn-outline" onClick={handleLeaveRoom}>
        Leave
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <ActiveRoomsList
          activeRooms={activeRooms}
          onJoinActiveRoom={handleJoinActiveRoom}
        />
      </div>
    </RoomColumn>
  );
};
