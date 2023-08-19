import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FirstPage } from "./components/first-page";
import { SocketProvider, UserProvider, RoomProvider } from "./context";

function App() {
  return (
    <SocketProvider>
      <UserProvider>
        <RoomProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<FirstPage />} />
              </Routes>
            </div>
          </Router>
        </RoomProvider>
      </UserProvider>
    </SocketProvider>
  );
}

export default App;
