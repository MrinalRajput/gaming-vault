import Home from "./components/home";
import Navbar from "./components/Navbar";
import GamePage from "./components/GamePage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/favourite"
          element={
            <h1
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "sans-serif",
                padding: "200px",
              }}
            >
              No Favourite Games
            </h1>
          }
        />
        <Route
          path="/contact"
          element={
            <h1
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "sans-serif",
                padding: "200px",
              }}
            >
              No Contact Information
            </h1>
          }
        />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </>
  );
}

export default App;
