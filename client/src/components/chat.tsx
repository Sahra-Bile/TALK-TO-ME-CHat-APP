import { MessagesReceived } from "./messages-received";
import { RoomAndUsers } from "./room-and-users";
import { SendMessage } from "./send-message";
import {
  ChatContainer,
  MessageWrapper,
} from "./styled-compoents/styled-components";

export const Chat = () => {
  return (
    <>
      <ChatContainer>{/* <RoomAndUsers /> */}</ChatContainer>
      <MessageWrapper>
        <MessagesReceived />
        <SendMessage />
      </MessageWrapper>
    </>
  );
};
