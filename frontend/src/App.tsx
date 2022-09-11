import "./App.css";
import { Routes, Route } from "react-router-dom";
import Setting from "./pages/Setting";
import PlayerList from "./pages/PlayerList";
import Layout from "./components/Layout";
import AddPortfolio from "./pages/AddPortfolio";
// import EditPlayer from "./pages/EditPlayer";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<PlayerList />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/add-player" element={<AddPortfolio />} />
          {/* <Route path="/edit-player/:id" element={<EditPlayer />} /> */}
        </Routes>
      </Layout>
    </>
  );
}

export default App;
