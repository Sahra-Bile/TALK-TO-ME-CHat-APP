import { Container } from "./styled-compoents/styled-components";

type HomePageProps = {
  setPage(page: string): void;
};

export function Home({ setPage }: HomePageProps) {
  console.log("Rendering Home component"); // Add this line
  return (
    <Container>
      <h1>Welcome to TALK TO ME</h1>
      <button
        className="btn btn-secondary"
        value={"Create a New Room"}
        onClick={() => setPage("Create a New Room")}
      >
        Create a New Room
      </button>
      <button
        className="btn btn-primary"
        value={"Join Existing Room"}
        onClick={() => setPage("Join Existing Room")}
      >
        Join Existing Room
      </button>
    </Container>
  );
}
