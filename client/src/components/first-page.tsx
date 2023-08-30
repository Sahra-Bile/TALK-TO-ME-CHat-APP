import React, { useState, useEffect } from "react";
import { useUserContext, useSocket, useRoomContext } from "../context";
import { useNavigate } from "react-router-dom";
import {
  Wrapper,
  FormWrapper,
  Input,
  Dropdown,
  Button,
  Option,
} from "./styled-compoents/styled-components";
import { notifyFailure } from "../utils/notifications";

type Room = {
  id: string;
  name: string;
  createdBy: string;
};
export const FirstPage = () => {
  const { username, setUsername } = useUserContext();
  const { room, setRoom } = useRoomContext();
  const socket = useSocket();
  const navigate = useNavigate();
  const [activeRooms, setActiveRooms] = useState<Room[]>([]);

  useEffect(() => {
    socket.emit("get_active_rooms");
    socket.on("active_rooms", (data: Room[]) => {
      setActiveRooms(data);
    });

    return () => {
      socket.off("active_rooms");
    };
  }, [socket]);

  const handleJoinRoom = () => {
    if (room === "" || username === "") {
      console.log("Missing room or username");
      notifyFailure("You must enter your name and select a room");
    } else {
      socket.emit("join_room", { username, room });
      setUsername("");
      navigate("/chat", { replace: true });
    }
  };

  return (
    <Wrapper>
      <FormWrapper>
        <h3>{`Existing room`}</h3>
        <Input
          placeholder="Username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <Dropdown onChange={(e) => setRoom(e.target.value)}>
          <Option>-- Select Room --</Option>
          {activeRooms.map((room) => (
            <Option key={room.id} value={room.name}>
              {room.name}
            </Option>
          ))}
        </Dropdown>
        <Button className="btn" onClick={handleJoinRoom}>
          Join Room
        </Button>
      </FormWrapper>
    </Wrapper>
  );
};
