import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Chat } from "./components/chat";
import { SocketProvider, UserProvider, RoomProvider } from "./context";
import { Home } from "./components/home";
import { CreateAndJoinRoom } from "./components/create-room";
import { FirstPage } from "./components/first-page";

function App() {
  const [page, setPage] = useState("Create a New Room");

  const handlePageChange = (newPage: string) => {
    console.log("Changing page to:", newPage); // Add this line
    setPage(newPage);
  };
  console.log("Current page:", page); // Add this line

  return (
    <SocketProvider>
      <UserProvider>
        <RoomProvider>
          <Router>
            <div className="App">
              <Home setPage={handlePageChange} />
            </div>
            <Routes>
              {/* <Route path="/" element={<Home setPage={handlePageChange} />} /> */}
              <Route
                path="/"
                element={
                  page === "Create a New Room" ? (
                    <CreateAndJoinRoom />
                  ) : (
                    <FirstPage />
                  )
                }
              />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </Router>
        </RoomProvider>
      </UserProvider>
    </SocketProvider>
  );
}
export default App;
