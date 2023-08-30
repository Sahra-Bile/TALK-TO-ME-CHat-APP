import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Chat } from "./components/chat";
import { SocketProvider, UserProvider, RoomProvider } from "./context";
import { Home } from "./components/home";
import { CreateAndJoinRoom } from "./components/create-room";
import { FirstPage } from "./components/first-page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const [page, setPage] = useState("Create a New Room");

  const handlePageChange = (newPage: string) => {
    setPage(newPage);
  };

  return (
    <>
      <ToastContainer />
      <SocketProvider>
        <UserProvider>
          <RoomProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Home setPage={handlePageChange} />} />
                <Route
                  path="/room"
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
    </>
  );
}
export default App;
