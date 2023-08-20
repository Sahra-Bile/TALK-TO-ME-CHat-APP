import React from "react";
import { useSocket, useUserContext, useRoomContext } from "../context";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormWrapper,
  Input,
  Label,
  Wrapper,
} from "./styled-compoents/styled-components";

export const CreateAndJoinRoom = () => {
  const { username, setUsername } = useUserContext();
  const { room, setRoom } = useRoomContext();
  const socket = useSocket();
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
    }
    // Redirect to /chat
    navigate("/chat", { replace: true });
  };

  return (
    <Wrapper>
      <FormWrapper>
        <Form>
          <Label>Your Name</Label>
          <Input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Your name"
          />
          <Label>Room Name </Label>
          <Input
            type="text"
            value={room}
            onChange={(event) => setRoom(event.target.value)}
            placeholder=" The room name "
          />
          <button
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "30px" }}
            onClick={handleJoinRoom}
          >
            {" "}
            Create and Join Room
          </button>
        </Form>
      </FormWrapper>
    </Wrapper>
  );
};
