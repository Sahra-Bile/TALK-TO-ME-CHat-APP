import { MessagesReceived } from "./messages-received";
import { SendMessage } from "./send-message";
import { ChatContainer } from "./styled-compoents/styled-components";

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
