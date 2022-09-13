import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";

const AuthRoutes: React.FC = () => {
  const { token, initialized } = React.useContext(AuthContext);
  const navigate = useNavigate();

  // 初期化処理が終わっていない場合はローディング画面へ
  if (!initialized) return (<>loading...</>);

  // 認証トークンが発行されていない場合は認証画面へ
  if (token === "") {
    navigate('/auth');
  }

  return (
    <Layout>
      <Outlet/>
    </Layout>
  );
};

export default AuthRoutes;