import styled from "styled-components";

const Wrapper = styled.div(() => ({
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(22,16,26,0.2)",
}));

const FormWrapper = styled.h1(() => ({
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

const Button = styled.button(() => ({}));

const Option = styled.option(() => ({}));
const Dropdown = styled.select(() => ({
  marginTop: "20px",
}));
export const FirstPage = () => {
  return (
    <Wrapper>
      <FormWrapper>
        <h3>{`<>DevRooms</>`}</h3>
        <Input placeholder="Username..." />
        <Dropdown>
          <Option>-- Select Room --</Option>
          <Option value="javascript">JavaScript</Option>
          <Option value="node">Node</Option>
          <Option value="express">Express</Option>
          <Option value="react">React</Option>
        </Dropdown>
        <Button className="btn btn-secondary">Join Room</Button>
      </FormWrapper>
    </Wrapper>
  );
};
