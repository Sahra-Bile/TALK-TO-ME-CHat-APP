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

export const FirstPage = () => {
  const { username, setUsername } = useUserContext();
  const { room, setRoom } = useRoomContext();
  const socket = useSocket();
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    console.log("Room:", room);
    console.log("Username:", username);

    if (room === "" || username === "") {
      console.log("Missing room or username");
      notifyFailure("You must enter your name and select a room");
    } else {
      console.log("Joining room:", room);
      socket.emit("join_room", { username, room });
      navigate("/chat", { replace: true });
    }
  };

  return (
    <Wrapper>
      <FormWrapper>
        <h3>{`🌮FoodRooms🍕`}</h3>
        <Input
          placeholder="Username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <Dropdown onChange={(e) => setRoom(e.target.value)}>
          <Option>-- Select Room --</Option>
          <Option value="pasta">Pasta</Option>
          <Option value="pizza">Pizza</Option>
          <Option value="kebab">Kebab</Option>
          <Option value="tacos">Tacos</Option>
        </Dropdown>
        <Button className="btn" onClick={handleJoinRoom}>
          Join Room
        </Button>
      </FormWrapper>
    </Wrapper>
  );
};
