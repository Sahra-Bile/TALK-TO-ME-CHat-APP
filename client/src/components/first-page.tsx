import styled from "styled-components";
import { useUserContext, useSocket, useRoomContext } from "../context";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div(() => ({
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(22,16,26,0.2)",
}));

const FormWrapper = styled.div(() => ({
  width: "400px",
  margin: "0 auto 0 auto",
  padding: "32px",
  background: "#007cf9",
  borderRadius: "6px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "28px",
}));

const Input = styled.input(() => ({
  width: "100%",
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid rgb(63, 73, 204)",
  fontSize: "0.9rem",
}));

const Button = styled.button(() => ({
  width: "100%",
  background: "rgb(0, 24, 111)",
  color: "#fff",
}));

const Option = styled.option(() => ({}));
const Dropdown = styled.select(() => ({
  marginTop: "20px",
}));
export const FirstPage = () => {
  const { username, setUsername } = useUserContext();
  const { room, setRoom } = useRoomContext();
  const socket = useSocket();
  const navigate = useNavigate();

  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
    }
    // Redirect to /chat
    navigate("/chat", { replace: true });
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
        <Button className="btn" onClick={joinRoom}>
          Join Room
        </Button>
      </FormWrapper>
    </Wrapper>
  );
};
