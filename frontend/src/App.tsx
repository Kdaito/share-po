import { useState } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Detail from "./pages/Detail";
import PlayerList from "./pages/PlayerList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<PlayerList/>}/>
        <Route path="/detail" element={<Detail/>}/>
      </Routes>
    </>
  );
}

export default App;
