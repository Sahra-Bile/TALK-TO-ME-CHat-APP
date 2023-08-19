import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FirstPage } from "./components/first-page";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<FirstPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
