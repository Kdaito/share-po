import { useState } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Setting from "./pages/Setting";
import PlayerList from "./pages/PlayerList";
import Layout from "./components/Layout";
import AddPlayer from "./pages/AddPlayer";
import EditPlayer from "./pages/EditPlayer";

function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<PlayerList />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/add-player" element={<AddPlayer />} />
          <Route path="/edit-player/:id" element={<EditPlayer />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
