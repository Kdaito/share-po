import { useState } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Setting from "./pages/Setting";
import PlayerList from "./pages/PlayerList";
import Layout from "./components/Layout";
import AddPlayer from "./pages/AddPlayer";

function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<PlayerList />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/add-player" element={<AddPlayer />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
