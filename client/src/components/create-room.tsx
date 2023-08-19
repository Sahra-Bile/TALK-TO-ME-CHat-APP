import React, { useState } from "react";
import { useSocket, useUserContext } from "../context";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormWrapper,
  Input,
  Label,
  Wrapper,
} from "./styled-compoents/styled-components";

export const CreateAndJoinRoom = () => {
  const [roomName, setRoomName] = useState("");
  const socket = useSocket();
  const { username, setUsername } = useUserContext();
  const navigate = useNavigate();

  const handleCreateAndJoin = async () => {
    try {
      // Skapa ett nytt rum på servern
      const response = await fetch("http://localhost:4000/create_room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomName,
          username, // Skicka användarnamnet
        }),
      });
      const createdRoom = await response.json();

      // Anslut klienten till det nya rummet
      socket.emit("join_room", {
        username,
        room: createdRoom.id,
      });
    } catch (error) {
      console.error("Error creating and joining room:", error);
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
            value={roomName}
            onChange={(event) => setRoomName(event.target.value)}
            placeholder=" The room name "
          />
          <button
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "30px" }}
            onClick={handleCreateAndJoin}
          >
            {" "}
            Create and Join Room
          </button>
        </Form>
      </FormWrapper>
    </Wrapper>
  );
};
