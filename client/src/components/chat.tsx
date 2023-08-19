import { styled } from "styled-components";
import { MessagesReceived } from "./messages";
import { SendMessage } from "./send-message";

const ChatContainer = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: "1100px",
  margin: "0 auto",
  gap: "20px",
}));

export const Chat = () => {
  return (
    <ChatContainer>
      <>
        <MessagesReceived />
        <SendMessage />
      </>
    </ChatContainer>
  );
};
