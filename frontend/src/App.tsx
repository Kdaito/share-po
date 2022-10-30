import './App.css';
import { Routes, Route } from 'react-router-dom';
import Setting from './pages/Setting';
import List from './pages/portfolio/List';
import Create from './pages/portfolio/Create';
import SignIn from './pages/auth/SignIn';
import Detail from './pages/portfolio/Detail';
import AuthProvider from './context/AuthContext';
import UserProvider from './context/UserContext';
import AuthRoutes from './routes/AuthRoutes';
import CommonRoutes from './routes/CommonRoutes';
import ApiProvider from './context/ApiContext';
import ChoiceProvider from './context/ChoiceContext';
// import EditPlayer from "./pages/EditPlayer";

function App() {
  return (
    <>
      <AuthProvider>
        <ApiProvider>
          <UserProvider>
            <ChoiceProvider>
              <Routes>
                <Route path="/" element={<AuthRoutes />}>
                  <Route path="setting" element={<Setting />} />
                  <Route path="portfolios" >
                    <Route index element={<List />} />
                    <Route path=":id" element={<Detail />} />
                    <Route path="new" element={<Create />} />
                  </Route>
                </Route>
                <Route path="/auth" element={<CommonRoutes />}>
                  <Route path="" element={<SignIn />} />
                </Route>
                {/* <Route path="/edit-player/:id" element={<EditPlayer />} /> */}
              </Routes>
            </ChoiceProvider>
          </UserProvider>
        </ApiProvider>
      </AuthProvider>
    </>
  );
}

export default App;
