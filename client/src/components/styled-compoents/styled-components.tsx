import styled from "styled-components";

export const Heading = styled.h1(() => ({
  fontSize: "3rem",
  color: "white",
  fontFamily: "fantasy",
  textAlign: "center",
  padding: "40px",
  margin: "10px",
}));

export const Wrapper = styled.div(() => ({
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(22,16,26,0.2)",
}));

export const Container = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "15px",
}));

export const FormWrapper = styled.div(() => ({
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

export const Input = styled.input(() => ({
  width: "100%",
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid rgb(63, 73, 204)",
  fontSize: "0.9rem",
}));

export const Button = styled.button(() => ({
  width: "100%",
  background: "rgb(0, 24, 111)",
  color: "#fff",
}));

export const Option = styled.option(() => ({}));
export const Dropdown = styled.select(() => ({
  marginTop: "20px",
}));

export const Form = styled.form(() => ({
  borderRadius: "initial",
}));

export const Label = styled.label(() => ({
  display: "block",
  margin: "20px",
  color: "black",
  fontSize: "1rem",
}));

export const ChatContainer = styled.div(() => ({
  maxWidth: "1100",
  margin: "0 auto",
  gap: "20px",
  display: "grid",
  gridTemplateColumns: "1fr 4fr",
}));

export const MessagesColumn = styled.div(() => ({
  height: "85vh",
  overflow: "auto",
  padding: "10px 10px 10px 40px",
}));

export const Message = styled.div(() => ({
  background: "rgb(0, 24, 111)",
  borderRadius: "6px",
  marginBottom: "24px",
  maxWidth: "600px",
  padding: "12px",
}));

export const MessageMeta = styled.span(() => ({
  color: "rgb(153, 217, 234)",
  fontSize: "0.75rem",
}));

export const SendMessageContainer = styled.div(() => ({
  padding: "16px 20px 20px 16px",
}));

export const MessageInput = styled.input(() => ({
  padding: "14px",
  marginRight: "16px",
  width: "60%",
  borderRadius: "6px",
  border: "1px solid rgb(153, 217, 234)",
  fontSize: "0.9rem",
}));

export const StyledButton = styled.button(() => ({
  marginLeft: " 0.5rem",
  fontSize: "1.25rem",
  background: "rgb(153, 217, 234)",
  color: "rgb(0, 24, 111)",
}));

export const RoomColumn = styled.div(() => ({
  borderRight: "1px solid #dfdfdf",
}));

export const RoomTitle = styled.h1(() => ({
  marginBottom: "60px",
  textTransform: "uppercase",
  fontSize: "2rem",
  color: "#fff",
}));

export const UserName = styled.h5(() => ({
  fontSize: "1.2rem",
  color: "#fff",
}));

export const UsersList = styled.ul(() => ({
  listStyleType: "none",
  paddingLeft: "0",
  marginBottom: "60px",
  color: "rgb(153, 217, 234)",
}));

export const MessageWrapper = styled.div(() => ({
  minHeight: "100vh",
  height: "100vh",
  width: "calc(100% - 200px)",
  display: "flex",
  flexDirection: "column",
}));
