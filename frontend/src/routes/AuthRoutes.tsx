import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";

const AuthRoutes: React.FC = () => {
  const { token, initialized } = React.useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (initialized && token === "") {
      navigate("/auth");
    }
  }, [initialized]);

  // 初期化処理が終わっていない場合はローディング画面へ
  if (!initialized) return <>loading...</>;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default AuthRoutes;
