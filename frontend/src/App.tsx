import './App.css';
import { Routes, Route } from 'react-router-dom';
import Setting from './pages/Setting';
import PlayerList from './pages/PortfolioList';
import AddPortfolio from './pages/AddPortfolio';
import SignIn from './pages/auth/SignIn';
import AuthProvider from './context/AuthContext';
import UserProvider from './context/UserContext';
import AuthRoutes from './routes/AuthRoutes';
import CommonRoutes from './routes/CommonRoutes';
import ApiProvider from './context/ApiContext';
// import EditPlayer from "./pages/EditPlayer";

function App() {
  return (
    <>
      <AuthProvider>
        <ApiProvider>
          <UserProvider>
            <Routes>
              <Route path="/" element={<AuthRoutes />}>
                <Route path="/" element={<PlayerList />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/add-player" element={<AddPortfolio />} />
              </Route>
              <Route path="/auth" element={<CommonRoutes />}>
                <Route path="" element={<SignIn />} />
              </Route>
              {/* <Route path="/edit-player/:id" element={<EditPlayer />} /> */}
            </Routes>
          </UserProvider>
        </ApiProvider>
      </AuthProvider>
    </>
  );
}

export default App;
