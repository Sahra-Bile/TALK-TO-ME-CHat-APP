import { MouseEventHandler } from "react";
import { Container, Heading } from "./styled-compoents/styled-components";
import { useNavigate } from "react-router-dom";

type HomePageProps = {
  setPage(page: string): void;
};

export function Home({ setPage }: HomePageProps) {
  const navigate = useNavigate();

  // Change the type of the event handler to MouseEventHandler
  const handleChange: MouseEventHandler<HTMLButtonElement> = (event) => {
    setPage(event.currentTarget.value); // Use currentTarget instead of target
    // Redirect to /chat
    navigate("/room", { replace: true });
  };

  return (
    <Container>
      <Heading>Welcome to TALK TO ME</Heading>
      <button
        className="btn btn-secondary"
        value={"Create a New Room"}
        onClick={handleChange}
      >
        Create a New Room
      </button>
      <button
        className="btn btn-primary"
        value={"Join Existing Room"}
        onClick={handleChange}
      >
        Join Existing Room
      </button>
    </Container>
  );
}
