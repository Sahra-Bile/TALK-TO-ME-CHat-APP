import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRoomContext, useSocket, useUserContext } from "../context";
import {
  RoomColumn,
  RoomTitle,
  UserName,
  UsersList,
} from "./styled-compoents/styled-components";

type User = {
  id: string;
  username: string;
};

export const RoomAndUsers = () => {
  const [roomUsers, setRoomUsers] = useState<User[]>([]);
  const { username } = useUserContext();
  const socket = useSocket();
  const { room } = useRoomContext();

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

    socket.on("chatroom_users", handleChatroomUsers);
    socket.on("user_left", handleUserLeft);

    return () => {
      socket.off("chatroom_users", handleChatroomUsers);
      socket.off("user_left", handleUserLeft);
    };
  }, [socket]);

  const handleLeaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit("leave_room", { username, room, __createdtime__ });
    // Redirect to home page
    navigate("/", { replace: true });
  };

  return (
    <RoomColumn>
      <RoomTitle>{room}</RoomTitle>
      <div>
        {roomUsers.length > 0 && <UserName>Users:</UserName>}
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
    </RoomColumn>
  );
};
