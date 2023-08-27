import { useParams } from "react-router-dom";
import { MessagesReceived } from "./messages-received";
import { RoomAndUsers } from "./room-and-users";
import { SendMessage } from "./send-message";
import {
  ChatContainer,
  MessageWrapper,
} from "./styled-compoents/styled-components";

export const Chat = () => {
  const { id } = useParams();
  const roomId = id ?? "";
  return (
    <ChatContainer>
      <RoomAndUsers />
      <MessageWrapper>
        <MessagesReceived />
        <SendMessage />
      </MessageWrapper>
    </ChatContainer>
  );
};
