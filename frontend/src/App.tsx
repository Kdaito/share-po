import "./App.css";
import { Routes, Route } from "react-router-dom";
import Setting from "./pages/Setting";
import PlayerList from "./pages/PlayerList";
import AddPortfolio from "./pages/AddPortfolio";
import SignIn from "./pages/auth/SignIn";
import AuthProvider from "./context/AuthContext";
import AuthRoutes from "./routes/AuthRoutes";
import CommonRoutes from "./routes/CommonRoutes";
// import EditPlayer from "./pages/EditPlayer";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<CommonRoutes />}>
            <Route path="" element={<SignIn />} />
          </Route>
          <Route path="/" element={<AuthRoutes />}>
            <Route path="/" element={<PlayerList />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/add-player" element={<AddPortfolio />} />
          </Route>
          {/* <Route path="/edit-player/:id" element={<EditPlayer />} /> */}
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
