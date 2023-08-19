import { MouseEventHandler } from "react";
import { Container } from "./styled-compoents/styled-components";
import { useNavigate } from "react-router-dom";

type HomePageProps = {
  setPage(page: string): void;
};

export function Home({ setPage }: HomePageProps) {
  console.log("Rendering Home component");
  const navigate = useNavigate();

  // Change the type of the event handler to MouseEventHandler
  const handleChange: MouseEventHandler<HTMLButtonElement> = (event) => {
    setPage(event.currentTarget.value); // Use currentTarget instead of target
    // Redirect to /chat
    navigate("/room", { replace: true });
  };

  return (
    <Container>
      <h1>Welcome to TALK TO ME</h1>
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
